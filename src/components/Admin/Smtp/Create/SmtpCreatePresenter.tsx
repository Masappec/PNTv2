import { FormEvent } from "react";

import Alert from "../../../Common/Alert";
import SmtpEntity from "../../../../domain/entities/SmtpEntity";



interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setData: (name: string, value: string | number | boolean) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    data: SmtpEntity;
    edit: boolean;
    setEdit: (e: boolean) => void;
    onEdit: () => void;
}

const SmtpCreatePresenter = (props: Props) => {
    
   return(
    <>
           <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
               Configuración SMTP
           </h2>
           <p className='my-8 max-w-3xl items-center text-sm text-primary'>
               Configura el servidor SMTP para el envío de correos electrónicos. Por favor tenga en cuenta que
               cambiar estos valores puede afectar el envío de correos electrónicos.
           </p>
           <section className='flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center'>
               
               <form
                   onSubmit={props.handleSubmit}
                   className='mx-auto w-full max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
                   {
                       props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                   }
                   {
                       props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                   }

                   <section className='grid grid-cols-1 items-start justify-center gap-4 text-start'>
                       <div>
                           <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                               Servidor STMP
                           </label>
                           <input
                               className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                               type='text'
                               name='host'
                               placeholder='Ingresa el servidor SMTP, ej: smtp.gmail.com'
                               required
                               onChange={(e) => props.setData("host", e.target.value)}
                               value={props.data.host}
                           />
                       </div>

                       <div>
                           <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                               Usuario STMP
                           </label>
                           <input
                               className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                               type='text'
                               name='user'
                               placeholder='Ingresa el usuario SMTP'
                               required
                               onChange={(e) => props.setData("user", e.target.value)}
                               value={props.data.auth.user}
                           />
                       </div>

                       <div>
                           <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                               Puerto STMP
                           </label>
                           <input
                               className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                               type='number'
                               name='port'
                               min='1'
                               placeholder='Ingresa el puerto SMTP, ej: 587'
                               required
                               onChange={(e) => props.setData("port", e.target.value)}
                               value={props.data.port}
                           />
                       </div>

                       <div>
                           <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                               Contraseña STMP
                           </label>
                           <input
                               className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                               type='password'
                               name='pass'
                               placeholder='Ingresa la contraseña SMTP'
                               required
                               onChange={(e) => props.setData("pass", e.target.value)}
                               value={props.data.auth.pass}
                           />
                       </div>

                       <div className='flex items-center'>
                           <input
                               type='checkbox'
                               id='secure'
                               className='h-5 w-5 rounded accent-primary'
                               
                               onChange={(e) => props.setData("secure", e.target.checked)}
                               checked={props.data.secure}
                           />
                           <label
                               htmlFor='secure'
                               className='ml-2 text-sm font-medium text-gray-900'
                               >
                               Activar TSL
                           </label>
                       </div>
                       <button
                           type='submit'
                           className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                           Guardar
                       </button>
                   </section>
               </form>
           </section>
    </>

   )
   
   /* return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">


            </div>
            <form className="flex  mt-5" onSubmit={props.handleSubmit}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Configuración SMTP
                                </h2>


                            </div>

                        </div>
                        <div className="flex items-center mt-4 gap-x-3">


                            {
                                props.loading ? <Spinner /> :
                                    _edit ?
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                            <LuCheck className="w-5 h-5" />
                                            <span>
                                                Guardar
                                            </span>
                                        </button> :
                                        <button
                                            type="button"
                                            onClick={() => props.onEdit()}

                                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                dark:hover:bg-blue-500 dark:bg-blue-600">
                                            <LuFileEdit className="w-5 h-5" />
                                            <span>
                                                Editar
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


                        <div className="flex  flex-col m-2">

                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Servidor SMTP"} width="w-60"

                                    name="host"
                                    onChange={(e) => props.setData("host", e.target.value)}
                                    value={props.data.host}
                                    disabled={!props.edit}
                                />
                            </div>
                            <div className="flex  flex-col m-2">
                                <Input type={"text"}
                                    placeholder={"Usuario SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("user", e.target.value)}
                                    value={props.data.auth.user}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"number"}
                                    placeholder={"Puerto SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("port", e.target.value)}
                                    value={props.data.port}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex  flex-col m-2">
                                <Input type={"password"}
                                    placeholder={"Contraseña SMTP"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("pass", e.target.value)}
                                    value={props.data.auth.pass}
                                    disabled={!props.edit}
                                />
                            </div>

                            <div className="flex start-4">
                                <Input type={"checkbox"}
                                    placeholder={"TSL"} width="w-60"
                                    name=""
                                    onChange={(e) => props.setData("secure", e.target.checked)}
                                    checked={props.data.secure}
                                    disabled={!props.edit}
                                />
                            </div>

                        </div>
                    </div>

                </section>
            </form>
        </div>
    )*/

}

export default SmtpCreatePresenter