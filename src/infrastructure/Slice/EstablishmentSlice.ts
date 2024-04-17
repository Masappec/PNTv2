
import { createSlice } from '@reduxjs/toolkit';


const establishmentSlice = createSlice({

    name: 'establishment',
    initialState: {
        establishments: [],
    },
    reducers: {
        setEstablishments(state, action) {
            state.establishments = action.payload;
        },
    },
});

export const { setEstablishments } = establishmentSlice.actions;
export default establishmentSlice.reducer;