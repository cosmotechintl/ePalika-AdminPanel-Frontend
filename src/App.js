import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Homepage from "./pages/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SetPassword from "./pages/SetPassword/SetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setPassword/:id" element={<SetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
