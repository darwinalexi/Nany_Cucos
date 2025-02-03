import axiosClient from "../utils/axiosClient"
import { Barra } from "./Component/Barra"
import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash, } from "@fortawesome/free-solid-svg-icons"
import { Update_Product } from "../Modals/Udpdarte_Product"
import Swal from "sweetalert2"
import {Separar} from "../Modals/separa"

export const Product_diponibles=()=>{
  const [disponibles, setdisponiblle]= useState([])
  const [dato, setdata]= useState(null)
  const [modal, setmodal]= useState(false)
  const [type_user, settype_user]= useState([])
  const [searchName, setSearchName]= useState("");
  const [separar, setseparar]=useState(false)



  const openseparar=(disponibles)=>{
    setseparar(true)
    setdata(disponibles)
}

  const close=()=>{
    setseparar(false)
    setdata(null)
  }
  
  const  dispoible= async()=>{
    try{
      const listar= await axiosClient.get("/productos_disponibles")
      console.log ( "info",listar.data)
      setdisponiblle(listar.data)
    }catch(e){
      console.log(e)
    }
  }

  const filterdata = disponibles.filter(o => {
    // Convierte la referencia a string para la comparación
    const referencia = String(o.referencia);  // Convierte 'referencia' a string
    const searchQuery = searchName.trim();   // No es necesario convertir 'searchName' a minúsculas si es numérico

    // Realiza la comparación para ver si el término de búsqueda está en la referencia
    return referencia.includes(searchQuery);  // Compara la referencia como string con 'searchName'
});

  const updatetrue=(disponibles)=>{
    setdata(disponibles)
    console.log("datos "+dato)
    setmodal(true)
    
  }

  

  const datos=[
    {
      name:'Nombre',
      selector: row => row.nombre,    
    },
    {
      name:'Referencia',
      selector: row => row.referencia,    
    },
    {
      name:'Uni. Disponibles',
      selector: row => row.cantidad_almacenada,    
    },  
  {
    name:'Precio unitario',
    selector: row => row.precio_por_mayor,    
  },
  {
    name:"Fecha Ingreso",
    selector: (row) => formatDate(row.fecha_ingreso),
},
  {
    name:'Precio Venta',
    cell: row=>(
      <div>
        {row.precio_venta >0 ? (
            <span>{row.precio_venta}</span>
        ):(
            <span>Sin Precio</span>
        )}

      </div>
    )  
  },
  {
    name:'Observaciones',
    cell: row => <div className="w-[100%] h-auto">{row.observaciones}</div>, 
  },

  {
    name: "Acción",
    cell: row => (
        <div className="flex space-x-2 ">
            <button onClick={() => delete_product(row.id)}>
                <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
            </button>

                <button onClick={()=>updatetrue(row)}>
                    <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
                </button>
              
        </div>
    )
},
  ]


 
  const delete_product= async(id)=>{
        try {
          const  eliminar_producto= await axiosClient.delete(`/productos/${id}`)
          if(eliminar_producto.status==200){
            Swal.fire({
              title: 'Eliminado',
              text:eliminar_producto.data.mensaje,
              icon:'success'
            })

            window.location.reload();
          }
        } catch (error) {
          console.log(error)
        }
    }

const falsemodal=()=>{
  setdata(null)
  setmodal(false)
}



const formatDate = (date) => {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return formattedDate;  // Esto devolverá la fecha en formato YYYY-MM-DD
}
  useEffect(()=>{
    const datalocal= JSON.parse(localStorage.getItem('usuario','[]'))
    const type= datalocal ? datalocal.tipo : ''; 
    settype_user(type)
   dispoible();
  },[])

  return(
    <>
     <div>
        <Header />
        <SiderBar />
      </div>
      <div className="relative top-[100%]  mt-[4%] left-[12%] w-[82%]">
        
      <div className="grid grid-cols-2 gap-4 w-[100%]">
            
            <div className="w-[40%]">
                <Barra/> 
                     </div>
            
              <div className="w-[40%]">
              <input
                type="number"
                placeholder="Buscar por referencia..."
                value={searchName}
                onChange={e => setSearchName(e.target.value)}  // Actualiza 'searchName' con el valor de búsqueda
                className="border-b border-b-[#dc2e63] focus:outline-0 w-[100%] relative left-[100%]"
            />
              </div>
        </div>
        
        {filterdata.length > 0 ? (

          <DataTable
            columns={datos}
            data={filterdata}
            className="relative top-[13%] w-[100%]"
            pagination
            paginationPerPage={8}
            paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
          />
        ) : (
          <p className="flex justify-center">No Hay Productos Disponibles</p>
        )}
      </div>
      {modal &&(<Update_Product onclose={falsemodal} data={dato}/>)}
      {separar &&(<Separar onclose={close} data={dato}/>)}
    </>
 
)
}