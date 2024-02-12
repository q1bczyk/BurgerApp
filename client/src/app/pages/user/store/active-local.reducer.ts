import { createReducer, on } from "@ngrx/store";
import { LocalInterface } from "src/app/shared/models/local.interface";
import { setLocal } from "./active-local.action";
import { initialState } from "./active-local.state";

export const activeLocalFeautureKey = 'activeLocalStore';

const _activeLocalReducer = createReducer(
    initialState,
    on(setLocal, (state, { localData }) => ({ ...state, ...localData }))
);

export function activeLocalReducer(state : LocalInterface, action : any)
{
    return _activeLocalReducer(state, action);
}