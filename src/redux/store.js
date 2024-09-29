import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from './slice'

export const store  = configureStore({
    reducer:{
    tableData : tableDataReducer
    }
})