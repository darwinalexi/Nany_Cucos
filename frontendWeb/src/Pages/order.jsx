import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import { useState, useEffect } from "react"
import axiosClient from "../utils/axiosClient"
import DataTable from "react-data-table-component"
import { Create_Order } from "../Modals/Create_Order"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { Update_Order } from "../Modals/Update_order"
import Swal from "sweetalert2"

export const Order=()=>{

    const [order, setorder]= useState([]) 
    const [create_order, setcreate]= useState(false);
    const [update_order, setupdate]= useState(false);
    const [type_user, settype_user]= useState([])
    const [datasend, setdatasend]=useState(null)
    const [searchName, setSearchName]= useState([])

    useEffect(()=>{
        const datalocal= JSON.parse(localStorage.getItem('usuario','[]'))
        const type= datalocal ? datalocal.tipo : ''; 
        console.log("tipo", type)
        settype_user(type)
        listar();
    },[])

    const listar= async()=>{
        const response = await axiosClient.get("/pedidos")
        setorder(response.data)
    }

    const modal_create=async()=>{
        setcreate(true);
    }
    const modal_close=async()=>{
        setcreate(false);
    }
    const update=(order)=>{
        setdatasend(order)
        setupdate(true)
    }
    const close_update=()=>{
        setdatasend(null)
        setupdate(false)
    }

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;  // Esto devolverá la fecha en formato YYYY-MM-DD
      }
    const data=[
    {
        name:"Comprador",
        selector: row => row.nombre_persona,
        width:"10%"
    },
    {
        name:"Celular",
        selector: row => row.celular,
        width:"10%"
    },
    {
        name:"Producto",
        selector: row => row.nombre_producto,
        width:"10%"
    },
    {
        name: "Observaciones",
        selector: row => row.observaciones,
        width: "18%",
        cell: row => (
            <div style={{ height: "50px", overflow: "hidden" }}>{row.observaciones}</div>
        )
    },
  
    {
        name:"Cantidad",
        selector: row => row.cantidad,
        width:"10%"
    },
    {
        name: "Precio",
        //si precio esta vacio, en su valor muestra el mensaje
        selector: row => (row.precio && row.precio.length > 0) ? row.precio : "No Asignado",
        width:"10%"
    },
    {
        name:"Estado",
        selector: row => row.estado,
        width:"10%"
    },
    {
        name:"Fecha Pedido",
        selector: (row) => formatDate(row.fecha_pedido),
        width:"11%"
    },
    {
        name: "Acción",
        cell: row => {
            return (
                <div className="flex space-x-2 z-10">
                    {type_user === "Propietario(a)" && (
                        <button onClick={() => update(row)}>
                            <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
                        </button>
                    )}
                    {type_user === "Administrado(a)r" && (
                        <>
                            <button onClick={() => update(row)}>
                                <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
                            </button>
                            <button onClick={() => eliminar(row.id)}>
                                <FontAwesomeIcon icon={faTrash} color="red" className="size-5"/>
                            </button>
                        </>
                    )}
                </div>
            );
        }
    }
    
    ]
   
    const filterdata = order.filter(o => {
        const safeSearchName = typeof searchName === 'string' ? searchName.toLowerCase() : '';
        const nombre = typeof o.nombre_persona === 'string' ? o.nombre_persona.toLowerCase() : '';
        return nombre.includes(safeSearchName);
    });
    
    const eliminar= async(id)=>{
        try{
    const response = await axiosClient.delete(`/pedidos/${id}`)
    if (response.status === 200) {
        Swal.fire({
            title: 'proceso exitoso',
            text: response.data.mensaje,
            icon: 'succes',
            confirmButtonText: 'Cerrar'
          })            
          window.location.reload();        
    }
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
        <div>
            <Header/>
            <SiderBar/>
        </div>
       <div  className="relative mt-[4%]  left-[10%] w-[86%] ">
        {type_user==="Administrado(a)r" &&(
        <button 
            onClick={modal_create}
            className="text-[#dc2e63] font-extrabold  p-2 hover:text-white  hover:bg-[#dc2e63] rounded-full">
            Crear Pedido
        </button>
        )}
        <div className="relative top-0 left-[68%] w-0  ">
        <input
            type="text"
            placeholder="Buscar Por Comprador"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="p-2 border-b border-b-[#dc2e63] focus:outline-0 relative bottom-[34%] "
        />
        </div>
       
            {filterdata.length>0?(
                <>
            
              <DataTable
                columns={data}
                data={filterdata}
                pagination
                paginationPerPage={8}
                paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
              />
            
            </>
            ):(  
                <h1 className="flex justify-center">No Se Encontro Registros</h1>
            )}
       
       </div>
       {create_order && (<Create_Order onclose={modal_close}/>)}
       {update_order && (<Update_Order onclose={close_update} data={datasend}/>)}
        </>
    )
}
