import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
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
            path="/"
            element={user ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
