import { createAction, props } from "@ngrx/store";
import { LocalInterface } from "src/app/shared/models/local.interface";

export const setActiveAdmin = createAction(
    'setActiveAdmin',
    props<{data : LocalInterface}>()
)