function SideBar(){
return(
<>
<div className="bg-black flex flex-col justify-between items-center w-[80px] h-[100vh] py-8 pt-24 fixed">
<div className="text-white flex flex-col gap-8">
<img src="./retainiq_logo.jpeg" className="w-8 rounded-md"/>
<img src="./picture.svg" className="w-8"></img>
<img src="./meta.svg" className="w-8"></img>
<img src="./shopping.svg" className="w-8"></img>
</div>
<div>
<img src="./settings.svg" className="w-8"></img>
</div>
</div>
</>
);
}

export default SideBar;