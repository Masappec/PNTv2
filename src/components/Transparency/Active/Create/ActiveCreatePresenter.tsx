import { Alert, Tabs, TabsRef } from "flowbite-react";
import Spinner from "../../../Common/Spinner";
import TemplateFileEntity from "../../../../domain/entities/TemplateFileEntity";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import DataTablePartial from "../../Partial/CreateFilePublication/DataTable";
import { Row } from "../../../../utils/interface";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import { ListUploadsFiles } from "../../Partial/CreateFilePublication/ListUploadsFiles";
import { Pagination } from "../../../../infrastructure/Api";
import { themeTabs } from "../../../Common/Tabs/Theme";
import { HiInformationCircle } from "react-icons/hi";



interface Props {

  title: string;
  handleSubmit: () => void;
  onEdit: () => void;
  setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageFile: (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => void;
  onSaveTable: (data: Row[][], template: TemplateFileEntity) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  isDisabled: boolean;
  templates: TemplateFileEntity[];
  filesPublication: FilePublicationEntity[];
  onChageLink: (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => void;
  dataTable: Array<{ id: number, data: Row[][] }>;
  numeralDetail: NumeralDetail | null;
  onGenerateFileFromTable: (file: File, index: TemplateFileEntity) => void;
  downloadTemplate: (id: number) => void;
  type: string
  files_uploaded_last: Pagination<FilePublicationEntity>
  addFileFromList: (file: FilePublicationEntity) => void
  onRemoveFileFromPublication: (index: number) => void;
  onCancel: () => void;
  onChangePage: (page: number) => void;
  DownloadFileFromUrl: (url: string) => void;
  loadingFiles: { name: string }[]
  tabRef?: React.RefObject<TabsRef>;
}


const getCurrentDate = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long'
  };
  return currentDate.toLocaleDateString(undefined, options);
};
const ActiveCreatePresenter = (props: Props) => {

  const currentDate = getCurrentDate();


  return (
    <>
      <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
        {props.type} | {currentDate}

      </h2>
      <section className='mb-8 flex flex-col items-center justify-center gap-8'>
        <h1 className='w-full text-left text-lg font-semibold text-gray-900'>
          {props.title}
        </h1>

        <section className='w-full'>
          <p className='max-w-max items-center text-sm text-primary'>
            Para actualizar la información de Transparencia Activa, primero seleccione la forma de
            publicación de los archivos haciendo clic en una de las pestañas para crear o cargar el
            conjunto de datos, metadatos y diccionario. Luego, confirme el contenido en la
            previsualización y presione el botón Guardar. Si no lo hace, los archivos no se almacenarán.
          </p>
          {
            props.error && (
              <Alert color="failure" icon={HiInformationCircle} onDismiss={() => props.setError("")}>
                <span className="font-medium">Error!</span> {props.error}
              </Alert>
            )
          }
          {
            props.success && (
              <Alert color="success" icon={HiInformationCircle} onDismiss={() => props.setSuccess("")}>
                <span className="font-medium">Exito!</span> {props.success}
              </Alert>
            )
          }
          {
            props.filesPublication.map((file, index) => {
              return (
                <article
                  key={'subido' + index}
                  className='grid w-1/4 max-w-2xl mt-5  grid-cols-[max-content,1fr] items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
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
                      className='inline-block text-sm font-semibold text-gray-900'
                      data-testid='flowbite-label'>
                      {file.description}

                    </label>
                    <button
                      onClick={() => props.onRemoveFileFromPublication(index)}
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

                  </section>
                </article>

              )

            })
          }
          <div className='mb-4 mt-8 border-b border-gray-300'>

            <Tabs aria-label="Datos"
              ref={props.tabRef} style="underline"
              theme={themeTabs}
            >
              <Tabs.Item title="Subir Archivos"

              >
                <section className='flex flex-col gap-4'>
                  <p className='max-w-3xl items-center text-sm text-primary'>
                    Utilice esta opción si tiene los archivos creados en formato CSV.
                  </p>
                  {
                    props.templates.map((template, index) => {
                      return (
                        <article className='flex flex-col' key={index}>
                          <label className='mb-4 block text-sm font-semibold text-gray-900' >
                            {template.name}
                          </label>
                          <input
                            multiple={false}
                            className='w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none'

                            onChange={(e) => props.onChageFile(e, template)}
                            type='file'
                            accept=".csv"
                            disabled={
                              props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                            }
                          />
                        </article>
                      )
                    })
                  }


                </section>

              </Tabs.Item>
              <Tabs.Item title="Agregar enlances"

              >
                <div className='mb-8 ' id='dashboard' role='tabpanel' aria-labelledby='dashboard-tab'>
                  <section className='flex flex-col gap-4'>
                    <p className='max-w-3xl items-center text-sm text-primary'>
                      Utilice esta opción si tiene los archivos publicados en un repositorio digital o en un
                      sitio web institucional.
                    </p>

                    {
                      props.templates.map((template, index) => {
                        return (

                          <div className='w-full max-w-md' key={index}>
                            <label
                              className='mb-4 inline-block text-sm font-semibold text-gray-900'
                              data-testid='flowbite-label'>
                              {template.name}
                            </label>
                            <input
                              className='block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                              type='text'
                              placeholder='Ingresar enlace'
                              name={template.name}
                              onChange={(e) => props.onChageLink(e, template)}
                              disabled={
                                props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                              }
                            />
                            {
                              props.loadingFiles.find((e) => e.name === template.name) && (
                                <Spinner />
                              )
                            }
                          </div>
                        );
                      })
                    }
                  </section>
                </div>

              </Tabs.Item>
              <Tabs.Item title="Crear documentos">
                {
                  props.templates.map((file, index) => {


                    return (
                      <DataTablePartial
                        data={props.dataTable.find((e) => e.id == file.id)?.data || [[]]}
                        handleCancel={() => { }}
                        index={index}
                        onCancel={() => { }}
                        handleSave={(fileDoc) => {
                          props.onGenerateFileFromTable(fileDoc, file)
                        }}
                        file={file.file}
                        onSaveTable={(data) => { props.onSaveTable(data, file) }}
                        key={index}
                        isSaved={props.filesPublication.find((e) => e.description.trim() === file.name.trim()) ? true : false}
                        title={file.name}
                        limit={props.numeralDetail?.templates.find((e) => e.id == file.id)?.maxInserts || undefined}
                      />
                    )

                  })
                }
              </Tabs.Item>
              <Tabs.Item title="Usar archivos Anteriores">
                <section className='flex flex-col gap-4'>
                  <p className='max-w-2xl items-center text-sm text-primary'>
                    Utilice esta opción si desea reutilizar archivos cargados en el último mes para crear el
                    archivo del mes actual.
                  </p>

                </section>
                <ListUploadsFiles
                  currentPage={props.files_uploaded_last.current}
                  files={props.files_uploaded_last.results}
                  onAddFileToPublication={props.addFileFromList}
                  onChangePage={props.onChangePage}
                  onDownloadFileFromUrl={props.DownloadFileFromUrl}
                  totalPages={props.files_uploaded_last.total_pages as number}

                />
              </Tabs.Item>
              <Tabs.Item title="Descargar Plantilla">
                <p className='max-w-3xl items-center text-sm text-primary'>
                  Si no tiene los formatos para los archivos, puede descargarlos desde esta opción. Se
                  proporcionarán plantillas vacías para que pueda crear y subir los archivos necesarios.
                </p>
                <section className='mt-4 grid max-w-xs grid-cols-1 gap-4'>
                  {
                    props.templates.map((template, index) =>
                      <button
                        key={index}
                        onClick={() => props.downloadTemplate(template.id)}
                        type='button'
                        className='inline-flex w-full items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-center text-xs font-medium text-gray-600 transition-colors hover:bg-primary hover:text-white focus:outline-none'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='24px'
                          viewBox='0 -960 960 960'
                          width='24px'
                          fill='currentColor'
                        ><path
                          d='m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z'
                        ></path>
                        </svg>
                        <span>Descargar Plantilla de {template.name}</span>
                      </button>
                    )
                  }
                </section>
              </Tabs.Item>
            </Tabs>
          </div>

          <div
            className='flex w-full flex-col flex-wrap items-end justify-end gap-4 border-t border-gray-300 pt-8'>
            <p className='max-w-3xl items-center text-sm text-primary'>
              Recuerde que si no presiona "Guardar", los archivos no se guardarán en el sistema.
            </p>
            <div className='flex items-center gap-4'>
              <button
                type='button'
                onClick={()=>props.onCancel()}
                className='inline-flex w-max items-center gap-2 rounded-md bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-600 hover:opacity-80'>
                <div className='inline-flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 -960 960 960'
                    width='24px'
                    fill='currentColor'
                  ><path
                    d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
                  ></path>
                  </svg>
                  <span>Cancelar</span>
                </div>
              </button>

              <button
                type='button'
                onClick={()=>props.handleSubmit()}
                className='inline-flex w-max items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 -960 960 960'
                  width='24px'
                  fill='currentColor'
                ><path
                  d='M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z'
                ></path>
                </svg>
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  )
  /* return (
     <div className="container w-full">
       <div className="flex items-center py-2 justify-center"></div>
       <form className="flex  -top-32 " >
         <section className="container px-2 mx-auto">
           <div className="sm:flex sm:items-center sm:justify-between">
             <div>
               <div className="flex items-center gap-x-3">
                 <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                   {props.type}
                 </h2>
               </div>
               <p className="text lg font-medium text-gray-800 mt-4 ">{currentDate}</p>
               <div className="flex items-center gap-x-3 mt-10">
               </div>
 
               <p className="text-lg font-semibold text-gray-800 dark:text-white">
                 {props.title}
               </p>
 
               <p className="mt-6 mb-10 text-base text-gray-500 dark:text-gray-300 font-semibold ">
                 Elija un método de carga
               </p>
 
             </div>
 
             <div className="flex items-center mt-4 +
                 w-auto gap-x-3">
               <Button
                 type="button"
                 onClick={props.onCancel}
                 className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                 text-white transition-colors duration-200 bg-slate-400
                                  rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-100">
                 <LuX className="w-5 h-5" />
                 <span>
                   Cancelar
                 </span>
               </Button>
 
 
               {props.loading ? (
                 <Spinner />
               ) : (
                 <Button
                   type="button"
                   className="flex items-center justify-center w-1/2 text-sm tracking-wide
                             text-white transition-colors duration-200  bg-primary-700  rounded-lg shrink-0 sm:w-auto gap-x-2 dark:hover:bg-blue-500"
                   disabled={props.isDisabled}
 
                   onClick={props.handleSubmit}
 
                 >
                   <FaArrowUp className="w-5 h-5 font-normal" />
                   <span>Cargar</span>
                 </Button>
               )}
             </div>
           </div>
           {
             props.error && (
               <Alert color="failure" icon={HiInformationCircle} onDismiss={() => props.setError("")}>
                 <span className="font-medium">Error!</span> {props.error}
               </Alert>
             )
           }
           {
             props.success && (
               <Alert color="success" icon={HiInformationCircle} onDismiss={() => props.setSuccess("")}>
                 <span className="font-medium">Exito!</span> {props.success}
               </Alert>
             )
           }
           <div className="flex flex-row m-2">
             {
               props.filesPublication.map((file, index) => {
                 return (
                   <Tooltip content={file.name} >
 
                     <div className="flex flex-col w-40 m-2 bg-slate-100 p-5 rounded-lg shadow-xl ">
                       <IconSearch type={file.name} />
                       <span className=" text-gray-500 dark:text-gray-300">
                         {file.name.length > 10 ? file.name.substring(0, 10) + "..." : file.name}
                       </span>
                       <span className=" text-gray-500 text-sm dark:text-gray-300 ">
                         {file.description.length > 10 ? file.description.substring(0, 10) + "..." : file.description}
                       </span>
                       <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                         <FaTrash className="cursor-pointer text-red-600" size={15} onClick={() => props.onRemoveFileFromPublication(index)} />
                       </span>
                     </div>
                   </Tooltip>
 
                 )
 
               })
             }
           </div>
           <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800"
             ref={props.tabRef}
           >
             <Tabs.Item title="Subir Archivos" >
               <div className="mt-5 xl:grid-cols-3 grid-cols-1 grid gap-5">
                 {
                   props.templates.map((template, index) => {
                     return (
                       <div>
                         <Dropzone
                           key={index}
                           handleChageLogo={(e) => props.onChageFile(e, template)}
                           id={template.id.toString()}
                           multiple={false}
                           type="csv"
                           label={template.name}
                           name="logo"
                           className={template.file != null ? (template.isValid ? "bg-green-200" : "bg-red-200") : ""}
                           accept=".csv"
                           disabled={
                             props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                           }
 
                         />
                         <Tooltip content={`Descargar plantilla de ${template.name}`}
                           placement="right-end"
                           className="flex items-center justify-center  text-sm"
                         >
 
                           <Button key={index} type="button"
                             onClick={() => props.downloadTemplate(template.id)}
                             className="flex items-center justify-center w-12 text-sm">
                             <span className=" dark:text-gray-300 font-semibold">
                               <CiSaveDown1 className="w-5 h-5 font-normal" />
                             </span>
                           </Button>
                         </Tooltip>
 
                       </div>
                     );
                   })
                 }
               </div>
             </Tabs.Item>
             <Tabs.Item title="Agregar enlances"
             
             >
               <div className="flex flex-row m-2">
 
                 {
                   props.templates.map((template, index) => {
                     return (
                       <div key={index} className=" flex flex-col m-2 w-60 mt-4 ">
                         <Label htmlFor="" value={`Link archivo de ${template.name}`} />
                         <TextInput placeholder="Ingresar link" type="url"
                           onChange={(e) => props.onChageLink(e, template)}
                           value={template.link || ""}
                           disabled={
                             props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                           }
                         />
                         {
                           props.loadingFiles.find((e) => e.name === template.name) && (
                             <Spinner />
                           )
                         }
                       </div>
                     );
                   })
                 }
               </div>
             </Tabs.Item>
             <Tabs.Item title="Crear documentos">
               {
                 props.templates.map((file, index) => {
 
 
                   return (
                     <DataTablePartial
                       data={props.dataTable.find((e) => e.id == file.id)?.data || [[]]}
                       handleCancel={() => { }}
                       index={index}
                       onCancel={() => { }}
                       handleSave={(fileDoc) => {
                         props.onGenerateFileFromTable(fileDoc, file)
                       }}
                       file={file.file}
                       onSaveTable={(data) => { props.onSaveTable(data, file) }}
                       key={index}
                       isSaved={props.filesPublication.find((e) => e.description.trim() === file.name.trim()) ? true : false}
                       title={file.name}
                       limit={props.numeralDetail?.templates.find((e) => e.id == file.id)?.maxInserts || undefined}
                     />
                   )
 
                 })
               }
             </Tabs.Item>
             <Tabs.Item title="Buscar archivos Subidos">
               <ListUploadsFiles
                 currentPage={props.files_uploaded_last.current}
                 files={props.files_uploaded_last.results}
                 onAddFileToPublication={props.addFileFromList}
                 onChangePage={props.onChangePage}
                 onDownloadFileFromUrl={props.DownloadFileFromUrl}
                 totalPages={props.files_uploaded_last.total_pages as number}
 
               />
             </Tabs.Item>
           </Tabs>
 
         </section>
       </form>
     </div>
   );*/
};

export default ActiveCreatePresenter;
