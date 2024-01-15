import { Card } from "flowbite-react"
import { Normative } from "../../../domain/entities/PedagodyAreaEntity"
import Spinner from "../../Common/Spinner"
import Alert from "../../Common/Alert"


interface Props{
    normatives: Normative[]
    error: string
    loading: boolean
    setError: (error:string)=>void
}


const NormativePresenter = (props:Props) => {

    if (props.loading){
        return (
            <Spinner/>
        )
    }

    return (
        <div className="container h-auto">
            <div className="row mt-10">
                <div className="col-12">
                    <h1 className="text-center text-primary-900 font-bold text-4xl">
                        Normativas y guías
                    </h1>
                </div>
            </div>
            <div className="row mt-10">
                <div className="flex col-12 justify-center items-center">
                        {
                            props.error &&
                            <Alert type="error" message={props.error} onClose={()=>{props.setError("")}}/>
                        }
                        {
                            props.normatives.map((item)=>{
                                return (
                                    <Card href="#" className="w-1/2">
                                    <h5 className="text-2xl font-bold tracking-tight text-primary-800 dark:text-white">
                                     {item.title}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                     {item.description}
                                    </p>
                                    <p>
                                        Enlace: <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-500">
                                            {item.url}
                                        </a>
                                    </p>
                                  </Card>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default NormativePresenter