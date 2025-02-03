import { Link,  useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Create_Product } from "../../Modals/Create_product"

export const Barra=()=>{
    const [activecolor, setactive]= useState([])
    const [createopen, setopen]= useState(false);
    const location= useLocation();
    const [tipouser, settipouser] = useState("");



    const open_modal=async()=>{
      setopen(true);
    }
    const close_modal=async()=>{
      setopen(false);
    }

    
    useEffect(() => {
        setactive(location.pathname);
        const datauser = JSON.parse(localStorage.getItem("usuario")) || "";
        const tipo = datauser ? datauser.tipo : "[]";
        settipouser(tipo);
      }, [location.pathname]);

    return(
      <>
      <div className="grid grid-cols-2 gap-2 w-[100%] ">
                  <nav className=" rounded-xl relative left-20 ">

                <ul className="grid grid-cols-3  gap-28">
                  {tipouser=="Propietario(a)" &&(
                    <div onClick={open_modal} className="relative right-12  cursor-pointer h-[55%] w-36 rounded-xl hover:border-t border-t-[#dc2e63] hover:border-b border-b-[#dc2e63] hover:border-r border-r-[#dc2e63] hover:border-l border-l-[#dc2e63]">
                  <FontAwesomeIcon icon={faPlus} className="ml-[50%]"/><p className="flex justify-center">Crear Producto</p>
                </div>     
                  )}
                       
                  <li
                    className={`
                      ${activecolor === "/productos_disponibles" ? "text-white bg-[#dc2e63] rounded-xl  p-2 w-28 " : "text-black p-2"}
                    `}
                    onClick={() => setactive("/productos_disponibles")}
                  >
                    <Link to="/productos_disponibles">Productos Disponibles</Link>
                  </li>
    
                 
                  <li
                    className={`
                      ${activecolor === "/productos_no_disponibles" ? "text-white bg-[#dc2e63] rounded-xl  p-2 w-28 " : "text-black p-2"}
                    `}
                    onClick={() => setactive("/productos_no_disponibles")}
                  >
                    <Link to="/productos_no_disponibles">Productos No Disponibles</Link>
                  </li>
                </ul>
              </nav>
     
        {createopen &&(<Create_Product onclose={close_modal}/>)}
      </div>        
      </>
    )
}