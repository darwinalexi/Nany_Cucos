import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
export const Recovery_Password=()=>{

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

    return(
          <div className="border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]  h-[56%] shadow-2xl w-[57%] absolute left-[22%] top-[25%] rounded-xl"> 
                    <Link to="/recuperar_contraseña"> <FontAwesomeIcon icon={faArrowLeft} className="size-6 m-6" /></Link>
                    <h1 className="flex justify-center p-4">Cambiar De Contraseña</h1>
                    <form className="w-[50%] relative left-[27%] top-[10%]">
                        <label>Ingrese Codigo De Veriicacion</label>
                        <input 
                          type="number"
                          onChange={handinputchange} 
                          placeholder="Ingrese el Codigo"
                          name="codigo"
                          className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                        />
                       <br/>
                       <label>Ingrese la nueva contraseña</label>
                        <input 
                          type="text"
                          onChange={handinputchange} 
                          placeholder="Ingrese la contraseña"
                          name="codigo"
                          className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                        />
                       <input
                       type="submit"
                       required
                       className="bg-[#dc2e63] w-[100%] mt-4 rounded-lg text-white  p-2 hover:cursor-pointer"
                       />
                    </form>
                </div>
    )
}