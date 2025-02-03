import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";
import DatePicker from"react-datepicker"

export const Update_Product=({onclose, data})=>{
 

    const [fecha, setfecha] = useState(new Date());
    const datalocal= JSON.parse(localStorage.getItem('usuario')||'[]') 
    const identificacion = datalocal ? datalocal.identificacion : '';  // Extrae el campo correcto
    const [dataupdate, setdata] = useState({
        nombre:data.nombre || '',
        referencia:data.referencia || '',
        precio_por_mayor:data.precio_por_mayor || '',
        observaciones:data.observaciones || '',
        id_usuario :identificacion,
        estado:data.estado || '',
        fecha_ingreso:fecha,
        precio_venta: data.precio_venta || '',
        cantidad_almacenada: data.cantidad_almacenada || '',
    });



   
    const onChange = (fecha) => {
        setfecha(fecha);
    
        // Formatea la fecha 
        const fechaFormateada = fecha.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
       console.log("Fecha Formateada", fechaFormateada) 
        setdata((prevDatos) => ({
            ...prevDatos,
            fecha_ingreso: fechaFormateada  
        }));
    }
   const Update_Product=async(e)=>{
            e.preventDefault();
            if(data.cantidad_almacenada <= 0){
                Swal.fire({
                    text: 'No se puede ingresar  cantidades iguales o por debajo de 0',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar'
                });
                return;
            }
    try {
        console.log("datasend", dataupdate)
        const response= await axiosClient.put(`/productos/${data.id}`, dataupdate)
        if (response.status==200) {
            Swal.fire({
                title: 'Producto actualizado',
                icon:'success',
            })
        }
        window.location.reload();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            icon:'error',
        })
        console.log(error)
    }
   } 

    const handleinput=(event)=>{
        const {name, value}=event.target;

 if (["precio_por_mayor", "precio_venta"].includes(name)) {
            if (!/^\d*$/.test(value)) {
                Swal.fire({
                    text: 'No Ingrese caracteres especiales como puntos, solo números. ',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar'
                  })
                return; // Si no es un número entero, no actualiza el estado
            }
        }


        setdata((prevData) => ({
            ...prevData,
            [name]: value
            }));

            console.log({ [name]: value });

     }


    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center">   
            <div className="w-[100%] grid grid-cols-2">
                <div className="w-[89%] relative left-[53%] top-4">
                    <h1 className="flex  justify-center"><strong>Actualiza tu Producto</strong></h1>
                </div>
                <div onClick={onclose} className="flex justify-end relative right-[12%] top-4">
                    <FontAwesomeIcon icon={faClose} className="size-5"/>
                </div>
                <div className="w-[120%] relative left-[36%] top-11">
                <form onSubmit={Update_Product}>
                          <label>Ingrese el Nombre</label>
                                                <input 
                                                type="text" 
                                                name="nombre"
                                                value={dataupdate.nombre}
                                                required
                                                onChange={handleinput}
                                                placeholder="Ingrese el nombre del Producto"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                        
                                                 <label>Ingrese la Referencia</label>
                                                <input 
                                                type="number" 
                                                onChange={handleinput}
                                                name="referencia"
                                                value={dataupdate.referencia}
                                                required
                                                placeholder="Ingrese la Referencia"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                                                  <label>Ingrese El Precio Por Mayor</label>
                                                <input 
                                                type="number" 
                                                name="precio_por_mayor"
                                                value={dataupdate.precio_por_mayor}
                                                required
                                                onChange={handleinput}
                                                placeholder="Ingrese El precio"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                        
                        
                                                 <label>Ingrese las observaciones  </label>
                                                <input 
                                                type="text" 
                                                name="observaciones"
                                                value={dataupdate.observaciones}
                                                onChange={handleinput}
                                                placeholder="(Opcional) Observaciones"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                                            <br />
                                                <label>Seleccione el estado</label>
                                                <select name="estado"
                                                required
                                                value={dataupdate.estado}
                                                onChange={handleinput}
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                >
                                                    <option hidden >Seleccione el estado del producto </option>
                                                    <option value="Disponible">Disponible</option>
                                                    <option value="No Disponible">No Disponible</option>
                                                </select>
                                            <br />
                        
                                            <label>seleccionee la fecha de ingreso del producto </label>
                                                <div className="">
                                                <DatePicker
                                                selected={fecha}
                                                onChange={(fecha)=>onChange(fecha)} 
                                                maxDate={new Date()}
                                                showYearDropdown               
                                                className=" w-[200%] placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] rounded-xl cursor-pointer"
                                               />
                                                </div>
                        
                        
                                                <label>Ingrese Precio Estimado de Venta</label>
                                                <input 
                                                type="textr" 
                                                name="precio_venta"
                                                required
                                                value={dataupdate.precio_venta}
                                                onChange={handleinput}
                                                placeholder="Ingrese Precio"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                        
                                            <label>Ingrese La Cantidad Almacenada</label>
                                                <input 
                                                type="number" 
                                                name="cantidad_almacenada"
                                                value={dataupdate.cantidad_almacenada}
                                                required
                                                onChange={handleinput}
                                                placeholder="Ingrese Precio"
                                                className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                                                />
                                               <br />
                    <input 
                    type="submit" 
                    className="placeholder:justify-center p-3 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    value="Actualizar Producto" 
                    />
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
} 