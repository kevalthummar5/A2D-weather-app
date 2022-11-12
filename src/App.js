import "./App.css";
import Main from "./Main/Main";
import UserContextProvider from "./Store/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </div>
  );
}

export default App;
