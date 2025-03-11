import axiosClient from "../../utils/axiosClient";
import Swal from 'sweetalert2'
import {Link} from "react-router-dom"
import { useState } from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export const Recovery=()=>{

const [data, setdata]= useState({
    identificacion:''
})


const handinputchange = (event) => {
    const { name, value } = event.target;
  
    setdata((prevuser) => ({
      ...prevuser,
      [name]: value
    }));
    
    console.log({ [name]: value });
  }

const senduser= async(e)=>{
    e.preventDefault();
    try{
        const send = await axiosClient.post("/recuperar", data);
        const mensaje = send.data.mensaje || "El usuario no existe";

       if (send.status===200) {
        Swal.fire({
                    text: mensaje,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  })
                  
       }else{
        Swal.fire({
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'Cerrar'
          })
       }

    }catch(e){
        console.log(e)
    }
}

    return(
        <>
        <div className="border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]  h-[46%] shadow-2xl w-[57%] absolute left-[22%] top-[25%] rounded-xl"> 
            <Link to="/"> <FontAwesomeIcon icon={faArrowLeft} className="size-6 m-3" /></Link>
            <h1 className="flex justify-center p-4">Recuperación De Contraseña</h1>
            <form className="w-[50%] relative left-[27%] top-[10%]" onSubmit={senduser}>
                <label>Ingrese Su Usuario</label>
                <input 
                  type="number"
                  onChange={handinputchange} 
                  placeholder="Ingrese Su Usuario"
                  name="identificacion"
                  className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                />
               <br/>
               <input
               type="submit"
               required
               className="bg-[#dc2e63] w-[100%] mt-4 rounded-lg text-white  p-2 hover:cursor-pointer"
               />
            </form>
        </div>
        </>
    )
}