import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

const initialState={
    data: [
        {
        id:1,
        filters:[
        'image_list.Product Image 2',
        'is empty' ,
        'AND Discount Percentage',
        'is',
        '0'   
        ],
        variants: [
            { img: './img1.jpeg', desc: 'product...Singleewkjnfjrwnjjj' },
            { img: './retainiq_logo.jpeg', desc: 'product...Singleewkjnfjrwnjjj' }
          ]
        },
        {
        id:2,
        filters:[
        'tags',
        'contains' ,
        'onsale'
        ],
        variants: [
            { img: './img2.jpeg', desc: 'product...Singleewkjnfjrwnjjj' },
            { img: './img3.jpeg', desc: 'product...Singleewkjnfjrwnjjj' }
          ]
        },
        {
        id:3, 
        filters:[
        'tags',
        'contains' ,
        '__label:New'   
        ],
        variants: [
            { img: './retainiq_logo.jpeg', desc: 'product...Singleewkjnfjrwnjjj' },
            { img: './img2.jpeg', desc: 'product...Singleewkjnfjrwnjjj' }
          ]
        },
        {
        id:4,
        filters:[
        'Discount Percentage',
        'is' ,
        '0'   
        ],
        variants: [
            { img: './img1.jpeg', desc: 'product...Singleewkjnfjrwnjjj' },
            { img: './img2.jpeg', desc: 'product...Singleewkjnfjrwnjjj' }
          ]
        },
        {
        id:5,
        filters:[
        'image_list.Product Image 2',
        'is' ,
        'empty', 
        ],
        variants: [
            { img: './img1.jpeg', desc: 'product...Singleewkjnfjrwnjjj' },
            { img: './img3.jpeg', desc: 'product...Singleewkjnfjrwnjjj' }
          ]
        }
    ]
};

export const tableDataSlice = createSlice({
    name:'tableData',
    initialState,
    reducers:{
        addRow:(state)=>{
        const newId = uuidv4();
        const newVariants = Array(state.columnCount).fill().map(() => ({ img: '', desc: '' }));
        state.data.push({
        id:newId,
        filters:[],
        variants:newVariants
        })
        },
        deleteRow:(state, action)=>{
        const deleteId = action.payload;
        state.data = state.data.filter(row=>row.id!=deleteId);
        }
    }
})

export const {addRow, deleteRow} = tableDataSlice.actions
export default tableDataSlice.reducer;