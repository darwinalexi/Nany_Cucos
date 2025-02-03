import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import axiosClient from "../utils/axiosClient";
import Swal from "sweetalert2";

export const Create_Product=({onclose})=>{

    const [user, setuser]= useState([]);
    const [fecha, setfecha] = useState(new Date());
const fechaISO = fecha.toISOString(); 

    const datalocal= JSON.parse(localStorage.getItem('usuario')||'[]') 
    const identificacion = datalocal ? datalocal.identificacion : '';  // Extrae el campo correcto
    
    const  [data, setdata]= useState({
        nombre:'',
        referencia:'',
        precio_por_mayor:'',
        observaciones:'',
        id_usuario :identificacion,
        estado:'',
        fecha_ingreso:fecha,
        precio_venta:'',
        cantidad_almacenada:'',
    })

    const onChange=(fecha)=>{
        setfecha(fecha);

        setdata((prevDatos)=>({
            ...prevDatos,
            fecha_ingreso:fecha
        }))
    }
    useEffect(()=>{
        const id_user= JSON.parse(localStorage.getItem('usuario') || '[]')
        
        let identificacion= id_user ? id_user.identificacion:'';
        setuser(identificacion)
        setdata(prevData => ({
            ...prevData,
            id_usuario: identificacion
        }));
     
     },[])


     const handleinput=(event)=>{
        const {name, value}=event.target;


        if (["precio_por_mayor", "precio_venta"].includes(name)) {
            if (!/^\d*$/.test(value)) {
                Swal.fire({
                    text: 'No Ingrese caracteres especiales como puntos, solo numeros. ',
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



     const Create_product= async(e)=>{
        e.preventDefault();
        if (!/^\d*$/.test(data.precio_por_mayor) || !/^\d*$/.test(data.precio_venta)) {
            Swal.fire({
                text: 'No ingrese caracteres especiales como puntos, solo números.',
                icon: 'warning',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
        if(data.cantidad_almacenada <= 0){
            Swal.fire({
                text: 'No se puede ingresar  cantidades iguales o por debajo de 0',
                icon: 'warning',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
        try{
           const create= await axiosClient.post("/productos", data)
         if (create.status==200) {
            Swal.fire({
                title: 'exito',
                text: create.data.mensaje,
                icon: 'succes',
                confirmButtonText: 'Cerrar'
              })
              window.location.reload();
         }
        }catch(e){
            
            console.log(e)
        }
     }
    return(
        <>
         <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className="bg-white w-[56%]  overflow-scroll grid grid-cols-1 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center">   
                <div className="w-[100%]">
                    <FontAwesomeIcon 
                    icon={faClose}
                    onClick={onclose}
                    className="relative left-[89%] size-7 mt-7 cursor-pointer"
                    />
                    <h1 className="flex justify-center">Crear Producto</h1>
                </div>

                <div className="w-[80%]  absolute top-[26%] left-[6%]">
                    <form onSubmit={Create_product}>
                        <label>Ingrese el Nombre</label>
                        <input 
                        type="text" 
                        name="nombre"
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
                        required
                        placeholder="Ingrese la Referencia"
                        className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                        />
                          <label>Ingrese El Precio Por Mayor</label>
                        <input 
                        type="number" 
                        name="precio_por_mayor"
                        required
                        onChange={handleinput}
                        placeholder="Ingrese El precio"
                        className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                        />


                         <label>Ingrese las observaciones  </label>
                        <input 
                        type="text" 
                        name="observaciones"
                        onChange={handleinput}
                        placeholder="(Opcional) Observaciones"
                        className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                        />
                    <br />
                        <label>Seleccione el estado</label>
                        <select name="estado"
                        required
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
                        className=" w-[265%]   placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] rounded-xl cursor-pointer"
                       />
                        </div>


                        <label>Ingrese Precio Estimado de Venta</label>
                        <input 
                        type="textr" 
                        name="precio_venta"
                        required
                        onChange={handleinput}
                        placeholder="Ingrese Precio"
                        className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                        />

                    <label>Ingrese La Cantidad Almacenada</label>
                        <input 
                        type="number" 
                        name="cantidad_almacenada"
                        required
                        onChange={handleinput}
                        placeholder="Ingrese Precio"
                        className="placeholder:justify-center p-3 focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "                       
                        />
                       <br />
                      
                    <input 
                    type="submit" 
                    className="mt-8 placeholder:justify-center p-3 hover:text-white hover:bg-[#dc2e63] focus:outline-none  border-b border-b-[#dc2e63] border-t border-t-[#dc2e63]   border-r border-r-[#dc2e63]  border-l border-l-[#dc2e63] w-[100%]   rounded-xl cursor-pointer "
                    value="Crear Producto" 
                    />
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}