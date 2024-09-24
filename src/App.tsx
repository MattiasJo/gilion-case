import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChartContainer } from "./Containers/ChartContainer";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChartContainer />
    </QueryClientProvider>
  );
}

export default App;
