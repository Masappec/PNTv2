import { FormEvent, useEffect, useState } from "react"
import UserEditPresenter from "./UserEditPresenter"
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase"
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import { useNavigate, useParams } from "react-router-dom"
import UserEntity from "../../../../domain/entities/UserEntity"
import ConfigurationUseCase from "../../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"


const UserEditContainer = ({
    usecase,
    roleUseCase,
    configUseCase
}:{
    usecase: UserUseCase,
    roleUseCase: RoleUseCase,
    configUseCase: ConfigurationUseCase
}) => {


    const {id} =useParams()

    const [data, setData] = useState<UserEntity>({} as UserEntity)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [roleList, setRoleList] = useState<RoleEntity[]>([])
    const [roleSelected, setRoleSelected] = useState<RoleEntity | null>(null)
    const [config, setConfig] = useState<FormFieldsEntity[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()


    useEffect(() => {


        usecase.get(parseInt(id||"0")).then((user) => {
            setData(user)
            setRoleSelected(user.group?.[0] || null)
            if (user.group?.[0]){
                handleConfigFields(user.group?.[0].name)
            }
            setLoading(false)
        }).catch((error) => {
            setError(error.message)
            setLoading(false)

        })
        roleUseCase.listAvailable().then((roles) => {
            setRoleList(roles)
            if (roles.length==1){
                handleConfigFields(roles[0].name)
            }
            if (roles.length==0){
                navigate("/admin/users")
            }
            setLoading(false)

        }).catch((error) => {
            setLoading(false)

            setError(error.message)
        })
    }, [])

    


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        data.group = [{id: roleSelected?.id || 0, name: roleSelected?.name || ""}]
        e.preventDefault()
        usecase.update(data).then(() => {
            setSuccess("Usuario actualizado correctamente")
            const target = e.target as HTMLFormElement
            target.reset()

        }).catch((error) => {
            setError(error.message)
        })
    }
    
    const handleChange = (name: string, value: string | boolean) => {
        console.log(name, value)
        setData({ ...data, [name]: value })
    }


    const handleConfigFields = (role: string) => {
        configUseCase.execute(role,"Usuario").then((res) => {
            setConfig(res)
            setLoading(false)
        }).catch((e) => {
            setError(e.message)
            setLoading(false)
        })
    }

    const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const role = roleList.find((role) => role.id === parseInt(e.target.value))
        setRoleSelected(role || null)
        if (role){
            handleConfigFields(role.name)
        }
        
    }

    const onCancel = () => {
        navigate("/admin/users")
    }

    return (
        <UserEditPresenter 
           data={data as UserEntity}
            setData={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            roles_list={roleList}
            onCancel={onCancel}
            fields={config}
            onChangeRole={handleChangeRole}
            loading={loading}
        />
    )
}

export default UserEditContainer