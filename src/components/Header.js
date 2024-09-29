function Header() {
  return (
    <>
      <div className="flex justify-between mt-[70px] items-center">
        <div className="flex gap-2 items-center">
          <img src="./rightArr.svg" className="w-8"></img>
          <div className="flex flex-col">
            <p className="font-semibold text-2xl sm:text-3xl">Rules Creation</p>
            <hr className="border-black mt-1 w-48 sm:w-72 md:w-96"></hr>
          </div>
        </div>
        <div>
          <button className="bg-green-500 text-white rounded-md p-3 font-medium">
            Publish Feed
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
