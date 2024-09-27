import { useEffect, useState } from "react"
import AllPublicationsPresenter from "./AllPublicationsPresenter"
import TransparencyActiveUseCase from "../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyActive from "../../../domain/entities/TransparencyActive";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import SessionService from "../../../infrastructure/Services/SessionService";


interface Props{
    transparencyUseCase?: TransparencyActiveUseCase;

}
const AllPublicationsContainer = (props:Props)=>{



    const [year,setYear] = useState<number>(new Date().getFullYear())
    const [month,setMonth]= useState<number>(new Date().getMonth()+1)

    const [publications, setPublications] = useState<TransparencyActive[]>([])
    const [error,setError] = useState<string>("")


    const [entity, setEntity] = useState<EstablishmentEntity>(EstablishmentEntity.generateAllEstablishment(""));
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const _est = SessionService.getEstablishmentData();
        setEntity(_est)
       
    },[])

    useEffect(()=>{
        getDataTA()
    }, [entity,month,year])

    const getDataTA =()=>{
        props.transparencyUseCase?.getPublicationsPublics(month, year, entity.id || 0).then((response) => {


            console.log(response)
            const numeral = response.sort((a, b) => parseInt(a.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0") -
                parseInt(b.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0"))



                const datos = numeral.map((item) => {
                    const files = item.files;

                    files.sort((a, b) => {
                        const order = ["Conjunto de datos", "Metadatos", "Diccionario"];
                        return order.indexOf(a.description) - order.indexOf(b.description);
                    });

                    item.files = files;
                    return item;
                })

                setPublications(datos)


            

        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }


    const handleChangeDate=(date:string)=>{
        console.log(date)
        const [Y,M] = date.split('-');

        setMonth(parseInt(M))
        setYear(parseInt(Y));
    }

    const approvePublication=(ta:TransparencyActive)=>{
        props.transparencyUseCase?.approvePublication({
            establishment_id: ta.establishment.id||0,
            id: ta.id,
            type: "TA"
        }).then(()=>{
            getDataTA()
        }).catch((error)=>{
            setError(error.message)
        })
    }

    return (
        <>
          
            <AllPublicationsPresenter
                year={year}
                month={month}
                data={publications}
                establishment={entity.name}
                onChangeDate={handleChangeDate}
                loading={loading}
                error={error}
                onCloseError={()=>setError("")}
                approvePublication={approvePublication}
            />
        </>
        
    )
}

export default AllPublicationsContainer;