import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [
    {
      id: "1",
      filters: [
        "image_list.Product Image 2",
        "is empty",
        "AND Discount Percentage",
        "is",
        "0",
      ],
      variants: [
        { img: "./img4.jpeg", desc: "img4" },
        { img: "./img5.jpeg", desc: "img5" },
      ],
    },
    {
      id: "2",
      filters: ["tags", "contains", "onsale"],
      variants: [
        { img: "./img6.jpeg", desc: "img6" },
        { img: "./img7.jpeg", desc: "img7" },
      ],
    },
    {
      id: "3",
      filters: ["tags", "contains", "__label:New"],
      variants: [
        { img: "./img8.jpeg", desc: "img8" },
        { img: "./img9.jpeg", desc: "img9" },
      ],
    },
    {
      id: "4",
      filters: ["Discount Percentage", "is", "0"],
      variants: [
        { img: "./img10.jpeg", desc: "img10" },
        { img: "./img12.jpeg", desc: "img12" },
      ],
    },
    {
      id: "5",
      filters: ["image_list.Product Image 2", "is", "empty"],
      variants: [
        { img: "./img11.jpeg", desc: "img11" },
        { img: "./img13.jpeg", desc: "this is a long desc for testing" },
      ],
    },
  ],
  variantCount: 2,
  variantName: ["Primary Variant", "Variant 2"],
  msg:''
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
      state.msg = 'State Added';
    },
    deleteRow: (state, action) => {
      const deleteId = action.payload;
      state.data = state.data.filter((row) => row.id !== deleteId);
      state.msg = 'State Removed!'
    },
    addColumn: (state) => {
      state.variantCount += 1;
      state.data.forEach((row) => {
        row.variants.push({ img: "", desc: "" });
      });
      state.variantName.push(`Variant ${state.variantCount}`);
      state.msg = 'Variant Added';
    },
    deleteColumn: (state, action) => {
      const columnIndex= action.payload;
      if (columnIndex >= 0 && columnIndex < state.variantCount) {
        state.variantCount -= 1;
        state.data.forEach((row) => {
          if (row.variants) {
            row.variants.splice(columnIndex, 1);
          }
        });
        state.variantName.splice(columnIndex, 1);
        state.variantName = state.variantName.map((name, index) =>
          index === 0 ? "Primary Variant" : `Variant ${index + 1}`
        );
        state.msg = 'Variant Removed!'
      }
    },
    reorderRows: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [reorderedItem] = state.data.splice(sourceIndex, 1);
      state.data.splice(destinationIndex, 0, reorderedItem);
    },
    addImageToCell: (state, action) => {
        const { rowId, variantIndex, imagePath, name, isEdit } = action.payload;
        console.log( rowId, variantIndex, imagePath);
        const rowToUpdate = state.data.find(row => row.id === rowId);
        if (rowToUpdate && rowToUpdate.variants[variantIndex]) {
          rowToUpdate.variants[variantIndex].img = imagePath;
          rowToUpdate.variants[variantIndex].desc = name;
        }
        if(isEdit) state.msg = 'Design Edited';
        else state.msg = 'Design Added'
      },
  },
});

export const { addRow, deleteRow, addColumn, deleteColumn, reorderRows, addImageToCell } =
  tableDataSlice.actions;
export default tableDataSlice.reducer;
