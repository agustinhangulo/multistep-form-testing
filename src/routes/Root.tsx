import { Header } from "@/components/ui/Header";
import { Outlet } from "react-router";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
