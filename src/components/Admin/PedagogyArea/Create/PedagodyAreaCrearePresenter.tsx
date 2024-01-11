import { FormEvent, useEffect, useState } from "react";
import Spinner from "../../../Common/Spinner";
import { LuCheck, LuFileEdit } from "react-icons/lu";
import Alert from "../../../Common/Alert";
import Collapse from "../../../Common/Collapse";
import PedagogyAreaEntity from "../../../../domain/entities/PedagodyAreaEntity";



interface PedagogyAreaCreatePresenterProps{
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (name: string, value: string | number | boolean) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    data: PedagogyAreaEntity;
    edit: boolean;
    setEdit: (e: boolean) => void;
    onEdit: () => void;
}

const PedagogyAreaCreatePresenter = (props:PedagogyAreaCreatePresenterProps)=>{

    const [_edit, set_edit] = useState(props.edit);
    const [items, set_items] = useState([
        {
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        }
    ]);

    const [itemsOpen, set_itemsOpen] = useState<number[]>([]);


    useEffect(() => {
        set_edit(props.edit);
    }, [props.edit])
    
    return(
        <div className="container">
        <div className="flex items-center py-5 justify-center">


        </div>
        <form className="flex  mt-5" onSubmit={props.handleSubmit}>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                Configuración SMTP
                            </h2>


                        </div>

                    </div>
                    <div className="flex items-center mt-4 gap-x-3">


                        {
                            props.loading ? <Spinner /> :
                                _edit ?
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                            text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                        <LuCheck className="w-5 h-5" />
                                        <span>
                                            Guardar
                                        </span>
                                    </button> :
                                    <button
                                        type="button"
                                        onClick={() => props.onEdit()}

                                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                dark:hover:bg-blue-500 dark:bg-blue-600">
                                        <LuFileEdit className="w-5 h-5" />
                                        <span>
                                            Editar
                                        </span>
                                    </button>
                        }

                    </div>
                </div>

                <div className="mt-10">
                    {
                        props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                    }
                    {
                        props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                    }


                    <div className="flex flex-col m-2">

                        
                        <div className="flex  flex-col m-2">
                            <Collapse
                                edit={_edit}
                                items={props.data.frequencyAsked.map((e, i) => {
                                    return {
                                        content: e.question,
                                        title: e.answer
                                    }
                                })}

                                itemsOpen={[]}
                                setItemsOpen={set_itemsOpen}
                                key={0}
                            />
                        </div>

                    </div>
                </div>

            </section>
        </form>
    </div>
    )
}

export default PedagogyAreaCreatePresenter;