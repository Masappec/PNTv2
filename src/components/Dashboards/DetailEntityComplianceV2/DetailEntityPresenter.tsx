import Table from '../../Common/Table';
import NumeralEntity from '../../../domain/entities/NumeralEntity';
import { formatDate2 } from '../../../utils/functions';
import TransparencyFocusEntity from '../../../domain/entities/TransparencyFocus';
import TransparencyCollab from '../../../domain/entities/TransparencyCollab';

interface Props {

  data: NumeralEntity[];
  dataC: TransparencyCollab[];
  dataF: TransparencyFocusEntity[];
  current: number;
  pageSize: number;
  from: number;
  to: number;
  total: number;
  total_pages: number;
  onPaginate: (page: number) => void;
  month: number;
  year: number;
  establishment_name: string;
  type: string;
  isRezagado: (date: string|null, month: number, year: number) => boolean
}
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
]

const DetailEntityPresenter = (props: Props) => {
  return (
    <main>

      <div className="flex-col">
        <h2 className='text-2xl font-semibold text-center text-gray-900'>Transparencia Activa</h2>
        <ul className='mb-12 mt-8'>
          <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
            <h2 className='font-medium text-gray-600'>Institución:</h2>
            {props.establishment_name}
          </li>
          <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
            <h2 className='font-medium text-gray-600'>Mes:</h2>
            {meses[props.month - 1]}
          </li>
          <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
            <h2 className='font-medium text-gray-600'>Año:</h2>
            {props.year}
          </li>
        </ul>
      </div>




      <section className='h-min rounded-md bg-gray-100'>
        {
          props.type === "TA" && (
            <Table
              show={false}
              columns={[
                {
                  title: "Numeral LOTAIP",
                  render: (row) => (
                    <p className="text-left text-wrap">{row.name.replace("Numeral", "") + " " + row.description}</p>
                  )
                },
                {
                  title: "Estado",
                  render: (row) => (

                    row.published ? props.isRezagado(row?.publication?.published_at || null, props.month, props.year) ? (

                      <span className='h-max rounded-md bg-yellow-400 px-2 py-1 text-xs font-normal text-white'>
                        Publicado con atraso
                      </span>
                    ) : (
                      <span className='h-max rounded-md bg-custom-green px-2 py-1 text-xs font-normal text-white'>
                        Publicado
                      </span>
                    ) : (
                          <span className='h-max rounded-md bg-custom-red px-2 py-1 text-xs font-normal text-white'>
                            No publicado
                          </span>
                    )
                  )
                },
                {
                  title: "Fecha y hora de carga",
                  render: (row) => (
                    <p className="text-left" >{row.publication ? formatDate2(row.publication?.published_at) : "No publicado"}</p>
                  )
                },




              ]}
              data={props.data}

              from={props.from}
              onChangePage={props.onPaginate}
              to={props.to}
              total={props.total}
              totalPages={props.total_pages}

            />
          )}
        {
          props.type === "TC" && (
            <Table
              show={false}
              columns={[
                {
                  title: "Numeral LOTAIP",
                  render: (row) => (
                    <p className="text-left text-wrap">{row.numeral.description}</p>
                  )
                },
                {
                  title: "Estado",
                  render: (row) => (

                    row.published ? props.isRezagado(row?.published_at || null, props.month, props.year) ? (

                      <span className='h-max rounded-md bg-yellow-400 px-2 py-1 text-xs font-normal text-white'>
                        Publicado con atraso
                      </span>
                    ) : (
                      <span className='h-max rounded-md bg-custom-green px-2 py-1 text-xs font-normal text-white'>
                        Publicado
                      </span>
                    ) : (
                      <span className='h-max rounded-md bg-custom-red px-2 py-1 text-xs font-normal text-white'>
                        No publicado
                      </span>
                    )
                  )
                },
                {
                  title: "Fecha y hora de carga",
                  render: (row) => (
                    <p className="text-left" >{row.published_at != "" ? formatDate2(row.published_at) : "No publicado"}</p>
                  )
                },




              ]}
              data={props.dataC}

              from={props.from}
              onChangePage={props.onPaginate}
              to={props.to}
              total={props.total}
              totalPages={props.total_pages}

            />
          )}
        {
          props.type === "TF" && (
            <Table
              show={false}
              columns={[
                {
                  title: "Numeral LOTAIP",
                  render: (row) => (
                    <p className="text-left text-wrap">{row.numeral.description}</p>
                  )
                },
                {
                  title: "Estado",
                  render: (row) => (

                    row.published ? props.isRezagado(row?.published_at || null, props.month, props.year) ? (

                      <span className='h-max rounded-md bg-yellow-400 px-2 py-1 text-xs font-normal text-white'>
                        Publicado con atraso
                      </span>
                    ):(
                      <span className='h-max rounded-md bg-custom-green px-2 py-1 text-xs font-normal text-white'>
                        Publicado
                      </span>
                    ) : (
                      <span className='h-max rounded-md bg-custom-red px-2 py-1 text-xs font-normal text-white'>
                        No publicado
                      </span>
                    )
                  )
                },
                {
                  title: "Fecha y hora de carga",
                  render: (row) => (
                    <p className="text-left" >{row.published_at != "" ? formatDate2(row.published_at) : "No publicado"}</p>
                  )
                },




              ]}
              data={props.dataF}

              from={props.from}
              onChangePage={props.onPaginate}
              to={props.to}
              total={props.total}
              totalPages={props.total_pages}

            />
          )}
      </section>
    </main>

  )
}

export default DetailEntityPresenter
