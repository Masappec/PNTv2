import { Label, Select, TextInput } from "flowbite-react";
import { Form } from "react-router-dom";
import Table from "../../Common/Table";



const AnnualReportPresenter = () => {

  return (
    <>
      <h2 className="mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary">
        {"Reporte de Informe Anual"}
      </h2>
      <Form className="grid grid-cols-1 items-start justify-center gap-4 text-start ">
        <section className="container w-[500px]">
          <h2 className="text-xl font-semibold text-primary">Institución</h2>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="small" value="Nombre de entidad:" className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />

          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="small" value=" Función del estado a la que pertenece:" className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />

          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="small" value="Fecha de emisión del informe: " className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />

          </div>
        </section>
        <section className="w-[500px]">
          <h2 className="text-xl font-semibold text-primary">Artículo 10</h2>
          <p className="text-base font-medium text-primary">
            Custodia de la información
          </p>

          <div>
            <div className="mb-1 block mt-5]">
              <Label htmlFor="small" value="¿Se han creado y se mantienen registros públicos de manera profesional para el manejo y archivo de la información y documentación?" className="text-gray-500" />
            </div>
            <Select className="w-44 mt-3" required>
              <option>Si</option>
              <option>No</option>

            </Select>
          </div>
          <div>
            <div className="mb-1 block mt-5">
              <Label htmlFor="small" value="Norma archivística utilizada:" className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
          <div>
            <div className="mb-1 block mt-5">
              <Label htmlFor="small" value="Comentario/aclaración:" className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">Artículo 11</h2>
          <p className="font-semibold text-primary my-3 w-[500px]">Detalle de las solicitudes de acceso a la información y el trámite dado a cada una de ellas; con indicación del tiempo que ha tomado en responder
          </p>
          <Table
            show={false}
            columns={[
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Total de SAIP recibidas en el año",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Respondidas en hasta 10 días Cantidad / Porcentaje",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Respondidas entre 11 y 15 días Cantidad / Porcentaje",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Respondidas en más de 15 días Cantidad / Porcentaje",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "No respondidas Cantidad / Porcentaje",
              },

            ]}
            description={""}
            length={0}
            data={[]}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />
          <div className="w-[500px]">

            <p className="text-primary font-semibold my-3 ">Ingrese el número de solicitudes de acceso a la información pública que su entidad recibió y gestionó en el período enero-diciembre
            </p>
            <div>
              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Cantidad" className="text-gray-500" />
              </div>
              <TextInput id="small" type="text" sizing="sm" className="w-[500px]" />
            </div>
            <div>
              <div className="mb-1 block mt-5 ">
                <Label htmlFor="small" value="¿Su entidad recibió y gestionó una cantidad  diferente de solicitudes de las que registró en el Portal Nacional de Transparencia?" className="text-gray-500" /></div>
              <Select className="w-44 " required>
                <option>Si</option>
                <option>No</option>

              </Select>
            </div>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Cantidad de SAIP registradas en el portal
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>
              <div className="mb-2 block mt-4">
                <Label htmlFor="small" value="Descripción de las razones por las que no fueron ingresadas al portal
 " className="text-gray-500" />
              </div>
              <TextInput id="small" type="text" sizing="sm" />

            </div>
            <p className="text-primary font-semibold  my-3">¿Las solicitudes de acceso a la información pública que NO fueron registradas en el Portal Nacional de Transparencia, fueron respondidas?
            </p>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Cantidad 
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Comentario/aclaración" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
          </div>





        </section>
        <section>
          <div className="w-[500px]">
            <h2 className="text-xl font-semibold text-primary">Artículo 11</h2>
            <p className="font-semibold text-primary my-3">Informe semestral actualizado sobre el listado índice de información reservada
            </p>
            <div>
              <div className="mb-1 block ">
                <Label htmlFor="small" value="Información reservada" className="text-gray-500" /></div>
              <Select className="w-44 " required>
                <option>Si</option>
                <option>No</option>

              </Select>
            </div>
            <p className="text-base font-medium text-gray-500">
              En caso de seleccionar Sí, debe completar los siguientes campos:</p>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Reservados: " className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Confidencial (Ley Orgánica de Empresas Públicas): " className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>
              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Secreto: " className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>
              <div className="mb-2 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Secreto: " className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>
              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Secretísimo:" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>

            <p className="font-semibold text-primary my-3">El índice de la información clasificada como reservada, detallando la fecha de la resolución de clasificación de la reserva y el período de vigencia de la misma
            </p>
          </div>
          <table className='w-full divide-y divide-gray-200 mt-5'>
            <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
              <tr className='text-xs'>
                <th scope='col' className='rounded-tl-md w-72 '>Tema</th>
                <th scope='col' className="w-72">Base Legal</th>
                <th scope='col' className="w-28">Fecha de la clasificación de la información reservada - semestral</th>
                <th scope='col' className='rounded-tr-md w-60'>Periodo de vigencia de la clasificación de la reserva</th>
                <th scope='col' className='rounded-tl-md w-20'>Se ha efectuado ampliación</th>
                <th scope='col' className="w-60">Descripción de la ampliación</th>
                <th scope='col' className="w-32">Fecha de la ampliación</th>
                <th scope='col' className='rounded-tr-md w-60'>Período de vigencia de la ampliación</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>

              <tr>
                <td>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                    onChange={() => { }}
                  />
                </td>
                <td>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'


                    onChange={() => { }}
                  />

                </td>
                <td >
                  <TextInput id="small" type="date" sizing="sm" className="w-28" />
                </td>
                <td>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'
                    placeholder=''
                    name='data'
                    onChange={() => { }}

                  />
                </td>
                <td>
                  <Select className="w-16 " required>
                    <option>Si</option>
                    <option>No</option>

                  </Select>
                </td>
                <td>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                    onChange={() => { }}
                  />
                </td> <td>
                  <TextInput id="small" type="date" sizing="sm" className="w-32" />
                </td> <td>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                    onChange={() => { }}
                  />
                </td>

              </tr>

            </tbody>
          </table>
          <footer className='w-full bg-gray-100'>
            <section className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
              <button
                type="button"
                onClick={() => { }}
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

        <section>
          <h2 className="text-xl font-semibold text-primary">Artículo 19</h2>
          <p className="text-base font-medium text-primary ">- Transparencia activa:
          </p>
          <p className="font-semibold text-gray-500 text-sm my-3">Obligaciones generales

          </p>
          <Table
            show={false}
            columns={[
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Mes",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Artículo ",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Numeral",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Publicado (Sí/No)",
              },

              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Fecha de publicación",
              },

            ]}
            description={""}
            length={0}
            data={[]}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />
          <p className="font-semibold text-gray-500 my-3 text-sm">Obligaciones específicas

          </p>
          <Table
            show={false}
            columns={[
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Mes",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Artículo ",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Numeral",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Publicado (Sí/No)",
              },

              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Fecha de publicación",
              },

            ]}
            description={""}
            length={0}
            data={[]}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />
          <p className="text-base font-medium text-primary ">- Transparencia colaborativa:
          </p>

          <Table
            show={false}
            columns={[
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Mes",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Artículo ",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Numeral",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Publicado (Sí/No)",
              },

              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Fecha de publicación",
              },

            ]}
            description={""}
            length={0}
            data={[]}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />

          <p className="text-base font-medium text-primary ">- Transparencia focalizada:
          </p>

          <Table
            show={false}
            columns={[
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Mes",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Artículo ",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Numeral",
              },
              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Publicado (Sí/No)",
              },

              {
                render: () => (
                  <p
                    className="text-left"
                  >{ }</p>
                ),
                title: "Fecha de publicación",
              },

            ]}
            description={""}
            length={0}
            data={[]}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />
        </section>
        <section className="w-[500px]">
          <h2 className="text-xl font-semibold text-primary">Artículo 40</h2>
          <p className="font-semibold text-primary my-3">Gestión Oficiosa
          </p>
          <div>
            <div className="mb-1 block mt-5">
              <Label htmlFor="small" value="¿Alguna persona que solicitó información indicó que la recibida no era de calidad, o existió ambigüedad en el manejo de la información registrada en el Portal Nacional de Transparencia o sobre la información que se difunde en la propia institución, y resolvió solicitar la corrección en la difusión de la información; o alguna persona solicitó la intervención del Defensor del Pueblo para que se corrija y se brinde mayor claridad y sistematización en la organización de la información ?" className="text-gray-500" />
            </div>
            <Select className="w-44 mt-3" required>
              <option>Si</option>
              <option>No</option>

            </Select>
          </div>
          <div>

            <div className="mb-1 block mt-5">
              <Label htmlFor="small" value="Cantidad de gestiones oficiosas" className="text-gray-500" />
            </div>
            <TextInput id="small" type="number" sizing="sm" />
          </div>
          <div>

            <div className="mb-1 block mt-5">
              <Label htmlFor="small" value="Descripción específica de la corrección de información" className="text-gray-500" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
        </section>
        <section >
          <h2 className="text-xl font-semibold text-primary">Artículo 42 de la LOTAIP</h2>
          <p className="font-semibold text-primary my-3">Sanciones administrativas
          </p>
          <div>
            <div className="mb-1 block mt-5 w-[500px]">
              <Label htmlFor="small" value="¿Personas servidoras públicas de su entidad o personas del sector privado han recibido sanciones por omisión o negativa en el acceso a la información pública?" className="text-gray-500" />
            </div>
            <Select className="w-44 mt-3" required>
              <option>Si</option>
              <option>No</option>

            </Select>
          </div>

          <table className='w-full divide-y divide-gray-200 mt-5 '>
            <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
              <tr className='text-sm'>
                <th scope='col' className='rounded-tl-md'>Ley</th>
                <th scope='col'>Cantidad</th>
                <th scope='col' className='rounded-tr-md'>Descripción específica de la sanción administrativa</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              <tr>
                <td>

                  <span className='text-sm font-medium text-gray-400 flex justify-start'>
                    Ley Orgánica del Servicio Público
                  </span>
                </td>
                <td>
                  <TextInput id="small" type="number" sizing="sm" className="w-48" />
                </td>

                <td className='text-center'>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                  />
                </td>
              </tr>
              <tr>
                <td>

                  <span className='text-sm text-gray-400 flex font-medium justify-start'>
                    Ley Orgánica de la Contraloría General del Estado
                  </span>
                </td>
                <td>
                  <TextInput id="small" type="number" sizing="sm" className="w-48" />
                </td>

                <td className='text-center'>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                  />
                </td>
              </tr>
              <tr>
                <td>

                  <span className='text-sm text-gray-400 flex font-medium justify-start'>
                    Ley Orgánica del Sistema Nacional de Contratación Pública
                  </span>
                </td>
                <td>
                  <TextInput id="small" type="number" sizing="sm" className="w-48" />
                </td>

                <td className='text-center'>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                  />
                </td>
              </tr>
              <tr>
                <td>

                  <span className='text-sm font-medium text-gray-400 flex justify-start'>
                    Ley Orgánica de Participación Ciudadana
                  </span>
                </td>
                <td>
                  <TextInput id="small" type="number" sizing="sm" className="w-48" />
                </td>

                <td className='text-center'>
                  <textarea
                    className='w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80'

                  />
                </td>
              </tr>
            </tbody>
          </table>
          <section className="w-[500px]">
            <h2 className="text-xl font-semibold text-primary mt-7">Disposición transitoria séptima</h2>
            <div>
              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Número de temas clasificados como Secreto: " className="text-gray-500" />
              </div>
              <Select className="w-44 " required>
                <option>Si</option>
                <option>No</option>

              </Select>
            </div>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Cantidad 
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Descripción específica del programa de difusión, capacitación y fortalecimiento sobre la LOTAIP
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="text" sizing="sm" />
            </div>
          </section>
          <section className="w-[500px]">
            <h2 className="text-xl font-semibold mt-7 text-primary">Disposición transitoria octava</h2>
            <div>
              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="¿Sí su entidad es un establecimiento educativo público o privado, desarrolló actividades y programas de promoción del derecho de acceso a la información pública, sus garantías y referente a la transparencia sus garantías y referente a la transparencia colaborativa? " className="text-gray-500" />
              </div>
              <Select className="w-44 " required>
                <option>Si</option>
                <option>No</option>

              </Select>
            </div>

            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Cantidad 
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>

            <div>

              <div className="mb-1 block mt-5">
                <Label htmlFor="small" value="Descripción específica de la actividad o programa desarrollado
" className="text-gray-500" />
              </div>
              <TextInput id="small" type="number" sizing="sm" />
            </div>
          </section>
          <div className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
            <button
              onClick={() => { }}
              type="button"
              className="inline-flex w-1/6 items-center mt-5 gap-2 rounded-lg bg-primary px-5 
                    py-2.5 text-center text-sm
                    font-medium text-white hover:opacity-80 focus:outline-none 
                    focus:ring-4 focus:ring-blue-300"
            >

              <span className="ml-10">Guardar</span>

            </button>
          </div>
        </section>


      </Form>


    </>
  )

}

export default AnnualReportPresenter;