function Header() {
  return (
    <>
      <div className="flex justify-between mt-[70px] items-center">
        <div className="flex gap-2 items-start">
          <img src="./rightArr.svg" className="mt-[2px] w-6 md:w-8"></img>
          <div className="flex flex-col">
            <p className="font-semibold text-xl md:text-3xl">Rules Creation</p>
            <hr className="border-black -mt-3 md:-mt-2 w-48 md:w-72"></hr>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-green-500 text-white rounded-md p-1 px-2 md:p-2 font-medium text-sm md:text-base">
            Publish Feed
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
