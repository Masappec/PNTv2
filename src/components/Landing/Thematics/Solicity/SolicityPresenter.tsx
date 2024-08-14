
import TablePublic from "../../../Common/TablePublic";
import { MapIsotipo } from "../../../Common/MapIsotipo";
import { ColourOption } from "../../../../utils/interface";
import { FormulariosResponse } from "../../../../infrastructure/Api/PublicDataApi/interface";
import CustomInputSearch from "../../../Common/CustomInputSearch";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";

interface Props {

  onSearch: () => void;
  onInstitutionChange: (value: string) => void;
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  data: FormulariosResponse[];
  alert: {
    type: 'info' | 'success' | 'warning' | 'error',
    message: string
  }
  setAlert: (e: { type: 'info' | 'success' | 'warning' | 'error', message: string }) => void;
  loading: boolean;
}
const SolicityPresenter = (props: Props) => {
  return (
    <main>
      <MapIsotipo />

      <section className='section-container my-16'>
        <header className='mb-8'>
          <h1 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
            Formularios y Solicitudes
          </h1>
          <p className='text-balance text-gray-600'>
            Descarga los formularios y formatos que se requieren para realizar los trámites en las
            distintas entidades públicas.
          </p>
        </header>

        <form className='mb-4 w-full'>
          <div className='max-w-2xl'>
            <CustomInputSearch

              loadOptions={props.loadOptions}
              onSearch={props.onSearch}
              onSelect={(e) => props.onInstitutionChange(e.value)}
            />
          </div>
          {
            props.loading ?
              <Spinner></Spinner> :
          <button
            type='button'
            onClick={props.onSearch}
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
        <div className='mt-8 h-min rounded-md bg-gray-100'>
          <TablePublic

            columns={[
              {
                title: "INSTITUCIÓN",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    { row.institucion}</p>
                ),
              },
              {
                title:"AÑO Y MES",  
                render:(row)=>(
                  <p>
                    {row.anio} - {row.mes}</p>
                )
              },
              {
                title: "DENOMINACIÓN DEL SERVICIO",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[400px]">
                    { row.denominacion}</p>
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
              }


            ]
            }
            data={props.data}
            Notpaginable={props.data.length < 10}


          />
        </div>
      </section>
    </main>




  )
}

export default SolicityPresenter;

