import {  FormEvent, useEffect, useState } from "react";
import RoleCreatePresenter from "./RoleCreatePresenter";
import { useNavigate } from "react-router-dom";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import PermissionUseCase from "../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import PermissionEntity from "../../../../domain/entities/PermissionEntity";
import RoleEntity from "../../../../domain/entities/RoleEntity";


const RoleCreateContainer = ({
    usecase,
    permissionUsecase
}:{
    usecase: RoleUseCase,
    permissionUsecase: PermissionUseCase
}) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [data, setData] = useState<PermissionEntity[]>([]);
    const [role_name, setRoleName] = useState('');
    const [selected, setSelected] = useState<PermissionEntity[]>([]);
    const [role, setRole] = useState<RoleEntity>({
        name: '',
        id: 0,
        permission: []
    });

    const navigate = useNavigate();

    

    useEffect(() => {
        
        permissionUsecase.execute().then((data) => {
            setData(data)
        }).catch((error:any) => {
            setError(error.message)
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        role.name = role_name;
        if (selected.length === 0) {
            setError("Debe seleccionar al menos un permiso")
            return;
        }
        if (role.name === '') {
            setError("El nombre es requerido")
            return;
        }
        usecase.create(role).then(() => {
            setSuccess("Rol " + role.name + " creado correctamente")
            setTimeout(() => {
                navigate('/admin/roles')
            }, 1000)
        }).catch((error:any) => {
            setError(error.message)
        })
    }

    
    const onCancel = () => {
        navigate('/admin/roles')

    }

    const handleSelected = (checked:boolean, permission: PermissionEntity) => {
        if(checked) {
            setSelected([...selected, permission])
            setRole({
                ...role,
                permission: [...selected, permission]
            })
        } else {
            setSelected(selected.filter((item) => item.id !== permission.id))
            setRole({
                ...role,
                permission: selected.filter((item) => item.id !== permission.id)
            })
        }

    }

    const isSelected = (permission: PermissionEntity) => {
        return selected.some((item) => item.id === permission.id)
    }

    return(
        <RoleCreatePresenter
            error={error}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            permissions={data}
            onSelected={handleSelected}
            isSelected={isSelected}
            role_name={role_name}
            setRoleName={setRoleName}
        />
    )

}

export default RoleCreateContainer;
