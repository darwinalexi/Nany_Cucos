import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from"react-datepicker"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import axiosClient from "../utils/axiosClient"
export const Create_Order=({onclose })=>{

        const [fecha, setfecha] = useState(new Date());
        const [user, setuser]= useState([])
        const [datos, setdatos]=  useState({
            nombre_producto:'',
            referencia:'',
            persona:'',
            celular:'',
            observaciones:'',
            estado:'Por Entregar',
            usuario:'',
            cantidad:'',
            fecha_pedido:fecha
        })
        const onChange = (fecha) => {
            setfecha(fecha);
        
            // Formatea la fecha 
            const fechaFormateada = fecha.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
        
            setdatos((prevDatos) => ({
                ...prevDatos,
                fecha_pedido: fechaFormateada  
            }));
        }

        const create_order=async(e)=>{
            e.preventDefault();
            if(!datos.nombre_producto || !datos.referencia || !datos.persona|| !datos.celular  || !datos.usuario || !datos.fecha_pedido){
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
        
                const peticion= await axiosClient.post("/pedidos",datos)
                if (peticion.status === 200) {
                    Swal.fire({
                        title: 'proceso exitoso',
                        text: peticion.data.mensaje,
                        icon: 'succes',
                        confirmButtonText: 'Cerrar'
                      })            
                      window.location.reload();        
                }
            } catch (error) {
                console.log(error)
            }
        }
        const listar_user=async()=>{
            try {
                const listar = await axiosClient.get("/listar_usuarios")
                setuser(listar.data)
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(()=>{
            listar_user();
        },[])

        const handinputchange = (event) => {
            const { name, value } = event.target;
        
            setdatos((prevDatos) => ({
            ...prevDatos,
            [name]: value
            }));
            
            console.log({ [name]: value });
        }

    return(
    <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
        <div className="bg-white w-[56%]  overflow-scroll  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center">
        
            <div className=" w-[100%] absolute ">

                <div className="flex items-center justify-center  mt-14 w-[94%] h-full">
                    <h1 >Crear Pedidos</h1>
                </div>
                
                <div className="w-auto h-auto  absolute  top-0 right-0 p-14">
                < FontAwesomeIcon icon={faClose} onClick={onclose} className="size-8"/>
                </div>

            </div>

            <div className="relative top-24">
                <form onSubmit={create_order}>
                    <label> Ingrese El Nombre del Comprador</label>
                    <br />
                    <input 
                    type="text"
                    name="persona"
                    required
                    placeholder="Comprador" 
                    onChange={handinputchange}
                     className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    />
                    <br />
                    <label> Ingrese El Numero de Contacto del Comprador</label>
                    <br />
                    <input 
                    type="number"
                    name="celular"
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
                    onChange={handinputchange}
                    placeholder="Opcional (Observaciones)" 
                     className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    />

                    <label> Ingrese La Cantidad</label>
                    <br />
                    <input 
                    type="number"
                    name="cantidad"
                    onChange={handinputchange}
                    placeholder="No° de Unidades Pedidas" 
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
                    onChange={handinputchange}
                     className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    />
                    <br />
                   
                    <label>Fecha De Pedido</label>
                    <br />
                                    <DatePicker  
                                    //selecciona la fecha y la muesstra 
                                    selected={fecha} 
                                    onChange={(fecha)=>onChange(fecha)} 
                                    //no permite que el user selecione una fecha adelantada 
                                    maxDate={new Date()}
                                    showYearDropdown               
                                    className=" w-[265%] placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] rounded-xl cursor-pointer"
                                   />
                    <br />
                    <label> Seleccione el user que hace el pedido</label>
                    <br/>
                    <select 
                    name="usuario" 
                    onChange={handinputchange}
                    required
                    className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    >  
                        {user .map((data)=>(
                            <>
                              <option hidden>Seleccione Una Opción</option>
                              <option key={data.identificacion} value={data.identificacion}>{data.nombre}</option>
                            </>
                        ))}
                    </select>
                    <br />
                    <br />
                    <input 
                    type="submit" 
                    className="placeholder:justify-center p-3 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    value="Crear Pedido" 
                    />

                </form>
            </div>


        </div>
    </div>
)
}