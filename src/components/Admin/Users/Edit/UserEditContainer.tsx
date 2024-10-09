import { FormEvent, useEffect, useState } from "react"
import UserEditPresenter from "./UserEditPresenter"
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase"
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import { useNavigate, useParams } from "react-router-dom"
import UserEntity from "../../../../domain/entities/UserEntity"
import ConfigurationUseCase from "../../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { IOncalculate } from "../../../Common/PasswordMeter"
import { sleep } from "../../../../utils/functions"
import SessionService from "../../../../infrastructure/Services/SessionService"
import { ColourOption } from "../../../../utils/interface"


const UserEditContainer = ({
    usecase,
    roleUseCase,
    configUseCase,
    establishmentUseCase
}: {
    usecase: UserUseCase,
    roleUseCase: RoleUseCase,
    configUseCase: ConfigurationUseCase,
    establishmentUseCase: EstablishmentUseCase
}) => {


    const { id } = useParams()

    const [data, setData] = useState<UserEntity>({} as UserEntity)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [userSession, SetUserSession] = useState<UserEntity>({} as UserEntity)

    const [roleList, setRoleList] = useState<RoleEntity[]>([])
    const [roleSelected, setRoleSelected] = useState<RoleEntity | null>(null)
    const [config, setConfig] = useState<FormFieldsEntity[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [establishment, setEstablishment] = useState<EstablishmentEntity | null>(null)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [isUserEntity, setIsUserEntity] = useState<boolean>(false)
    const [selectedEstablishment,SetSelectedEstablishment] = useState<ColourOption>({
        color:"",
        label:"",
        value:""
    })

    useEffect(() => {
        const user = SessionService.getUserData()
        SetUserSession(user)
        const is = UserEntity.isUserEntity(user)
        if (is) {
            const establishment = SessionService.getEstablishmentData();

            setIsUserEntity(is)
            SetSelectedEstablishment({
                value:establishment.id+"",
                color:"",
                label:establishment.name
            })
            setData({ ...data, establishment_id: establishment?.id })

        }
    }, [])

    useEffect(() => {

        establishmentUseCase.getEstablishmentsByUser(id || "").then((res) => {
            setEstablishment(res)
            SetSelectedEstablishment({
                color:"",
                label:res.name,
                value:res.id?.toString()||""
            })
        }).catch(() => {
            setEstablishment(null)
        })
        usecase.get(parseInt(id || "0")).then((user) => {
            setData(user)
            setRoleSelected(user.group?.[0] || null)
            if (user.group?.[0]) {
                handleConfigFields(user.group?.[0].name)
            }
            setLoading(false)
        }).catch((error) => {
            setError(error.message)
            setLoading(false)

        })
        roleUseCase.listAvailable().then((roles) => {
            setRoleList(roles)
            if (roles.length == 1) {
                handleConfigFields(roles[0].name)
            }
            setLoading(false)

        }).catch((error) => {
            setLoading(false)

            setError(error.message)
        })
    }, [])




    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        data.group = [{ id: roleSelected?.id || 0, name: roleSelected?.name || "" }]
        e.preventDefault()
        setLoadingSubmit(true)
        if(data.identification==""){
            data.identification="NO"
        }
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
        if (!data.establishment_id) {
            data.establishment_id = establishment?.id || 0
        }
        usecase.update(data).then(() => {
            setSuccess("Usuario actualizado correctamente")
            setError("")
            const target = e.target as HTMLFormElement
            target.reset()
            setLoadingSubmit(false)
            sleep(2000).then(() => {
                onCancel()
            })

        }).catch((error) => {
            setLoadingSubmit(false)
            setSuccess("")
            setError(error.message)
        })
    }

    const handleChange = (name: string, value: string | boolean) => {
        
        setData({ ...data, [name]: value })
    }

    const handleSelect = (option:ColourOption)=>{
        SetSelectedEstablishment(option)
        setData({...data,establishment_id:parseInt(option.value)})
    }


    const handleConfigFields = (role: string) => {
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
        if (!userSession.is_superuser) {

            const user = userSession.user_permissions?.find(x => x.codename == 'view_user_establishment')
            if (user) {
                route = '/admin/est/users'
            }
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
    const loadOption = (name: string, callback: (data: ColourOption[]) => void) => {
        const establishmentField = config.find(x => x.name ==  "establishment_id")
        if (establishmentField) {
            const filtered = establishmentField.options?.filter(x => x.name.toLowerCase().includes(name.toLowerCase())).slice(0, 10)
            
            callback(filtered?.map  (x => ({label:x.name,value:x.id.toString()||""} as ColourOption)) || [])
        }
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
            establishment={establishment}
            handleShowPassword={handleShowPassword}
            isDisabled={isDisabled}
            loadingSubmit={loadingSubmit}
            onChangePassword={onChangePassword}
            showPassword={showPassword}
            isEstablishmentUser={isUserEntity}
            onLoadOptions={loadOption}
            establishmentSelected={selectedEstablishment}
            onEstablishmentSelect={handleSelect}
        />
    )
}

export default UserEditContainer