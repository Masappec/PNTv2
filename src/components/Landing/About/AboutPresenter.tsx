const AboutPresenter = () => {
  return (
    <section className="section-container my-16 mb-20">
      <h1 className="mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]">
        Acerca de
      </h1>

      <article className="space-y-4 text-lg text-gray-800">
        <p>
          El Portal Nacional de Transparencia (PNT) renovado, surge como
          respuesta para fortalecer el ejercicio del derecho a la transparencia
          y el acceso a la información pública consagrados en la &nbsp;
          <span className="font-bold text-primary">
            Ley Orgánica de Transparencia y Acceso a la Información Pública
          </span>{" "}
          y en atención a la necesidad de dinamizar, modernizar e innovar el
          ejercicio de su cumplimiento.
        </p>

        <p>
          Esta herramienta es el resultado de un proceso de cocreación, o
          construcción colaborativa, liderado por la&nbsp;
          <span className="font-bold text-primary">
            Defensoría del Pueblo,
          </span>{" "}
          en el que participaron servidores responsables de los Comités de
          Transparencia de distintas entidades, representantes de organizaciones
          de&nbsp;
          <span className="font-bold text-primary">
            Comités de Transparencia
          </span>{" "}
          de distintas entidades, representantes de organizaciones de&nbsp;
          <span className="font-bold text-primary">sociedad civil</span> y{" "}
          <span className="font-bold text-primary">academia</span>, quienes en
          distintos espacios de participación que se realizaron durante 2024,
          aportaron con su experiencia, comentarios y sugerencias para
          considerar en el desarrollo de esta solución.
        </p>

        <div className="border-l-4 border-primary bg-blue-50 p-4">
          <p className="text-primary">
            Esta herramienta es el resultado de un proceso de cocreación, o
            construcción colaborativa, liderado por la Defensoría del Pueblo, en
            el que participaron servidores responsables de los Comités de
            Transparencia de distintas entidades, representantes de
            organizaciones de sociedad civil y academia.
          </p>
        </div>
        <p>
          El PNT es administrado por la Defensoria del Pueblo y los datos que
          cada entidad publica son responsabilidad de los Comités de
          Transparencia conformados en cada una de ellas. Su creación fue
          posible gracias al aporte de la Cooperación Técnica Alemana GIZ, y al
          compromiso del Segundo Plan de Acción de Estado Abierto de Ecuador,
          con el acompañamiento de las contrapartes Fundación Ciudadanía y
          Desarrollo y Fundación Datalat, y la asistencia técnica de la
          Fundación de Ayuda por Internet (FUNDAPI).
        </p>
        
        <p>
          Cualquier consulta sobre esta herramienta puede dirigirse a&nbsp;
          <a
            href="mailto:email@dpe.gob.ec"
            className="font-bold text-primary underline underline-offset-2"
          >
            email@dpe.gob.ec
          </a>
          <p>
          Se destaca que en este correo no se responderán solicitudes de acceso
          a la información o requerimientos de entidades, los cuales deben ser
          canalizados desde las funcionalidades de este Portal.
        </p>
        </p>
        
      </article>
    </section>
  );
};

export default AboutPresenter;
