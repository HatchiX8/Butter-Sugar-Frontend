export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface Orders {
  order_number: string;
  course_name: string[];
  final_amount: number;
  created_at: string;
  payway?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  course_id: string;
  course_name: string;
  sell_price: number;
  origin_price: number;
  course_small_imageurl: string;
};
