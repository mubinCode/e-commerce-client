export interface IOrderPayload {
    deliveryType: 'HOME' | 'PICKUP';
    contactNumber: string;
    paymentMethod: 'CASH_ON_DELIVERY' | 'ONLINE_PAYMENT';
    address?: string;
    city?: string;
    country?: string;
    pickupPointId?: string;
    items?: {
      variantId: string;
      quantity: number;
      price: number;
    }[];
    subtotal?: number;
    deliveryFee?: number;
    total?: number;
  }
  
  export interface PaymentResponse {
    paymentUrl: string;
    transactionId: string;
  }
  
  export interface OrderResponse {
    orderId: string;
    totalAmount: number;
    message: string;
    isExisting?: boolean;
  }
  
  export interface IPickupPoint {
    id: string;
    name: string;
    address: string;
    country: string;
    email: string;
    contactNumber: string;
    isPickupPoint: boolean;
  }
  
  export interface CartVariant {
    id: string;
    productName: string;
    price: number;
    image: string | null;
    size: string;
    variantQuantity: number;
  }

  export type PaymentStatusResponse = {
    status: string;
    orderId: string;
    paymentStatus: string;
    message: string;
  };
  
  export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
  };