import React, { useEffect } from "react";
import SmtpCreatePresenter from "./SmtpCreatePresenter";
import SmtpUsecase from "../../../../domain/useCases/Smtp/SmtpUseCase";
import SmtpEntity from "../../../../domain/entities/SmtpEntity";

interface IProps {
    usecase: SmtpUsecase;
}
const SmtpCreateContainer= (props: IProps) => {

    const [data, setData] = React.useState({
        auth:{
            pass:"",
            user:""
        },
        host:"", 
        port:0,
        secure:false
    } as SmtpEntity );
    const [error, setError] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    const [success, setSuccess] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        props.usecase.getSmtp().then((res) => {
            setData(res);
        }).catch((err) => {
            setError(err.message);
        })
    }, [])
    
    const handleEdit = ()=>{
        setEdit(!edit);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(data);
        props.usecase.update(data).then(() => {
            setError("");
            setEdit(false);
            setLoading(false);
            setSuccess("Configuración actualizada");
        }).catch((err) => {
            setLoading(false);
            setError(err.message);
        })
    }

    const handleData= (name:string, value:string|number|boolean)=>{
        if (name === "user" || name === "pass") {
            setData({...data, auth:{...data.auth, [name]:value}});
            return;
        }
      
        setData({...data, [name]:value});
    }
    return(
        <SmtpCreatePresenter
            handleSubmit={handleSubmit}
            data={data}
            setData={handleData}
            error={error}
            loading={loading}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            edit={edit}
            setEdit={setEdit}
            onEdit={handleEdit}

        />

    )
}

export default SmtpCreateContainer;