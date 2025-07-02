import type { ComponentProps } from "react";
import { Link } from "react-router";

type HeaderLinkProps = ComponentProps<typeof Link>;

const HeaderLink = ({ children, ...props }: HeaderLinkProps) => {
  return (
    <Link
      className="p-1  rounded hover:bg-stone-200 hover:text-red-700 "
      {...props}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  return (
    <div className="mx-2 py-4 border-b-2 border-stone-800">
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/form-builder/purpose">Form Creation</HeaderLink>
      <HeaderLink to="/form-builder/rhf/purpose">Form Creation RHF</HeaderLink>
    </div>
  );
};
