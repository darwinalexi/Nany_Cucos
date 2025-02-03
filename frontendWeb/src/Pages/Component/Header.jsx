
import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import baseurl from "../../utils/data";
export const Header =()=>{
    
    const [identi, setid]= useState([])
    const [user, setuser]= useState([])


    const listar = async(identificacion)=>{
        try {
            const traer = await axiosClient.get(`/usuario/${identificacion}`)
            setuser(traer.data)
        } catch (e) {
            console.log(e)
        }
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
    <div className="h-[219%]">
   {user .map((daata) => (
       <div key={daata.identificacion} className="border-b border-b-[#dc2e63]  w-[100%]  "> 
        <Link to={"/perfil"}>
            <img src={`${baseurl}/img/${daata.imagen}`} className="relative left-[85%] top-[2%] w-[10%]  rounded-full object-cover h-28 m-3" />
        </Link>
        </div>
        ))}
    </div>
 
   )
   
}
