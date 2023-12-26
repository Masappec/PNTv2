import UserEntity from "../../../../domain/entities/UserEntity"
import Badge from "../../../Common/Badge"
import Table from "../../../Common/Table"



interface Props {
    
    users: UserEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (user: UserEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    nextPage: number
    previousPage: number
    setPage: (page: number) => void
}

export const UserListPresenter = (props:Props)=>{
    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">
                
               
            </div>
            <div className="flex justify-between items-center mt-5">
                <Table 
                    columns={[
                        {
                            render: (row: UserEntity) => (
                                <p>{row.firstName +" "+ row.lastName}</p>
                            ),
                            title: "Nombre",
                            
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.email}</p>
                            ),
                            title: "Correo"
                        },
                        {
                            render: (row: UserEntity) => (
                                row.groups?.map((group, index) => (
                                    <Badge key={index} text={group.name} color="primary"/>
                                ))
                            ),
                            title: "Rol"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.username}</p>
                            ),
                            title: "Usuario"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>
                                    <button
                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                     onClick={()=>{
                                            console.log(row.id)
                                     }}
                                     >
                                        Editar
                                    </button>
                                </p>
                            ),
                            title: "Acciones"
                        }
                    ]}

                    description={props.users.length === 0 ? "No hay usuarios" : "Consulta los usuarios registrados"}
                    length={props.users.length}
                    onAdd={props.onAdd}
                    onFilter={()=>{}}
                    onImport={()=>{}}
                    textAdd="Agregar usuario"
                    textImport="Importar usuarios"
                    title="Usuarios"
                    data={props.users}
                    currentPage={props.page}
                    onNext={() => props.setPage(props.nextPage)}
                    onPrevious={() => props.setPage(props.previousPage)}
                    onSearch={props.onSearch}
                    search={props.search}
                />
            </div>
            

        </div>
    )
}

export default UserListPresenter