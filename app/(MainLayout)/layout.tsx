import Navbar from "@/shared/navbar/Navbar";
import Footer from "@/shared/footer/Footer";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
