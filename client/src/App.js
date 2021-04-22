import "./App.css";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Upload } from "./components/Upload";

const queryClient = new QueryClient();

const AppContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const AppHeader = styled.header`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppHeader>
          <h1>The Programmers 10kb fun run</h1>
        </AppHeader>
        <Upload />
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
