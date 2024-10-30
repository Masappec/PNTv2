
const AboutPresenter = () => {
  return (
    <section className='section-container my-16 mb-20'>
      <h1 className='mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
        Acerca de
      </h1>

      <article className='space-y-4 text-lg text-gray-800 text-justify'>
        <p className='font-bold text-primary'>
        El Portal Nacional de Transparencia (PNT), en su versión mejorada (2.0), surge para fortalecer el ejercicio del 
        derecho humano de acceso a la información pública, dispuesto en la Ley Orgánica de Transparencia y Acceso a la 
        Información Pública (LOTAIP). Además, atiende a la necesidad de dinamizar, modernizar e innovar el cumplimiento 
        de esta ley para garantizar a la población información con estándares de calidad, que pueda reutilizarse de 
        manera libre y sin ningún tipo de restricciones.</p>
        
        <p>
        Esta herramienta es el resultado de un proceso de cocreación, o construcción colaborativa, liderado por la 
        Defensoría del Pueblo de Ecuador. Participaron personas servidoras públicas integrantes de los Comités de 
        Transparencia y personas delegadas como Oficiales de Transparencia de distintas entidades, así como 
        representantes de la academia y de organizaciones sociales que promueven el ejercicio y exigibilidad del derecho 
        humano de acceso a la información pública. Desde distintos espacios de participación efectuados durante el 2024, 
        contribuyeron con su experiencia, comentarios y sugerencias para desarrollar esta solución en su versión renovada.
        </p>

        <p>
        La Defensoría del Pueblo de Ecuador administra el portal, y los datos que cada entidad pública son responsabilidad
         de los Comités de Transparencia o de las personas delegadas como Oficiales de Transparencia, que articulan 
         acciones con las Unidades Poseedoras de la Información (UPI). 
         </p>

        <p>
        El PNT es posible gracias a la asistencia técnica del Programa SinCero II de la Cooperación Alemana GIZ, 
        mediante la Consultora MASAPP, y a las contrapartes ciudadanas del Compromiso n.° 6 del Segundo Plan de Acción 
        de Estado Abierto (PAGA), integrado por la Fundación Ciudadanía y Desarrollo (FCD), Fundación DATALAT y la 
        Fundación de Ayuda por Internet (FUNDAPI). Se contó con el acompañamiento de la Subsecretaría de Gobierno Abierto 
        de la Presidencia de la República, por medio de la Dirección de Gobierno Abierto y del Grupo Núcleo de Estado 
        Abierto Ecuador.
        </p>
        
        <p>
        Cualquier consulta sobre esta herramienta puede dirigirse al correo electrónico: 
        <span className="font-bold text-primary"> <a href='mailto:accesoinformacion@dpe.gob.ec' className='font-bold text-primary underline underline-offset-2'>accesoinformacion@dpe.gob.ec</a></span>, 
        de la Dirección Nacional de Promoción y Garantía del Acceso a la Información Pública de la Coordinación General 
        de Transparencia y Acceso a la Información Pública de la Defensoría del Pueblo de Ecuador. En este correo 
        electrónico institucional no se responderán solicitudes de acceso a la información dirigidas a los sujetos 
        obligados al cumplimiento de la LOTAIP, su reglamento general y de los instrumentos legales, metodológicos y 
        técnicos emitidos por la rectoría. Estos requerimientos deben canalizarse directamente desde el PNT como único 
        repositorio nacional de cumplimiento obligatorio para las entidades descritas en el artículo 8 de la LOTAIP.
        </p>

      </article>
    </section>
  );
};

export default AboutPresenter;
