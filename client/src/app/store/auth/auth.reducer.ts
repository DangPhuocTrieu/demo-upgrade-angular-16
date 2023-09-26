import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as AuthActions from './auth.action';

export interface State {
    isFetching: boolean,
    user: User | undefined,
}

export const initState: State = {
    isFetching: false,
    user: undefined
}

const _authReducer = createReducer(
    initState,
    on(AuthActions.loginStart, state => ({
        ...state,
        isFetching: true,
    })),
    on(AuthActions.loginSuccess, (state, payload) => ({
        ...state,
        isFetching: false,
        user: payload.user
    })),
)

export function authReducer(state: any, action: Action) {
    return _authReducer(state, action);
  }