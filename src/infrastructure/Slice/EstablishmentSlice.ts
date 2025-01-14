
import { createSlice } from '@reduxjs/toolkit';
import EstablishmentEntity from '../../domain/entities/Establishment';






const establishmentSlice = createSlice({

    name: 'establishment',
    initialState: {
        establishments: [] as EstablishmentEntity[],
        dateGet: "",
    },
    reducers: {
        setEstablishments(state, action) {
            state.establishments = action.payload;
        },
        setDateGet(state, action) {
            state.dateGet = action.payload;

        }
    },
});

export const { setEstablishments, setDateGet } = establishmentSlice.actions;
export default establishmentSlice.reducer;