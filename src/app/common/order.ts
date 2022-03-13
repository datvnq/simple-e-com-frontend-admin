import { OrderItem } from "./order-item";

export class Order {
    id: number;
    orderTrackingNumber: string;
    totalQuantity: number;
    totalPrice: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    note: string;
    dateCreated: Date;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhoneNumber: string;
}
