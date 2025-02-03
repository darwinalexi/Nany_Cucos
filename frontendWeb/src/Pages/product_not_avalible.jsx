import { Barra } from "./Component/Barra"
import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import { useState, useEffect } from "react"
import axiosClient from "../utils/axiosClient"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import { Update_Product } from "../Modals/Udpdarte_Product"

export const Product_not_avalible=()=>{
    const [productos_no_avalible, setnoavalible]= useState([])
    const [modal, setmodal]= useState(false)
    const [datos, setdatos]= useState(null)
    const [searchName, setSearchName]= useState("");

    const listarp= async()=>{
        try {
            const response = await axiosClient.get("/productos_no_disponibles")
            setnoavalible(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
listarp();
    },[])

    const filterdata = productos_no_avalible.filter(o => {
      // Convierte la referencia a string para la comparación
      const referencia = String(o.referencia);  // Convierte 'referencia' a string
      const searchQuery = searchName.trim();  
  
      return referencia.includes(searchQuery);  // Compara la referencia como string con 'searchName'
  });
  

    const data =[
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
      name:'Precio Unitario',
      selector: row => row.precio_por_mayor,    
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
        <div className="flex space-x-2 relative z-50"> {/* Añadido 'relative z-50' */}
          <button onClick={() => eliminar(row.id)} className="z-50">
            <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
          </button>
    
          <button onClick={() => openmodal(row)} className="z-50">
            <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5"/>
          </button>
        </div>
      )
    }
    
    ]

    const openmodal=(Vendidos)=>{
      setmodal(true)
      setdatos(Vendidos)
    }

    const closemodal=()=>{
        setmodal(false)
        setdatos(null)
      }
    const eliminar=async(id)=>{
      try {
        const response = await axiosClient.delete(`/productos/${id}`)
        if (response.status==200) {
         Swal.fire({
           title:'Eliminado',
           text:response.data.mensaje,  
           icon:'success',
         })
        }else{
          Swal.fire({
            title:'Lo Sentimos',
            text:response.data.mensaje,  
            icon:'warning',
          })
        }
        window.location.reload();
      } catch (error) {
        console.log(error)
        Swal.fire({
          title:'Lo Sentimos',
          text:"Probablemente No Se borra porque hay ventas asociadas a este producto,  Primero ve y Borra la Venta asociada a  este producto",  
          icon:'warning',
        })
      }
    }
    return(
        <>
        <div>
            <SiderBar/>
            <Header/>
        </div>

        <div className="relative mt-[4%]  left-[12%] w-[82%]" >

        <div className="grid grid-cols-2 gap-4 w-[100%]">
            
            <div className="w-[40%] ">
                <Barra/> 
                     </div>
            
              <div className="w-[40%]">
              <input
              type="number"
              placeholder="Buscar por referencia..."
              value={searchName}
              onChange={e => setSearchName(e.target.value)}  // Actualiza 'searchName' con el valor de búsqueda
              className="border-b border-b-[#dc2e63] focus:outline-0 w-[100%]  relative left-[100%]"
            />

              </div>
        </div>
        
        <div className="absolute w-full z-10">
  {filterdata.length > 0 ? (
    <div>
      <DataTable
        columns={data}
        data={filterdata}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
      />
    </div>
  ) : (
    <p className="flex justify-center">No Hay Registros de ventas</p>
  )}
</div>
        {modal &&(<Update_Product onclose={closemodal} data={datos}/>)}          
        </div>
        </>
    )
}