
import { MapIsotipo } from "../../../Common/MapIsotipo";
import { PersonalRemunerations } from "../../../../infrastructure/Api/PublicDataApi/interface";
import CustomInputSearch from "../../../Common/CustomInputSearch";
import { ColourOption } from "../../../../utils/interface";
import Alert from "../../../Common/Alert";
import Spinner from "../../../Common/Spinner";
import TablePublic from "../../../Common/TablePublic";
interface Props {

  onSearch: () => void;
  onNameChange: (value: string) => void;
  onInstitutionChange: (value: string) => void;
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  data: PersonalRemunerations[];
  alert: {
    type: 'info' | 'success' | 'warning' | 'error',
    message: string
  }
  setAlert: (e: { type: 'info' | 'success' | 'warning' | 'error', message: string }) => void;
  isSearching: boolean;
}
const PersonalPresenter = (props: Props) => {
  return (

    <main>
      <MapIsotipo />
      <section className='section-container my-16'>
        <header className='mb-8'>
          <h1 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
            Personal y Remuneraciones
          </h1>
          <p className='text-balance text-gray-600'>
            Encuentra información sobre remuneraciones y cargos de personas que laboran en el sector
            público.
          </p>
        </header>

        <form className='mb-4 w-full'>
          <div className='mb-4 max-w-2xl'>
            <label className='text-sm font-medium text-gray-900'>Apellidos y nombres</label>
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
                placeholder='Escribe apellidos y nombres de la persona a consultar.'
                name='first_name'
                onChange={(e) => props.onNameChange(e.target.value)}

                required
              />
            </div>
          </div>

          <div className='max-w-2xl'>

            <CustomInputSearch

              loadOptions={props.loadOptions}
              onSearch={props.onSearch}
              onSelect={(e) => props.onInstitutionChange(e.value)}
            />
          </div>
          {
            props.isSearching ? <Spinner /> : <button
              type='button'
              onClick={() => { props.onSearch() }}
              className='mt-8 rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>

              Buscar

            </button>
          }

        </form>
        {
          props.alert.message ? (
            <Alert type={props.alert.type} message={props.alert.message}
              onClose={() => props.setAlert({ type: 'info', message: '' })}
            />

          ) : null
        }
        <div className="mt-8 h-min rounded-md bg-gray-100">
          <TablePublic<PersonalRemunerations>
            
            columns={[
              {
                title: "APELLIDOS Y NOMBRES",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.nombre}
                  </p>
                ),
              },
              {
                title: "PUESTO INSTITUCIONAL",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.puesto}</p>
                ),

              },
              {
                title: "UNIDAD A LA QUE PERTENECE",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.unidad}</p>
                ),

              },
              {
                title: "REGÍMEN LABORAL",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.regimen}</p>
                ),

              },
              {
                title: "GRADO O ESCALA",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.grado}</p>
                ),

              },
              {

                title: "REMUNERACIÓN MENSUAL",
                render: (row) => (
                  <p>{row.remuneracion}</p>
                ),

              }
            ]}

            data={props.data}





          />
        </div>

      </section>
    </main>


  )
}

export default PersonalPresenter;
