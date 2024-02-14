import { createAction, props } from "@ngrx/store";
import { ProductInterface } from "../../models/product.interface";

export const setCartVisiblity = createAction(
    'setcartVisiblity',
)

export const setDeliveryState = createAction(
    'setDeliveryState',
    props<{value : boolean}>()
)

export const addProduct = createAction(
    'addProduct',
    props<{product : ProductInterface}>()
)