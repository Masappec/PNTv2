import { Link } from "react-router-dom";
 
interface ContraseniaProps {
  text: string;
  path: string;
  className?:string;
}

const Contraseña = ({ text,path,className }: ContraseniaProps) => {
    return(
    <div className=" justify-center mb-6 b-4 items-center md:ml-8">
    <Link to={path} className={"text-md text-primary-600 hover:text-cyan-300" + className}>
        {text}
    </Link></div>
    )
}
export default Contraseña