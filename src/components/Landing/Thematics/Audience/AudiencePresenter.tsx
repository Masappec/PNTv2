
import TablePublic from "../../../Common/TablePublic";
import { MapIsotipo } from "../../../Common/MapIsotipo";
import Input from "../../../Common/Input";
import Alert from "../../../Common/Alert";
import { AudienceResponse } from "../../../../infrastructure/Api/PublicDataApi/interface";
import Spinner from "../../../Common/Spinner";

interface Props {




  setName: (name: string) => void;
  onSelectDate: (year: number, month: number) => void;

  alert: {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string
  }
  setAlert: (alert: { type: 'success' | 'error' | 'warning' | 'info'; message: string }) => void;
  onSearch: () => void;
  loading: boolean;
  data: AudienceResponse[];

}
const AudiencePresenter = (props: Props) => {
  return (
    <main>
      <MapIsotipo />
      <section className='section-container my-16'>
        <header className='mb-8'>
          <h1 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
            Audiencias y Reuniones
          </h1>
          <p className='text-balance text-gray-600'>
            Revisa las audiencias y reuniones sostenidas por autoridades y servidores del jerarquíco superior.
          </p>
        </header>

        <form className='mb-4 w-full'>

          <div className='max-w-2xl'>
            <label className='text-sm font-medium text-gray-900'>Nombres y Apellidos</label>
            <div className='group relative'>
              <svg
                className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 24 24'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              ><path
                d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'
              ></path>
              </svg>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                type='text'
                placeholder='Escribe los apellidos y nombres de la persona a consultar'
                name='first_name'
                onChange={(e) => props.setName(e.target.value)}

              />
            </div>

          </div>

          <section className='mt-4 flex max-w-max items-center gap-4'>
            <Input
              placeholder={"Mes y Año"}

              onChange={(e) => {

                const [year, month] = e.target.value.split("-")
                props.onSelectDate(parseInt(year), parseInt(month))
              }}
              type="month"

              className="block w-full rounded-lg  text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </section>

          {
            props.loading ?
              <Spinner></Spinner> :
              <button
                onClick={() => { props.onSearch() }}
                type='button'
                disabled={props.loading}
                className='mt-8 rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                Buscar
              </button>
          }
        </form>
        {
          props.alert.message && (
            <Alert
              type={props.alert.type}
              message={props.alert.message}
              onClose={() => { props.setAlert({ type: 'info', message: '' }) }}
            />)
        }


        <div className='mt-8 h-min rounded-md bg-gray-100'>
          <TablePublic
            columns={[
              {
                title: "INSTITUCIÓN",
                render: (row) => (
                  <p>{row.institucion }</p>
                )
              },
              {
                title:'NOMBRE',
                render:(row)=>(
                  <p>{row.nombre}</p>
                )
              },
              {
                title: "ASUNTO",
                render: (row) => (
                  <p>{row.asunto }</p>
                )
              },
              {
                title: "FECHA",
                render: (row) => (
                  <p>{ row.fecha}</p>
                )
              },
              {
                title: "DESCRIPCIÓN",
                render: (row) => (
                  <p>{ row.descripcion}</p>
                )
              },
              {
                title: "ENLACE",
                render: (row) => (
                  <p>
                    <a href={row.enlace} target="_blank" rel="noreferrer"

                    className="text-primary hover:text-primary-dark">
                      Ver más
                    </a>
                  </p>
                )
              },



            ]
            }
            data={props.data}


          />
        </div>
      </section>
    </main>

  )
}

export default AudiencePresenter;
