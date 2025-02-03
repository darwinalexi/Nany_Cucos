
import { useState, useEffect } from "react"
import señal from"../../img/señal.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faClipboardList, faHouse, faSignOutAlt, faUsers} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../../utils/axiosClient"
import baseurl from "../../utils/data"

export const SiderBar =()=>{
    const [open, setopen]= useState(false)
    const [user, setuser]= useState([]);
    const [tipo, settipo]= useState([]);

    const navigate= useNavigate();
    

    const close_sesion= async()=>{
        localStorage.clear();
        navigate('/', {replace:true})
        window.location.reload();
    }

    useEffect(()=>{
        const datalocal= JSON.parse(localStorage.getItem('usuario')||'[]') 
     
        const identificacion = datalocal ? datalocal.identificacion : '';
        const tipo = datalocal ? datalocal.tipo:'';
        console.log("tipo", tipo)
        listar(identificacion)
        settipo(tipo)
      },[])

      const listar= async(identificacion)=>{
         try {
            const response = await axiosClient.get(`/usuario/${identificacion}`)
            setuser(response.data)
         } catch (error) {
            console.log(error)
         }
      }
     
    return (
        <>
        {tipo=="Administrado(a)r" &&(
            <div className={`${open ? "w-72 z-50" : "w-16 z-50"} bg-[#dc2e63] duration-500 h-screen fixed top-0`}>
                <div onClick={() => setopen(!open)} >
                        <img src={señal} alt="" className={`absolute  top-8 left-[95%] rounded-full border-blue cursor-pointer w-8 h-8 aspect-square transform duration-500 ${!open ? ""  :"rotate-180" }`}/>
                    </div>
                    {user .map((data)=>(
                        <>
                    <Link  to="/perfil" className="grid grid-cols-2 gap-3 ">

                        <Link  to="/perfil" className={`${open ? "w-16 h-16" : "w-16 h-16"} transition-all duration-500 hover:border-2 hover:border-r-white`}>
                            <img
                                src={`${baseurl}/img/${data.imagen}`}
                                className="rounded-full object-cover w-full h-full"
                                alt="Imagen de usuario"
                            />
                        </Link>

                        <div>
                            <h1 className={` mt-5 text-white font-medium duration-300  ${!open ? "hidden" : "block"}`}>{data.nombre}</h1>
                            <p className={`  text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}> <strong>Tipo: </strong>{data.tipo}</p>
                        </div>

                    </Link>    
                        </>
                    ))}
                    <Link  to="/content" className="grid grid-cols-2 hover:cursor-pointer hover:border-1 hover:border-r-white">
                            <FontAwesomeIcon icon={faHouse} color="white" className="size-10 p-3"/>
                            {/*para que se deje ver el texto solo si esta abirto el siderbar en la const !open*/}
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Inicio</p>
                        </Link>

                        <Link to="/productos_disponibles"  className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faBox} color="white" className="size-10 p-3"/>
                            <p className={`mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Productos</p>
                        </Link>

                
                        
                        <Link to="/pedidos" className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faClipboardList} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Pedidos</p>
                        </Link>

                        <Link to="/ventas" className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faClipboardList} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>ventas</p>
                        </Link>

                        <Link to="/clientes" className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faUsers} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Clientes</p>
                        </Link>

                        <div  className="grid grid-cols-2 hover:cursor-pointer hover:border-3 hover:border-r-white" onClick={close_sesion}>
                            <FontAwesomeIcon icon={faSignOutAlt} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Cerrar Sesion</p>
                        </div>
                    </div>
        )}
        {/*solo se  comprimer hastA W-16 EL SIDERBAR*/}


        {tipo=="Propietario(a)" &&(
            <div className={`${open ? "w-72 z-50" : "w-16 z-50"} bg-[#dc2e63] duration-500 h-screen fixed top-0`}>
                    <div onClick={() => setopen(!open)} >
                        <img src={señal} alt="" className={`absolute  top-8 left-[95%] rounded-full border-blue cursor-pointer w-8 h-8 aspect-square transform duration-500 ${!open ? ""  :"rotate-180" }`}/>
                    </div>
                    {user .map((data)=>(
                        <>
                    <Link  to="/perfil" className="grid grid-cols-2 gap-3 ">

                        <Link  to="/perfil" className={`${open ? "w-16 h-16" : "w-16 h-16"} transition-all duration-500 hover:border-2 hover:border-r-white`}>
                            <img
                                src={`${baseurl}/img/${data.imagen}`}
                                className="rounded-full object-cover w-full h-full"
                                alt="Imagen de usuario"
                            />
                        </Link>

                        <div>
                            <h1 className={` mt-5 text-white font-medium duration-300  ${!open ? "hidden" : "block"}`}>{data.nombre}</h1>
                            <p className={`  text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}> <strong>Tipo: </strong>{data.tipo}</p>
                        </div>

                    </Link>    
                        </>
                    ))}
                    <Link  to="/content" className="grid grid-cols-2 hover:cursor-pointer hover:border-1 hover:border-r-white">
                            <FontAwesomeIcon icon={faHouse} color="white" className="size-10 p-3"/>
                            {/*para que se deje ver el texto solo si esta abirto el siderbar en la const !open*/}
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Inicio</p>
                        </Link>

                        <Link to="/productos_disponibles"  className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faBox} color="white" className="size-10 p-3"/>
                            <p className={`mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Productos</p>
                        </Link>

                        <Link to="/usuarios"  className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faUsers} color="white" className="size-10 p-3"/>
                            <p className={`mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Usuarios</p>
                        </Link>
                        
                        <Link to="/pedidos" className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faClipboardList} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Pedidos</p>
                        </Link>

                        <Link to="/ventas" className="grid grid-cols-2 hover:cursor-pointer hover:border-2 hover:border-r-white">
                            <FontAwesomeIcon icon={faClipboardList} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>ventas</p>
                        </Link>


                        <div  className="grid grid-cols-2 hover:cursor-pointer hover:border-3 hover:border-r-white" onClick={close_sesion}>
                            <FontAwesomeIcon icon={faSignOutAlt} color="white" className="size-10 p-3"/>
                            <p className={` mt-5 text-white font-medium duration-300 ${!open ? "hidden" : "block"}`}>Cerrar Sesion</p>
                        </div>
                    </div>
        )}
       
</>
    )
} 