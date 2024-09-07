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

    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const [selectedRole, setSelectedRole] = useState<RoleEntity | null>(null)

    const navigate = useNavigate()




    useEffect(() => {
        usecase.execute().then((data) => {
            const sortedRoleEntity = [...data].sort((a, b) => a.name.localeCompare(b.name));
            setRoles(sortedRoleEntity);
        }).catch((error) => {
            setError(error.message)
        })
    }, [])

    const handleAdd = () => {
        navigate('/admin/roles/create')

    }

    const handleEdit = (role: RoleEntity) => {
        navigate(`/admin/roles/${role.id}`)
    }


    const handleDelete = (Role: RoleEntity) => {
        setVisibleModal(true)
        setSelectedRole(Role)
    }

    const handleCancelDelete = () => {
        setVisibleModal(false)
        setSelectedRole(null)
    }


    const handleConfirmDelete = () => {
        usecase.deleteRole(selectedRole?.id + "").then(() => {
            setVisibleModal(false)
            setSelectedRole(null)
            setRoles(roles.filter((role) => role.id !== selectedRole?.id))
        }).catch((error) => {
            setError(error.message)
        })
    }
    return (
        <RoleListPresenter
            error={error}
            nextPage={1}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={1}
            previousPage={1}
            roles={roles}
            search=""
            setPage={() => { }}
            setSeach={() => { }}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            onDelete={handleDelete}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
            selectedRole={selectedRole}

        />
    );

}

export default RoleListContainer;