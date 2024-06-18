import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    allData: null,
    searchData: null,
    DashBoardData: null,

}

export const anlyticsSlice = createSlice({
    name: "Analytics",
    initialState,
    reducers: {
        allData: (state, action) => {
            const { payload1, payload2 } = action.payload;
            const todo = {
                id: nanoid(),
                header: payload1,
                discription: payload2
            }
            state.data.push(todo)
        },
        searchData: () => {

        },
        DashBoardData: () => {

        }
    }
})

export const { allData, searchData, DashBoardData } = anlyticsSlice.actions

export default anlyticsSlice.reducer