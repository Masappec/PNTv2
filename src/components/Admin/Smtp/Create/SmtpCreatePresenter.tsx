import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import Input from "../../../Common/Input";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import Checkbox from "../../../Common/Checkbox";



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: 0;
    setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
}

const SmtpCreatePresenter = (props: Props) => {

    return (

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
                          
                            <button
                                type="button"
                                onClick={props.onCancel}
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </button>
                            {
                                props.loading ? <Spinner /> : <button
                                type="submit"
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuCheck className="w-5 h-5" />
                                <span>
                                    Guardar
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
                    
                           
                            <div className="flex  flex-col m-2">
                
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Servidor SMTP"} width="w-60"
                
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Usuario SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"number"}
                                    placeholder={"Puerto SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"password"}
                                    placeholder={"Contraseña SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                />
                                 </div>
                            
                            <div className="flex start-4">
                                <Input type={"radio"}
                                    placeholder={"TSL"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                    />
                                     <Input type={"radio"}
                                    placeholder={"SSL"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                    />
                                    </div>            
                          
                        </div>
                    </div>

                </section>
            </form>
        </div>
    )

}

export default SmtpCreatePresenter