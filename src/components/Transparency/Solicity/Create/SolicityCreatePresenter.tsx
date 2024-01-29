import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import Input from "../../../Common/Input";
import Spinner from "../../../Common/Spinner";
import { Alert, Button, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";


interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: [][];
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    onCreateTag: (tag: string) => void;
    onFilterTag: (tag: string) => void;
    onSelectedTag: (newValue: OnChangeValue<{ label: string, value: number }, true>) => void;
    onChangeTitle: (title: string) => void
    onChangeDescription: (description: string) => void
    onChangeEvent: (event: string) => void

}
const SolicityCreatePresenter = (props: Props) => {



    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">
                {
                    props.error && <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error!</span> {props.error}
                    </Alert>
                }

            </div>
            <form className="flex  mt-5" onSubmit={props.handleSubmit}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Crear Solicitud
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para crear solicitud
                            </p>
                        </div>
                        <div className="flex items-center mt-4 gap-x-3">

                            <Button
                                type="button"
                                onClick={props.onCancel}
                                className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </Button>
                            {
                                props.loading ? <Spinner /> : <Button
                                    type="submit"
                                    className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                    <LuCheck className="w-5 h-5" />
                                    <span>
                                        Crear
                                    </span>
                                </Button>
                            }

                        </div>
                    </div>

                    <div className="mt-10">
                        {
                            props.success && <Alert color="success" icon={HiInformationCircle}>
                                <span className="font-medium">Exitoso!</span> {props.success}
                            </Alert>
                        }


                                <div className="grid grid-cols ">

                                <div className="flex  flex-col m-2">
                                        <Label htmlFor="" value="Detalle de solicitud" />
                                        <Textarea
                                            placeholder={"Detalle de solicitud"}
                                            value={""}
                                            name="abbreviation"
                                            onChange={(e) => props.onChangeDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className=" flex  flex-col m-2">
                                        <div className="mb-2 block">
                                            <Label htmlFor="" value="Entidad" />
                                        </div>
                                        <CreatableSelect isClearable options={([])}
                                            isMulti={true}
                                            onInputChange={(e) => props.onFilterTag(e)}
                                            onCreateOption={(e) => props.onCreateTag(e)}
                                            onChange={() => {}}

                                        />
                                    </div>
                                    <div className="flex  flex-col m-2">
                                        <Input type={"text"}
                                            placeholder={"Titulo de la solicitud"} width="w-60"
                                            value={""}
                                            name="name"
                                            onChange={(e) => props.onChangeTitle(e.target.value)}
                                        />
                                    </div>
                    
                                    </div>
                    </div>

                </section>
            </form>
        </div>
    )
}

export default SolicityCreatePresenter