import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";

function Admin() {
  return (
    <>
      <Sidebar />
      <main className="continer flex absolute top-0 right-0 w-full md:w-[calc(100%-18rem)]">
        <Outlet />
      </main>
    </>
  )
}

export default Admin