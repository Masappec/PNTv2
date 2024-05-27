import { FormEvent, useEffect, useState } from "react"
import UserCreatePresenter from "./UserCreatePresenter"
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase"
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import { useNavigate } from "react-router-dom"
import UserEntity from "../../../../domain/entities/UserEntity"
import ConfigurationUseCase from "../../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"
import { sleep } from "../../../../utils/functions"
import { IOncalculate } from "../../../Common/PasswordMeter"
import SessionService from "../../../../infrastructure/Services/SessionService"


const UserCreateContainer = ({
    usecase,
    roleUseCase,
    configUseCase
}: {
    usecase: UserUseCase,
    roleUseCase: RoleUseCase,
    configUseCase: ConfigurationUseCase
}) => {

    const [data, setData] = useState<UserEntity>({} as UserEntity)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [roleList, setRoleList] = useState<RoleEntity[]>([])
    const [roleSelected, setRoleSelected] = useState<RoleEntity | null>(null)
    const [config, setConfig] = useState<FormFieldsEntity[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const navigate = useNavigate()

    const [userSession,SetUserSession] = useState<UserEntity>({} as UserEntity)


    useEffect(()=>{
        const user = SessionService.getUserData()
        SetUserSession(user)
    },[])

    useEffect(() => {
        roleUseCase.listAvailable().then((roles) => {
            setRoleList(roles.filter(x => x.name != 'Ciudadano'))
            if (roles.length == 1) {
                handleConfigFields(roles[0].name)
            }
            if (roles.length == 0) {
                onCancel()
            }
        }).catch((error) => {
            setError(error.message)
        })
    }, [])




    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        data.group = [{ id: roleSelected?.id || 0, name: roleSelected?.name || "" }]
        e.preventDefault()
        setLoadingSubmit(true)
        if (data.group === undefined || data.group.length === 0) {
            setError("El rol es obligatorio")
            setLoadingSubmit(false)
            return
        }

        if (data.group[0].id === 0) {
            setError("El rol es obligatorio")
            setLoadingSubmit(false)
            return
        }
        if (data.first_name === undefined || data.first_name === "") {
            setError("El nombre es obligatorio")
            setLoadingSubmit(false)
            return
        }
        if (data.last_name === undefined || data.last_name === "") {
            setError("El apellido es obligatorio")
            setLoadingSubmit(false)
            return
        }

        if (data.email === undefined || data.email === "") {
            setError("El correo es obligatorio")
            setLoadingSubmit(false)
            return
        }
        if (roleSelected === null) {
            setError("El rol es obligatorio")
            setLoadingSubmit(false)
            return
        }
        if (data.password === undefined || data.password === "") {
            setError("La contraseña es obligatoria")
            setLoadingSubmit(false)
            return
        }
        usecase.create(data).then(() => {
            setLoadingSubmit(false)
            setSuccess("Usuario creado con éxito")
            setError("")
            const target = e.target as HTMLFormElement
            target.reset()
            setData({} as UserEntity)
            sleep(2000).then(() => {
                onCancel()
            })


        }).catch((error) => {
            setLoadingSubmit(false)
            setError(error.message)
        })
    }

    const handleChange = (name: string, value: string | boolean) => {
        console.log(name, value)
        setData({ ...data, [name]: value })
    }


    const handleConfigFields = (role: string) => {
        setLoading(true)
        configUseCase.execute(role, "Usuario").then((res) => {
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
        if (role) {
            handleConfigFields(role.name)
        }

    }

    const onCancel = () => {
        let route = '/admin/users'
        const user = userSession.user_permissions?.find(x => x.codename =='view_users_internal')
        if(user){
            route='/admin/est/users'
        }
        navigate(route)
    }
    const onChangePassword = (data: IOncalculate) => {

        if (data.percentage === 100) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    };


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <UserCreatePresenter
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
            handleShowPassword={handleShowPassword}
            isDisabled={isDisabled}
            onChangePassword={onChangePassword}
            showPassword={showPassword}
            loadingSubmit={loadingSubmit}
        />
    )
}

export default UserCreateContainer