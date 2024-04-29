
import { createSlice } from '@reduxjs/toolkit';
import EstablishmentEntity from '../../domain/entities/Establishment';





const establishmentSlice = createSlice({

    name: 'establishment',
    initialState: {
        establishments: [] as EstablishmentEntity[]
    },
    reducers: {
        setEstablishments(state, action) {
            state.establishments = action.payload;
        },
    },
});

export const { setEstablishments } = establishmentSlice.actions;
export default establishmentSlice.reducer;