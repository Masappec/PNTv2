import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import Input from "../../../Common/Input";
import Dropzone from "../../../Common/Dropzone";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: EstablishmentEntity;
    setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChageLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
}

const EstablishmentEditPresenter = (props: Props) => {

    if (!props.data.id) return (<div className="flex items-center py-5 justify-center">
        <Spinner />
    </div>)

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
                                    Crear  Institución
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para crear una institución
                            </p>
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
                                        Crear
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
                        <div className="grid xl:grid-cols-3 gap-4">
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre"} width="w-60"
                                    value={props.data.name || ""}
                                    name="name"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Abreviación"} width="w-60"
                                    value={props.data.abbreviation || ""}
                                    name="abbreviation"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>


                            <div className="flex  flex-col m-2">
                                <Dropzone
                                    handleChageLogo={props.onChageLogo}
                                    id="logo"
                                    multiple={false}
                                    type="image"
                                    label="Logo"
                                    name="logo"
                                    accept="image/*"
                                    url={props.data.logo as string}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Título de la autoridad superior"} width="w-60"
                                    value={props.data.highest_authority || ""}
                                    name="highest_authority"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre de la autoridad superior"} width="w-60"
                                    value={props.data.first_name_authority || ""}
                                    name="first_name_authority"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Apellido de la autoridad superior"} width="w-60"
                                    value={props.data.last_name_authority || ""}
                                    name="last_name_authority"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Cargo de la autoridad superior"} width="w-60"
                                    value={props.data.job_authority || ""}
                                    name="job_authority"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Correo de la autoridad superior"} width="w-60"
                                    value={props.data.email_authority || ""}
                                    name="email_authority"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Título del Responsable del Comité"} width="w-60"
                                    value={props.data.highest_committe || ""}
                                    name="highest_committe"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre del comité"} width="w-60"
                                    value={props.data.first_name_committe || ""}
                                    name="first_name_committe"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Apellido del comité"} width="w-60"
                                    value={props.data.last_name_committe || ""}
                                    name="last_name_committe"
                                    onChange={(e) => props.setData(e)}
                                />

                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Cargo del comité"} width="w-60"
                                    value={props.data.job_committe || ""}
                                    name="job_committe"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Correo del comité"} width="w-60"
                                    value={props.data.email_committe || ""}
                                    name="email_committe"
                                    onChange={(e) => props.setData(e)}
                                />

                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Correo de acceso a la información"} width="w-60"
                                    value={props.data.email_accesstoinformation || ""}
                                    name="email_accesstoinformation"
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

export default EstablishmentEditPresenter;