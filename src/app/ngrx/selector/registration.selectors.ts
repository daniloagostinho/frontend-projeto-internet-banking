import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRegistrationData = createFeatureSelector<any>('registrationData');

export const selectRegistrationDataValues = createSelector(
    selectRegistrationData,
    (state: any) => state
);
