import Login from "./Pages/Auth/Login"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainContent from "./Pages/MainContent";
import PrivateRouter from "./Component/router/PrivaterRouter";
import {  Product_diponibles } from "./Pages/Products";
import { Perfil } from "./Pages/Perfil";
import { Order } from "./Pages/order";
import { Sales } from "./Pages/Sales";
import { Product_not_avalible } from "./Pages/product_not_avalible";
import { Client } from "./Pages/Client";
import { User } from "./Pages/User";
import { Recovery } from "./Pages/Auth/Recovery";
import { Recovery_Password } from "./Pages/Auth/Recover_Psword";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/recuperar_contraseña" element={<Recovery/>}/>
        <Route path="/cambiar_contraseña" element={<Recovery_Password/>}/>
        
        
        <Route element={<PrivateRouter/>}>
          <Route path='/content' element={<MainContent/>}/>
          <Route path="/productos_disponibles" element={<Product_diponibles/>}/>
          <Route path="/perfil" element={<Perfil/>}/>      
          <Route path="/productos_no_disponibles" element={<Product_not_avalible/>}/>
          <Route path="/pedidos" element={<Order/>}/>
          <Route path="/ventas" element={<Sales/>}/>
          <Route path="/clientes" element={<Client/>}/>
          <Route path="/usuarios" element={<User/>}/>
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
    
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
