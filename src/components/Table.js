function Table(){
const tableData = [
{
id:1,
filters:[
'image_list.Product Image 2',
'is empty' ,
'AND Discount Percentage',
'is',
'0'   
],
primaryVariantImg:'./img1.jpeg',
primaryVariantDesc:'product...Singleewkjnfjrwnjjj',
variant1Img:'./retainiq_logo.jpeg',
variant1Desc:'product...Singleewkjnfjrwnjjj',
},
{
id:2,
filters:[
'tags',
'contains' ,
'onsale'
],
primaryVariantImg:'./img1.jpeg',
primaryVariantDesc:'product...Singleewkjnfjrwnjjj',
variant1Img:'./img3.jpeg',
variant1Desc:'product...Singleewkjnfjrwnjjj',
},
{
id:3, 
filters:[
'tags',
'contains' ,
'__label:New'   
],
primaryVariantImg:'./img2.jpeg',
primaryVariantDesc:'product...Singleewkjnfjrwnjjj',
variant1Img:'./retainiq_logo.jpeg',
variant1Desc:'product...Singleewkjnfjrwnjjj',
},
{
id:4,
filters:[
'Discount Percentage',
'is' ,
'0'   
],
primaryVariantImg:'./img1.jpeg',
primaryVariantDesc:'product...Singleewkjnfjrwnjjj',
variant1Img:'./img2.jpeg',
variant1Desc:'product...Singleewkjnfjrwnjjj',
},
{
id:5,
filters:[
'image_list.Product Image 2',
'is' ,
'empty', 
],
primaryVariantImg:'./img3.jpeg',
primaryVariantDesc:'product...Singleewkjnfjrwnjjj',
variant1Img:'./img2.jpeg',
variant1Desc:'product...Singleewkjnfjrwnjjj',
}
];
return(
<>
<div className="bg-gray-50 p-8 rounded-md border-gray-200 border-[1px]">
<table className="">
<thead>
<tr className="text-gray-500">
<th className="w-[70px] border-r border-gray-200"></th>
<th className="w-[500px] border-r border-gray-200">Product Filter</th>
<th className="w-[200px] border-r border-gray-200"><div className="flex justify-between items-center px-4 m-0">
<p>Primary Variant</p>
<img src='./option.svg' className=""></img>
</div></th>
<th className="w-[200px] border-r border-gray-200"><div className="flex justify-between items-center px-4 m-0">
<p>Variant 2</p>
<img src='./option.svg' className=""></img>
</div></th>
</tr>
</thead>
<tbody>
{tableData.map((s)=>(
<tr className="text-center">
<td className="border-r border-gray-200 text-3xl font-bold"><div className="flex m-0 items-center justify-center">
<p>{s.id}</p>
<img src='./drag.svg' className=""></img>
</div></td>
<td className="p-6 border-r border-gray-200"><div className="bg-white border-dashed border-gray-200 border-[1px] px-6 py-4 h-48 rounded-md  flex items-center justify-center text-sm">
<div className="flex flex-wrap gap-2">
{s.filters.map((f, i)=>(<span className={i % 2 === 0? "border-[1px] border-gray-200 rounded-md py-[2px] px-3": "border-[1px] border-green-500 font-bold text-green-500 bg-green-100 rounded-md py-[2px] px-3"}>{f}</span>))}
</div>
</div></td>
<td className="p-6 border-r border-gray-200">
<div className="bg-white border-dashed border-gray-200 border-[1px] px-2 py-4 h-48 rounded-md  flex flex-wrap items-center gap-2 justify-center text-sm">
<div className="flex flex-col justify-center items-center gap-2">
<img src={s.primaryVariantImg} className="max-w-[100px] h-[130px] w-auto object-contain"></img>
<p>{s.primaryVariantDesc}</p>
</div>
</div>
</td>
<td className="p-6 border-r border-gray-200">
<div className="bg-white border-dashed border-gray-200 border-[1px] px-2 py-4 h-48 rounded-md  flex flex-wrap items-center gap-2 justify-center text-sm">
<div className="flex flex-col justify-center items-center gap-2">
<img src={s.variant1Img} className="max-w-[100px] h-[130px] w-auto object-contain"></img>
<p>{s.variant1Desc}</p>
</div>
</div>
</td>
<td className="p-6 text-3xl"><div className="flex m-0 items-center justify-center"><span className="bg-white p-1 px-3 rounded-md border-[1px] border-gray-200">+</span></div></td>
</tr>
))}
<tr>
<td className="border-r border-gray-200 text-3xl "><div className="flex m-0 items-center justify-center"><span className="bg-white p-1 px-3 rounded-md border-[1px] border-gray-200">+</span></div></td>
</tr>
</tbody>
</table>
</div>
</>
)
}
export default Table;

