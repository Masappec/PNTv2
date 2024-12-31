import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    anualReports: "",
    isLoading: false,
    task_id: "",
    message: "",
    progress: 0,
    error: "",
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
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        setProgress(state, action) {
            state.progress = action.payload;
        },
    },
});

export const { setAnualReports, setIsLoading, setTaskId,
    setMessage, setProgress
} = anualReportSlice.actions;
export default anualReportSlice.reducer;