import { useEffect, useState } from "react"
import { SiderBar } from "./Component/SiderBar"
 import axiosClient from "../utils/axiosClient"
import baseurl from "../utils/data"
import { EditProfile } from "../Modals/EditProfile"

export const Perfil= ()=>{

const [id, setid]= useState([])
const [user, setuser]= useState([])
const [openmodal, setmodal]= useState(false);

const [senddata, setdata]= useState([])
const  listar = async(identificacion)=>{
    try{
        const traer = await axiosClient.get(`/usuario/${identificacion}`)
        setuser(traer.data)
    }catch(e){
        console.log("error",e)
    }
}

const openmodals= async(user)=>{
    setdata(user)
    setmodal(true)
}

const closemodals= async()=>{
    setmodal(false)
    setdata(null)
}

    useEffect(()=>{
        const datalocal= JSON.parse(localStorage.getItem('usuario')||'[]') 
     
        const identificacion = datalocal ? datalocal.identificacion : '';  // Extrae el campo correcto
        
        if (identificacion) {
            setid(identificacion);
            listar(identificacion);  // Ahora se pasa el id directamente

        }              
        
    },[])
    return(
        <>
        <div>
            <SiderBar/>
       {user .map((data)=>(
       <>
       <div className="w-[80%]  gap-2  grid grid-cols-3 relative left-[13%] top-32">

       <div className="border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63] grid h-[80%] shadow-2xl rounded-xl overflow-x-hidden overflow-y-auto">
    <h1 className="flex justify-center text-2xl p-7">Acerca De Mi</h1>
    <p className="flex justify-center p-7 break-words">{data.descripcion}</p>
</div>

                <div >
                    <img src={`${baseurl}/img/${data.imagen}`}  className="h-auto w-[100%] rounded-full" />
                    <h1 className="flex justify-center p-2">{data.nombre}</h1>
                </div>

                    <div className="border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63] grid h-[80%] shadow-2xl  rounded-xl">
                        <>
                        <h4 className="flex justify-center mt-4"> <strong>Tipo :</strong>{data.tipo}</h4>
                        <h4 className="flex justify-center"> <strong>Correo :</strong>{data.correo}</h4>
                        <h4 className="flex justify-center "> <strong>Celular :</strong>{data.celular}</h4>
                        <button className="ml-3 w-[86%] bg-[#dc2e63] text-white flex justify-center  rounded-xl h-7" onClick={() => openmodals(data)}>Editar</button>
                        </>
                    </div>
             
       </div>
             {openmodal &&( <EditProfile onclose={closemodals} data={senddata}/>)}  
       </>
       ))}
        </div>
        </>
    )
}  