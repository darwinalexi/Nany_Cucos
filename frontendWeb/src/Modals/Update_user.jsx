import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from "react"
import axiosClient from "../utils/axiosClient"
import Swal from "sweetalert2"

export const Update_user=({onclose, data})=>{

    
    const [visible, setvisible]= useState(false);
    const [information, setinformation]= useState({
        nombre : data.nombre || '',
        correo :  data.correo || '',
        celular : data.celular || '',
        imagen: data.imagen || null,
        descripcion: data.descripcion || '', 
    })

    const visibles=()=>{
        setvisible(!visible)
     }  

     const NombreRef= useRef(null);
     const correoRef= useRef(null);
     const celularRef= useRef(null);
    
     const imagenRef= useRef(null);
     const descripcionRef= useRef(null);

     const update_users=async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nombre", NombreRef.current.value);
            formData.append("correo", correoRef.current.value);
            formData.append("celular", celularRef.current.value);
            formData.append("imagen", imagenRef.current.value);
            formData.append("decripcion", descripcionRef.current.value);

            
            if (imagenRef.current.files[0]) {
                formData.append("imagen", imagenRef.current.files[0]);
            }

            const datalocal = JSON.parse(localStorage.getItem('usuario') || '[]');
            const identificacion = datalocal ? datalocal.identificacion : '';

            const update = await axiosClient.put(`/actualizar/${data.identificacion}`, formData)

            Swal.fire({
                title: 'Proceso Terminado',
                text:update.data.mensaje,
              })
              if(update.status==200){
                Swal.fire({
                    title:'Proceso Exitoso',
                    text:update.data.mensaje,
                    icon:'success',
                })
                window.location.reload();
              }

        } catch (error) {
            console.log("error", error)
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

     const handleFileChange = (e) => {
        // Para gestionar el cambio de archivo de imagen
        const file = e.target.files[0];
        setinformation((prevData) => ({
            ...prevData,
            imagen: file
        }));
    }


    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll grid  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center"> 
            
                    <div onClick={onclose} className="flex justify-end relative right-[12%] top-4">
                        <FontAwesomeIcon icon={faClose} className="size-5"/>
                    </div>   
                    <form onSubmit={update_users} className="w-[80%] ml-[10%] grid grid-cols-1">

                        <h1 className="flex justify-center"><strong>Actualizar  Usuario</strong></h1>
                    <label className="flex justify-center">Ingrese el Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre"      
                                    required
                                    ref={NombreRef}
                                    value={information.nombre}
                                    onChange={handleinput}
                                    placeholder="Ingrese el Nombre"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />
                                <label  className="flex justify-center">Ingrese el Correo</label>
                                <input 
                                    type="email" 
                                    name="correo"      
                                    required
                                    ref={correoRef}
                                    value={information.correo}
                                    onChange={handleinput}
                                    placeholder="Ingrese el Correo"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />
                                <label className="flex justify-center">Ingrese el Celular</label>
                                <input 
                                    type="number" 
                                    name="celular"      
                                    required
                                    ref={celularRef}
                                    value={information.celular}
                                    onChange={handleinput}
                                    placeholder="Ingrese el Correo"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />
                                <label className="flex justify-center">Ingrese la Descripcion</label>
                                 <input 
                                    type="text" 
                                    name="descripcion"      
                                    required
                                    ref={descripcionRef}
                                    value={information.descripcion}
                                    onChange={handleinput}
                                    placeholder="Ingrese La Descripcion"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                />
                                <br />

                                <label className="flex justify-center">Seleccione una Img</label>
                                <input
                                    type="file"
                                    ref={imagenRef}
                                    onChange={handleFileChange}
                                    className="placeholder:justify-center p-3 focus:outline-none border-b border-b-[#dc2e63] w-[100%] rounded-xl cursor-pointer"
                                />
                                
                                <br />
                                <input 
                            type="submit" 
                            className="placeholder:justify-center p-3 mt-4 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                            value="Actualizar Usuario"
                                    />
                               

                    </form>
                </div>
     </div>
    )
}