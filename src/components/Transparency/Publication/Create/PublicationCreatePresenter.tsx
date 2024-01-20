import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import Input from "../../../Common/Input";
import Dropzone from "../../../Common/Dropzone";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import { Button } from 'flowbite-react';
import Checkbox from "../../../Common/Checkbox";
import { Label, Select } from 'flowbite-react';



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: [];
    setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChageLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
}

const PublicationCreatePresenter =(props: Props) =>{

    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">


            </div>
            <form className="flex  mt-5" onSubmit={()=>{}}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Crear  Publicación
                                    </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para crear Publicación
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
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        {
                            props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                        }
                        <div className="grid grid-cols gap-4">
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Titulo"} width="w-60"
                                    value={""}
                                    name="name"
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Descripción"} width="w-60"
                                    value={""}
                                    name="abbreviation"
                                    onChange={(e) => props.setData(e)}
                                />
                                </div>
                                <div className=" flex  flex-col m-2">
                               <div className="mb-2 block">
                               <Label htmlFor="" value="Etiquetas" />
                               </div>
                               <Select id="" required >
                               <option selected></option>
                               <option>opcion1</option>
                               <option>opcion2</option> </Select>  
                               </div>    
                
                            <div className="flex  flex-col m-2">
                                <Dropzone 
                                    handleChageLogo={props.onChageLogo}
                                    id="archivos"
                                    multiple={false}
                                    type="archive"
                                    label="Archivos"
                                    name=""
                                    accept="archive/*"
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nota"} width="w-60"
                                    value={""}
                                    name=""
                                    onChange={(e) => props.setData(e)}
                                />
                            
        
                            <div className="grid grid-cols-2 ">
                            <div className="flex start-4 mt-4  ">
                               <Checkbox label="Activo" id=""
                                onChange={(e) => {}}
                                checked={undefined}

                                />
                                </div>
                                <div className="flex start-4 mt-4 space-y-2">
                               <Checkbox label="Colaborativa" id=""
                                onChange={(e) => {}}
                                checked={undefined}

                                />
                                </div>
                                </div>
                                </div>
                                 
                    
                            </div>
                        </div>

                </section>
            </form>
        </div>
 )
 }

 export default PublicationCreatePresenter