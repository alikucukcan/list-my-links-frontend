import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full bg-tertiary">
      <div className="xl:w-[80%] mx-auto h-full max-w-[1460px]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
