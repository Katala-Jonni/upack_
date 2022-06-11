import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// schemas
import { Coupon, CouponDocument } from '@app/coupon/coupon.shcema';
// dto
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
// interfaces
import { CouponsBuildResponseInterface } from '@app/coupon/types/couponsBuildResponse.interface';
import { CouponBuildResponseInterface } from '@app/coupon/types/couponBuildResponse.interface';
import { CouponEnum } from '@app/common/enum/coupon.enum';

const getErrorResponse = () => {
  return {
    statusCode: 400,
    message: [],
    error: 'Bad Request',
  };
};


@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private readonly couponRepository: Model<CouponDocument>) {
  }

  async create(createCouponDto: CreateCouponDto): Promise<Coupon[]> {
    const couponSecret = await this.couponRepository.findOne({ secret: createCouponDto.secret });
    const errorResponse = getErrorResponse();
    if (couponSecret) {
      errorResponse.message.push('secret has already been taken');
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
    const payload = this.getPayload(createCouponDto);
    const newCoupon = new this.couponRepository(payload);
    await newCoupon.save();
    return this.findAll();
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository
      .find()
      .select({ __v: 0 })
      .exec();
  }

  async findOne(secret: string): Promise<Coupon> {
    return await this.couponRepository
      .findOne({ secret })
      .select({ __v: 0 })
      .exec();
  }

  async update(secret: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    let currentCoupon: CouponDocument = await this.couponRepository.findOne({ secret });
    if (!currentCoupon) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = getErrorResponse();
    const isCurrentCoupon: boolean = updateCouponDto.secret.toLowerCase() === currentCoupon.secret.toLowerCase();
    const newSecret = await this.findOne(updateCouponDto.secret);
    const isNotValidSecret = newSecret && !isCurrentCoupon;
    const isNotValidTypePercent = updateCouponDto.type === CouponEnum.percent && (updateCouponDto.count > 100 || updateCouponDto.count < 0);
    if (isNotValidSecret) {
      errorResponse.message.push('secret has already been taken');
    }
    if (isNotValidTypePercent) {
      errorResponse.message.push('percent может быть в диапазоне от 0 до 100');
    }
    if (isNotValidSecret || isNotValidTypePercent) {
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
    currentCoupon = Object.assign(currentCoupon, updateCouponDto);
    await currentCoupon.save();
    return this.findOne(currentCoupon.secret);
  }

  async remove(secret: string): Promise<Coupon[]> {
    const currentCoupon: Coupon & { _id?: string } = await this.findOne(secret);
    if (!currentCoupon) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.couponRepository.findByIdAndDelete(currentCoupon._id);
    return this.findAll();
  }

  private getPayload(
    coupon: CreateCouponDto | UpdateCouponDto,
  ): CreateCouponDto | UpdateCouponDto {
    return {
      secret: coupon.secret,
      expire: coupon.expire,
      type: coupon.type,
      count: coupon.count,
      active: coupon.active,
    };
  }

  buildCouponsResponse(coupons: Coupon[]): CouponsBuildResponseInterface {
    return { coupons, couponsCount: coupons.length };
  }

  buildCouponResponse(coupon: Coupon): CouponBuildResponseInterface {
    return { coupon };
  }
}
