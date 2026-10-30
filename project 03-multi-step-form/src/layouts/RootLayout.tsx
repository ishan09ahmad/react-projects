import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="min-h-screen w-full bg-[#EEF5FF] bg-[url(/src/assets/bg-sidebar-mobile.svg)] bg-no-repeat bg-contain bg-top sm:bg-none px-4 py-8">
      <Navbar />

      <main className="w-full max-w-225 min-h-150 mx-auto bg-white p-4 rounded-2xl mt-6 flex gap-8 shadow-sm">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}