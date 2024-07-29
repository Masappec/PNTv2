import {  FormEvent, useEffect, useState } from "react";
import RoleCreatePresenter from "./RoleCreatePresenter";
import { useNavigate } from "react-router-dom";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import PermissionUseCase from "../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import PermissionEntity, { AllPermissions } from "../../../../domain/entities/PermissionEntity";
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
    const [role_name, setRoleName] = useState('');
    const [selected, setSelected] = useState<PermissionEntity[]>([]);
    const [role, setRole] = useState<RoleEntity>({
        name: '',
        id: 0,
        permission: []
    });
    const [listPer,setListPermissions] = useState<{type:string,list:PermissionEntity[]}[]>([]);

    const navigate = useNavigate();


    

    useEffect(() => {
        
        permissionUsecase.execute().then((data) => {
            const types = data.reduce((acc, item) => {
                if (acc[item.content_type] === undefined) {
                    acc[item.content_type] = []
                }
                acc[item.content_type].push(item)
                return acc;
            } , {} as {[key:string]:PermissionEntity[]})

            setListPermissions(Object.entries(types).map(([key, value]) => {
                return {
                    type: key,
                    list: value
                }
            }))

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

        const newPermission = {...permission}
        listPer.forEach((item) => {
            item.list.forEach((perm) => {
                if(perm.codename === permission.codename) {
                    newPermission.id = perm.id
                }
            })
        })
        if(checked) {
            setSelected([...selected, newPermission])
            setRole({
                ...role,
                permission: [...selected, newPermission]
            })
        } else {
            setSelected(selected.filter((item) => item.id !== newPermission.id))
            setRole({
                ...role,
                permission: selected.filter((item) => item.id !== newPermission.id)
            })
        }

    }

    const isSelected = (permission: PermissionEntity) => {
        return selected.some((item) => item.codename === permission.codename)
    }

    return(
        <RoleCreatePresenter
            error={error}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            permissions={AllPermissions}
            onSelected={handleSelected}
            isSelected={isSelected}
            role_name={role_name}
            setRoleName={setRoleName}
        />
    )

}

export default RoleCreateContainer;
