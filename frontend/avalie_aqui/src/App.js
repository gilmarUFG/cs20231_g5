
import Login from './components/logi/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import CadProd from './components/Produtos/Cadastro/cadastraProduto';
import Album from './components/Produtos/listaProduto';
import Navbar from './components/NavBar/appBar';
import EditUser from './components/editUser/editUser';
import CriaAdmin from './components/signup/CriaAdmin';

function App() {
  return (
    <BrowserRouter>
    
     <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cadprod" element={<CadProd />} />
        <Route path="/editUser" element={<EditUser/>} />
        <Route path="/criAdmin" element={<CriaAdmin/>} />
        <Route path="/home" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
