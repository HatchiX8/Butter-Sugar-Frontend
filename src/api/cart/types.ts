export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
};

export interface Cart{
  cart_id: string,
  cart_items: CartItem[],
  item_count: number,
  total_price: number,
};

export interface CartItem {
  course_id: string
  course_name: string
  price: number
  course_smallimage: string
};

