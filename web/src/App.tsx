import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import TasksPage from "./pages/TasksPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import { useAppDispatch, useAppSelector } from "./store";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import { ChangeEvent, useEffect, useState } from "react";
import { queryTasks } from "./reducers/tasks";
import theme from "./theme";
function App() {
  const { user } = useAppSelector(state => state.user);
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const [queries, setQueries] = useState({
    filterBy: "",
    sortBy: "",
    search: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQueries({ ...queries, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(queryTasks(queries));
  }, [queries, dispatch, tasks]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Navbar onChange={onChange} />
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/tasks"
            element={
              user ? <TasksPage onChange={onChange} /> : <Navigate to="/" />
            }
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
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
