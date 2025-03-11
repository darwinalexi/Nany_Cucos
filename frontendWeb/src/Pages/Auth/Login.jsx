import { useState } from "react";
import imagen  from"../../img/logo.jpg"
import axiosClient from "../../utils/axiosClient";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function Login(){
  const navigate = useNavigate()
    const [usuarios, setusuarios] = useState({
      identificacion:'',
      clave:''
      });

      const [visible, setvisible]= useState(false);
    
      const visibles=()=>{
         setvisible(!visible)
      }  
      const login=async(e)=>{
        e.preventDefault();
        if (!usuarios.identificacion || !usuarios.clave) {
          Swal.fire({
            title: 'Error!',
            text: 'Llena los campos necesarios',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
         return;
        }
        try{
        const login= await axiosClient.post("/login", usuarios)
       console.log(login)           
        navigate("/content")
        localStorage.setItem('token',login.data.token)
        localStorage.setItem('usuario', JSON.stringify(login.data.usuario))
   
        }catch(e){
          console.log(e);
          if(e){
            Swal.fire({
              title: 'Upsss',
              text: "credenciales incorrectas",
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
            return;
          }
           
           }
      }
      const handinputchange = (event) => {
        const { name, value } = event.target;
      
        setusuarios((prevUsuarios) => ({
          ...prevUsuarios,
          [name]: value
        }));
        
        console.log({ [name]: value });  // Para verificar que los valores se están capturando correctamente
      }
      
    
    

    


    return (
    <>
    <div className="border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63] grid h-[80%] shadow-2xl grid-cols-2 gap- w-[80%] absolute left-[10%] top-[15%] rounded-xl">

        <div className="w-[100%] h-[100%] rounded-xl">
     <img src={imagen}  className="w-[100%] h-[100%] rounded-xl" />
        </div>

          <div className="w-[100%]  h-[100%]">
            <div  className="w-[70%] h-[100%] relative left-[8%]">
              <h1 className="flex justify-center text-4xl mt-5 text-[#dc2e63]">Iniciar Sesión</h1>
            <form onSubmit={login}  className="grid grid-cols-1 ml-[8%]">
            <br />
            
           <br />
           <div>
              <label className="flex justify-center font-medium">Usuario</label>
                <div className="relative top-[39%] left-[87%]  w-5">
                <FontAwesomeIcon icon={faUser} color="#dc2e63" className=" size-7"/>
                </div>
              
              <input
              type="number"
                  name="identificacion"
                  placeholder="Ingresa tu identificacion"
                  onChange={handinputchange}
                  className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                ></input>
           </div>
           
           
          
            <br />
            <label className="flex justify-center font-medium ">Clave</label>
            <br />
            
           <div >
           <button type="button" onClick={visibles} className="relative left-[90%] top-[52%]">
               <FontAwesomeIcon icon={visible ? faEyeSlash: faEye} color="#dc2e63" className="size-7" />
            </button>
           <input
              type={visible ? "text":"password"}
              name="clave"
              className=" focus:outline-none p-3 border-b border-b-[#dc2e63]   w-[100%]   rounded-xl cursor-pointer"
              placeholder="Ingresa tu contraseña"
              onChange={handinputchange}
            ></input>
          <Link to="/recuperar_contraseña" className="text-[#dc2e63]">¿Olvidaste Tu Contraseña?</Link>
           </div>
            <br />
            <input type="submit" value="Ingresar" className="bg-[#dc2e63] rounded-lg text-white  p-2 hover:cursor-pointer"/>
           </form>
            </div>
          
      </div>
      </div>
    </>

    )
} 

export default Login