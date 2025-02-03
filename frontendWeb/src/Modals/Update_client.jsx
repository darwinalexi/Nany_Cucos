import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axiosClient from "../utils/axiosClient"
import Swal from "sweetalert2"

export const Update_Client=({onclose, data})=>{
    
    
    const [information, setinformation]= useState({
        nombre : data.nombre || '',
        numero_celular : data.numero_celular|| '',
        correo : data.correo || '',
    })
    

    const update_client=async(e)=>{
        e.preventDefault();
        try{
            const data_client= await axiosClient.put(`/cliente/${data.identificacion}`, information)
            Swal.fire({
                title: 'Proceso Terminado',
                text:data_client.data.mensaje,
              })
              if(data_client.status==200){
                Swal.fire({
                    title:'Proceso Exitoso',
                    text:data_client.data.mensaje,
                    icon:'success',
                })
                window.location.reload();
              }
        }catch(e){
          console.log("error",e)
        }
    }

    const handleinput=(event)=>{
        const {name, value}=event.target;

        setinformation((prevData) => ({
            ...prevData,
            [name]: value
            }));

            console.log({ [name]: value });

     }

    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll grid  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center"> 
                <div className="grid grid-cols-2 w-100">
                    <div className="w-[89%] relative left-[53%] top-4">
                        <h1 className="flex  justify-center"><strong>Actualizar Cliente</strong></h1>
                    </div>
                    <div onClick={onclose} className="flex justify-end relative right-[12%] top-4">
                        <FontAwesomeIcon icon={faClose} className="size-5"/>
                    </div>   
                </div>

                <div className="relative left-[16%] w-[67%] "> 
                            <form onSubmit={update_client}>
                                <label>Ingrese el Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre"
                                    value={information.nombre}
                                    required
                                    onChange={handleinput}
                                    placeholder="Ingrese el nombre del Producto"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />
                                <label>Ingrese el Correo electronico</label>
                                <input 
                                    type="email" 
                                    name="correo"
                                    value={information.correo}
                                    onChange={handleinput}
                                    placeholder="Ingrese El Correo Electronico"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                   <label>Ingrese El Número De Celular</label>
                                
                                <input 
                                    type="number" 
                                    name="numero_celular"
                                    value={information.numero_celular}
                                    required
                                    onChange={handleinput}
                                    placeholder="Ingrese el No° De  Celular"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />
                                <input 
                            type="submit" 
                            className="placeholder:justify-center p-3 mt-4 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                            value="Actualizar Cliente"
                                    />
                            </form>
                        </div>
            </div>
        </div>
    )
}