import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
// services
import { ProductService } from '@app/product/product.service';
// enum
import { RolesEnum } from '@app/common/enum/roles.emum';
// dto
import { CreateProductDto } from '@app/product/dto/createProduct.dto';
import { UpdateProductDto } from '@app/product/dto/updateProduct.dto';
// interfaces
import { ProductsResponseInterface } from '@app/product/types/productsResponse.interface';
import { ProductResponseInterface } from '@app/product/types/productResponse.interface';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ProductsResponseInterface> {
    const products = await this.productService.findAllProduct();
    return this.productService.buildProductsResponse(products);
  }

  @Get(':slug')
  async findOneProduct(
    @Param('slug') slug: string,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.findOneProduct(slug);
    return this.productService.buildProductResponse(product);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async createProduct(
    @Body('product') createProductDto: CreateProductDto,
  ): Promise<ProductsResponseInterface> {
    const products = await this.productService.createProduct(createProductDto);
    return this.productService.buildProductsResponse(products);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('slug') slug: string,
    @Body('product') updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.updateProduct(updateProductDto, slug);
    return this.productService.buildProductResponse(product);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async deleteProduct(
    @Param('slug') slug: string,
  ): Promise<ProductsResponseInterface> {
    const products = await this.productService.deleteProduct(slug);
    return this.productService.buildProductsResponse(products);
  }
}
