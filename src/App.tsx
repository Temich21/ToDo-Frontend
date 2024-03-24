import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;