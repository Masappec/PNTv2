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

  const formatDate = (date:Date) => {
    const padTo2Digits = (num:number) => num.toString().padStart(2, '0');

    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') + 'T' + [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes())
    ].join(':');
  };





  return(
    <>
      <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
        Formulario de Solicitud de Acceso a la Información Pública (SAIP)


      </h2>
      <section className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
        <form
          onSubmit={props.handleSubmit}
          className='mx-auto w-full max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
          <section className='grid grid-cols-1 items-start justify-center gap-4 text-start'>
            <h2 className='mx-auto w-full text-balance text-lg font-semibold text-gray-900'>
              Datos de la Entidad
            </h2>
            <div>
              
              
              <CustomInputSearch
                loadOptions={props.loadOptions}
                onSelect={(value) => props.onChangeSelectEstablishment(value)}
                onSearch={()=>{}}
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Ruc
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                type='text'
                placeholder='Aqui va el RUC de la entidad seleccionada'
                onChange={props.onChange}
                name="identification"
                value={props.entitySelected.identification}

              />
            </div>
            </section>
          
          
          <section className='mt-5 grid grid-cols-1 items-start justify-center gap-4 text-start'>
            <h2 className='mx-auto w-full text-balance text-lg font-semibold text-gray-900'>
              Persona Solicitante
            </h2>


            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Fecha
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                type='datetime-local'
                onChange={(e) => props.onChange(e)}
                value={formatDate(new Date())}
                name="date"
                disabled={props.disabledDate}
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
                disabled
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

                    return <option value={e.value} selected={props.data.gender == e.value}>{e.label}</option>

                  })
                }

              </select>

            </div>


            <div>
              <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                Identificación Cultural
              </label>
              <select
              disabled
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

                    return <option value={e.value} selected={props.data.race_identification == e.value}>{e.label}</option>

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
                Formato de entrega
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
                    className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    <IoCheckmarkCircle size={22} className=" mr-4 text-green-500 " />
                    <span>Guardada</span>
                  </button> :
                    <button
                      type='button'
                      onClick={props.handleSave}
                      className='w-full rounded-full bg-white px-6 py-3 text-base 
                    font-medium text-primary-500 transition-opacity hover:opacity-80 
                    border border-primary-500
                    focus:outline-none focus:ring-2 focus:ring-blue-400'>
                      Guardar
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
  /*return (
    <div>
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
          <div className="xl:flex xl:flex-col-2 flex-col-1 gap-12">
            <div className="flex  xl:flex-col-2 sm:flex-col-1 h-[44px]  mt-5 gap-20">
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
            <div className=" flex  xl:flex-col-2  flex-col-1 m-2 h-[44px]  mt-5 gap-3">
              <Label
                htmlFor=""
                value="Fecha"
                className="mt-2 text-base font-semibold"
              />
              <TextInput
                className="w-[306px]"
                placeholder=""
                type="text"
                onChange={props.onChange}
                contentEditable={false}
                value={new Date().toLocaleString()}
                name=""
                disabled={props.disabledDate}
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
            <h2 className="text-2xl xl:pl-72 font-bold text-black  my-9">
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
                disabled={props.disabledDate}

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
                disabled={props.disabledDate}

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
                disabled={props.disabledDate}

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
                type="text"
                onChange={props.onChange}
                name="phone"
                value={props.data.phone}
                disabled={props.disabledDate}

              />{" "}
            </div>

            <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-32">
              <Label
                htmlFor=""
                value="Género"
                className="mt-2 text-base font-semibold"
              />

              <Select

                className="lg:w-[720px] xl:w-[720px] h-[50px] w-[720px] m-2 rounded-full "
                placeholder={"Género"}
                options={props.genders}
                onChange={(value) => {
                  props.onChangeSelect(value as ColourOption, 'gender')
                }}
                isDisabled
                value={
                  props.solicitySaved.gender ?
                    props.getSelectedItems(props.solicitySaved.gender, props.genders)
                    : props.data.gender ? props.getSelectedItems(props.data.gender, props.genders) : null}

              />
            </div>
            <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-5">
              <Label
                htmlFor=""
                value="Identificación Cultural"
                className="mt-2 text-base font-semibold"
              />

              <Select

                className="lg:w-[720px] xl:w-[720px] h-[50px] w-[720px] "
                placeholder={"Identificación Cultural"}
                options={props.race_indentification}
                onChange={(value) => {
                  props.onChangeSelect(value as ColourOption, 'race_identification')
                }}
                isDisabled
                value={props.solicitySaved.race_identification ?
                  props.getSelectedItems(props.solicitySaved.race_identification, props.race_indentification)
                  : props.data.race_identification ? props.getSelectedItems(props.data.race_identification, props.race_indentification) : null
                }

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
              color={props.data.text.length > 0 ? "success" : "failure"}
            ></Textarea>
          </div>

          <h2 className="text-xl font-bold text-black  mt-7">
            Forma de Recepción de la información
          </h2>

          <div className="grid xl:grid-flow-col xl:grid-col-2 lg:grid-cols-2 grid-cols-1 gap-2  mt-5  ">
            <div className=" flex  flex-col  h-[44px]  xl:w-[438px] ">
              <Select
                placeholder={"Forma de entrega"}
                name="formatSolicity"
                options={props.format_send}
                onChange={(value) => {
                  props.onChangeSelect(value as ColourOption, 'format_send')
                }}
                value={props.solicitySaved.format_send ?
                  props.getSelectedItems(props.solicitySaved.format_send, props.format_send)
                  : props.data.format_send ? props.getSelectedItems(props.data.format_send, props.format_send) : null

                }
              />
            </div>
            {
              !props.disabledReceipt ? (
                <div className=" flex  flex-col  h-[44px]  w-[395px] ">
                  <Select
                    placeholder={"Formato de recepción"}
                    name="type_reception"
                    options={props.format_receipt}
                    onChange={(value) => {
                      props.onChangeSelect(value as ColourOption, 'format_receipt')
                    }}
                    value={props.solicitySaved.format_receipt ?
                      props.getSelectedItems(props.solicitySaved.format_receipt, props.format_receipt)
                      : props.data.format_receipt ? props.getSelectedItems(props.data.format_receipt, props.format_receipt) : null
                    }
                  />
                </div>) : null
            }

          </div>


          <div className="flex w-auto mt-14">

            {
              props.error ? (
                <Alert color="red">
                  {props.error}
                </Alert>) : null
            }
          </div>
          <div className="flex gap-x-3 mt-14 xl:ml-96 xl:pl-52   mb-24 ">
            {
              props.solicitySaved?.id && !props.isChanged ? (
                <div

                  className="
                  flex items-center justify-center
                  text-green-500 bg-white font-bold 
               w-[129px] h-[48px]  hover:bg-gray-200 "
                >
                  <IoCheckmarkCircle size={22} className=" mr-4 text-green-500 " />
                  <span>Guardada</span>
                </div>
              ) : props.isLoadingSaved ? (
                <Spinner></Spinner>) :
                <Button
                  type="button"
                  color="secondary"
                  onClick={props.handleSave}
                  className=" text-gray-900 border-gray-300 font-bold 
              border w-[129px] h-[48px]  hover:bg-gray-200 "
                >
                  <IoSaveOutline size={22} className=" mr-4 text-gray-900 " />
                  <span>Guardar</span>
                </Button>


            }
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
                <span>Enviar solicitud</span>
              </Button>

            }


          </div>
        </div>
      </form>
    </div>
  );*/
};

export default SolicityCreatePresenter;
