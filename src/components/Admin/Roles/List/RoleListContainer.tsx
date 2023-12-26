import { useEffect, useState } from "react";
import RoleEntity from "../../../../domain/entities/RoleEntity";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import RoleListPresenter from "./RoleListPresenter";
import { useNavigate } from "react-router-dom";


const RoleListContainer = ({
    usecase
}: {
    usecase: RoleUseCase
}) => {


    const [roles, setRoles] = useState<RoleEntity[]>([])
    const [error, setError] = useState<string | null>(null)


    const navigate = useNavigate()

    useEffect(() => {
        usecase.execute().then((data) => {
            setRoles(data)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])

    const handleAdd = () => {
        navigate('/admin/roles/create')

    }

    
    return (
        <RoleListPresenter
            error={error}
            nextPage={1}
            onAdd={handleAdd}
            onEdit={() => { }}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={1}
            previousPage={1}
            roles={roles}
            search=""
            setPage={() => { }}
            setSeach={() => { }}



        />
    );

}

export default RoleListContainer;