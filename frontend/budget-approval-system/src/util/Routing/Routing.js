// import Notfound from "pages/NotFound/NotFound";
import Dashboard from "pages/Dashboard/Dashboard";
import Login from "pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </div>
  );
}

export default Routing;
