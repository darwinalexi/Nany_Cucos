import { Input } from "@nextui-org/input"

export  function Inpu({type, label, name, placeholder, onChange }){
    return(
        <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none  h-"
      />
    )
}