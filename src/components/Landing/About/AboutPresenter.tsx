


const AboutPresenter = () => {
    return (
        <section className='section-container my-16 mb-20'>
            <h1 className='mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]'>Acerca de</h1>

            <article className='space-y-4 text-lg text-gray-800'>
                <p>
                    El Portal Nacional de Transparencia surge como respuesta para fortalecer el ejercicio del
                    derecho a la transparencia y el acceso a la información pública consagrados en la
                    &nbsp;
                    <span className='font-bold text-primary'
                    >Ley Orgánica de Transparencia y Acceso a la Información Pública</span>.
                </p>

                <p>
                    Esta herramienta es el resultado de un proceso de cocreación en el que intervino la&nbsp;
                    <span className='font-bold text-primary'>Defensoría del Pueblo</span> como órgano garante, servidores
                    responsables de los&nbsp;
                    <span className='font-bold text-primary'>Comités de Transparencia</span> de distintas entidades,
                    representantes de organizaciones de&nbsp;
                    <span className='font-bold text-primary'>sociedad civil</span> y <span
                        className='font-bold text-primary'>academia</span>, incorporando innovación a la forma tradicional que por más de 15 años se ha
                    implementado desde las distintas instituciones públicas.
                </p>

                <div className='border-l-4 border-primary bg-blue-50 p-4'>
                    <p className='text-primary'>
                        Esta herramienta es el resultado de un proceso de cocreación con la Defensoría del
                        Pueblo, servidores responsables de los Comités de Transparencia de distintas entidades,
                        representantes de organizaciones de sociedad civil y academia.
                    </p>
                </div>

                <p>
                    Cualquier consulta sobre esta herramienta puede dirigirse a&nbsp;
                    <a
                        href='mailto:email@dpe.gob.ec'
                        className='font-bold text-primary underline underline-offset-2'>
                        email@dpe.gob.ec
                    </a>
                </p>
            </article>
        </section>
    )
}

export default AboutPresenter