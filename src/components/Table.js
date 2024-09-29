'use client';

import { addColumn, addRow, deleteRow } from "@/redux/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Table(){

const [hoveredRow, setHoveredRow] = useState(null);

const tableData = useSelector((s)=>s.tableData.data);
const variantNames = useSelector((state)=>state.tableData.variantName);
const dispatch = useDispatch();

const handleAddRow = ()=>{
dispatch(addRow());
}
const handleDeleteRow=(id)=>{
dispatch(deleteRow(id));
}

const handleAddColumn=()=>{
dispatch(addColumn());
}
return(
<>
<div className="bg-gray-50 p-8 rounded-md border-gray-200 border-[1px]">
<div className="overflow-scroll relative">
<table className="">
<thead>
<tr className="text-gray-500">
<th className="sticky left-0 z-10 bg-gray-50 w-[70px] min-w-[70px] border-r border-gray-200"></th>
<th className="sticky left-[70px] z-10 w-[500px] bg-gray-50 min-w-[500px] border-r border-gray-200">Product Filter</th>
{variantNames.map((v, index) => (
  <th key={index} className="w-[200px] border-r border-gray-200">
    <div className="flex justify-between items-center px-4 m-0">
      <p>{v}</p>
      <img src='./option.svg' alt="options" className=""/>
    </div>
  </th>
))}
</tr>
</thead>
<tbody>
{tableData.map((s, ind)=>(
<tr 
key={ind} 
className="text-center"
onMouseEnter={() => setHoveredRow(s.id)}
onMouseLeave={() => setHoveredRow(null)}>
<td className="sticky left-0 z-10 bg-gray-50 border-r border-gray-200 text-3xl font-bold">
<div className="flex flex-col items-center">
<img 
  src='./trash.svg' 
  alt="Delete"
  className={`${hoveredRow === s.id ? 'visible' : 'invisible'} cursor-pointer`}
  onClick={()=>handleDeleteRow(s.id)}
></img>
<div className="flex m-0 items-center justify-center">
<p>{ind+1}</p>
<img src='./drag.svg' className=""></img>
</div></div></td>
<td className="sticky z-10 bg-gray-50 left-[70px] p-6 border-r border-gray-200"><div className="bg-white border-dashed border-gray-200 border-[1px] px-6 py-4 h-48 rounded-md  flex items-center justify-center text-sm">
<div className="flex flex-wrap gap-2">
{s.filters.length?(s.filters.map((f, i)=>(<span className={i % 2 === 0? "border-[1px] border-gray-200 rounded-md py-[2px] px-3": "border-[1px] border-green-500 font-bold text-green-500 bg-green-100 rounded-md py-[2px] px-3"}>{f}</span>))):<span className="border-[1px] border-gray-200 p-1 rounded-md px-3">+ Add Product Filters</span>}
</div>
</div></td>
{s.variants.map((v, index) => (
                  <td key={index} className="p-6 border-r border-gray-200 w-[200px]">
                    <div className="w-[200px] bg-white border-dashed border-gray-200 border-[1px] px-2 py-4 h-48 rounded-md flex flex-wrap items-center gap-2 justify-center text-sm">
                      {v.img ? (
                        <div className="flex flex-col justify-center items-center gap-2">
                          <img src={v.img} className="max-w-[100px] h-[130px] w-auto object-contain" alt={`Variant ${index + 1}`} />
                          <p>{v.desc}</p>
                        </div>
                      ) : (
                        <span className="border-[1px] border-gray-200 p-1 rounded-md px-3">+ Add Design</span>
                      )}
                    </div>
                  </td>
))}
<td className="p-6 text-3xl"><div className="flex m-0 items-center justify-center cursor-pointer"><span className="bg-white p-1 px-3 rounded-md border-[1px] border-gray-200" onClick={()=>handleAddColumn()}>+</span></div></td>
</tr>
))}
<tr>
<td className="border-r border-gray-200 text-3xl"><div className="cursor-pointer flex m-0 items-center justify-center" onClick={handleAddRow}><span className="bg-white p-1 px-3 rounded-md border-[1px] border-gray-200">+</span></div></td>
</tr>
</tbody>
</table>
</div>
</div>
</>
)
}
export default Table;

