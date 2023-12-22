import UserEntity from "../../../../domain/entities/UserEntity"
import Table from "../../../Common/Table"



interface Props {
    
    users: UserEntity[]
    error: string | null
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
                                <p>{row.firstName + row.lastName}</p>
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
                                <p>{row.email}</p>
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

                    description="No hay usuarios registrados en el sistema"
                    length={0}
                    onAdd={()=>{}}
                    onFilter={()=>{}}
                    onImport={()=>{}}
                    textAdd="Agregar usuario"
                    textImport="Importar usuarios"
                    title="Usuarios"
                    data={props.users}

                />
            </div>
            

        </div>
    )
}

export default UserListPresenter