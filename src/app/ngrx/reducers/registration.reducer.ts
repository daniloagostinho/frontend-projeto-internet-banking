import { createReducer, on } from '@ngrx/store';
import { storeRegistrationData } from '../actions/registration.actions';

export const initialState: any = {};

export const registrationReducer = createReducer(
    initialState,
    on(storeRegistrationData, (state, { registrationData }) => ({ ...state, registrationData }))
);