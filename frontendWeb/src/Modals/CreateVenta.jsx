import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import axiosClient from "../utils/axiosClient"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import DatePicker from "react-datepicker";

export const Create_Venta=({onclose})=>{

 const [productos, setproductos]= useState([])
 const [cliente, setcliente]= useState([]);


 const [fecha, setfecha]= useState( new Date());
 
 const  [data, setdata]= useState({
    nombre_producto:'',
    referencia:'',
    cantidad:'',
    id_cliente:'',
    estado:'',
    fecha_venta : fecha,
})


    const listar_productos=async()=>{
       try {
        const  listar=await axiosClient.get("/productos/")
        setproductos(listar.data)
       } catch (error) {
        console.log(error)
       }
    }

    const listar_clientes=async()=>{
        const listar= await axiosClient.get("/cliente")
        setcliente(listar.data)
    }
  

    const create_sales = async (e) => {
        e.preventDefault();
        
        try {
            const crear = await axiosClient.post("/ventas", data);
            
            if (crear.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: crear.data.mensaje,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
            } else {
                Swal.fire({
                    title: 'Atención',
                    text: 'Verifica La Cantidad Disponible Del Producto',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar'
                });
                console.log(crear)
            }
        } catch (error) {
            console.error("Error recibido:", error); 
            const errorMessage = error.response?.data?.mensaje || 'Ocurrió un error inesperado.';
            
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };
    
      

    const onChange = (fecha) => {
        setfecha(fecha);
    
        // Formatea la fecha 
        const fechaFormateada = fecha.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
    
        setdata((prevDatos) => ({
            ...prevDatos,
            fecha_venta: fechaFormateada  
        }));
    }
    

    const handinputchange = (event) => {
        const { name, value } = event.target;
    
        setdata ((prevDatos) => ({
        ...prevDatos,
        [name]: value
        }));
        console.log({ [name]: value });
    }

    useEffect(()=>{
        listar_productos();
        listar_clientes();
    },[])
    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]   gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl overflow-scroll">
                <div>
                <FontAwesomeIcon icon={faClose} onClick={onclose} className="relative left-[86%] size-7 m-3" />
                <h1 className="text-center">Crear Venta</h1>
                <form onSubmit={create_sales}>
                <label className="flex justify-center"  >Nombre Del Producto</label>
                        <input 
                        type="text" 
                        required
                        name="nombre_producto"
                        onChange={handinputchange}
                        placeholder="Nombre Del Producto"
                        className="placeholder:justify-center p-3  ml-12  focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "                       
                        />
                        <br/>
                         <label className="flex justify-center">Referencia</label>
                        <select
                        onChange={handinputchange}
                        required
                        name="referencia"
                        className="placeholder:justify-center p-3 ml-12 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer " >              
                             <option value="hidden" > Seleccione Una  Opcion  </option>
                            {productos .map((datos)=>(
                                <>
                                 <option key={datos.id} value={datos.referencia}>{datos.referencia}</option>
                                </>
                            ))}
                        </select>
                         <label  className="flex justify-center" >Cantidad</label>
                        <input 
                            onChange={handinputchange}
                            type="number" 
                            required
                            name="cantidad"
                            placeholder="Ingrese La Cantidad A Vender"
                            className="placeholder:justify-center p-3 ml-12 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "                       
                        />
                        <br />
                         <label className="flex justify-center" >Estado</label>
                         <select 
                         name="estado"
                         required
                         onChange={handinputchange}
                         className="placeholder:justify-center p-3  ml-12    focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer " >                
                          <option value="hidden">Selecciona una opcion</option>
                           <option value="Vendido">Vendido</option>
                            <option value="Separado">Separado</option>
                         </select>
                         <br />


                         <label className="flex justify-center">seleccionee la fecha de ingreso del producto </label>
    <div className="ml-11">
                        <DatePicker
                        selected={fecha}
                        onChange={onChange} 
                        maxDate={new Date()}
                        showYearDropdown               
                        className=" w-[275%] placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] rounded-xl cursor-pointer"
                       />
                        </div>

                         <label className="flex justify-center">Cliente</label>
                         <select 
                         required
                         name="id_cliente"  
                         onChange={handinputchange} 
                         className="placeholder:justify-center p-3  ml-12  focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "    
                         >
                            <option value="hidden">Selecciona una opcion </option>
                            {cliente .map((data )=>(
                                 <option key={data.identificacion}  value={data.identificacion}>{data.nombre}</option>     
                            ))}
                         </select>
                        <br />
                        <input 
                            type="submit" 
                            className="placeholder:justify-center p-3   mt-4     ml-12   hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "
                            value="Registrar Venta"
                                    />
                    
                </form>
                </div>
    </div>
    </div>
    )
    }
