import { Outlet } from "react-router-dom"
import FooterInfo from "../../FooterInfo"
import Header from "../../Header"


const LayouClient = ()=>{
    return (
        <>
         <Header />

         <Outlet/>
         <FooterInfo />
        </>
    )
}

export default LayouClient;