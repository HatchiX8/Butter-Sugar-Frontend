export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface Cart{
  cart_items: CartItem[];
  item_count: number;
  total_price: number;
};

export interface CartItem {
  cart_item_id?: string;
  course_id: string;
  course_name: string;
  price: number;
  course_small_imageurl: string;
};

export interface MergeCartData {
  item_count: number;
  total_price: number;
  errors: string | null;
};

export interface CheckoutPayload {
  coupon_id?: string;
  coupon?: string;
  discount_amount?: number;
};

/** 後端回傳的 HTML 字串（NewebPay 表單） */
export type CheckoutResponse = string;
