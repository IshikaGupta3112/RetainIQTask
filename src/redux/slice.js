import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [
    {
      id: 1,
      filters: [
        "image_list.Product Image 2",
        "is empty",
        "AND Discount Percentage",
        "is",
        "0",
      ],
      variants: [
        { img: "./img1.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
        { img: "./retainiq_logo.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
      ],
    },
    {
      id: 2,
      filters: ["tags", "contains", "onsale"],
      variants: [
        { img: "./img2.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
        { img: "./img3.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
      ],
    },
    {
      id: 3,
      filters: ["tags", "contains", "__label:New"],
      variants: [
        { img: "./retainiq_logo.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
        { img: "./img2.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
      ],
    },
    {
      id: 4,
      filters: ["Discount Percentage", "is", "0"],
      variants: [
        { img: "./img1.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
        { img: "./img2.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
      ],
    },
    {
      id: 5,
      filters: ["image_list.Product Image 2", "is", "empty"],
      variants: [
        { img: "./img1.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
        { img: "./img3.jpeg", desc: "product...Singleewkjnfjrwnjjj" },
      ],
    },
  ],
  variantCount: 2,
  variantName: ["Primary Variant", "Variant 2"],
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addRow: (state) => {
      const newId = uuidv4();
      const newVariants = Array(state.variantCount)
        .fill()
        .map(() => ({ img: "", desc: "" }));
      state.data.push({
        id: newId,
        filters: [],
        variants: newVariants,
      });
    },
    deleteRow: (state, action) => {
      const deleteId = action.payload;
      state.data = state.data.filter((row) => row.id != deleteId);
    },
    addColumn: (state) => {
      state.variantCount += 1;
      state.data.forEach((row) => {
        row.variants.push({ img: "", desc: "" });
      });
      state.variantName.push(`Variant ${state.variantCount}`);
    },
    deleteColumn: (state, action) => {
      const columnIndex = action.payload;
      if (columnIndex >= 0 && columnIndex < state.variantCount && state.data) {
        state.variantCount -= 1;
        state.data.forEach((row) => {
          if (row && row.variants) {
            row.variants.splice(columnIndex, 1);
          }
        });
        state.variantName.splice(columnIndex, 1);
        for (let i = columnIndex; i < state.variantName.length; i++) {
          if (i === 0) {
            state.variantName[i] = "Primary Variant";
          } else {
            state.variantName[i] = `Variant ${i + 1}`;
          }
        }
      }
    },
  },
});

export const { addRow, deleteRow, addColumn, deleteColumn } =
  tableDataSlice.actions;
export default tableDataSlice.reducer;
