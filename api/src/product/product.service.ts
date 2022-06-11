import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import slugify from 'slugify';
// schemas
import { Product, ProductDocument } from '@app/product/product.schema';
import { Category, CategoryDocument } from '@app/category/category.schema';
// dto
import { CreateProductDto } from '@app/product/dto/createProduct.dto';
import { UpdateProductDto } from '@app/product/dto/updateProduct.dto';
// interfaces
import { ProductsResponseInterface } from '@app/product/types/productsResponse.interface';
import { ProductResponseInterface } from '@app/product/types/productResponse.interface';
import { SearchInterface } from '@app/product/types/search.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productRepository: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly categoryRepository: Model<CategoryDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
  }

  async findOne(query: SearchInterface): Promise<Product> {
    return await this.productRepository.findOne(query)
      .select({
        __v: 0,
      })
      .exec();
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.find()
      .select({
        __v: 0,
      })
      .exec();
  }

  async findOneProduct(slug: string): Promise<Product> {
    return this.findOne({ slug });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product[]> {
    const session = await this.connection.startSession();
    session.startTransaction();
    const productByTitle = await this.productRepository.findOne({ title: createProductDto.title }, null, { session });
    const categoryById: Category = await this.categoryRepository.findById(createProductDto.categoryId, null, { session });
    const errorResponse = {
      errors: {},
    };
    if (productByTitle) {
      errorResponse['title'] = 'has already been taken';
    }

    if (!categoryById) {
      errorResponse['categoryById'] = 'categoryById is not found';
    }

    if (productByTitle || !categoryById) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    try {
      const slug = this.getSlug(createProductDto.title);
      const payload = this.getPayload(createProductDto);
      const newProduct = new this.productRepository({
        ...payload,
        slug,
      });
      await newProduct.save();
      await this.categoryRepository.findByIdAndUpdate(
        newProduct.categoryId.toString(),
        { $addToSet: { 'products': [...categoryById.products, { productId: newProduct }] } },
        { session },
      );
      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(e);
    }
    return this.findAllProduct();
  }

  async updateProduct(updateProductDto: UpdateProductDto, slug: string): Promise<Product> {
    const productBySlug: Product & { _id?: string } = await this.productRepository.findOne({ slug });
    if (!productBySlug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = {
      errors: {},
    };

    const categoryByIdTo: Category = await this.categoryRepository.findById(updateProductDto.categoryId);

    if (!categoryByIdTo) {
      errorResponse['categoryById'] = 'categoryById is not found';
    }
    const isProductBySlug: boolean = updateProductDto.title.toLowerCase() === productBySlug.title.toLowerCase();
    const productByTitle: Product = await this.findOne({ title: updateProductDto.title });
    if (productByTitle && !isProductBySlug) {
      errorResponse['title'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let product: ProductDocument = await this.productRepository.findById(productBySlug._id, null, { session });
      const payload: UpdateProductDto = this.getPayload(updateProductDto, productBySlug);
      const newSlug: string = productBySlug.title.toLowerCase() !== updateProductDto.title.toLowerCase()
        ? this.getSlug(updateProductDto.title)
        : slug;
      product = Object.assign(product, payload, { slug: newSlug });
      await product.save();

      if (productBySlug.categoryId.toString() !== updateProductDto.categoryId) {

        const categoryByIdFrom: CategoryDocument = await this.categoryRepository.findById(
          productBySlug.categoryId.toString(),
          null,
          { session },
        );
        const idx: number = categoryByIdFrom.products.findIndex((el) => {
          return el.productId['_id'].toString() === product._id.toString();
        });

        categoryByIdFrom.products.splice(idx, 1);
        await categoryByIdFrom.save();

        await this.categoryRepository.findByIdAndUpdate(
          updateProductDto.categoryId,
          { $addToSet: { products: [...categoryByIdTo.products, { productId: product }] } },
          { session },
        );
      } else {
        const categoryByIdFromEdit: CategoryDocument | any = await this.categoryRepository.findById(
          productBySlug.categoryId.toString(),
          null,
          { session },
        );
        const idx: number = categoryByIdFromEdit.products.findIndex((el) => {
          return el.productId['_id'].toString() === product._id.toString();
        });
        categoryByIdFromEdit.products[idx] = { productId: product };
        await categoryByIdFromEdit.save();
      }
      await session.commitTransaction();
      await session.endSession();
      return this.findOne({ slug: product.slug });
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(e);
    }
  }

  async deleteProduct(slug: string): Promise<Product[]> {
    const productBySlug: ProductDocument = await this.productRepository.findOne({ slug });
    if (!productBySlug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.productRepository.findByIdAndDelete(productBySlug._id, { session });
      const categoryByIdFrom: CategoryDocument = await this.categoryRepository.findById(
        productBySlug.categoryId.toString(),
        null,
        { session },
      );
      const idx: number = categoryByIdFrom.products.findIndex((el) => {
        return el.productId['_id'].toString() === productBySlug._id.toString();
      });

      categoryByIdFrom.products.splice(idx, 1);
      await categoryByIdFrom.save();
      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(e);
    }
    return this.findAllProduct();
  }

  private getPayload(
    product: CreateProductDto | UpdateProductDto,
    currentProduct: Product | null = null,
  ): CreateProductDto | UpdateProductDto {
    return {
      title: product.title,
      price: product.price,
      categoryId: product.categoryId,
      composition: product.composition,
      active: product.active,
      weight: product.weight,
      images: product.images ? product.images : currentProduct?.images,
      description: product.description,
    };
  }

  private getSlug(title: string): string {
    const slug = slugify(title, {
      lower: true,
    });
    const randomString = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    return `${slug}-${randomString}`;
  }

  buildProductsResponse(products: Product[]): ProductsResponseInterface {
    return { products, productsCount: products.length };
  }

  buildProductResponse(product: Product): ProductResponseInterface {
    return { product };
  }
}
