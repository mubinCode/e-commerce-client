import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { number, string } from "zod";

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