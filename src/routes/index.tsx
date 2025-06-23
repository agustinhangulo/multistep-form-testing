import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="m-4">
      <h1>Vite + React</h1>
      <div className="flex flex-col">
        <a
          className="text-blue-600 hover:underline w-fit"
          href="https://vite.dev"
          target="_blank"
        >
          Vite
        </a>
        <a
          className="text-blue-600 hover:underline w-fit"
          href="https://react.dev"
          target="_blank"
        >
          React
        </a>
      </div>
    </div>
  );
}
