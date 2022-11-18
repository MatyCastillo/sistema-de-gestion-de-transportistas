import Home from "./pages/home";
import SignIn from "./components/signIn";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          {/* <Route path="/inscripciones" element={<Home form="true" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/impresiones" element={<Home table="impresiones"/>} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
