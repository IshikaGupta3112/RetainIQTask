import Header from "@/components/Header";
import NavBar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";
import Table from "@/components/Table";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="hidden sm:block"><SideBar></SideBar></div>
      <div className="sm:ml-[80px] px-4 sm:px-8 py-6 flex flex-col gap-6">
        <Header></Header>
        <Table></Table>
      </div>
    </>
  );
}
