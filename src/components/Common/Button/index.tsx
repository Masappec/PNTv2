import React,{useState} from "react";
import Spinner from "../Spinner";


const Button = ({ title, width }: { title: string, width: string }) => {
  const [loading, setLoading] = useState(false);

 const handleButton = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Aquí iría el código para realizar la solicitud al servidor y verificar las credenciales

  setTimeout(() => {
    setLoading(false);
  }, 2000);
};


  
  return (
    <>

      <button className={' bg-sky-500 rounded-full py-2 md:ml-8 max-h-screen text-white hover:bg-orange-300 duration-500 ' + width} disabled={loading} onClick={handleButton}>
      {loading ? (
          <Spinner/>
        ) : (
         title   
        )}
             
      </button>
      


    </>

  )
}
export default Button