import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-tertiary">
      <div className="xl:w-[80%] mx-auto h-full">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
