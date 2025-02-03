import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Separar=({onclose, data})=>{

    if(data){
        console.log(data)
    }
    return (
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
        <div className="bg-white w-[56%]  overflow-scroll  gap-0 h-[75%] relative top-[15%] left-[23%] rounded-2xl flex justify-center">
        
        <div className="grid grid-cols-2 gap-5">
            <FontAwesomeIcon icon={faClose} onClick={onclose}/>
            <h1 className="text-3xl flex justify-center"> Separar Producto</h1>
        </div>
        <div>
            <form action="">
                
            </form>
        </div>
        </div>
      </div>
    )
} 