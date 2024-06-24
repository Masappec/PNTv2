import { FormEvent } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ColourOption } from "../../../../utils/interface";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { Solicity } from "../../../../domain/entities/Solicity";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";

interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleSave: () => void;
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
    isLoadingSaved: boolean;
    isLoadingSend: boolean;
    disabledDate: boolean;
    disabledReceipt: boolean;
}
const SolicityManualPresenter = (props: Props) => {


    return (
        <>
            <section className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
                <form
                    onSubmit={props.handleSubmit}
                    className='mx-auto w-full max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
                    <section className='grid grid-cols-1 items-start justify-center gap-4 text-start'>
                        <h2 className='mx-auto w-full text-balance text-lg font-semibold text-gray-900'>
                            Persona Solicitante
                        </h2>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Fecha
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                type='date'
                                
                                onChange={(e) => props.onChange(e)}
                                contentEditable={false}
                                name="date"
                                disabled={props.disabledDate}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Cuidad
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                type='text'
                                placeholder='Ingresa el nombre de la ciudad'
                                onChange={props.onChange}
                                name="city"
                                value={props.data.city}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Nombre
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                type='text'
                                placeholder='Ingresa el nombre de la persona solicitante'
                                name="first_name"
                                value={props.data.first_name}
                                onChange={props.onChange}
                                disabled={props.disabledDate}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Apellido
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                type='text'
                                placeholder='Ingresa el apellido de la persona solicitante'
                                name="last_name"
                                onChange={props.onChange}
                                disabled={props.disabledDate}

                                value={props.data.last_name}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Correo Electrónico
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                placeholder='Correo electrónico del solicitante'
                                type="email"
                                name="email"
                                onChange={props.onChange}
                                disabled={props.disabledDate}

                                value={props.data.email}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Teléfono
                            </label>
                            <input
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                                type='text'
                                placeholder='Teléfono del solicitante'
                                onChange={props.onChange}
                                name="phone"
                                value={props.data.phone}
                                disabled={props.disabledDate}
                            />
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Género
                            </label>
                            <select
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(value) => {
                                    props.onChangeSelect({
                                        color: '',
                                        label: value.target.value,
                                        value: value.target.value
                                    }, 'gender')
                                }}
                            >
                                <option value="">Seleccione una opción</option>

                                {
                                    props.genders.map(e => {

                                        return <option value={e.value} selected={props.solicitySaved.gender == e.value}>{e.label}</option>

                                    })
                                }

                            </select>

                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Identificación Cultural
                            </label>
                            <select
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(value) => {
                                    props.onChangeSelect({
                                        color: '',
                                        label: value.target.value,
                                        value: value.target.value
                                    }, 'race_identification')
                                }}
                            >
                                <option value="">Seleccione una opción</option>
                                {
                                    props.race_indentification.map(e => {

                                        return <option value={e.value} selected={props.solicitySaved.race_identification == e.value}>{e.label}</option>

                                    })
                                }
                            </select>
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Petición
                            </label>
                            <textarea
                                className='block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500'
                                placeholder='Escribir motivo de la solicitud'
                                rows={4}
                                
                                name="text"
                                onChange={props.onChange}
                                value={props.data.text}
                            ></textarea>
                        </div>


                        <div>
                            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                Forma de Recepción
                            </label>
                            <select
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(value) => {
                                    props.onChangeSelect({
                                        color: '',
                                        label: value.target.value,
                                        value: value.target.value
                                    }, 'format_receipt')
                                }}
                            >
                                <option value="">Seleccione una opción</option>

                                {
                                    props.format_receipt.map(e => {

                                        return <option value={e.value} selected={props.solicitySaved.format_receipt == e.value}>{e.label}</option>

                                    })
                                }
                            </select>
                        </div>

                        {
                            !props.disabledReceipt ? (
                                <div>

                                    <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                        Formato de Envío
                                    </label>
                                    <select
                                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                        onChange={(value) => {
                                            props.onChangeSelect({
                                                color: '',
                                                label: value.target.value,
                                                value: value.target.value
                                            }, 'format_send')
                                        }}
                                    >
                                        <option value="">Seleccione una opción</option>

                                        {
                                            props.format_send.map(e => {

                                                return <option value={e.value} selected={props.solicitySaved.format_send == e.value}>{e.label}</option>

                                            })
                                        }
                                    </select>
                                </div>

                            ) : null}
                        {
                            props.error ? (
                                <Alert
                                    message={props.error}
                                    type='error'
                                    onClose={() => props.setError('')}
                                />
                            ) : null
                        }

                        {

                            props.isLoadingSend ? <Spinner></Spinner> :
                                props.isSend ? <button
                                    type='button'
                                    className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                                    <IoCheckmarkCircle size={22} className=" mr-4 text-green-500 " />
                                    <span>Enviada</span>
                                </button> :
                                    <button
                                        type='submit'
                                        className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                                        Enviar solicitud
                                    </button>
                        }

                    </section>
                </form>
            </section>
        </>
    )
    
};

export default SolicityManualPresenter;
