import { FormEvent, useEffect, useState } from "react";
import { LuCheck, LuFileEdit } from "react-icons/lu"
import Input from "../../../Common/Input";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import SmtpEntity from "../../../../domain/entities/SmtpEntity";



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (name: string, value: string | number | boolean) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    data: SmtpEntity;
    edit: boolean;
    setEdit: (e: boolean) => void;
    onEdit: () => void;
}

const SmtpCreatePresenter = (props: Props) => {
    const [_edit, set_edit] = useState(props.edit);
    useEffect(() => {
        set_edit(props.edit);
    }, [props.edit])
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


                        <div className="flex  flex-col m-2">

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Servidor SMTP"} width="w-60"

                                    name="host"
                                    onChange={(e) => props.setData("host", e.target.value)}
                                    value={props.data.host}
                                    disabled={!props.edit}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Usuario SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("user", e.target.value)}
                                    value={props.data.auth.user}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"number"}
                                    placeholder={"Puerto SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("port", e.target.value)}
                                    value={props.data.port}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"password"}
                                    placeholder={"Contraseña SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("pass", e.target.value)}
                                    value={props.data.auth.pass}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex start-4">
                                <Input type={"checkbox"}
                                    placeholder={"TSL"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("secure", e.target.checked)}
                                    checked={props.data.secure}
                                    disabled={!props.edit}
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