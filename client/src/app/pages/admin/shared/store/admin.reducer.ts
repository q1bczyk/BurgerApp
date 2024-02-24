import { createReducer, on } from "@ngrx/store";
import { LocalInterface } from "src/app/shared/models/local.interface";
import { setActiveAdmin } from "./admin.action";
import { initialState } from "./admin.state";

export const adminFeautureKey = 'adminStorage';

const _adminReducer = createReducer(
    initialState,
    on(setActiveAdmin, (state, action) => action.data)
)

export function adminReducer(state : LocalInterface, action : any)
{
    return _adminReducer(state, action);
}