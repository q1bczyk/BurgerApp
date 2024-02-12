import { createAction, props } from "@ngrx/store";
import { LocalInterface } from "src/app/shared/models/local.interface";

export const setLocal = createAction(
    'setLocal',
    props<{localData : LocalInterface}>()
)