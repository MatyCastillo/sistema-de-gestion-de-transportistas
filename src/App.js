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
          <Route path="/impresiones-general" element={<Home table="impresiones" key_comp="impresiones_generales"/>} />
          <Route path="/impresiones-provincial" element={<Home table="impresiones" print="impresion_provincial" key_comp="impresion_provincial" />} />
          <Route
            path="/reportes-patentes"
            element={<Home table="patentes" />}
          />
          <Route
            path="/reportes-logistica"
            element={<Home type="logistic" />}
          />
          <Route
            path="/padron-provincial"
            element={<Home type="provincial" />}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
