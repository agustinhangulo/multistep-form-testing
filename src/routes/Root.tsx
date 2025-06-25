import { Link } from "react-router";

export const Root = () => {
  return (
    <div className="m-4">
      <h1>Vite + React</h1>
      <div className="flex flex-col items-center">
        <Link
          to="/form-builder"
          className="text-5xl text-blue-600 hover:underline w-fit"
        >
          Form Builder
        </Link>
      </div>
    </div>
  );
};
