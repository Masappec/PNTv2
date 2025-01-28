import { Link } from "react-router-dom";



const InformationPresenter = () => {

    return (

        <>
            <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end' id="information">
                <h2 className='text-balance text-2xl font-normal leading-tight md:text-[25px]'>
                    Solicita información
                </h2>
                <div className='h-[1px] w-full bg-gray-400'>



                </div>
            </section>
            <p>

                <p>Para solicitar información a esta institución, debes contar con una cuenta creada en este Portal Nacional de Transparencia. Si ya tienes una cuenta,
                    simplemente  &nbsp;
                    <Link to={'/ingreso'}>
                        <span className='font-bold text-primary'>ingresa</span>
                    </Link>
                    &nbsp; al Portal con tu usuario y clave y realiza el envío de la solicitud.

                    Si no tienes una cuenta, &nbsp;
                    <Link to={'/registro'}>
                        <span className='font-bold text-primary'>regístrate</span>
                    </Link>
                    &nbsp;. Una vez que te hayas registrado,
                    podrás realizar el envío de la solicitud y realizar su seguimiento.
                    <br />

                    Para más información sobre este proceso, consulta la sección
                    &nbsp;
                    <Link to={'/area-pedagogica'}>
                        <span className='font-bold text-primary'>¿Qué puedo hacer en este portal?</span>
                    </Link>


                </p>




            </p>
        </>
    )
}

export default InformationPresenter;