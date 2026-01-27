import Navbar from "@/shared/navbar/Navbar";
import Footer from "@/shared/footer/Footer";
import React from "react";
import { getCurrentUser } from "@/services/auth";

export const dynamic = "force-dynamic";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {

  const user = await getCurrentUser();

  return (
    <div>
      <Navbar initialUser={user} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;

