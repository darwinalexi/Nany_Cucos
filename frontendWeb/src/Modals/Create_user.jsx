import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from "react"
import axiosClient from "../utils/axiosClient"
import Swal from "sweetalert2"

export const Create_user=({onclose})=>{

    const [visible, setvisible]= useState(false);

const [information, setinformation]= useState({
    identificacion:'',
    nombre :'',
    correo : '',
    celular : '',
    clave:'',
    imagen: ''  ,
    descripcion:'',
})

const NombreRef= useRef(null);
const correoRef= useRef(null);
const celularRef= useRef(null);
const claveRef= useRef(null);
const imagenRef= useRef(null);
const identificacionRef= useRef(null);
const tipoRef=  useRef(null);
const descripcionRef= useRef(null);

const visibles=()=>{
    setvisible(!visible)
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

const  create_users=async(e)=>{
    e.preventDefault();

    if(information.identificacion.length< 6 || information.identificacion.length > 13 ){
        Swal.fire({
            title:'Advertencia',
            text:"No Pose la Longitud Adecuada, No parece ser una identificacion, debe ser mayor a 6 digitos y menor de13",
            icon:'warning',
        })
        return;
    }

if(information.celular.startsWith('-')){
            Swal.fire({
                title:'Advertencia',
                text:"no se puede registrar valores negativos",
                icon:'warning',
            })
            return;
        }

        if(information.celular.length>10 || information.celular.length < 10 ){
            Swal.fire({
                title:'Advertencia',
                text:"No Pose la Longitud Adecuada, Asegurese de que Contenga 10 Digitos El Numero de Celular",
                icon:'warning',
            })
            return;
        }

        
    try {
        const formData = new FormData();
        formData.append("identificacion", identificacionRef.current.value);
        formData.append("nombre", NombreRef.current.value);
        formData.append("correo", correoRef.current.value);
        formData.append("celular", celularRef.current.value);
        formData.append("clave", claveRef.current.value);
        formData.append("imagen", imagenRef.current.value);
        formData.append("tipo", tipoRef.current.value);
        formData.append("descripcion", descripcionRef.current.value);

        
        if (imagenRef.current.files[0]) {
            formData.append("imagen", imagenRef.current.files[0]);
        }

        const create = await axiosClient.post(`/crear`, formData)
        Swal.fire({
            title: 'Proceso Terminado',
            text: create.data.mensaje,
          })
          if(create.status==200){
            Swal.fire({
                title:'Proceso Exitoso',
                text:create.data.mensaje,
                icon:'success',
            })
            window.location.reload();
          }
    
    }catch(e){
        console.log(e)
    }
}

    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
        <div className="bg-white w-[56%]  overflow-scroll grid  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center"> 
        
                <div onClick={onclose} className="flex justify-end relative left-[32%] top-4">
                    <FontAwesomeIcon icon={faClose} className="size-5"/>
                </div>   
                <form onSubmit={create_users} className="w-[110%]  grid grid-cols-1">

                    <h1 className="flex justify-center"><strong>Crear  Usuario</strong></h1>

                    <label className="flex justify-center">Ingrese El No° De Identificacion</label>
                            <input 
                                type="text" 
                                name="identificacion"      
                                required
                                ref={identificacionRef}
                                onChange={handleinput}
                                placeholder="Ingrese  Identificacion"
                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                            />
                <label className="flex justify-center">Ingrese El Nombre</label>
                            <input 
                                type="text" 
                                name="nombre"      
                                required
                                ref={NombreRef}
                                
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
                                onChange={handleinput}
                                placeholder="Ingrese el Correo"
                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                            />
                            <br />
                            <label className="flex justify-center">Ingrese Descripcion</label>
                            <input 
                                type="text" 
                                name="descripcion"      
                                required
                                ref={descripcionRef}
                                onChange={handleinput}
                                placeholder="Ingrese una descripcion breve"
                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                            />
                            <br />
                            <label className="flex justify-center">Seleccione El tipo De Usuario</label>
                            <select 
                            ref={tipoRef } 
                            required 
                            onChange={handleinput}
                            className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       >
                            <option value="hidden" >Seleccione Una Opcion</option>  
                                <option value="Administrado(a)r" >Administrado(a)r</option>
                                <option value="Propietario(a)" >Propietario(a)</option>
                            </select>

                            <label className="flex justify-center">Seleccione una Img</label>
                            <input
                                type="file"
                                ref={imagenRef}
                                required
                                onChange={handleFileChange}
                                className="placeholder:justify-center p-3 focus:outline-none border-b border-b-[#dc2e63] w-[100%] rounded-xl cursor-pointer"
                            />
                            <br />
                            <div>
                            <label className="flex justify-center">Ingrese  La Contraseña </label>
                            <button type="button" onClick={visibles} className="relative  top-12 left-[92%]">
                                <FontAwesomeIcon icon={visible ? faEyeSlash: faEye} color="#dc2e63" className="size-7" />
                                </button>
                            <input
                                type={visible ? "text":"password"}
                                name="clave"
                                ref={claveRef}
                                required
                                className=" focus:outline-none p-3 border-b border-b-[#dc2e63]   w-[100%]   rounded-xl cursor-pointer"
                                placeholder="Ingresa tu contraseña"
                                onChange={handleinput}
                                />
                            </div>
                            <br />
                            <input 
                        type="submit" 
                        className="placeholder:justify-center p-3 mt-4 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                        value="Crear Usuario"
                                />
                           

                </form>
            </div>
 </div>

    )
}