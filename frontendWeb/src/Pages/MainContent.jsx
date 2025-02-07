import { Header } from "./Component/Header"
import { SiderBar } from "./Component/SiderBar"
import { Grafica } from "../Component/Grafico/Grafica"
import axiosClient from "../utils/axiosClient"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component"



const MainContent = () => {
  const [tipouser, settipouser] = useState("");
  const [pro_disponibles, setproductos] = useState(0);
  const [pro_vendidos, setvendidos] = useState(0);
  const [num_sales, setsales] = useState(0); 
  const [pedidos, setpedidos] = useState(0);
  const [invertido, setinvertido] = useState(0);
  const [num_clien, setclient]=useState(0);
  const [num_user, setuser]= useState(0);
  const [estadistico, setestadistico] = useState([]);
  const [totalsales, settotalsales]= useState([]);
  const [sales, setsaleses]=useState([]);
  const [searchName, setSearchName]= useState("");
  const [pedido_vendido, setpedidosvendidos]= useState([]);
  const [vendido, setvendido]= useState([]);

  const vendidopedido=async()=>{
    try{
     const vendido= await axiosClient.get("/vendido")
     console.log("valor vendido pedidos",vendido.data)
     setvendido(vendido.data)
    }catch(e){
     console.log("error",e)
    }
  }

 const ultimatesales=async()=>{
   try{
    const showsales= await axiosClient.get("/ultimasventas")
    console.log("ventas por mes",showsales.data)
    setsaleses(showsales.data)
   }catch(e){
    console.log("error",e)
   }
 }

 const pedidovendido=async()=>{
  try{
   const pedidos= await axiosClient.get("/contarpedidosvendidos")
   console.log(pedidos.data)
   setpedidosvendidos(pedidos.data)
  }catch(e){
   console.log("error",e)
  }
}

  const number_users = async()=>{
    const listar = await axiosClient.get("/contarusuarios");
    setuser(listar.data);
  }

  const number_clients= async()=>{
    const listar = await axiosClient.get("contarclientes");
    setclient(listar.data);
  }
  
  const pr_disponibles = async () => {
    try {
      const listar = await axiosClient.get("/contarpdisponibles");
      setproductos(listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  const product_vendidos = async () => {
    try {
      const consultar = await axiosClient.get("/contar_productpos_vendidos");
      setvendidos(consultar.data);
    } catch (error) {
      console.log(error);
    }
  };


  const number_sales_price= async()=>{
    try{
        const listar= await axiosClient.get("/ventas_mestotal");
        settotalsales(listar.data)
        console.log("datos", listar.data)
    }catch(e){
      console.log(e)
    }
  }
  const number_sales = async () => {
    try {
      const response = await axiosClient.get("/ventas_mes");
      console.log("ventas mes", response.data); // Verifica el formato de la respuesta
      // Aquí se accede a
      const salesCount = response.data[0]["COUNT(*)"] || 0; // En caso de que no haya datos, poner 0
      setsales(salesCount);
    } catch (error) {
      console.log(error);
    }
  };

  const estadisticas= async()=>{
   try{
    const listar= await axiosClient.get("/estadisticasmes")
    setestadistico(listar.data);
    console.log("estadistica", listar.data);
   }catch(e){
    console.log("error", e);
   }

  }

  const pedidosfun = async () => {
    try {
      const contar = await axiosClient.get("/contarpedidos");
      setpedidos(contar.data);
    } catch (e) {
      console.log(e);
    }
  };

  const valorinvertido = async () => {
    try {
      const contar = await axiosClient.get("/contarvalorinvertido");
      setinvertido(contar.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const datauser = JSON.parse(localStorage.getItem("usuario")) || "";
    const tipo = datauser ? datauser.tipo : "[]";
    settipouser(tipo);

    pedidosfun();
    pedidovendido();
    number_clients();
    ultimatesales();
    product_vendidos();
    valorinvertido();
    number_users();
    number_sales(); 
    vendidopedido();
    number_sales_price();
    pr_disponibles(); 
    estadisticas();
  }, []);

  const data = [
        {
          name: "Productos Disponibles",
          value: pro_disponibles,
        },  
        {
          name: "Productos Vendidos",
          value: pro_vendidos,
        },
        {
          name: "Pedidos",
          value: pedidos,
        },
  ];

  const filterdata = sales.filter(o => {
    // Convierte la referencia a string para la comparación
    const referencia = String(o.referencia);  // Convierte 'referencia' a string
    const searchQuery = searchName.trim();  

    return referencia.includes(searchQuery);  // Compara la referencia como string con 'searchName'
});
  
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;  // Esto devolverá la fecha en formato YYYY-MM-DD
}

  const dataultimatemonth= [
        {
          name: "Producto",
          
          selector: (row) => row.nombre_producto,  
      },
      {
          name: "Referencia",
          selector: (row) => row.referencia,
      },
      {
          name: "Cantidad",
          selector: (row) => row.cantidad,
      },
      {
          name: "Estado",
          selector: (row) => row.estado,
      },
      {
        name:"Fecha Venta",
        selector: (row) => formatDate(row.fecha_venta),
      },
  ]

  return (
    <>
      <div className="grid grid-rows-2 size-[100%]">
        <div>
          <Header />
        </div>
        <div className="w-[80%] grid grid-cols-4 ml-[12%] gap-5 mt-4">
          <Link to="/productos_disponibles" className="hover:cursor-pointer rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
            <p className="flex justify-center p-2">Productos Disponibles</p>
            {pro_disponibles > 0 ? (
              <p className="flex justify-center p-2">{pro_disponibles}</p>
            ) : (
              <p className="flex justify-center p-2">No Hay Productos Disponibles</p>
            )}
          </Link>

          <Link to="/pedidos" className="hover:cursor-pointer  rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
            <p className="flex justify-center p-2">Pedidos Sin Entregar</p>
            {pedidos > 0 ? (
              <p className="flex justify-center p-2">{pedidos}</p>
            ) : (
              <p className="flex justify-center p-2">No Hay Pedidos</p>
            )}
          </Link>

          <Link to="/ventas" className="hover:cursor-pointer  rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
            <p className="flex justify-center p-2">No° de Ventas Del Ultimo Mes</p>
            {num_sales > 0 ? (
              <p className="flex justify-center p-2">{num_sales}</p>
            ) : (
              <p className="flex justify-center p-2">No Hay Ventas</p>
            )}
          </Link>

          {tipouser === "Administrado(a)r" && (
            <Link to="/clientes" className="hover:cursor-pointer rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
              <p className="flex justify-center p-2">No° de Clientes</p>
              {num_clien > 0 ? (
                <p className="flex justify-center p-2">{num_clien}</p>
              ) : (
                <p className="flex justify-center p-2">No Hay Clientes</p>
              )}
            </Link>

          )}

{tipouser === "Propietario(a)" && (
            <Link to="/usuarios" className="hover:cursor-pointer rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
              <p className="flex justify-center p-2">No° De Usuarios </p>
              {num_user > 0 ? (
                <p className="flex justify-center p-2">{num_user}</p>
              ) : (
                <p className="flex justify-center p-2">No Hay Usuarios </p>
              )}
            </Link>

          )}

        </div>
        <SiderBar />
        <div>
          <h1 className="flex justify-center text-3xl pt-4">Datos Estadísticos</h1>
          {data.length > 0 ? (
            <Grafica />
          ) : (
            <p className="flex justify-center text-3xl">No Hay Registros</p>
          )}
        </div>
        <div className="w-[70%] relative left-[8%] m-6 hover:cursor-pointer">
        <h1 className="flex justify-center p-2">Datos Importantes Del Último Mes</h1>         
          <div>

          <div className="grid grid-cols-2 gap-6  w-[116%]">
            <div>
                 {tipouser === "Propietario(a)" && (
                    <div className="w-[100%] rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
                      <p className="flex justify-center p-2">
                        Cantidad Productos disponibles: {estadistico.cantidad_disponibles  || "No Hay Productos Disponibles"}
                      </p>
                      <p className="flex justify-center p-2">
                        Precio Invertido: {estadistico.precio_total_invertido || "No Hay Invversion"}
                      </p>
                      <p className="flex justify-center p-2">
                        Ventas Del Último Mes: {num_sales === 0 ? 'No se realizaron ventas' : num_sales}
                      </p>
                      <p className="flex justify-center p-2">Valor Vendido Del Último Mes: {totalsales.valor_total_ventas || "No se vendió ningún producto"}</p>
                      <p className="flex justify-center p-2">Valor Vendido De Pedidos En El Ultimo Mes: {vendido.total_ventas || "No se vendió ningún pedido"}</p>
                      <p className="flex justify-center p-2">Cantidad Vendida De Pedidos En El Ultimo Mes: {pedido_vendido.total_pedidos_vendidos || "No se vendió ningún pedido"}</p>


                    </div>
                  )}

              {tipouser === "Administrado(a)r" && (
                <div className="w-[100%] rounded-xl border-r border-r-[#dc2e63] border-l border-l-[#dc2e63] border-t border-t-[#dc2e63] border-b border-b-[#dc2e63]">
                  <p className="flex justify-center p-2">
                    Ventas Del Último Mes: {num_sales === 0 ? 'No se realizaron ventas' : num_sales}

                  </p>
                  <p className="text-center">Valor Vendido Del Último Mes: {totalsales.valor_total_ventas || "No se vendió ningún producto"}</p>
                </div>
              )}
            </div>

            <div className="w-[120%]">
              <input
              type="number"
              placeholder="Buscar por referencia..."
              value={searchName}
              onChange={e => setSearchName(e.target.value)}  // Actualiza 'searchName' con el valor de búsqueda
              className=" focus:outline-0 w-[60%]  relative border-b border-b-[#dc2e63]"
            />
            {filterdata.length > 0  ?(
                <DataTable 
                columns={dataultimatemonth} 
                data={filterdata} 
                className="w-full"
                fixedHeader  // Mantiene los nombres de las columnas fijos
                fixedHeaderScrollHeight="160px"  // Altura máxima antes de activar el scroll
                />
            ):(
              <p className="flex justify-center">No Hay Registros De Ventas</p>
            )}
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
