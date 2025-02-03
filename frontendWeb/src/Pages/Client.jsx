import { useState, useEffect } from "react"
import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import axiosClient from "../utils/axiosClient"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import { Update_Client } from "../Modals/Update_client"
import {Create_Client } from "../Modals/Create_Client"

export const Client=()=>{

const [clients, setclients]= useState([])
const [openupdate, setupdate]=useState(false);
const [datos, setdatos]= useState()
const [searchTerm, setSearchTerm] = useState("");
const [opencreate, setcreate]= useState(false);

const create_client=async()=>{
    setcreate(true)
}

const close_client=async()=>{
    setcreate(false)
}
const openmodal=async(clients)=>{
     setdatos(clients);
    setupdate(true);
}

const filtercliennt = clients.filter(clients => {
    const nombre = clients.nombre ? clients.nombre.toLowerCase() : '';
    return nombre.includes(searchTerm.toLowerCase()) 
});

const closemodal=async()=>{
    setdatos(null);
   setupdate(false);
}
const show_client= async()=>{
     const client= await axiosClient.get("/cliente")
     setclients(client.data)
} 



const delete_clientt=async(identificacion)=>{
  try {
    const delete_c= await axiosClient.delete(`/cliente/${identificacion}`)
    Swal.fire({
         title: 'Eliminado',
         text:delete_c.data.mensaje,
         icon:'succes'
     })
     window.location.reload();
  } catch (error) {
    console.log("error", error)
  }
}
const data=[
    {
        name:'Identificacion',
        selector: row => row.identificacion,    
    },
    {
        name:'Nombre',
        selector: row => row.nombre,    
    },
    {
        name:'Celular',
        selector: row=> row.numero_celular,
    },
    {
        name: 'Correo',
        selector: row => row.correo ? row.correo : 'No Tiene  Correo Electronico',  // Aquí verificamos si el correo está vacío
    },
    {
        name: "Acción",
        cell: row => (
            <div className="flex space-x-2">
                <button onClick={() => delete_clientt(row.identificacion)}>
                    <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                </button>
    
                    <button onClick={()=> openmodal(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
                    </button>
                    
            </div>
            
        )
    },
]

useEffect(()=>{
  show_client();
},[])
    return (
        <>
        <div>
            <Header />
            <SiderBar />
        </div>
        <div className="relative top-[100%] mt-[4%] left-[12%] w-[82%]">
            <div className=" w-[100%]">
            <h1 className="flex justify-center text-2xl">Clientes</h1>
            <input
                type="text"
                placeholder="Buscar Por Nombre"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-b border-b-[#dc2e63] focus:outline-0 w-[20%] relative left-[70%]"
                    />
              <FontAwesomeIcon icon={faPlus} onClick={create_client}/>
              {filtercliennt.length>0 ?(
                <DataTable
                columns={data}
                data={filtercliennt}
                className="z-10 relative top-[13%] w-[100%]"
                pagination
                paginationPerPage={8}
                paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
                />
              ):(
                <p className="flex justify-center">No Hay Clientes En Nany Cuco's</p>
              )}
         
            </div>
        </div>
        {openupdate && (<Update_Client onclose={closemodal} data={datos}/>)}
        {opencreate && (<Create_Client onclose={close_client}/>)}
        </>

       
    );
}