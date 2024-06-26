import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import PersonalToDo from "./pages/PersonalToDo";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Groups from "./pages/Groups";
import GroupToDo from "./pages/GroupToDo";
import Calendar from "./pages/Calendar";
import About from "./pages/About";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/personal-todo" element={<PersonalToDo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupToDo />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;