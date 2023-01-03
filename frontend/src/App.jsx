import { Routes, Route } from "react-router-dom";

import Signin from "@pages/Signin";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Books from "@pages/Books";
import PrivateRoute from "@components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
