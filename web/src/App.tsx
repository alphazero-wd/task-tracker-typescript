import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import SignUp from './pages/SignUp';
import { useAppSelector } from './store';
function App() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <ChakraProvider>
      <CSSReset />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/tasks"
            element={user ? <Home /> : <Navigate to="/signup" />}
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
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
