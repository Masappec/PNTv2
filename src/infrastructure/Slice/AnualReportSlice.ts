import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    anualReports: "",
    isLoading: false,
    task_id: ""
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
        },
        setTaskId(state, action) {
            state.task_id = action.payload;
        }
    },
});

export const { setAnualReports, setIsLoading, setTaskId } = anualReportSlice.actions;
export default anualReportSlice.reducer;