import { createReducer, on } from "@ngrx/store";
import { addProduct, deleteProduct, setCartVisiblity, setDeliveryState } from "./cart.action";
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
        const existingProductIndex = state.products.findIndex(product => product.name === action.product.name);

        if (existingProductIndex !== -1) 
        {
            const updatedProducts = [...state.products];
            const existingProduct = updatedProducts[existingProductIndex];
            const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
            updatedProducts[existingProductIndex] = updatedProduct;
    
            return {
                ...state,
                products: updatedProducts,
                price: state.price + existingProduct.price,
                productsQuantity: state.productsQuantity + 1
            };
        } else 
        {
            const product = { ...action.product, quantity: 1 };
            const updatedProducts = [...state.products, product];
    
            return {
                ...state,
                products: updatedProducts,
                price: state.price + product.price,
                productsQuantity: state.productsQuantity + 1
            };
        }
    }),
    on(deleteProduct, (state, action) => {
        const products = [...state.products];
        const indexToDelete = products.findIndex(product => product.name === action.productName);
        const productToDelete = products[indexToDelete];
        const updatedProduct = { ...productToDelete, quantity : productToDelete.quantity - 1}
        let updatedProducts = [...state.products];
        
        if(updatedProduct.quantity === 0)
            updatedProducts = products.filter(product => product.name !== productToDelete.name)

        else
            updatedProducts[indexToDelete] = updatedProduct;
            
        return{
            ...state,
            products : updatedProducts,
            price : state.price - productToDelete.price,
            productsQuantity : state.productsQuantity - 1,
        }

    })
)

export function cartReducer(state : CartInterface, action : any)
{
    return _cartReducer(state, action);
}