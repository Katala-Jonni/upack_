import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// schemas
import { Basket, BasketDocument } from '@app/basket/basket.schema';
import { User, UserDocument } from '@app/user/user.schema';
import { Product, ProductDocument } from '@app/product/product.schema';
// dto
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
// interfaces
import { BasketResponseInterface } from '@app/basket/types/basketResponse.interface';
import { UserType } from '@app/user/types/user.type';
import { OrderDocument } from '@app/order/order.schema';


const basketOptions = {
  isActive: true,
};

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private readonly basketRepository: Model<BasketDocument>,
    @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
    @InjectModel(Product.name) private readonly productRepository: Model<ProductDocument>,
  ) {
  }

  async create(createBasketDto: CreateBasketDto, user: UserType = null, order: OrderDocument = null): Promise<Basket> {
    const currentProduct: Product = await this.productRepository.findById(createBasketDto.productId);
    if (!currentProduct) {
      throw new HttpException('product is not found', HttpStatus.NOT_FOUND);
    }
    try {
      if (order) {
        const basket: BasketDocument = await this.basketRepository.findById(`${order.basket}`);
        return this.createBasket(basket, createBasketDto, currentProduct);
      }
      if (user) {
        const currentUser: UserDocument = await this.userRepository.findById(user._id);
        if (currentUser.basketId) {
          const basket: BasketDocument = await this.basketRepository.findById(user.basketId);
          return this.createBasket(basket, createBasketDto, currentProduct);
        } else {
          const newBasket = await this.createNewBasket(createBasketDto, currentProduct, user);
          currentUser.basketId = newBasket;
          await currentUser.save();
          return newBasket;
        }
      }
      if (!user && createBasketDto.localBasketId) {
        const basket: BasketDocument = await this.basketRepository.findOne({ localBasketId: createBasketDto.localBasketId });
        if (basket) {
          return this.createBasket(basket, createBasketDto, currentProduct);
        }
      }
      return this.createNewBasket(createBasketDto, currentProduct);
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBasket(localBasketId: string, user: UserType): Promise<Basket> {
    try {
      return user
        ? await this.basketRepository.findOne({ _id: user.basketId, ...basketOptions })
        : await this.basketRepository.findOne({ localBasketId, ...basketOptions });
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    basketId: string,
    productId: string,
    updateBasketDto: UpdateBasketDto,
    user: UserType,
    inc: string,
  ): Promise<Basket> {
    if (user && !user.basketId) {
      return null;
    }
    const param = user ? { _id: `${user.basketId}` } : { localBasketId: basketId };
    const basket: BasketDocument = await this.searchBasket(param);
    return this.updatePlusMinus(basket, productId, updateBasketDto, inc);
  }

  async removeProduct(basketId: string, productId: string, user: UserType): Promise<Basket> {
    if (user && !user.basketId) {
      return null;
    }
    const param = user ? { _id: `${user.basketId}` } : { localBasketId: basketId };
    const basket = await this.deleteProduct(param, productId);
    if (basket && !basket.products.length) {
      user && await this.userRepository.findByIdAndUpdate(user._id, { basketId: null });
      await this.deleteBasket(param);
      return null;
    }
    return basket;
  }

  async remove(basketId: string, user: UserType): Promise<null> {
    const param = user ? { _id: `${user.basketId}` } : { localBasketId: basketId };
    const basket = await this.basketRepository.findOne(param);
    if (!basket) {
      throw new HttpException('basket is not found', HttpStatus.NOT_FOUND);
    }
    if (user && user.basketId) {
      await this.userRepository.findByIdAndUpdate(user._id, { basketId: null });
    }
    await this.deleteBasket(param);
    return null;
  }

  private async createBasket(
    basket: BasketDocument,
    createBasketDto: CreateBasketDto,
    currentProduct: Product,
  ): Promise<Basket> {
    const candidate = basket.products.findIndex(b => `${b.productId}` === `${createBasketDto.productId}`);
    if (candidate >= 0) {
      basket.products[candidate].count += createBasketDto.count;
    } else {
      basket.products.push({
        productId: currentProduct,
        count: createBasketDto.count,
      });
    }
    basket.total += currentProduct.price * createBasketDto.count;
    await basket.save();
    return await this.basketRepository.findById(`${basket._id}`);
  }

  private async createNewBasket(
    createBasketDto: CreateBasketDto,
    currentProduct: Product,
    user: UserType = null,
  ): Promise<Basket> {
    const newBasketUserId = new this.basketRepository({
      total: currentProduct.price * createBasketDto.count,
      products: [
        {
          productId: currentProduct,
          count: createBasketDto.count,
        },
      ],
      localBasketId: user ? null : createBasketDto.localBasketId || uuidv4(),
    });
    await newBasketUserId.save();
    return await this.basketRepository.findById(`${newBasketUserId._id}`);
  }

  async updatePlusMinus(
    basket: BasketDocument,
    productId: string,
    updateBasketDto: UpdateBasketDto,
    inc: string,
  ): Promise<Basket> {
    const productIdx: number = basket.products.findIndex((p: { count: number, productId: ProductDocument }) => {
      return `${p.productId._id}` === productId;
    });
    if (!basket.products[productIdx]) {
      return basket;
    }
    if (inc === 'plus') {
      basket.products[productIdx].count += +updateBasketDto.count;
      basket.total += basket.products[productIdx].productId.price * +updateBasketDto.count;
    } else if (inc === 'minus') {
      basket.products[productIdx].count -= +updateBasketDto.count;
      if (basket.products[productIdx].count < 1) {
        basket.products[productIdx].count += +updateBasketDto.count;
      } else {
        basket.total -= basket.products[productIdx].productId.price * +updateBasketDto.count;
      }
    } else if(inc === 'count') {
      let sum = 0;
      if (updateBasketDto.count < 1) {
        basket.products[productIdx].count = 1;
      } else {
        basket.products[productIdx].count = +updateBasketDto.count;
      }
      basket.products.forEach((elem): void => {
        sum += elem.count * elem.productId.price;
      });
      basket.total = sum;
    }
    await basket.save();
    return basket;
  }

  async deleteProduct(
    param: { _id?: string, localBasketId?: string },
    productId: string,
    isOrder = false,
  ): Promise<Basket> {
    const basket: BasketDocument = await this.searchBasket(param, isOrder);
    if (!basket) {
      throw new HttpException('basket is not found', HttpStatus.NOT_FOUND);
    }
    const productIdx: number = basket.products.findIndex((p: { count: number, productId: ProductDocument }) => {
      return `${p.productId._id}` === productId;
    });
    if (!basket.products[productIdx]) {
      return basket;
    }
    basket.total -= basket.products[productIdx].count * basket.products[productIdx].productId.price;
    basket.products.splice(productIdx, 1);
    await basket.save();
    return basket;
  }

  private async deleteBasket(param: { _id?: string, localBasketId?: string }): Promise<void> {
    await this.basketRepository.findOneAndDelete({ ...param, ...basketOptions });
  }

  async searchBasket(
    param: { _id?: string, localBasketId?: string },
    isOrder = false,
  ): Promise<BasketDocument> {
    const orderEdit = !isOrder ? { ...basketOptions } : {};
    try {
      const basket = await this.basketRepository
        .findOne({ ...param, ...orderEdit })
        .populate('products.productId')
        .exec();
      if (!basket) {
        throw new Error();
      }
      return basket;
    } catch (e) {
      throw new HttpException('basket is not found', HttpStatus.NOT_FOUND);
    }
  }

  buildBasketResponse(basket?: Basket): BasketResponseInterface {
    return { basket: basket || null };
  }
}
