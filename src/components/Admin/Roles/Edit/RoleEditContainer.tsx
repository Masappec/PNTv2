import {  FormEvent, useEffect, useState } from "react";
import RoleEditPresenter from "./RoleEditPresenter";
import { useNavigate, useParams } from "react-router-dom";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import PermissionUseCase from "../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import PermissionEntity, { AllPermissions } from "../../../../domain/entities/PermissionEntity";
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
            setSelected(configurePermissions(data))
        }).catch((error:any) => {
            setError(error.message)
            navigate('/admin/roles')
        })
    }, [])


    const configurePermissions = (permissions: Pick<RoleEntity, 'permission'>) => {
        const selecteds:PermissionEntity[] = [];

        AllPermissions.forEach((item) => {
            item.list.forEach((permission) => {
                if (permissions?.permission?.some((item) => item.codename === permission.codename)) {
                    const newPermission = { ...permission, id: 0 }
                    permissions.permission.forEach((perm) => {
                        if (perm.codename === permission.codename) {
                            newPermission.id = perm.id
                        }
                    })
                    selecteds.push(newPermission)
                    
                }
            })
        })
        console.log(selecteds)
        return selecteds;
    }

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
        const newPermission = { ...permission , id: 0 }
        listPer.forEach((item) => {
            item.list.forEach((perm) => {
                if (perm.codename === permission.codename) {
                    newPermission.id = perm.id
                }
            })
        })
        console.log(newPermission)
        if(checked) {
            setSelected([...selected, newPermission])
            setRole({
                ...role,
                permission: [...selected, newPermission]
            })
        } else {
            setSelected(selected.filter((item) => item.codename !== newPermission.codename))
            setRole({
                ...role,
                permission: selected.filter((item) => item.codename !== newPermission.codename)
            })
        }

    }

    const isSelected = (permission: PermissionEntity) => {
        let IsSelected = false;
        selected.forEach((item) => {
            if (item.codename === permission.codename) {
                IsSelected = true;
            }
        })
        return IsSelected;
    }

    return(
        <RoleEditPresenter
            error={error}
            handleSubmit={handleSubmit}
            onCancel={onCancel}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            permissions={AllPermissions}
            onSelected={handleSelected}
            isSelected={isSelected}
            role={role}
            setRole={setRole}
        />
    )

}

export default RoleEditContainer;
