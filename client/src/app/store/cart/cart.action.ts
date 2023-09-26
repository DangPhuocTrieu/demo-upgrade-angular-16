import { createAction, props } from '@ngrx/store'
import { User } from '../../models/user'

export const changeQuantilyCart = createAction(
    '[Cart API] Change Quantily Cart',
    props<{ count: number }>()
)

