import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import TasksPage from "./pages/TasksPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import { useAppSelector } from "./store";
import Profile from "./pages/Profile";
function App() {
  const { user } = useAppSelector(state => state.user);
  return (
    <ChakraProvider>
      <CSSReset />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/tasks"
            element={user ? <TasksPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/forgot-password"
            element={user ? <Navigate to="/tasks" /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={user ? <Navigate to="/tasks" /> : <ResetPassword />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
