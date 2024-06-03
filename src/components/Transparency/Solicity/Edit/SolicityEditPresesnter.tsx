import { FormEvent } from "react";
import { Button, TextInput, Textarea } from "flowbite-react";
import { Label } from "flowbite-react";

import { IoCheckmarkCircle } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import AsyncSelect from "react-select/async";
import Select from 'react-select';
import { ColourOption } from "../../../../utils/interface";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Solicity } from "../../../../domain/entities/Solicity";
import Spinner from "../../../Common/Spinner";

interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    loadOptions: (
        inputValue: string,
        callback: (options: ColourOption[]) => void
    ) => void;
    success: string;
    error: string;
    setError: (value: string) => void;
    setSuccess: (value: string) => void;
    onChangeSelectEstablishment: (e: ColourOption) => void;
    data: CreateSolicity;
    genders: ColourOption[];
    race_indentification: ColourOption[];
    format_send: ColourOption[];
    format_receipt: ColourOption[];
    entitySelected: EstablishmentEntity;
    onChangeSelect: (e: ColourOption, name: string) => void;
    solicitySaved: Solicity;
    getSelectedItems: (value: string, items: ColourOption[]) => ColourOption;
    isChanged: boolean;
    isSaved: boolean;
    isSend: boolean;
    isLoadingSend: boolean;
    children?: React.ReactNode;
}
const SolicityEditPresenter = (props: Props) => {

    return (
        <div>
            <ToastContainer />
            <div className="border-gray-300 py-5 border-b  ">
                <h2 className="text-2xl font-bold text-black ">
                    Formulario de Solicitud de Acceso a la Información Pública (SAIP)
                </h2>
            </div>
            <form
                className="flex flex-col lg:flex-row mt-10"
                onSubmit={props.handleSubmit}
            >
                <div className="container flex-col sm:flex-col sm:items-center sm:justify-between   ">


                    <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-32">
                        <Label
                            htmlFor=""
                            value="No.SAIP"
                            className="mt-2 text-base font-semibold"
                        />
                        <TextInput
                            className="w-[717px]"
                            placeholder=""
                            type="text"
                            onChange={props.onChange}
                            name=""
                            value={props.data.number_saip}
                        />{" "}
                    </div>

                    <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-14">
                        <Label
                            htmlFor=""
                            value="Nombre Entidad"
                            className="mt-2 text-base font-semibold"
                        />

                        <AsyncSelect
                            cacheOptions
                            loadOptions={props.loadOptions}
                            defaultOptions
                            className="lg:w-[720px] xl:w-[720px] h-[50px] w-[720px] m-2 rounded-full "
                            placeholder={"Institución seleccionada"}
                            onChange={(value) =>
                                props.onChangeSelectEstablishment(value as ColourOption)
                            }
                            value={props.entitySelected ? {
                                value: props.entitySelected.slug,
                                label: props.entitySelected.name,
                            } as ColourOption
                                : null}
                        />
                    </div>
                    <div className="flex flex-col-2 gap-12">
                        <div className=" flex  flex-col-2  h-[44px]  mt-5 gap-20">
                            <Label
                                htmlFor=""
                                value="No. RUC entidad"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[288px]"
                                placeholder=""
                                type="number"
                                onChange={props.onChange}
                                name=""
                                value={props.entitySelected.identification}
                            />{" "}
                        </div>
                        <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-3">
                            <Label
                                htmlFor=""
                                value="Fecha"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[306px]"
                                placeholder=""
                                type="date"
                                onChange={props.onChange}
                                contentEditable={false}
                                value={new Date().toISOString().split('T')[0]}
                                name=""
                            />{" "}
                        </div>
                    </div>
                    <div className=" flex  flex-col-2 m h-[44px]  mt-5 gap-36">
                        <Label
                            htmlFor=""
                            value="Ciudad"
                            className="mt-2 text-base font-semibold"
                        />
                        <TextInput
                            className="w-[717px]"
                            placeholder=""
                            type="text"
                            onChange={props.onChange}
                            name="city"
                            value={props.data.city}

                        />{" "}
                    </div>

                    <div
                        className=" xl:grid-rows-3  lg:grid-rows-3 
           xl:grid-flow-col gap-6 w-auto "
                    >
                        <h2 className="text-2xl pl-72 font-bold text-black  my-9">
                            Identificación de la Persona Solicitante
                        </h2>
                        <div className=" flex  flex-col-2 m-2 h-[44px] gap-32  ">
                            <Label
                                htmlFor=""
                                value="Nombre"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="text"
                                name="first_name"
                                value={props.data.first_name}
                                onChange={props.onChange}
                                disabled
                            />{" "}
                        </div>

                        <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-32 ">
                            <Label
                                htmlFor=""
                                value="Apellido"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="text"
                                name="last_name"
                                onChange={props.onChange}
                                disabled
                                value={props.data.last_name}
                            />
                        </div>
                        <div className=" flex  flex-col-2 m-2 h-[44px] mt-5 gap-12">
                            <Label
                                htmlFor=""
                                value="Correo Electrónico"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="email"
                                name="email"
                                onChange={props.onChange}
                                disabled
                                value={props.data.email}
                            />{" "}
                        </div>

                        <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-12">
                            <Label
                                htmlFor=""
                                value="Teléfono Contacto"
                                className="mt-2 text-base font-semibold"
                            />
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="tel"
                                onChange={props.onChange}
                                name="phone"
                                value={props.data.phone}
                                disabled
                            />{" "}
                        </div>

                        <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-32">
                            <Label
                                htmlFor=""
                                value="Género"
                                className="mt-2 text-base font-semibold"
                            />

                            
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="text"
                                onChange={props.onChange}
                                name="gender"
                                value={props.data.gender}
                                disabled
                            />
                        </div>
                        <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-5">
                            <Label
                                htmlFor=""
                                value="Identificación Cultural"
                                className="mt-2 text-base font-semibold"
                            />

                            
                            <TextInput
                                className="w-[717px]"
                                placeholder=""
                                type="text"
                                onChange={props.onChange}
                                name="race_identification"
                                value={props.data.race_identification}
                                disabled
                            />
                        </div>
                    </div>
                    <div></div>

                    <div className=" grid grid-cols gap-4  mt-16 ">
                        <Label
                            htmlFor=""
                            value="Petición completa"
                            className="text-xl font-bold "
                        />
                        <Textarea
                            placeholder="Escribe la petición"
                            className="h-[139px] xl:w-[915px]"
                            name="text"
                            onChange={props.onChange}
                            value={props.data.text}
                        ></Textarea>
                    </div>

                    <h2 className="text-xl font-bold text-black  mt-7">
                        Forma de Recepción de la información
                    </h2>

                    <div className="grid xl:grid-flow-col xl:grid-col-2 lg:grid-cols-2 grid-cols-1 gap-2  mt-5  ">
                        

                        <div className=" flex  flex-col  h-[44px]  w-[395px] ">
                            <Select
                                placeholder={"Formato de recepción"}
                                name="type_reception"
                                options={props.format_send}
                                onChange={(value) => {
                                    props.onChangeSelect(value as ColourOption, 'format_receipt')
                                }}
                                value={props.solicitySaved.format_send ?
                                    props.getSelectedItems(props.solicitySaved.format_send, props.format_send)
                                    : props.data.format_send ? props.getSelectedItems(props.data.format_send, props.format_send) : null
                                }
                            />
                        </div>
                    </div>

                    {/*<div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Respuesta de la Entidad"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>
          <div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Insistencia Ciudadana"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>
          <div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Respuesta a la Insistencia Ciudadana"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>*/}
                    {props.children}
                    <div className="flex gap-x-3 mt-14 xl:ml-96 xl:pl-52   mb-24 ">
                        <Button
                            type="button"
                            color="danger"
                            className="text-white font-bold bg-gray-500 w-[185px] h-[48px] 
                            hover:bg-gray-700 "
                            onClick={props.onCancel}
                        >
                            Cancelar
                        </Button>
                        {
                            props.isLoadingSend ? (
                                <Spinner></Spinner>) : props.isSend ? (
                                    <div
                                        className="
                  flex items-center justify-center
                  text-green-500 bg-white font-bold
                w-[185px] h-[48px]  hover:bg-gray-200 "
                                    >
                                        <IoCheckmarkCircle size={22} className=" mr-4 text-green-500 " />
                                        <span>Enviada</span>
                                    </div>
                                ) : <Button
                                    type="submit"
                                    className="text-white font-bold bg-sky-800 w-[185px] h-[48px] "
                                >
                                <FiSend size={23} className=" mr-4" />
                                <span>
                                    Actualizar y Enviar
                                </span>
                            </Button>

                        }


                    </div>
                </div>
            </form>
        </div>
    );
};

export default SolicityEditPresenter;
