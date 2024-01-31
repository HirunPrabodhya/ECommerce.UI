import { CartData } from "./CartData";

export class Order{
    UserId : number;
    SubTotalPrice: number;
    cartData : CartData[];
}