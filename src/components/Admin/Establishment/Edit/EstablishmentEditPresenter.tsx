import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import Input from "../../../Common/Input";
import Dropzone from "../../../Common/Dropzone";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import ReactSelect, { MultiValue } from 'react-select';

import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface";
import Select from "../../../Common/Select";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: EstablishmentEntity;
    setData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onChageLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    options: OptionsSelectCreate;
    hangelChangeExtraNumeral: (e: MultiValue<{ value: string, label: string }>) => void;
    handleRemoveNumeral: (id: string) => void;
    numerals: NumeralDetail[];
    validateFields: (name: string) => string;
    userRole: string;
    getSelectedExtraNumeral: (extra_numerals: string) => MultiValue<{ value: string, label: string }>
}

const EstablishmentEditPresenter = (props: Props) => {

    if (!props.data.id) return (<div className="flex items-center justify-center py-5">
        <Spinner />
    </div>)

    return (

        <div className="container mb-24">
            <div className="flex items-center justify-center py-5">


            </div>
            <form className="flex mt-5" onSubmit={props.handleSubmit}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Actualizar  Institución {props.data.name}
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para Actualizar una institución
                            </p>
                        </div>
                        <div className="flex items-center mt-4 gap-x-3">

                            <button
                                type="button"
                                onClick={props.onCancel}
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white bg-gray-400 rounded-lg transition-colors duration-200 shrink-0 sm:w-auto gap-x-2 hover:bg-primary-500 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </button>
                            {
                                props.loading ? <Spinner /> : <button
                                    type="submit"
                                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white rounded-lg transition-colors duration-200 bg-primary-400 shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 dark:hover:bg-blue-500 dark:bg-blue-600">
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
                        <div className="grid xl:grid-cols-1 gap-4">
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre"} width="w-60"
                                    value={props.data.name || ""}
                                    name="name"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('name')}
                                    obligatorio
                                    disabled={props.userRole === "Supervisora PNT"}
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Abreviación"} width="w-60"
                                    value={props.data.abbreviation || ""}
                                    name="abbreviation"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('abbreviation')}
                                    obligatorio

                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"RUC"} width="w-60"
                                    value={props.data.identification || ""}
                                    name="identification"
                                    color={props.validateFields('identification')}
                                    obligatorio
                                    disabled={props.userRole === "Supervisora PNT"}
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <label className="flex flex-col text-gray-800 m-2medium dark:text-white">Dirección</label>
                                <textarea
                                    placeholder={"Dirección"}
                                    value={props.data.address || ""}
                                    name="address"
                                    className={`w-full h-20 p-2 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:border-blue-500 ${props.validateFields('address') === 'success' ?
                                            'border-green-500' : props.validateFields('address') === 'failure' ?
                                                'border-red-400' : ''

                                        }`}
                                    onChange={(e) => props.setData(e)}
                                    rows={1}

                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Select
                                    placeholder="Tipo de institución"
                                    name="type_institution"
                                    value={props.data.type_institution || ""}
                                    onChange={(e) => props.setData(e)}
                                    options={[
                                        { value: "", label: "Seleccione una opción" },
                                        ...props.options.institutions.map((institution) => ({
                                            value: institution.id + "",
                                            label: institution.name
                                        }))
                                    ]}
                                    color={props.validateFields('type_institution')}
                                    obligatorio
                                    disabled={props.userRole === "Supervisora PNT"}
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Select
                                    placeholder="Función de la institución"
                                    name="function_organization"
                                    value={props.data.function_organization || ""}
                                    onChange={(e) => props.setData(e)}
                                    options={[

                                        { value: "", label: "Seleccione una opción" },
                                        ...props.options.functions.map((func) => ({
                                            value: func.id + "",
                                            label: func.name
                                        }))
                                    ]}
                                    color={props.validateFields('function_organization')}
                                    obligatorio
                                    disabled={props.userRole === "Supervisora PNT"}
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Select
                                    placeholder="Tipo de organización"
                                    name="type_organization"
                                    value={props.data.type_organization || ""}
                                    onChange={(e) => props.setData(e)}
                                    options={[
                                        { value: "", label: "Seleccione una opción" },
                                        ...props.options.organizations.map((type) => ({
                                            value: type.id + "",
                                            label: type.name
                                        }))
                                    ]}
                                    color={props.validateFields('type_organization')}
                                    obligatorio
                                    disabled={props.userRole === "Supervisora PNT"}
                                />
                            </div>
                            <div className="flex flex-col m-2">

                                <Dropzone
                                    handleChageLogo={props.onChageLogo}
                                    id="logo"
                                    multiple={false}
                                    type="image"
                                    label="Logo"
                                    name="logo"
                                    accept="image/*"
                                    url={props.data.logo as string}
                                    className={`${props.validateFields('logo') == "success" ?
                                        "bg-green-500" :
                                        props.validateFields('logo') == "failure" ?
                                            "bg-red-200" : "bg-white"
                                        }`}
                                />
                            </div>
                           
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre de la máxima autoridad"} width="w-60"
                                    value={props.data.first_name_authority || ""}
                                    name="first_name_authority"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('first_name_authority')}
                                obligatorio
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Apellido de la máxima autoridad"} width="w-60"
                                    value={props.data.last_name_authority || ""}
                                    name="last_name_authority"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('last_name_authority')}
                                obligatorio
                                />
                            </div>

                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Cargo de la máxima autoridad"} width="w-60"
                                    value={props.data.job_authority || ""}
                                    name="job_authority"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('job_authority')}
                                    obligatorio

                                />
                            </div>

                            <div className="flex flex-col m-2">
                                <Input type={"email"}
                                    placeholder={"Correo de la máxima autoridad"} width="w-60"
                                    value={props.data.email_authority || ""}
                                    name="email_authority"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('email_authority')}
                                    obligatorio
                                />
                            </div>

                           

                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Nombre de la persona que preside el comité o de la persona oficial de transparencia"} width="w-60"
                                    value={props.data.first_name_committe || ""}
                                    name="first_name_committe"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('first_name_committe')}
                                obligatorio
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Apellido de la persona que preside el comité o de la persona oficial de transparencia"} width="w-60"
                                    value={props.data.last_name_committe || ""}
                                    name="last_name_committe"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('first_name_committe')}
                                obligatorio
                                />

                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Cargo de la persona que preside el comité o de la persona oficial de transparencia"} width="w-60"
                                    value={props.data.job_committe || ""}
                                    name="job_committe"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('job_committe')}
                                obligatorio
                                />
                            </div>
                            <div className="flex flex-col m-2">
                                <Input type={"email"}
                                    placeholder={"Correo de la persona que preside el comité o de la persona oficial de transparencia"} width="w-60"
                                    value={props.data.email_committe || ""}
                                    name="email_committe"
                                    onChange={(e) => props.setData(e)}
                                    color={props.validateFields('email_committe')}
                                obligatorio
                                />

                            </div>
                            {/*
                            Campo eliminado según issue # 3
                            
                            <div className="sr-only">
                                <Input
                                    type={"email"}
                                    placeholder={"Correo de acceso a la información"} width="w-60"
                                    value={props.data.email_accesstoinformation || "email@example.com"}
                                    name="email_accesstoinformation"
                                    color={props.validateFields('email_accesstoinformation')}
                                    obligatorio
                                    onChange={(e) => props.setData(e)}
                                />
                            </div>
                            */}
                        </div>
                        <hr />
                        <div className="flex-col items-center justify-between mb-52">

                            <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                                Obligaciones específicas
                            </h4>

                            <div className="flex items-center gap-x-3">
                                <ReactSelect
                                    placeholder="Seleccione los numerales"
                                    options={props.numerals.map((numeral) => ({
                                        value: numeral.id + "",
                                        label: numeral.name
                                    }))
                                    }
                                    className="w-full"
                                    isMulti
                                    isDisabled={props.userRole === "Supervisora PNT"}
                                    onChange={(selectedOptions) => {
                                        // Delegar la eliminacion si corresponde
                                        const selectedIds = selectedOptions?.map((option) => option.value) || [];
                                        const removeIds = props
                                            .getSelectedExtraNumeral(props.data.extra_numerals || "")
                                            .map((numeral) => numeral.value)
                                            .filter((id) => !selectedIds.includes(id));

                                        removeIds.forEach((id) => {
                                            props.handleRemoveNumeral(id);
                                        })
                                        props.hangelChangeExtraNumeral(selectedOptions);
                                    }}
                                    value={props.getSelectedExtraNumeral(props.data.extra_numerals||"")}
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
