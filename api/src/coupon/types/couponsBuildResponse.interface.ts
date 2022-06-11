import { Coupon } from '@app/coupon/coupon.shcema';

export interface CouponsBuildResponseInterface {
  coupons: Coupon[],
  couponsCount: number
}
