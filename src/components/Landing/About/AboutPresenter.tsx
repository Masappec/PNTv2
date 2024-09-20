const AboutPresenter = () => {
  return (
    <section className='section-container my-16 mb-20'>
      <h1 className='mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
        Acerca de
      </h1>

      <article className='space-y-4 text-lg text-gray-800 text-justify'>
        <p className='font-bold text-primary'>
          La Defensoría del Pueblo de Ecuador (DPE) es la Institución Nacional
          de Derechos Humanos y de la Naturaleza, que ejerce como órgano rector
          en materia de transparencia y acceso a la información pública.
        </p>

        <div className='border-l-4 border-primary bg-blue-50 p-4'>
          <p className='text-primary'>
            El Portal Nacional de Transparencia (PNT) en su versión mejorada
            (2.0), surge como respuesta para fortalecer el ejercicio del derecho
            humano de acceso a la información pública, consagrado en la &nbsp;
            <span className='font-bold text-primary'>
              Ley Orgánica de Transparencia y Acceso a la Información Pública
              (LOTAIP)
            </span>{' '}
            y en atención a la necesidad de dinamizar, modernizar e innovar su
            cumplimiento para garantizar a la población información con
            estándares de calidad y que pueda reutilizarla de manera libre y sin
            ningún tipo de restricciones.
          </p>
        </div>

        <p>
          Esta herramienta es el resultado de un proceso de cocreación, o
          construcción colaborativa, liderado por la{' '}
          <span className='font-bold text-primary'>
            Defensoría del Pueblo de Ecuador
          </span>
          , en el que participaron personas servidoras públicas integrantes de
          los Comités de Transparencia y de personas Oficiales de Transparencia
          de distintas entidades; representantes de la
          <span className='font-bold text-primary'> academia</span> y de
          organizaciones{' '}
          <span className='font-bold text-primary'>sociales</span> que promueven
          el ejercicio y exigibilidad del derecho humano de acceso a la
          información pública y aportan a la transparencia de la gestión;
          quienes desde distintos espacios de participación realizados durante
          el 2024, aportaron con su experiencia, comentarios y sugerencias que
          contribuyeron al desarrollo de esta solución en su versión renovada.
        </p>

        <p>
          El PNT es administrado por la Defensoría del Pueblo de Ecuador y los
          datos que cada entidad publica son responsabilidad de los Comités de
          Transparencia o de las personas Oficiales de Transparencia,
          conformados por Unidades Poseedoras de la Información (UPI).
        </p>

        <p>
          Su cocreación ha sido posible gracias a la asistencia técnica de la
          Cooperación Alemana GIZ, a través de la Consultora MASAPP y a las
          contrapartes ciudadanas del Compromiso n.°6 del Segundo Plan de Acción
          de Estado Abierto (PAGA) de la Fundación Ciudadanía y Desarrollo
          (FCD), Fundación DATALAT y la Fundación de Ayuda por Internet
          (FUNDAPI), con el acompañamiento de la Subsecretaría de Gobierno
          Abierto de la Presidencia de la República y del Grupo Núcleo de Estado
          Abierto.
        </p>

        <p>
          Cualquier consulta sobre esta herramienta puede dirigirse a la
          Dirección Nacional de Promoción y Garantía del Acceso a la Información
          Pública de la Coordinación General de Transparencia y Acceso a la
          Información Pública de la Defensoría del Pueblo de Ecuador como órgano
          rector en materia de transparencia y acceso a la información
          pública:&nbsp;
          <a
            href='mailto:accesoinformacion@dpe.gob.ec'
            className='font-bold text-primary underline underline-offset-2'
          >
            accesoinformacion@dpe.gob.ec
          </a>
          .
        </p>
        <p>
          Se aclara que en este correo electrónico institucional no se
          responderán solicitudes de acceso a la información o requerimientos de
          entidades, los cuales deben ser canalizados desde las funcionalidades
          del Portal Nacional de Transparencia como único repositorio nacional
          de cumplimiento obligatorio para los sujetos obligados descritos en el
          artículo 8 de la LOTAIP.
        </p>
      </article>
    </section>
  );
};

export default AboutPresenter;
