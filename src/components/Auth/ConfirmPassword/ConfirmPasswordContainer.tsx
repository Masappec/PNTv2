import ConfirmPasswordPresenter from "./ConfirmPasswordPresenter"


const ConfirmPasswordContainer = ()=>{
    return (
        <ConfirmPasswordPresenter
        confirmPassword=""
        error={""}
        handleSubmit={()=>{}}
        password=""
        setConfirmPassword={()=>{}}
        setError={()=>{}}
        setPassword={()=>{}}
        isloading={false}
        key={"reset-password"}
        />
    )
}

export default ConfirmPasswordContainer