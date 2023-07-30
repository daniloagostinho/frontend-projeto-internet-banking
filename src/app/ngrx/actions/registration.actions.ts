import { createAction, props } from '@ngrx/store';
import { Register } from 'src/app/interfaces/register.interface';

export const storeRegistrationData = createAction(
    '[Registration] Store Data',
    props<{ registrationData: Register }>()
);
