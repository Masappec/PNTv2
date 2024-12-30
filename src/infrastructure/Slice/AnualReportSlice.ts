import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    anualReports: "",
    isLoading: false,
};

const anualReportSlice = createSlice({
    name: 'anualReport',
    initialState,
    reducers: {
        setAnualReports(state, action) {
            state.anualReports = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    },
});

export const { setAnualReports, setIsLoading } = anualReportSlice.actions;
export default anualReportSlice.reducer;