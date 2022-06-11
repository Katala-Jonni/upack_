import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
// enums
import { RolesEnum } from '@app/common/enum/roles.emum';
// services
import { CouponService } from './coupon.service';
//dto
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
//interfaces
import { CouponsBuildResponseInterface } from '@app/coupon/types/couponsBuildResponse.interface';
import { CouponBuildResponseInterface } from '@app/coupon/types/couponBuildResponse.interface';

@Controller('/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('coupon') createCouponDto: CreateCouponDto,
  ): Promise<CouponsBuildResponseInterface> {
    const coupons = await this.couponService.create(createCouponDto);
    return this.couponService.buildCouponsResponse(coupons);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findAll(): Promise<CouponsBuildResponseInterface> {
    const coupons = await this.couponService.findAll();
    return this.couponService.buildCouponsResponse(coupons);
  }

  @Get(':secret')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findOne(
    @Param('secret') secret: string,
  ): Promise<CouponBuildResponseInterface> {
    const coupon = await this.couponService.findOne(secret);
    return this.couponService.buildCouponResponse(coupon);
  }

  @Put(':secret')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('secret') secret: string,
    @Body('coupon') updateCouponDto: UpdateCouponDto,
  ): Promise<CouponBuildResponseInterface> {
    const coupon = await this.couponService.update(secret, updateCouponDto);
    return this.couponService.buildCouponResponse(coupon);
  }

  @Delete(':secret')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async remove(
    @Param('secret') secret: string,
  ): Promise<CouponsBuildResponseInterface> {
    const coupons = await this.couponService.remove(secret);
    return this.couponService.buildCouponsResponse(coupons);
  }
}
