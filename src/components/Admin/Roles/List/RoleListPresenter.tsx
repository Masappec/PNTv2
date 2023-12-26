import RoleEntity from "../../../../domain/entities/RoleEntity";
import Table from "../../../Common/Table";


interface Props {
    roles: RoleEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (role: RoleEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    nextPage: number
    previousPage: number
    setPage: (page: number) => void
}
const RoleListPresenter = (props:Props) => {

    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">


            </div>
            <div className="flex justify-between items-center mt-5">
                <Table
                columns={[
                    {
                        title: "Nombre",
                        render: (row: RoleEntity) => (
                            <p>{row.name}</p>
                        )
                    },
                    {
                        title: "Acciones",
                        render: (row: RoleEntity) => (
                            <div className="flex items-center">
                                <button 
                                onClick={() => {
                                    console.log(row.id)
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Editar
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Eliminar
                                </button>
                            </div>
                        )
                    }
                ]}
                currentPage={1}
                data={props.roles}
                description="Roles"
                length={props.roles.length}
                onAdd={props.onAdd}
                onFilter={props.onFilter}
                onImport={props.onImport}
                onSearch={props.onSearch}
                
                search={props.search}
                textAdd="Agregar Rol"
                textImport="Importar Roles"
                title="Roles"
                key={"roles-table"}



                />
            </div>
        </div>
    );
}

export default RoleListPresenter;