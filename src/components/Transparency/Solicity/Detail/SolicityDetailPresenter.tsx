import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { PartialTimelineSolicty, Solicity, TimeLinePresenter } from "../../../../domain/entities/Solicity";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";
import { formatDate } from "../../../../utils/functions";
import { StatusSolicity } from "../../../../utils/enums";
import { useEffect, useState } from "react";
import SessionService from "../../../../infrastructure/Services/SessionService";
import UserEntity from "../../../../domain/entities/UserEntity";
import { FaEye, FaFilePdf, FaLink } from "react-icons/fa";
import { BiDownArrowAlt } from "react-icons/bi";

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
  onDownloadPdf: () => void;
  timeline_response: TimeLinePresenter[];
  onDownloadFromUrl: (url: string, name: string) => void;

}
const SolicityDetailPresenter = (props: Props) => {


  const [user, setUserSession] = useState<UserEntity | null>(null)

  useEffect(() => {
    const session = SessionService.getUserData()
    setUserSession(session)
  }, [])
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
              <span className='text-slate-600'>{new Date(props.solicitySaved.date).toLocaleString('es-ES', {
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',

              })}</span>
            </div>
            <div className='grid sm:grid-cols-[300px,1fr]'>
              <span className='font-bold text-gray-700'>Ciudad</span>
              <span className='text-slate-600'>{props.solicitySaved.city}</span>
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
              <span className='text-slate-600'>{props.solicitySaved.email}</span>
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

          {props.solicitySaved.text != "" && <section className='mx-auto mb-4 rounded-lg border border-gray-100 bg-primary-600/10 p-4'>
            <h2 className='mb-4 rounded-md bg-primary-600 p-4 text-left text-xl font-bold text-white'>
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
          {
            props.timeline_response?.map((response, index) => (
              <section key={index} className={`
                    ${response.user_id != parseInt(props.solicitySaved.user_created) ?
                  ' bg-primary-200/10 p-4  mx-auto mb-4 rounded-lg border border-gray-100'
                  : 'bg-primary-600/10  p-4 mx-auto mb-4 rounded-lg border  border-gray-100'
                }`}>
                <h2 className={`mb-4 
                        ${response.user_id != parseInt(props.solicitySaved.user_created) ?
                    'bg-primary-900 ' : 'bg-primary-600'
                  }
                        rounded-md  p-4 text-left text-xl font-bold text-white`}>

                  {response.user_id != parseInt(props.solicitySaved.user_created) ?
                    response.other_title :
                    response.title
                  }
                </h2>

                <p className='mb-4 text-slate-600'>
                  {response.text}
                </p>
                {
                  response.attachments.map(file => (

                    <article
                      key={'subido' + index}
                      className='grid w-1/4 max-w-2xl mt-5  grid-cols-[max-content,1fr] items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
                      <FaLink
                        className="text-green-500"
                      />
                      <section className='flex items-center justify-between'>
                        <label
                          className='inline-block text-sm font-semibold text-gray-900'
                          data-testid='flowbite-label text-wrap'>
                          {file.description}

                        </label>
                        <a
                          href={file.url_download as string}
                          target="_blank"
                          className='mx-auto flex items-center gap-2 rounded-md border border-primary-500 px-2 py-1 text-xs font-medium text-primary-500 hover:bg-primary-500 hover:text-white'>
                          <FaEye
                            className="text-primary hove:text-white "
                          />
                          <span>Ver</span>
                        </a>

                      </section>
                    </article>
                  ))
                }
                {
                  response.files.map(file => (

                    <article
                      key={'subido' + index}
                      className='grid xl:w-1/4
                      sm:w-1/2
                      max-w-3xl mt-5 w-auto 
                      grid-cols-[max-content,1fr]
                       items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
                      <svg
                        className='h-7 w-7 text-primary'
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='currentColor'
                      ><path
                        d='M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z'
                      ></path>
                      </svg>
                      <section className='flex items-center justify-between'>
                        <label
                          className='inline-block text-sm font-semibold text-gray-900 text-wrap'
                          data-testid='flowbite-label'>
                          {file.description}

                        </label>
                        <button
                          type="button"
                          onClick={() => props.onDownloadFromUrl(file.url_download as string, file.name)}
                          className='mx-auto flex items-center gap-2 rounded-md border border-green-500 px-2 py-1 text-xs font-medium text-green-500 hover:bg-green-500 hover:text-white'>
                          <BiDownArrowAlt />
                          <span>Descargar</span>
                        </button>

                      </section>
                    </article>
                  ))
                }

                <p className='text-right font-medium text-slate-600'>{new Date(response.created_at).toLocaleString()}</p>
              </section>
            ))
          }
          {props.children}

        </div>

        <div className='mt-6 grow sm:mt-8 lg:mt-0'>
          <div className='space-y-6 rounded-lg border border-gray-300 p-6'>
            <h3 className='text-xl font-semibold text-gray-900'>Estado de la Solicitud</h3>

            <ol className='relative ms-3 border-s border-gray-300'>
              {
                props.timeline?.map(l => (
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
                    <p className='text-sm font-normal text-gray-500'>{

                      user && user.group?.find(g => g.name.toLowerCase() == "ciudadano") ?
                        StatusSolicity[l.status as keyof typeof StatusSolicity].value : StatusSolicity[l.status as keyof typeof StatusSolicity].value_2

                    }</p>
                  </li>
                ))
              }


            </ol>
            {
              props.onDownloadPdf && <button
                type="button"
                className='w-full rounded-md bg-primary text-white font-semibold py-2'
                onClick={props.onDownloadPdf}
              >
                Descargar PDF
                <FaFilePdf className='ml-2 inline-block' />
              </button>
            }
          </div>
        </div>
      </section>


    </>
  )
};

export default SolicityDetailPresenter;
