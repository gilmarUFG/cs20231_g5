
import Login from './components/logi/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import CadProd from './components/Produtos/Cadastro/cadastraProduto';
import Album from './components/Produtos/listaProduto';
import Navbar from './components/NavBar/appBar';

function App() {
  return (
    <BrowserRouter>
    
     <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cadprod" element={<CadProd />} />
        <Route path="/home" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
