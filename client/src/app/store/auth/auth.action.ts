import { createAction, props } from '@ngrx/store'
import { User } from '../../models/user'

export const loginStart = createAction('[Auth API] Login Start',)

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ user: User }>()
)

