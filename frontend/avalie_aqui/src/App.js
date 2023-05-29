
import Login from './components/logi/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
