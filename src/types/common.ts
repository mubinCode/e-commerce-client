import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TMeta = {
    page: number;
    limit: number;
    total: number;
}

export type UserRole = keyof typeof USER_ROLE;

export interface IDraweItem {
    title: string
    path: string
    parentPath?: string
    // icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName : string}
    icon?: OverridableComponent<SvgIconTypeMap> & {muiName : string}
    children?: IDraweItem[]
}

export type TResponse<T> = {
    data: T
    meta?: TMeta
}
export interface IErrorMessage {
    path: string | number,
    message: string
}
export interface IErrorResponse  {
    statusCode: number,
    message: string,
    errorMessage: IErrorMessage[]
}
export interface CartItemType {
    variantId: string
    quantity: number
    price: number
  }

  export interface OrderItemPayload {
    variantId: string;
    quantity: number;
    price: number;
  }
  
  export interface BaseOrderPayload {
    contactNumber: string;
    deliveryType: "HOME" | "PICKUP";
    paymentMethod: string;
    items: OrderItemPayload[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }

  export interface HomeDeliveryOrderPayload extends BaseOrderPayload {
    deliveryType: "HOME";
    address: string;
    city: string;
    country: string;
  }
  
  export interface PickupDeliveryOrderPayload extends BaseOrderPayload {
    deliveryType: "PICKUP";
    pickupPointId: string;
  }
  export type OrderPayload =
  | HomeDeliveryOrderPayload
  | PickupDeliveryOrderPayload;
  
  