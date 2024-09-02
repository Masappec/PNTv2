import { FormEvent } from "react";

import { IoCheckmarkCircle } from "react-icons/io5";
import { ColourOption } from "../../../../utils/interface";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { Solicity } from "../../../../domain/entities/Solicity";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import CustomInputSearch from "../../../Common/CustomInputSearch";

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
const SolicityCreatePresenter = (props: Props) => {

  const formatDate = (date: Date) => {
    const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') + 'T' + [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes())
    ].join(':');
  };





  return (
    <>
      <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
        Crear nueva Solicitud de Acceso a la Información Pública (SAIP)


      </h2>
      <h2 className="text-xs  text-primary">Para crear una nueva Solicitud de Acceso a la Información, favor completa la siguiente información. Una vez que presiones “Enviar Solicitud” esta será recibida por la institución que selecciones. Si necesitas más información sobre cómo realizar este proceso, consulta nuestra sección de aprendizaje.
        <a
          className='font-bold text-sm text-primary hover:underline hover:underline-offset-2 ml-3'
          href='/tutoriales'>Revisa nuestro tutorial.
        </a>
      </h2>
      <section className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
        <form
          onSubmit={props.handleSubmit}
          className='mx-auto w-full items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
          <section className='grid grid-cols-1 items-start justify-center gap-4 text-start'>
            <h2 className='mx-auto w-full text-balance text-lg font-semibold text-gray-900'>
              Datos de la Entidad
            </h2>
            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Fecha
              </label>
              <br />
              <span className="text-xs text-gray-500 ">La fecha y hora que se registrarán para esta solicitud serán las del momento en que presiones Enviar Solicitud. Desde esa fecha comenzarán a correr los plazos establecidos en la LOTAIP. A continuación se muestra la fecha actual como referencia.</span>
              <input
                className='mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                type='datetime-local'
                onChange={(e) => props.onChange(e)}
                value={formatDate(new Date())}
                name="date"
                disabled={props.disabledDate}
              />
            </div>

            <div>


              <CustomInputSearch
                loadOptions={props.loadOptions}
                onSelect={(value) => props.onChangeSelectEstablishment(value)}
                onSearch={() => { }}
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Ciudad
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                placeholder='Ciudad'
                type="text"
                name="city"
                onChange={props.onChange}

                value={props.data.city}
              />
            </div>
          </section>


          <section className='mt-5 grid grid-cols-1 items-start justify-center gap-4 text-start'>
            <h2 className='mx-auto w-full text-balance text-lg font-semibold text-gray-900'>
              Persona que Solicita
            </h2>

            <span className="text-xs  text-gray-500">Los datos que se mostrarán a la institución serán los que ingresaste cuando creaste la cuenta en este Portal</span>
            <ul className='mb-2 mt-2 text-sm'>

              <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
                <h2 className='font-medium text-gray-900'>Nombre:</h2>
                <h3 className='font-medium text-gray-600'>{
                  props.data.first_name +
                  " " +
                  props.data.last_name
                }</h3>
              </li>

              <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
                <span className='font-medium text-gray-900'>Correo electrónico:</span>
                <a href='#' className='group flex items-center gap-x-2 hover:text-primary'>
                  <span className=' text-gray-600 text-pretty  font-medium underline underline-offset-2'>
                    {props.data.email}
                  </span>
                </a>
              </li>
              <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
                <h2 className='font-medium text-gray-900'>Teléfono:</h2>
                <h3 className='font-medium  text-gray-600'>{
                  props.data.phone
                }</h3>
              </li>
              <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
                <h2 className='font-medium text-gray-900'>Género:</h2>
                <h3 className='font-medium  text-gray-600'>{
                  props.data.gender
                }</h3>
              </li>


            </ul>





            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Solicitud de información
              </label>
              <br />
              <span className="text-xs  text-gray-500">Escribe a continuación con detalle la información que necesites consultar a la institución seleccionada.</span>
              <textarea
                className=' mt-2 block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500'
                placeholder='Escribe la información que necesitas solicitar'
                rows={4}

                name="text"
                onChange={props.onChange}
                value={props.data.text}
              ></textarea>
              <span className="text-xs">
                {props.data.text.length}/3000
              </span>
            </div>




            <div>

              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Formato de entrega
              </label>
              <br />
              <span className="text-xs  text-gray-500">Selecciona a continuación el formato en el que deseas recibir la información que solicitas.</span>
              <select
                className='mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                onChange={(value) => {
                  props.onChangeSelect({
                    color: '',
                    label: value.target.value,
                    value: value.target.value
                  }, 'format_send')
                }}
              >
                <option value="">Selecciona el formato</option>

                {
                  props.format_send.map(e => {

                    return <option value={e.value} selected={props.solicitySaved.format_send == e.value}>{e.label}</option>

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
            <div className="flex flex-row gap-5 justify-between">
              {
                props.isLoadingSaved ? <Spinner></Spinner> :
                  props.isSaved ? <button
                    type='button'
                    className='w-full rounded-full bg-WHITE
                     px-6  text-base font-medium text-primary transition-opacity
                      hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>

                    <span>Guardada</span>
                  </button> :
                    <button
                      type='button'
                      onClick={props.handleSave}
                      className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>

                      Guardar sin enviar
                    </button>
              }
              {

                props.isLoadingSend ? <Spinner></Spinner> :
                  props.isSend ? <button
                    type='submit'
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

            </div>
            <div className="flex flex-row gap-5 justify-center">
              <button
                type='button'
                onClick={props.onCancel}
                className='w-full rounded-full bg-slate-100 px-6 py-3 text-base 
                font-medium text-gray-800 transition-opacity 
                border border-gray-800
                hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                Cancelar
              </button>
            </div>
          </section>
        </form>
      </section>
    </>
  )
}

export default SolicityCreatePresenter