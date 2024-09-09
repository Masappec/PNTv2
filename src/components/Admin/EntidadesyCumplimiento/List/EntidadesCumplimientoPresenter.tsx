import EstablishmentEntity from '../../../../domain/entities/Establishment'

import Table from '../../../Common/Table/index'

import { OptionsSelectCreate } from '../../../../infrastructure/Api/Establishment/interface'

interface Props {
  establishments: EstablishmentEntity[]
  error: string | null
  onSearch: (search: string) => void
  onAdd: () => void
  onImport: () => void
  onFilter: () => void
  onEdit: (role: EstablishmentEntity) => void
  search: string
  setSeach: (search: string) => void
  page: number
  setPage: (page: number) => void
  setVisibleModal: (visible: boolean) => void
  visibleModal: boolean
  onConfirmDelete: () => void
  onCancelDelete: () => void
  onDelete: (RoleEntity: EstablishmentEntity) => void
  selectedEstablishment: EstablishmentEntity | null
  from: number
  to: number
  total: number
  totalPage: number
  options: OptionsSelectCreate
  onChangeFilter: (name: string) => void
  functionSelected: string
}

const EntidadesyCumplimientoPresenter = (props: Props) => {
  return (
    <>
      <h2 className="mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary">Entidades Y Cumplimiento</h2>

      <div className="flex items-center py-5 justify-center"></div>
      <section className="mb-4 flex items-end justify-between gap-4 sm:flex-row sm:items-end">
        <div className="w-full max-w-md">
          <div className="group relative">
            <svg
              className="absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-focus-within:text-primary group-hover:text-primary"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Buscar por nombre de la institución"
              onChange={e => {
                props.onSearch(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 text-sm">Desde</label>
            <input
              type="date"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Desde"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 text-sm">Hasta</label>
            <input
              type="date"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Hasta"
            />
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <button
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={props.onFilter}
            >
              Buscar
            </button>
          </div>
        </div>
      </section>
      <section className="h-min rounded-md bg-gray-100">
        <Table
          show={false}
          columns={[
            {
              title: 'Transparencia Activa',
              render: (row: EstablishmentEntity) => <p className="text-left text-wrap">{row.name}</p>
            },
            {
              title: 'Trasnparencia Pasiva',
              render: (row: EstablishmentEntity) => <p className="text-left">{row.abbreviation}</p>
            },
            {
              title: 'Transparencia Focalizada',
              render: (row: EstablishmentEntity) =>
                row.is_active ? (
                  <span className="mx-auto block w-full max-w-20 rounded-md border border-custom-green bg-custom-green/5 px-2 py-1 text-xs font-normal text-custom-green sm:text-sm">
                    Activo
                  </span>
                ) : (
                  <span className="mx-auto block w-full max-w-20 rounded-md border border-custom-red bg-custom-red/5 px-2 py-1 text-xs font-normal text-custom-red sm:text-sm">
                    Inactivo
                  </span>
                )
            },
            {
              title: 'Transparencia Colaborativa',
              render: (row: EstablishmentEntity) =>
                row.is_active ? (
                  <span className="mx-auto block w-full max-w-20 rounded-md border border-custom-green bg-custom-green/5 px-2 py-1 text-xs font-normal text-custom-green sm:text-sm">
                    Activo
                  </span>
                ) : (
                  <span className="mx-auto block w-full max-w-20 rounded-md border border-custom-red bg-custom-red/5 px-2 py-1 text-xs font-normal text-custom-red sm:text-sm">
                    Inactivo
                  </span>
                )
            },
            {
              title: 'Acciones',
              classes: 'flex w-full items-center justify-center gap-2',
              render: (row: EstablishmentEntity) => (
                <>
                  <button
                    onClick={() => {
                      props.onEdit(row)
                    }}
                    className="flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                    <span>Editar</span>
                  </button>

                  {row.is_active ? (
                    <button
                      onClick={() => {
                        props.onDelete(row)
                      }}
                      className="flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                        <path d="m674-456-50-50 69-70-69-69 50-51 70 70 69-70 51 51-70 69 70 70-51 50-69-69-70 69Zm-290-24q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21Zm-.21-73Zm0 361Z" />
                      </svg>
                      <span>Inactivar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        props.onDelete(row)
                      }}
                      className="flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                        <path d="M695-456 576-575l51-51 68 68 153-152 51 50-204 204Zm-311-24q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-312Zm0-312Z" />
                      </svg>
                      <span>Activar</span>
                    </button>
                  )}
                </>
              )
            }
          ]}
          currentPage={props.page}
          data={props.establishments}
          description="aquí se muestran las instituciones registradas en el sistema"
          length={props.establishments.length}
          onAdd={props.onAdd}
          onFilter={props.onFilter}
          onImport={props.onImport}
          onSearch={props.onSearch}
          search={props.search}
          textAdd="Agregar Institución"
          textImport="Importar Instituciones"
          title="Instituciones"
          key={'roles-table'}
          onChangePage={props.setPage}
          from={props.from}
          to={props.to}
          total={props.total}
          totalPages={props.totalPage}
        />
      </section>
    </>
  )
}
export default EntidadesyCumplimientoPresenter
