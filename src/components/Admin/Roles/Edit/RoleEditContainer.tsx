import {  FormEvent, useEffect, useState } from "react";
import RoleEditPresenter from "./RoleEditPresenter";
import { useNavigate, useParams } from "react-router-dom";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import PermissionUseCase from "../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import PermissionEntity from "../../../../domain/entities/PermissionEntity";
import RoleEntity from "../../../../domain/entities/RoleEntity";


const RoleEditContainer = ({
    usecase,
    permissionUsecase
}:{
    usecase: RoleUseCase,
    permissionUsecase: PermissionUseCase
}) => {


    const {id} = useParams();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selected, setSelected] = useState<PermissionEntity[]>([]);
    const [role, setRole] = useState<RoleEntity>({
        name: '',
        id: 0,
        permission: []
    });
    const [listPer, setListPermissions] = useState<{ type: string, list: PermissionEntity[] }[]>([]);

    const navigate = useNavigate();




    useEffect(() => {
        
        permissionUsecase.execute().then((data) => {
            const types = data.reduce((acc, item) => {
                if (acc[item.content_type] === undefined) {
                    acc[item.content_type] = []
                }
                acc[item.content_type].push(item)
                return acc;
            }, {} as { [key: string]: PermissionEntity[] })

            setListPermissions(Object.entries(types).map(([key, value]) => {
                return {
                    type: key,
                    list: value
                }
            }))

        }).catch((error: any) => {
            setError(error.message)
        })

        usecase.detail(id||"").then((data) => {
            setRole(data)
            setSelected(data.permission?.map((item) => item) || [])
        }).catch((error:any) => {
            setError(error.message)
            navigate('/admin/roles')
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selected.length === 0) {
            setError("Debe seleccionar al menos un permiso")
            return;
        }
        if (role.name === '') {
            setError("El nombre es requerido")
            return;
        }
        usecase.update(id||"", role).then(() => {
            setSuccess("Rol actualizado correctamente")
            setTimeout(() => {
                navigate('/admin/roles')
            }, 2000)
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
        <RoleEditPresenter
            error={error}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            permissions={listPer}
            onSelected={handleSelected}
            isSelected={isSelected}
            role={role}
            setRole={setRole}
        />
    )

}

export default RoleEditContainer;
