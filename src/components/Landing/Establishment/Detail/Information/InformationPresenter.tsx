import { Link } from "react-router-dom";



const InformationPresenter = ()=>{

    return (

        <>
            <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end' id="information">
                <h2 className='text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                    Solicita información
                </h2>
                <div className='h-[1px] w-full bg-gray-400'>


                  
                </div>
            </section>
            <p>
                <p>Para solicitar información pública, tienes varias opciones disponibles que te permitirán acceder a la información de manera sencilla y eficiente. Puedes realizar tu solicitud a través de nuestro portal web, donde tendrás la posibilidad de gestionar y rastrear tus peticiones de manera centralizada.</p>

                <p className='mt-4'>
                    <strong>Opciones para Solicitar Información:</strong></p>

                <p className='mt-4'>
                    <strong>1. Iniciando Sesión:</strong>
                    &nbsp;
                    Si ya tienes una cuenta, simplemente
                    &nbsp;
                    <Link to={'/ingreso'}>
                        <span className='font-bold text-primary'>inicia sesión</span>
                    </Link>
                    &nbsp;
                    en el portal con tus credenciales. Una vez dentro, podrás acceder a la sección de solicitudes de información, donde podrás especificar los detalles de la información que necesitas. También podrás ver el estado de tus solicitudes anteriores y recibir notificaciones sobre el progreso de las mismas.
                </p>

                <p className='mt-4'>
                    <strong>2. Registrándote:</strong>
                    &nbsp;
                    Si aún no tienes una cuenta, puedes
                    &nbsp;
                    <Link to={'/registro'}>
                        <span className='font-bold text-primary'>registrarte</span>
                    </Link>
                    &nbsp;
                    fácilmente en nuestro portal. El proceso de registro es rápido y solo te tomará unos minutos. Una vez registrado, podrás acceder a todas las funcionalidades del portal, incluyendo la creación de nuevas solicitudes de información, el seguimiento de tus peticiones y la recepción de actualizaciones en tiempo real.
                </p>

                <p className='mt-4'>
                    <strong>Beneficios del Portal:</strong></p>

                <ul className="mt-4 list-disc list-inside">
                    <li><strong>Acceso Centralizado:</strong> Todas tus solicitudes y respuestas estarán disponibles en un solo lugar, facilitando la gestión y el seguimiento de la información.</li>
                    <li><strong>Notificaciones:</strong> Recibirás notificaciones automáticas cuando haya actualizaciones sobre tus solicitudes, asegurándote de estar siempre informado.</li>
                    <li><strong>Historial de Solicitudes:</strong> Podrás ver un historial completo de todas tus solicitudes, lo que te permitirá tener un registro detallado de la información que has solicitado anteriormente.</li>
                </ul>

                <p className='mt-4'>
                    Para comenzar, simplemente visita nuestro portal web e
                    &nbsp;
                    <Link to={'/ingreso'}>
                        <span className='font-bold text-primary'>inicia sesión</span>
                    </Link>
                    &nbsp;
                    o
                    &nbsp;
                    <Link to={'/registro'}>
                        <span className='font-bold text-primary'>regístrate</span>
                    </Link>
                    &nbsp;
                    para acceder a todas estas funcionalidades y más. Si tienes alguna duda o necesitas asistencia durante el proceso, nuestro equipo de soporte estará encantado de ayudarte.
                </p>



            </p>
        </>
    )
}

export default InformationPresenter;