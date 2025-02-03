
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export const Grafica =()=>{
    const [pro_disponibles , setproductos]=useState([])
    const [pro_pendiente , setpendientes]=useState([])
    const [pro_vendidos, setvendidos]= useState([]);
    const [sales, setsales]= useState([]);
    const [pedidos, setpedidos]= useState([])
    const [num_client, setclient]= useState([])
   const [user, setuser]= useState([]);
   const [tipo_user, settipouser]= useState([]);



    const number_users = async()=>{
        const listar = await axiosClient.get("/contarusuarios");
        setuser(listar.data);
      }
    
  const number_clients= async()=>{
    const listar = await axiosClient.get("contarclientes");
    setclient(listar.data);
  }
    const pr_disponibles= async()=>{
        try {
            const listar= await axiosClient.get("/contarpdisponibles")
            setproductos(listar.data)
        } catch (error) {
            console.log(error)
        }
    }  


    

    
  const number_sales = async () => {
    try {
      const response = await axiosClient.get("/ventas_mes");
      console.log("ventas mes", response.data); // Verifica el formato de la respuesta
      // Aquí se accede al primer elemento de la respuesta y a la propiedad 'COUNT(*)'
      const salesCount = response.data[0]["COUNT(*)"] || 0; // En caso de que no haya datos, poner 0
      setsales(salesCount);
    } catch (error) {
      console.log(error);
    }
  };

    const pr_pendiente= async()=>{
        try {
            const listar= await axiosClient.get("/contarppendientes")
            setpendientes(listar.data)
        } catch (error) {
            console.log(error)
        }
    }  

    const product_vendidos= async()=>{
        try {
            const consultar = await axiosClient.get("/contar_productpos_vendidos")
            setvendidos(consultar.data)
        } catch (error) {
            console.log(error)
        }
    }

  
    const pedidosfun= async()=>{
        try{
            const  contar= await axiosClient.get("/contarpedidos")
            setpedidos(contar.data)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        const datauser = JSON.parse(localStorage.getItem("usuario")) || "";
        const tipo = datauser ? datauser.tipo : "[]";
        settipouser(tipo);
    

        pr_disponibles();
        pr_pendiente();
        product_vendidos();
        number_sales();
        pedidosfun();
        number_clients();
        number_users();
    },[])
    


    let userType = 'Usuarios';  
    let userValue = user;      

    if (tipo_user === "Administrado(a)r") {
        userType = 'Clientes';
        userValue = num_client; 

    }else if(tipo_user === "Propietario(a)"){
        userType = 'Usuarios';
        userValue = user;
    }

    const data = [
        {
          name: 'Productos Disponibles',
          value: pro_disponibles,
        },
        {
          name: 'Ventas Del Último Mes',
          value: sales,
        },

        {
          name: 'Pedidos',
          value: pedidos,
        },
       
        {
            name: userType,    
            value: userValue,   
        }
      ];
      

  
    const COLORS = ['#dc2e63', '#af2edc', '#323232', '#FF8042', '#dc762e'];
    return(
<>
<ResponsiveContainer widt="100%" height={400}>
    <PieChart>
    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}>

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}

                    </Pie>
    </PieChart>
</ResponsiveContainer>
</>
    )
}