import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { PartialTimelineSolicty, Solicity } from "../../../../domain/entities/Solicity";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";
import { formatDate } from "../../../../utils/functions";
import { StatusSolicity } from "../../../../utils/enums";

interface Props {

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error: string;
  data: CreateSolicity;
  entitySelected: EstablishmentEntity;
  solicitySaved: Solicity;
  isLoadingSend: boolean;
  timeline: PartialTimelineSolicty[]
  children?: React.ReactNode;
}
const SolicityDetailPresenter = (props: Props) => {
  if (props.error) {
    return (
      <ScreenMessage message={"Error al obtener tu solicitud"}
        type={props.error}>
        {props.children}

      </ScreenMessage>
    )
  }

  return (
    
    <>
      <section className='gap-4 lg:grid lg:grid-cols-[1fr,max-content]'>
        <div>
          <section className='mx-auto mb-4 space-y-4 rounded-lg border border-gray-100 bg-primary/10 p-4'>
            <h2 className='rounded-md bg-primary p-4 text-left text-xl font-bold text-white'>
              Información de la Entidad
            </h2>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>N° SAIP</span>
              <span className='text-slate-600'>{props.solicitySaved.number_saip}</span>
            </div>
            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Nombre de la Entidad</span>
              <span className='text-slate-600'>
                {props.entitySelected.name}
              </span>
            </div>
            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>RUC de la Entidad</span>
              <span className='text-slate-600'>{props.entitySelected.identification}</span>
            </div>
            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Fecha</span>
              <span className='text-slate-600'>{new Date(props.solicitySaved.date).toLocaleString()}</span>
            </div>
            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Ciudad</span>
              <span className='text-slate-600'>{props.solicitySaved.address}</span>
            </div>
          </section>

          <section className='mx-auto mb-4 space-y-4 rounded-lg border border-gray-100 bg-primary/10 p-4'>
            <h2 className='rounded-md bg-primary p-4 text-left text-xl font-bold text-white'>
              Identificación del Solicitante
            </h2>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Nombre</span>
              <span className='text-slate-600'>{props.solicitySaved.first_name}</span>
            </div>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Apellido</span>
              <span className='text-slate-600'>{props.solicitySaved.last_name}</span>
            </div>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Correo electrónico</span>
              <span className='text-slate-600'>{props.solicitySaved.address}</span>
            </div>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Teléfono de Contacto</span>
              <span className='text-slate-600'>{props.solicitySaved.phone}</span>
            </div>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Género</span>
              <span className='text-slate-600'>{props.solicitySaved.gender}</span>
            </div>

            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Identificación Cultural</span>
              <span className='text-slate-600'>{props.solicitySaved.race_identification}</span>
            </div>
          </section>

          {props.solicitySaved.text !="" &&<section className='mx-auto mb-4 rounded-lg border border-gray-100 bg-custom-green/10 p-4'>
            <h2 className='mb-4 rounded-md bg-custom-green p-4 text-left text-xl font-bold text-white'>
              Petición completa
            </h2>

            <p className='mb-4 text-slate-600'>
              {props.solicitySaved.text}
            </p>

            <div className='flex items-center justify-end gap-4'>
              <p className='text-slate-600'>
                Envio: <span className='font-medium'>{props.solicitySaved.format_send}</span>
              </p>
              <p className='text-slate-600'>Recepción: <span className='font-medium'>{props.solicitySaved.format_receipt}</span></p>
            </div>
          </section>
          }
          {props.children}
          
        </div>

        <div className='mt-6 grow sm:mt-8 lg:mt-0'>
          <div className='space-y-6 rounded-lg border border-gray-300 p-6'>
            <h3 className='text-xl font-semibold text-gray-900'>Estado de la Solicitud</h3>

            <ol className='relative ms-3 border-s border-gray-300'>
              {
                props.timeline?.map(l =>(
                  <li className='mb-10 ms-6'>
                    <span
                      className='absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white ring-8 ring-gray-50'>
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'>
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M5 11.917 9.724 16.5 19 7.5'></path>
                      </svg>
                    </span>
                    <h4 className='mb-0.5 text-base font-semibold text-gray-900'>{formatDate(l.created_at)}</h4>
                    <p className='text-sm font-normal text-gray-500'>{StatusSolicity[l.status as keyof typeof StatusSolicity].value}</p>
                  </li>
                ))
              }
              

            </ol>
          </div>
        </div>
      </section>
    </>
  )
};

export default SolicityDetailPresenter;
