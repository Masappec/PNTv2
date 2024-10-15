
const AboutPresenter = () => {
  return (
    <section className='section-container my-16 mb-20'>
      <h1 className='mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
        Acerca de
      </h1>

      <article className='space-y-4 text-lg text-gray-800 text-justify'>
        <p className='font-bold text-primary'>
        El PNT es administrado por la Defensoría del Pueblo de Ecuador y los datos que cada entidad publica son 
        responsabilidad de los Comités de Transparencia o de las personas delegadas como Oficiales de Transparencia y 
        que articulan acciones con las Unidades Poseedoras de la Información (UPI). </p>

        <p>
        Su cocreación ha sido posible gracias a la asistencia técnica de la Cooperación Alemana GIZ, a través de la 
        Consultora MASAPP y a las contrapartes ciudadanas del Compromiso n.°6 del Segundo Plan de Acción de Estado 
        Abierto (PAGA) integrado por la Fundación Ciudadanía y Desarrollo (FCD), Fundación DATALAT y la Fundación de 
        Ayuda por Internet (FUNDAPI), con el acompañamiento de la Subsecretaría de Gobierno Abierto de la Presidencia de 
        la República, por medio de la Dirección de Gobierno Abierto y del Grupo Núcleo de Estado Abierto Ecuador.
        </p>

        <p>
        Cualquier consulta sobre esta herramienta puede dirigirse a la Dirección Nacional de Promoción y Garantía del 
        Acceso a la Información Pública de la Coordinación General de Transparencia y Acceso a la Información Pública de 
        la Defensoría del Pueblo de Ecuador, como órgano rector en materia de transparencia y acceso a la información 
        pública, al siguiente correo electrónico: 
        <span className="font-bold text-primary"> <a href='mailto:accesoinformacion@dpe.gob.ec' className='font-bold text-primary underline underline-offset-2'>accesoinformacion@dpe.gob.ec.</a></span>.
        </p>

        <p>
        Se aclara que en este correo electrónico institucional no se responderán solicitudes de acceso a la información 
        que sean dirigidas a los sujetos obligados al cumplimiento de la LOTAIP, su reglamento general y de los 
        instrumentos legales, metodológicos y técnicos emitidos por la rectoría, los cuales deben ser canalizados
         directamente desde las funcionalidades del Portal Nacional de Transparencia como único repositorio nacional de 
         cumplimiento obligatorio para los sujetos obligados descritos en el artículo 8 de la LOTAIP.
        </p>


      </article>
    </section>
  );
};

export default AboutPresenter;
