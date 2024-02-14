import { createReducer, on } from "@ngrx/store";
import { addProduct, setCartVisiblity, setDeliveryState } from "./cart.action";
import { CartInterface, initialState } from "./cart.state";

export const cartFeautureKey = 'cartStorage';

const _cartReducer = createReducer(
    initialState,
    on(setCartVisiblity, (state) => {
        return{
            ...state,
            isCartVisible : !state.isCartVisible,
        }
    }),
    on(setDeliveryState, (state, action) => {
        return{
            ...state,
            isDelivery : action.value,
        }
    }),
    on(addProduct, (state, action) => {
        const updatedProduct = { ...action.product, quantity: 1 };
        const updatedProducts = [...state.products, updatedProduct];
        const updatedPrice = state.price + updatedProduct.price;
        return{
            ...state,
            products : updatedProducts,
            price : updatedPrice,
        }
    })
)

export function cartReducer(state : CartInterface, action : any)
{
    return _cartReducer(state, action);
}