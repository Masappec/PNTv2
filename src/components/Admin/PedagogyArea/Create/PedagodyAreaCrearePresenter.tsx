import { FormEvent } from "react";

import PedagogyAreaEntity from "../../../../domain/entities/PedagodyAreaEntity";
import { Tabs } from "flowbite-react";
import { themeTabs } from "../../../Common/Tabs/Theme";
import Alert from "../../../Common/Alert";

interface PedagogyAreaCreatePresenterProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setData: (name: string, value: string | number | boolean) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  data: PedagogyAreaEntity;
  edit: boolean;
  setEdit: (e: boolean) => void;
  onEdit: () => void;
  onAddQuestion: () => void;
  onDropQuestion: (index: number) => void;
  onAddTutorial: () => void;
  onDropTutorial: (index: number) => void;
  onAddNormative: () => void;
  onDropNormative: (index: number) => void;
  onChangeValue: (
    root: string,
    name: string,
    value: string,
    index: number
  ) => void;
}

const PedagogyAreaCreatePresenter = (
  props: PedagogyAreaCreatePresenterProps
) => {


  return(
    <>
      <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
        {"Area Pedagógica"}

      </h2>
      <form className='mt-8' onSubmit={props.handleSubmit}>
        <p className='max-w-3xl items-center text-sm text-primary'>
          Gestiona la información de normativas, tutoriales y preguntas frecuentes del área pedagógica
          de la plataforma. Ingresa los datos y presiona "Guardar" para que los cambios se reflejen en
          la plataforma.
        </p>
        {
          props.error && (
            <Alert
              message={props.error}
              type='error'
              onClose={() => props.setError('')}
            />
          )
        }
        {
          props.success && (
            <Alert
              message={props.success}
              type='success'
              onClose={() => props.setSuccess('')}
            />
          )
        }
        <Tabs aria-label="Datos"
           style="underline"
          theme={themeTabs}
          className='mb-4 mt-8 border-b border-gray-300'
        >
          <Tabs.Item title="¿Qué puedo hacer en este portal?">


            <div className='my-8'>
              <h4 className='my-4 text-sm font-semibold text-gray-900'>Preguntas Frecuentes</h4>
              <section className='h-min rounded-md bg-gray-100'>
                <section className='scrollbar w-full overflow-auto'>
                  <table className='w-full divide-y divide-gray-200'>
                    <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
                      <tr className='text-sm'>
                        <th scope='col' className='rounded-tl-md'>PREGUNTA</th>
                        <th scope='col'>RESPUESTA</th>
                        <th scope='col' className='rounded-tr-md'>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {props.data.faq.map((e, i) => (<tr>
                        <td>
                          <textarea
                            className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                            placeholder='Ingresa la pregunta'
                            name='data'
                            value={e.question}
                            rows={4}
                            onChange={(e) => props.onChangeValue("faq", "question", e.target.value, i)}
                          />
                          <span className='text-xs text-gray-400 flex justify-end'>
                            {e.question.length}/3000
                          </span>
                        </td>
                        <td>
                          <textarea
                            className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                            placeholder='Ingresa la respuesta'
                            name='data'
                            value={e.answer}
                            rows={4}

                            onChange={(e) => props.onChangeValue("faq", "answer", e.target.value, i)}

                          />
                          <span className='text-xs text-gray-400 flex justify-end'>
                            {e.answer.length}/3000
                          </span>
                        </td>

                        <td className='text-center'>
                          <button
                            type="button"

                            onClick={() => props.onDropQuestion(i)}
                            className='mx-auto flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              height='20px'
                              viewBox='0 -960 960 960'
                              width='20px'
                              fill='currentColor'>
                              <path
                                d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'
                              ></path>
                            </svg>
                            <span>Eliminar</span>
                          </button>
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </section>
                <footer className='w-full bg-gray-100'>
                  <section className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
                    <button
                    type="button"
                      onClick={() => props.onAddQuestion()}
                      className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='currentColor'
                      ><path
                        d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                      ></path>
                      </svg>
                      <span>Añadir fila</span>
                    </button>
                  </section>
                </footer>
              </section >
            </div >
          </Tabs.Item>
          <Tabs.Item title="¿Qué información voy a encontrar?"

          >

            <div className='my-8'>
              <h4 className='my-4 text-sm font-semibold text-gray-900'>Vídeo Tutoriales</h4>
              <section className='h-min rounded-md bg-gray-100'>
                <section className='scrollbar w-full overflow-auto'>
                  <table className='w-full divide-y divide-gray-200'>
                    <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
                      <tr className='text-sm'>
                        <th scope='col' className='rounded-tl-md'>TÍTULO</th>
                        <th scope='col'>DESCRIPCIÓN</th>
                        <th scope='col'>URL</th>
                        <th scope='col' className='rounded-tr-md'>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>
                      {props.data.tutorials.map((e, i) => (
                        <tr>
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresar Titulo'
                              name='data'
                              required
                              onChange={(value) => props.onChangeValue(
                                "tutorials",
                                "title",
                                value.target.value,
                                i
                              )}
                              rows={4}
                              value={e.title}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                              {e.title.length}/3000
                            </span>
                          </td>
                          
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresar unidad'
                              rows={4}
                              name='data'
                              required
                              onChange={(value) => props.onChangeValue(
                                "tutorials",
                                "description",
                                value.target.value,
                                i
                              )}
                              value={e.description}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                              {e.description.length}/3000
                            </span>
                          </td>
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresar nivel de los procesos de la estructura'
                              name='data'
                              required
                              rows={4}
                              onChange={(value) => props.onChangeValue(
                                "tutorials",
                                "url",
                                value.target.value,
                                i
                              )}
                              value={e.url}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                              {e.url.length}/3000
                            </span>
                          </td>
                          <td className='text-center'>
                            <button
                              type="button"

                              onClick={() => props.onDropTutorial(i)}
                              className='mx-auto flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                height='20px'
                                viewBox='0 -960 960 960'
                                width='20px'
                                fill='currentColor'>
                                <path
                                  d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'
                                ></path>
                              </svg>
                              <span>Eliminar</span>
                            </button>
                          </td>
                        </tr>))}
                    </tbody>
                  </table>
                </section>
                <footer className='w-full bg-gray-100'>
                  <section className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
                    <button
                      type="button"

                      onClick={() => props.onAddTutorial()}
                      className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='currentColor'
                      ><path
                        d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                      ></path>
                      </svg>
                      <span>Añadir fila</span>
                    </button>
                  </section>
                </footer>
              </section>
            </div >

          </Tabs.Item>
          <Tabs.Item title="¿Deben las entidades responder mis solicitudes?"

          >
            <div className='my-8'>
              <h4 className='my-4 text-sm font-semibold text-gray-900'>Normativa</h4>
              <section className='h-min rounded-md bg-gray-100'>

                <section className='scrollbar w-full overflow-auto'>
                  <table className='w-full divide-y divide-gray-200'>
                    <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
                      <tr className='text-sm'>
                        <th scope='col' className='rounded-tl-md'>TÍTULO</th>
                        <th scope='col'>DESCRIPCIÓN</th>
                        <th scope='col'>URL</th>
                        <th scope='col' className='rounded-tr-md'>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>
                      {props.data.normatives.map((e, i) => (
                        <tr>
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresa el título de la normativa'
                              name='data'
                              onChange={(value) => props.onChangeValue(
                                "normatives",
                                "title",
                                value.target.value,
                                i
                              )}
                              rows={4}
                              value={e.title}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                              {e.title.length}/3000
                            </span>
                          </td>
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresa la descripción de la normativa'
                              name='data'
                              onChange={(value) => props.onChangeValue(
                                "normatives",
                                "description",
                                value.target.value,
                                i
                              )}
                              rows={4}
                              value={e.description}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                            {e.description.length}/3000
                            </span>
                          </td>
                          <td>
                            <textarea
                              className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              placeholder='Ingresa la URL donde se encuentra la normativa'
                              name='data'
                              onChange={(value) => props.onChangeValue(
                                "normatives",
                                "url",
                                value.target.value,
                                i
                              )}
                              value={e.url}
                              rows={4}
                            />
                            <span className='text-xs text-gray-400 flex justify-end'>
                              {e.url.length}/3000
                            </span>
                          </td>
                          <td className='text-center'>
                            <button
                              type="button"

                              onClick={() => props.onDropNormative(i)}
                              className='mx-auto flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                height='20px'
                                viewBox='0 -960 960 960'
                                width='20px'
                                fill='currentColor'>
                                <path
                                  d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'
                                ></path>
                              </svg>
                              <span>Eliminar</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <footer className='w-full bg-gray-100'>
                  <section className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
                    <button
                      type="button"

                      onClick={() => props.onAddNormative()}
                      className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 -960 960 960'
                        width='24px'
                        fill='currentColor'
                      ><path
                        d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                      ></path>
                      </svg>
                      <span>Añadir fila</span>
                    </button>
                  </section>
                </footer>
              </section>
            </div>
            </Tabs.Item>

          </Tabs>
        

        


  <div
    className='flex w-full flex-col flex-wrap items-end justify-end gap-4 border-t border-gray-300 pt-8'>
    <p className='max-w-3xl items-center text-sm text-primary'>
      Recuerde que si no presiona "Guardar", los registros no se guardarán en el sistema.
    </p>
    <div className='flex items-center gap-4'>
      <button
        type='submit'
        
        className='inline-flex w-max items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80'
        data-astro-source-loc='1045:150'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 -960 960 960'
          width='24px'
          fill='currentColor'
          data-astro-source-loc='1052:15'
        ><path
          d='M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z'
          data-astro-source-loc='1052:15'></path>
        </svg>
        <span data-astro-source-loc='1056:17'>Guardar</span>
      </button>
    </div>
  </div>
      </form >
    </>
  )

  /*return (
    <div className="container max-h-max mx-auto">
      <div className="flex items-center py-5 justify-center"></div>
      <form className="flex  mt-5" onSubmit={props.handleSubmit}>
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Area Pedagógica
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-x-3">
              {props.loading ? (
                <Spinner />
              ) : _edit ? (
                <button
                  type="submit"
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                            text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuCheck className="w-5 h-5" />
                  <span>Guardar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => props.onEdit()}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuFileEdit className="w-5 h-5" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-10">
            {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}
            {props.success && (
              <Alert
                message={props.success}
                type="success"
                onClose={() => props.setSuccess("")}
              />
            )}

            <div className="flex flex-col m-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Normativas
              </h3>
              {props.data.normatives.map((e, i) => (
                <>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-full m-2">
                      <Input
                        placeholder="Titulo"
                        value={e.title}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "title",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="Descripción"
                        value={e.description}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "description",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="URL"
                        value={e.url}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "url",
                            value.target.value,
                            i
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col m-2">
                      {_edit && (
                        <div className="rounded-full border bg-red-500 border-red-500 w-7 h-7 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => props.onDropNormative(i)}
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
              {_edit && (
                <div className="flex items-center justify-center w-full mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      props.onAddNormative();
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                  >
                    <LuPlusCircle className="w-5 h-5" />
                    <span>Agregar Normativa</span>
                  </button>
                </div>
              )}
              <hr className="my-5"></hr>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Vídeos Tutoriales
              </h3>
              {props.data.tutorials.map((e, i) => (
                <>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-full m-2">
                      <Input
                        placeholder="Titulo"
                        value={e.title}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "title",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="Descripción"
                        value={e.description}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "description",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="URL"
                        value={e.url}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "url",
                            value.target.value,
                            i
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col m-2">
                      {_edit && (
                        <div className="rounded-full border bg-red-500 border-red-500 w-7 h-7 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => props.onDropTutorial(i)}
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
            </div>
            {_edit && (
              <div className="flex items-center justify-center w-full mt-5">
                <button
                  type="button"
                  onClick={() => {
                    props.onAddTutorial();
                  }}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuPlusCircle className="w-5 h-5" />
                  <span>Agregar Tutorial</span>
                </button>
              </div>
            )}

            <hr className="my-5"></hr>

            <div className="flex  flex-col m-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Preguntas Frecuentes
              </h3>
              <Collapse
                edit={_edit}
                items={props.data.faq.map((e) => {
                  return {
                    content: e.answer,
                    title: e.question,
                  };
                })}
                itemsOpen={itemsOpen}
                setItemsOpen={set_itemsOpen}
                key={0}
                onDrop={props.onDropQuestion}
                isDroppeable={_edit}
                onContentChange={(index, content) => {
                  props.onChangeValue("faq", "answer", content, index);
                }}
                onTitleChange={(index, title) => {
                  props.onChangeValue("faq", "question", title, index);
                }}
              />

              <div className="flex items-center justify-center w-full mt-5">
                {_edit && (
                  <button
                    type="button"
                    onClick={() => {
                      props.onAddQuestion();
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                  >
                    <LuPlusCircle className="w-5 h-5" />
                    <span>Agregar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );*/
};

export default PedagogyAreaCreatePresenter;
