import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import  {useState} from "react"  
import DatePicker from "react-datepicker"
import axiosClient from "../utils/axiosClient"
import Swal from 'sweetalert2'

export const Update_Order= ({onclose, data})=>{

    const [fecha, setfecha] = useState(new Date());
    
    const [datos, setdatos]=  useState({
        nombre_producto : data.nombre_producto || '',
        referencia : data.referencia||'',
        persona : data.nombre_persona ||'',
        celular:data.celular||'',
        observaciones:data.observaciones,
        estado:data.estado || '',
        usuario:data?.usuario||'',
        precio:'',
        cantidad: data?.cantidad
    })

 
    
    const handinputchange = (event) => {
        const { name, value } = event.target;
    
        
        if (["precio"].includes(name)) {
            if (!/^\d*$/.test(value)) {
                Swal.fire({
                    text: 'No Ingrese caracteres especiales como puntos, solo numeros. ',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar'
                  })
                return; // Si no es un número entero, no actualiza el estado
            }
        }
        setdatos((prevDatos) => ({
        ...prevDatos,
        [name]: value
        }));
        
        console.log({ [name]: value });
    }

    const update_order=async(e)=>{
       
        e.preventDefault();
        if(!datos.nombre_producto || !datos.referencia || !datos.persona|| !datos.celular || !datos.estado || !datos.usuario){
            Swal.fire({
                title: 'Error!',
                text: 'Llena los campos necesarios',
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
            return;
        }
        if (String(datos.celular).length !== 10) {
            Swal.fire({
                title: 'Error!',
                text: 'Número de Celular No Posee la Longitud Necesaria',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
        try {
            e.preventDefault();
            const response= await axiosClient.put(`/pedidos/${data.id}`, datos)
           if (response.status==200) {
            Swal.fire({
                title: 'Proceso Exitoso',
                text:response.data.mensaje,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            window.location.reload();
           }
        } catch (error) {
            console.log(error)
        }
    }
   
    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center">   

                    <div onClick={onclose}  className="w-[100%] absolute  top-0 right-0 p-7">
                        <h1 className="flex justify-center">Actualizar Pedido</h1>
                        <FontAwesomeIcon icon={faClose}  className="size-7 relative left-[93%]"/>
                    </div>
                            <div className="relative top-24">

                                <form onSubmit={update_order}>
                                    <label> Ingrese El Nombre del Comprador</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="persona"
                                    required
                                    placeholder="Comprador" 
                                    value={datos.persona}
                                    onChange={handinputchange}
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />
                                    <br />
                                    <label> Ingrese El Numero de Contacto del Comprador</label>
                                    <br />
                                    <input 
                                    type="number"
                                    name="celular"
                                    value={datos.celular}
                                    onChange={handinputchange}
                                    required
                                    placeholder="Número Celular" 
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />
                                    <br />
                                    <label> Nombre del Producto</label>
                                    <br />
                                    <input 
                                    type="text"
                                    onChange={handinputchange}
                                    value={datos.nombre_producto}
                                    name="nombre_producto"
                                    required
                                    placeholder="Ingrese el Nomnbre" 
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />
                                    <br />
                                    <label> Observaciones</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="observaciones"
                                    value={datos.observaciones}
                                    onChange={handinputchange}
                                    placeholder="Opcional (Observaciones)" 
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />
                                    <br />
                                    <label>Refeerencia</label>
                                    <br />
                                    <input 
                                    required
                                    type="number"
                                    placeholder="Referencia" 
                                    name="referencia"
                                    value={datos.referencia}
                                    onChange={handinputchange}
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />

                                     <label>Cantidad</label>
                                    <br />
                                    <input 
                                    required
                                    type="number"
                                    placeholder="cantidad" 
                                    name="cantidad"
                                    value={datos.cantidad}
                                    onChange={handinputchange}
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    />
                                    <br />
                                    <label>Seleccione el estado del pedido</label>
                                    <select 
                                    name="estado"  
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    onChange={handinputchange}
                                    value={datos.estado}>
                                        <option hidden>Seleccione Una Opcion</option>
                                        <option value="Por Entregar">Por Entregar</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Vendido">Vendido</option>

                                    </select>
                                    <label> Ingrese el precio a Pagar </label>
                                    <br/>
                                    <input
                                    name="precio" 
                                    onChange={handinputchange}
                                    required
                                    placeholder="Ingrese El Precio"
                                    type="text"
                                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    > </input>
                                    <br />
                                    <br />
                                    <input 
                                    type="submit" 
                                    className="placeholder:justify-center p-3 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                                    value="Editar Pedido" 
                                    />

                                </form>
                    </div>
            </div>           
        </div>
    )
}