import { FormEvent, useEffect, useState } from "react"
import UserCreatePresenter from "./UserCreatePresenter"
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase"
import RoleUseCase from "../../../../domain/useCases/Role/RoleUseCase"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import { useNavigate } from "react-router-dom"


const UserCreateContainer = ({
    usecase,
    roleUseCase
}:{
    usecase: UserUseCase,
    roleUseCase: RoleUseCase
}) => {

    const [type_person, setTypePerson] = useState<string>("natural")
    const [name, setName] = useState<string>("")
    const [last_name, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [identification, setIdentification] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [country, setCountry] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [province, setProvince] = useState<string>("")
    const [role, setRole] = useState<number>(0)

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [roleList, setRoleList] = useState<RoleEntity[]>([])

    const navigate = useNavigate()


    useEffect(() => {
        roleUseCase.execute().then((roles) => {
            setRoleList(roles)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])

    


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(role)
        usecase.create({
            type_person,
            firstName: name,
            lastName: last_name,
            email,
            identification,
            phone,
            address,
            country,
            city,
            province,
            username: email,
            groups: [{
                id: role,
                name: "Rol"
            
            }],
            id: 0
        }).then(() => {
            setSuccess("Usuario creado con éxito")
            const target = e.target as HTMLFormElement
            target.reset()

        }).catch((error) => {
            setError(error.message)
        })
    }
    
    const onCancel = () => {
        navigate("/admin/users")
    }

    return (
        <UserCreatePresenter 
            address={address}
            city={city}
            country={country}
            email={email}
            identification={identification}
            last_name={last_name}
            name={name}
            phone={phone}
            province={province}
            role={role}
            type_person={type_person}
            setAddress={setAddress}
            setCity={setCity}
            setCountry={setCountry}
            setEmail={setEmail}
            setIdentification={setIdentification}
            setLastName={setLastName}
            setName={setName}
            setPhone={setPhone}
            setProvince={setProvince}
            setRole={setRole}
            setTypePerson={setTypePerson}
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            roles_list={roleList}
            onCancel={onCancel}
        />
    )
}

export default UserCreateContainer