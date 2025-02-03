import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect}      from "react"
import Swal from "sweetalert2"
import axiosClient from "../utils/axiosClient"

export const   Update_sales=({ onclose, data})=>{

 const [productos, setproductos]= useState([])
 const [cliente, setcliente]= useState([]);

 const  [datos, setdata]= useState({
    nombre_producto :   data.nombre_producto || '',
    referencia:data.referencia ||'',
    id_cliente: data.id_cliente ||'',
    estado:data.estado || '',
    cantidad: data.cantidad|| '',
    
})




    const listar_productos=async()=>{
        try {
         const  listar=await axiosClient.get("/productos/")
         setproductos(listar.data)
        } catch (error) {
         console.log(error)
        }
     }
    

     const update_sales = async (e) => {
        e.preventDefault();
        try {
            const update_data = await axiosClient.put(`/ventas/${data.id}`, datos);
            
            const message = update_data?.data?.message || "No message received from server";
    
            Swal.fire({
                text: message,
                confirmButtonText: 'Cerrar'
            });
    
            // Si el estado es 200, muestra éxito
            if (update_data.status === 200) {
                Swal.fire({
                    title: 'Venta',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
                window.location.reload();
            } else if (update_data.status === 400 || update_data.status === 404) {
                Swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            }
    
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: 'Hubo un error al actualizar la venta.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    };
    
     
    const listar_clientes=async()=>{
        const listar= await axiosClient.get("/cliente")
        setcliente(listar.data)
    }

    const handinputchange = (event) => {
        const { name, value } = event.target;
    
        setdata  ((prevDatos) => ({
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
        <>
          <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll grid grid-cols-1 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center"> 
            <div>
                <h1 className="flex justify-center pt-12" translate="no">Editar Información </h1>
                <FontAwesomeIcon icon={faClose} onClick={onclose} className="relative left-[90%]  size-7"/>
            </div>
             <form   onSubmit={update_sales}   >
                <label className="flex justify-center"  >Nombre Del Producto</label>
                        <input 
                        type="text" 
                        required
                        name="nombre_producto"
                        value={datos.nombre_producto}
                        onChange={handinputchange}
                        placeholder="Nombre Del Producto"
                        className="placeholder:justify-center p-3  ml-12  focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "                       
                        />
                        <br/>
                        
                         <label className="flex justify-center">Referencia</label>
                        <select
                        required
                        value={datos.referencia}
                        onChange={handinputchange}
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
                            value={datos.cantidad}
                            name="cantidad"
                            placeholder="Ingrese La Cantidad A Vender"
                            className="placeholder:justify-center p-3 ml-12 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "                       
                        />
                        <br />
                         <label className="flex justify-center" >Estado</label>
                         <select
                         required 
                         name="estado"
                         value={datos.estado}
                         onChange={ handinputchange}
                         className="placeholder:justify-center p-3  ml-12    focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer " >                
                          <option value="hidden">Selecciona una opcion</option>
                           <option value="Vendido">Vendido</option>
                            <option value="Separado">Separado</option>
                            <option value="Devolutivo">Devolutivo</option>

                         </select>
                             
                         <br />
                         <label className="flex justify-center">Cliente</label>
                         <select 
                         name="id_cliente"
                         required   
                         onChange={handinputchange}
                         value={datos.id_cliente}
                         className="placeholder:justify-center p-3  
                         ml-12  focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[80%]   rounded-xl cursor-pointer "    
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
                            value="Actualizar Venta"
                                    />
                    
                </form>
            </div>
        </div>

        </>
    )
}