export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface Cart{
  cart_id: string;
  items: CartItem[];
  item_count: number;
  total_price: number;
};

export interface CartItem {
  course_id: string;
  course_name: string;
  price: number;
  course_smallimage: string;
};

export interface MergeCartData {
  item_count: number;
  total_price: number;
  errors: string | null;
};
