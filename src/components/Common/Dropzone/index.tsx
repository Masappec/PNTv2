import { ChangeEvent, useEffect, useState } from "react"
import { IoCloudUploadOutline } from "react-icons/io5"


interface DropzoneProps {
    handleChageLogo: (e: ChangeEvent<HTMLInputElement>) => void
    accept: string;
    multiple: boolean;
    type: "image" | "pdf" | "excel" | "word" | "powerpoint" | "audio" | "video" | "text" | "archive" | "code" | "other";
    id: string;
    name: string;
    label?: string;
    url?: string;
}

const Dropzone = (props:DropzoneProps) => {

    const [url, setUrl] = useState<string>( "")

    useEffect(() => {
        setUrl(props.url ? props.url : "")
    }, [props.url])
    
    const handleChageLogo = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file) return
        const image = file[0]

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            setUrl(reader.result as string)
        };
        props.handleChageLogo(e)
        
    }


    const click = () => {
        
        const input = document.getElementById(props.id)
        input?.click()
    }

    return (
        <>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
            {props.label}
        </label>
         <div className="border-dashed border-2 w-64 h-32 rounded flex justify-center items-center" onClick={click}>
            
            {
                url ? <img src={url} alt="" 
                className="w-full h-full object-cover"
                /> : <>
                <IoCloudUploadOutline className="text-4xl text-grey" /><span className="block text-grey">Drop your files here</span>
                </>
            }

            
            <input type="file" className="hidden" onChange={handleChageLogo} accept={props.accept} multiple={props.multiple} 
            id={props.id} name={props.name}
            />
        </div>
        </>
       
    )
}

export default Dropzone