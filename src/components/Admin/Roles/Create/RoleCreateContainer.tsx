import { useCallback, useEffect, useState } from "react";
import RoleCreatePresenter from "./RoleCreatePresenter";
import { useNavigate } from "react-router-dom";
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase";
import PermissionUseCase from "../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import PermissionEntity from "../../../../domain/entities/PermissionEntity";


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
    const [selected, setSelected] = useState<PermissionEntity[]>([]);

    const navigate = useNavigate();
    

    useEffect(() => {
        permissionUsecase.execute().then((data) => {
            setData(data)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])

    const handleSubmit = () => {
        

    }

    
    const onCancel = () => {
        navigate('/admin/roles')

    }

    const handleSelected = (checked:boolean, permission: PermissionEntity) => {
        if(checked) {
            setSelected([...selected, permission])
        } else {
            setSelected(selected.filter((item) => item.id !== permission.id))
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
        />
    )

}

export default RoleCreateContainer;
