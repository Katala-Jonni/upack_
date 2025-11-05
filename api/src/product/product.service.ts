import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import slugify from 'slugify';

const fs = require('fs');
import { join } from 'path'

const filePath = join(process.cwd(), 'productImages.json');
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
import { getRefresh } from "@app/product/product.refresh";
import { FileService, getRefreshFiles, s3 } from "@app/product/productFile.refresh";

const getBufferFile = async (fileUrl) => {
    try {
        const indexOf = fileUrl.indexOf('folder');
        if (!indexOf || indexOf === -1) {
            return null;
        }
        const pathFile = fileUrl.slice(indexOf);
        const res = await s3.Download(pathFile);
        // console.log('resFalse', res);
        const body = res.data.Body;
        const baseUrlForBase64 = `data:${res.data.ContentType};base64,`;
        const fileBuffer = Buffer.from(body, 'utf8');
        const base64 = fileBuffer.toString('base64');
        return `${baseUrlForBase64}${base64}`;
    } catch (e) {
        console.log('Ошибка в запросе getBufferFile', e);
    }

    // console.log('urlBase64', urlBase64);
    // console.log('-----------------------------------');
};

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productRepository: Model<ProductDocument>,
        @InjectModel(Category.name) private readonly categoryRepository: Model<CategoryDocument>,
        @InjectConnection() private readonly connection: Connection
    ) {
    }

    async refreshApp() {
        const { categories, products } = await getRefresh();
        try {
            const operationsCategory = [
                // Операция удаления всех существующих документов
                { deleteMany: { filter: {} } },
                // Операции вставки новых документов
                ...categories.map(doc => ({
                    insertOne: { document: doc }
                }))
            ];
            const operationsProducts = [
                // Операция удаления всех существующих документов
                { deleteMany: { filter: {} } },
                // Операции вставки новых документов
                ...products.map(doc => ({
                    insertOne: { document: doc }
                }))
            ];
            await this.categoryRepository.bulkWrite(operationsCategory);
            await this.productRepository.bulkWrite(operationsProducts);
            // await this.categoryRepository.bulkWrite(operationsCategory);
            // await this.categoryRepository.deleteMany({});
            // await this.categoryRepository.insertMany(categories);
            // await this.productRepository.deleteMany({});
            // await this.productRepository.insertMany(products);
        } catch (e) {
            console.log(e)
        }
        // console.log('updatedData', updatedData);
        // const category = this.categoryRepository.insertMany(updatedData);
        // await category.save();
        return [];
    }

    async refreshFilesApp() {
        try {
            const products = await this.findAllProduct();
            const productsFile = await getRefreshFiles(products);
            return productsFile;
            // const operationsCategory = [
            //     // Операция удаления всех существующих документов
            //     { deleteMany: { filter: {} } },
            //     // Операции вставки новых документов
            //     ...categories.map(doc => ({
            //         insertOne: { document: doc }
            //     }))
            // ];
            // const operationsProducts = [
            //     // Операция удаления всех существующих документов
            //     { deleteMany: { filter: {} } },
            //     // Операции вставки новых документов
            //     ...products.map(doc => ({
            //         insertOne: { document: doc }
            //     }))
            // ];
            // await this.productRepository.bulkWrite(operationsProducts);
            // await this.categoryRepository.bulkWrite(operationsCategory);
            // await this.categoryRepository.deleteMany({});
            // await this.categoryRepository.insertMany(categories);
            // await this.productRepository.deleteMany({});
            // await this.productRepository.insertMany(products);
        } catch (e) {
            console.log(e)
        }
        // console.log('updatedData', updatedData);
        // const category = this.categoryRepository.insertMany(updatedData);
        // await category.save();
        // return [];
    }


    async findOne(query: SearchInterface): Promise<Product> {
        return await this.productRepository.findOne(query)
            .select({
                __v: 0
            })
            .exec();
    }

    async findAllProduct(): Promise<any> {
        // async findAllProduct(): Promise<Product[]> {
        const countCollection = await this.productRepository.countDocuments();
        const products = await this.productRepository.find().sort({ title: -1 })
            .select({
                __v: 0
            })
            .exec();
        if (!products.length) return [];

        // const File = new FileService();
        // const productsFiles = await File.readJson();
        //
        // fs.stat(filePath, (err, stats) => {
        //     if (err) {
        //         console.error("Ошибка при получении статистики файла:", err);
        //         return;
        //     }
        //     const fileSizeInBytes = stats.size;
        //     console.log(`Размер файла: ${fileSizeInBytes} байт`);
        // });


        // const resData = products.map(el => {
        //     return {
        //         refKey: el.refKey,
        //         title: el.title,
        //         description: el.description,
        //         parentKey: el.parent,
        //         parent: el.parent,
        //         measurement: el.measurement,
        //         slug: el.slug,
        //         price: el.price,
        //         multiplicity: el.multiplicity,
        //         file: el.file,
        //         thumbnail: productsFiles[el.refKey] && productsFiles[el.refKey].thumbnail ? productsFiles[el.refKey].thumbnail : null
        //     }
        // });


        // const data = Object
        //     .keys(productsFiles)
        //     .map(el => {
        //         return {
        //             refKey: el,
        //             title: productsFiles[el].title,
        //             description: productsFiles[el].description,
        //             parentKey: productsFiles[el].parent,
        //             parent: productsFiles[el].parent,
        //             measurement: productsFiles[el].measurement,
        //             slug: productsFiles[el].slug,
        //             price: productsFiles[el].price,
        //             multiplicity: productsFiles[el].multiplicity,
        //             file: productsFiles[el].file,
        //             thumbnail: productsFiles[el].thumbnail
        //         }
        //     });
        // return resData;
        // return await this.productRepository.find()
        //     .select({
        //         __v: 0
        //     })
        //     .exec();

        return {products, countCollection};
    }

    async findAllCategoryProducts(refKey: string, page: number): Promise<any> {
        // const products =  await this.productRepository.find({ parentKey: refKey })
        //     .select({
        //         __v: 0
        //     })
        //     .exec();
        //
        // if (!products.length) return [];
        //
        // const File = new FileService();
        // const productsFiles = await File.readJson();
        // return products.map(el => {
        //     return {
        //         refKey: el.refKey,
        //         title: el.title,
        //         description: el.description,
        //         parentKey: el.parent,
        //         parent: el.parent,
        //         measurement: el.measurement,
        //         slug: el.slug,
        //         price: el.price,
        //         multiplicity: el.multiplicity,
        //         file: el.file,
        //         thumbnail: productsFiles[el.refKey] && productsFiles[el.refKey].thumbnail ? productsFiles[el.refKey].thumbnail : null
        //     }
        // });
        const countCollection = await this.productRepository.countDocuments({ parentKey: refKey });
        // console.log('countCollection__________________________', countCollection);
        // console.log('page__________________________', page);
        const pageNumber = page || 1;
        const pageSize = 8;
        const skipAmount = (pageNumber - 1) * pageSize;
        const products = await this.productRepository.find({ parentKey: refKey }).sort({ title: -1 }).skip(skipAmount).limit(pageSize)
            .select({
                __v: 0
            })
            .exec();
        const files = products.map(async (el) => {
            const file = await getBufferFile(el.thumbnail);
            return {
                _id: el._id,
                refKey: el.refKey,
                title: el.title,
                description: el.description,
                parent: el.parent,
                measurement: el.measurement,
                slug: el.slug,
                price: el.price,
                multiplicity: el.multiplicity,
                file: el.file,
                thumbnail: file
            }
        });
        const resBody = await Promise.all(
            files
        );
        // console.log('resBody', resBody);
        return { products: resBody, countCollection };

        // return products;
    }

    async findOneProduct(slug: string): Promise<Product> {
        return this.findOne({ slug });
    }

    // async createProduct(createProductDto: CreateProductDto): Promise<Product[]> {
    //     const session = await this.connection.startSession();
    //     session.startTransaction();
    //     const productByTitle = await this.productRepository.findOne({ title: createProductDto.title }, null, { session });
    //     const categoryById: Category = await this.categoryRepository.findById(createProductDto.categoryId, null, { session });
    //     const errorResponse = {
    //         errors: {}
    //     };
    //     if (productByTitle) {
    //         errorResponse['title'] = 'has already been taken';
    //     }
    //
    //     if (!categoryById) {
    //         errorResponse['categoryById'] = 'categoryById is not found';
    //     }
    //
    //     if (productByTitle || !categoryById) {
    //         throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    //     }
    //     try {
    //         const slug = this.getSlug(createProductDto.title);
    //         const payload = this.getPayload(createProductDto);
    //         const newProduct = new this.productRepository({
    //             ...payload,
    //             slug
    //         });
    //         await newProduct.save();
    //         await this.categoryRepository.findByIdAndUpdate(
    //             newProduct.categoryId.toString(),
    //             { $addToSet: { 'products': [...categoryById.products, { productId: newProduct }] } },
    //             { session }
    //         );
    //         await session.commitTransaction();
    //         await session.endSession();
    //     } catch (e) {
    //         await session.abortTransaction();
    //         await session.endSession();
    //         throw new Error(e);
    //     }
    //     return this.findAllProduct();
    // }
    //
    // async updateProduct(updateProductDto: UpdateProductDto, slug: string): Promise<Product> {
    //     const productBySlug: Product & { _id?: string } = await this.productRepository.findOne({ slug });
    //     if (!productBySlug) {
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //     const errorResponse = {
    //         errors: {}
    //     };
    //
    //     const categoryByIdTo: Category = await this.categoryRepository.findById(updateProductDto.categoryId);
    //
    //     if (!categoryByIdTo) {
    //         errorResponse['categoryById'] = 'categoryById is not found';
    //     }
    //     const isProductBySlug: boolean = updateProductDto.title.toLowerCase() === productBySlug.title.toLowerCase();
    //     const productByTitle: Product = await this.findOne({ title: updateProductDto.title });
    //     if (productByTitle && !isProductBySlug) {
    //         errorResponse['title'] = 'has already been taken';
    //         throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    //     }
    //     const session = await this.connection.startSession();
    //     session.startTransaction();
    //     try {
    //         let product: ProductDocument = await this.productRepository.findById(productBySlug._id, null, { session });
    //         const payload: UpdateProductDto = this.getPayload(updateProductDto, productBySlug);
    //         const newSlug: string = productBySlug.title.toLowerCase() !== updateProductDto.title.toLowerCase()
    //             ? this.getSlug(updateProductDto.title)
    //             : slug;
    //         product = Object.assign(product, payload, { slug: newSlug });
    //         await product.save();
    //
    //         if (productBySlug.categoryId.toString() !== updateProductDto.categoryId) {
    //
    //             const categoryByIdFrom: CategoryDocument = await this.categoryRepository.findById(
    //                 productBySlug.categoryId.toString(),
    //                 null,
    //                 { session }
    //             );
    //             const idx: number = categoryByIdFrom.products.findIndex((el) => {
    //                 return el.productId['_id'].toString() === product._id.toString();
    //             });
    //
    //             categoryByIdFrom.products.splice(idx, 1);
    //             await categoryByIdFrom.save();
    //
    //             await this.categoryRepository.findByIdAndUpdate(
    //                 updateProductDto.categoryId,
    //                 { $addToSet: { products: [...categoryByIdTo.products, { productId: product }] } },
    //                 { session }
    //             );
    //         } else {
    //             const categoryByIdFromEdit: CategoryDocument | any = await this.categoryRepository.findById(
    //                 productBySlug.categoryId.toString(),
    //                 null,
    //                 { session }
    //             );
    //             const idx: number = categoryByIdFromEdit.products.findIndex((el) => {
    //                 return el.productId['_id'].toString() === product._id.toString();
    //             });
    //             categoryByIdFromEdit.products[idx] = { productId: product };
    //             await categoryByIdFromEdit.save();
    //         }
    //         await session.commitTransaction();
    //         await session.endSession();
    //         return this.findOne({ slug: product.slug });
    //     } catch (e) {
    //         await session.abortTransaction();
    //         await session.endSession();
    //         throw new Error(e);
    //     }
    // }
    //
    // async deleteProduct(slug: string): Promise<Product[]> {
    //     const productBySlug: ProductDocument = await this.productRepository.findOne({ slug });
    //     if (!productBySlug) {
    //         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    //     }
    //     const session = await this.connection.startSession();
    //     session.startTransaction();
    //     try {
    //         await this.productRepository.findByIdAndDelete(productBySlug._id, { session });
    //         const categoryByIdFrom: CategoryDocument = await this.categoryRepository.findById(
    //             productBySlug.categoryId.toString(),
    //             null,
    //             { session }
    //         );
    //         const idx: number = categoryByIdFrom.products.findIndex((el) => {
    //             return el.productId['_id'].toString() === productBySlug._id.toString();
    //         });
    //
    //         categoryByIdFrom.products.splice(idx, 1);
    //         await categoryByIdFrom.save();
    //         await session.commitTransaction();
    //         await session.endSession();
    //     } catch (e) {
    //         await session.abortTransaction();
    //         await session.endSession();
    //         throw new Error(e);
    //     }
    //     return this.findAllProduct();
    // }
    //
    // private getPayload(
    //     product: CreateProductDto | UpdateProductDto,
    //     currentProduct: Product | null = null
    // ): CreateProductDto | UpdateProductDto {
    //     return {
    //         title: product.title,
    //         price: product.price,
    //         categoryId: product.categoryId,
    //         composition: product.composition,
    //         active: product.active,
    //         weight: product.weight,
    //         images: product.images ? product.images : currentProduct?.images,
    //         description: product.description
    //     };
    // }

    private getSlug(title: string): string {
        const slug = slugify(title, {
            lower: true
        });
        const randomString = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        return `${slug}-${randomString}`;
    }

    buildProductsResponse(products: Product[], countCollection: number ): ProductsResponseInterface {
        return { products, countCollection };
    }

    buildProductResponse(product: Product): ProductResponseInterface {
        return { product };
    }
}
