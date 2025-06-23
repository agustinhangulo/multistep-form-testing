import { AppProvider } from "./Provider";
import { AppRouter } from "./Router";

// TODO: Add router here later

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
