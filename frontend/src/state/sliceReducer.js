import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    allData: null,
    searchData: null,
    DashBoardData: { listData: null, visualData: null },


}

export const anlyticsSlice = createSlice({
    name: "Analytics",
    initialState,
    reducers: {
        setmode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setallData: (state, action) => {
            const { allData } = action.payload
            state.allData = allData
        },
        setsearchData: (state, action) => {
            const {searchData} = action.payload
            state.searchData = searchData
        },
        setDashBoardData: (state, action) => {
            const { listData, visualData } = action.payload;

            state.DashBoardData.listData = listData
            state.DashBoardData.visualData = visualData
        }
    }
})

export const { setmode,
    setallData, setsearchData, setDashBoardData } = anlyticsSlice.actions

export default anlyticsSlice.reducer