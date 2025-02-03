import { useEffect, useState } from "react"
import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit,  } from "@fortawesome/free-solid-svg-icons"
import { Create_Venta } from "../Modals/CreateVenta";
import axiosClient from "../utils/axiosClient";
import DataTable from "react-data-table-component";
import { Update_sales } from "../Modals/Update_sales";

export const Sales=()=>{

    const [opensales, setsales]= useState(false)
    const [sales_update, setsalesupdate]= useState(false);
    const [datasend, setdata]= useState([])
    const [ sales, setsaless]= useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [tipo_user, settipouser]=useState([]);
   
    const open=async()=>{
        setsales(true)
    }
    const close=async()=>{
        setsales(false)
    }

    const updateopen=async(sales)=> {
          setdata(sales);
       setsalesupdate(true);
    }

    const updateclose=async()=> {
           setdata(null)
       setsalesupdate(false);
    }

  
    
        const filterreferences = sales.filter(o => {
            // Convierte la referencia a string para la comparación
            const referencia = String(o.referencia);  // Convierte 'referencia' a string
            const searchQuery = searchTerm.trim();   
        
            // Realiza la comparación para ver si el término de búsqueda está en la referencia
            return referencia.includes(searchQuery);  // Compara la referencia como string con 'searchName'
        });


    const show_sales  =async()=>{
       try{
        const   show   = await axiosClient.get("/ventas");
        setsaless(show.data)
       }catch(e){
        console.log("error",e)
       }
    }

  
    useEffect(()=>{
        const datauser = JSON.parse(localStorage.getItem("usuario")) || "";
        const tipo = datauser ? datauser.tipo : "[]";
        settipouser(tipo);
        show_sales();
       },[])
    
       const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;  // Esto devolverá la fecha en formato YYYY-MM-DD
    }
    

    const data = [
        { name: "Producto", selector: row => row.nombre_producto },
        { name: "Referencia", selector: row => row.referencia },
        { name: "Cantidad", selector: row => row.cantidad },
        { name: "Estado", selector: row => row.estado },
        { name: "Fecha Venta", selector: row => formatDate(row.fecha_venta) }
    ];

    if (tipo_user === "Administrado(a)r") {
        data.push({
            name: "Acción",
            cell: row => (
                <div className="flex space-x-1">
                 
                    <button onClick={() => updateopen(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#dc2e63" className="size-5" />
                    </button>
                </div>
            )
        });
    }


    return (
        <>
          <SiderBar />
          <Header />
          <div>
            <h1 className="text-center text-3xl m-4">Ventas</h1>
            {tipo_user=="Administrado(a)r" &&(
                <span className="relative left-[78%]">
                <FontAwesomeIcon icon={faPlus} onClick={open} />
                </span>
            )}
          
            <input
                type="text"
                placeholder="Buscar por referencia..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}  // Actualiza 'searchName' con el valor de búsqueda
                className="border-b border-b-[#dc2e63] focus:outline-0 w-[20%]   relative  left-[12%]"
            />
            {filterreferences.length > 0 ? (
              <div className="w-[75%]  relative left-[19%]">
                <DataTable 
                columns={data} 
                data={filterreferences} 
                pagination
                paginationPerPage={4}
                paginationRowsPerPageOptions={[1, 2, 3, 4, 5]}
                />
              </div>
            ) : (
              <p className="flex justify-center">No Hay Ventas Hechas.</p>
            )}
          </div>
          {opensales && <Create_Venta onclose={close} />}
          {sales_update && <Update_sales  onclose={updateclose} data={datasend} />}
        </>
      )
      
    }