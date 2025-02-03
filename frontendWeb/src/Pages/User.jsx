import { useEffect, useState } from "react"
import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import axiosClient from "../utils/axiosClient";
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Update_user } from "../Modals/Update_user";
import {Create_user} from "../Modals/Create_user"
export const User=()=>{
    const [user, setuser]= useState([]);
    const [openmodal, setmodal]= useState(false);
    const [dato, senddata]=useState([])
    const [opencreate, setcreate]= useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const show_user= async()=>{
        try{
            const show_users= await axiosClient.get("/listar_usuarios");
            setuser(show_users.data);
        }catch(e){
            console.log("error", e)
        }
    }

    const modalcreate_user=async()=>{
        setcreate(true);
    }

    const closecreate_user=async()=>{
        setcreate(false);
    }

    const update_useropen= async(user)=>{
        senddata(user)
       setmodal(true)
    } 

    const update_userclose= async()=>{
        senddata(null)
       setmodal(false)
    } 

    useEffect(()=>{
        show_user();
    },[]);

    const filteruser = user.filter(user => {
        const nombre = user.nombre ? user.nombre.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase()) 
    });

const data=[
    {
        name:'Identificacion',
        selector: row => row.identificacion
    },
    {
        name:'Nombre',
        selector: row =>row.nombre
    },
    {
        name:'Correo',
        selector: row=> row.correo
    },
    {
        name:'Celular',
        selector: row=> row.celular
    },
    {
        name:'Tipo',
        selector: row=> row.tipo
    },
     {
            name: "Acción",
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => delete_user(row.identificacion)}>
                        <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                    </button>
        
                        <button onClick={()=> update_useropen(row)}>
                            <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
                        </button>
                        
                </div>
                
            )
        },
]

const delete_user= async(identificacion)=>{
    try{

        const delete_users= await axiosClient.delete(`/eliminar_usuario/${identificacion}`)
        Swal.fire({
                 title: 'Eliminado',
                 text:delete_users.data.mensaje,
                 icon:'success'
             })
             window.location.reload();
    }catch(e){
        console.log("error", e)
    }
}

    return(
       <>
          <div>
                <Header />
                <SiderBar />
              </div>
                <div className="relative top-[100%]   mt-[4%] left-[12%] w-[82%]">
                    <h1 className="flex justify-center">Usuarios</h1>
                    <FontAwesomeIcon icon={faPlus} className="size-5"  onClick={modalcreate_user}/>
                    <input
                type="text"
                placeholder="Buscar Por Nombre"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-b border-b-[#dc2e63] focus:outline-0 w-[20%] relative left-[70%]"
                    />
                    {filteruser.length>0?(
                        <DataTable
                        columns={data}
                        data={filteruser}
                        className="relative top-[13%] w-[100%]"
                        pagination
                        paginationPerPage={6}
                        paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
                        />
                    ):(
                        <p className="flex justify-center">No Hay Administradores En Nany Cuco's</p>
                    )}
                   

                </div>
                {opencreate && (<Create_user onclose={closecreate_user}/>)}
                {openmodal && (<Update_user data={dato} onclose={update_userclose}/>)}
       </>
    )
}