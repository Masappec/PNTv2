
import { Button, FileInput, Label, Progress, TextInput, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react';

interface FileUploadFormProps {

    onSave: (file: File, name: string, description: string) => void;
    onCancel: () => void;
    percent: number;
    isSaved: boolean;
    loading: boolean;
}

const FileUploadForm = (props: FileUploadFormProps) => {

    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0);


    useEffect(() => {
        setLoading(props.loading);
        setPercent(props.percent);
        console.log('loading', props.loading);
        console.log('percent', props.percent);
    }, [props.loading, props.percent]);

    const onFileUpload = (file: File) => {
        setFile(file);
    }

    const onChangeName = (name: string) => {
        setName(name);
    }

    const onChangeDescription = (description: string) => {
        setDescription(description);
    }

    const onSave = () => {
        props.onSave(file!, name, description);
    }

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        onFileUpload(e.target.files[0]);
    }

    return (
        <div className='flex flex-col w-full gap-y-5'>
            <p>
                Se aceptan archivos de hasta 500KB
            </p>
            <FileInput
                onChange={onChangeFile}
                className='my-5'
            />
            <Label htmlFor="" value="Nombre del archivo" />

            <TextInput
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
                className='my-5'

            />
            <Label htmlFor="" value="Descripción" />

            <Textarea
                value={description}
                onChange={(e) => onChangeDescription(e.target.value)}
            />
            <Progress
                progress={percent}
                progressLabelPosition="inside"
                textLabel={loading ? 'Cargando...' : props.isSaved ? 'Cargado' : 'Cargar'}
                textLabelPosition="outside"
                size="lg"
                labelProgress
                labelText

                className={loading ? 'my-5' : 'hidden'}
            />
            {
                props.isSaved ? (
                    <div className='flex flex-col items-center'>
                        <span>Archivo cargado correctamente</span>
                    </div>
                ) : loading ? null :
                    <div className='flex flex-row justify-between'>


                        <Button
                            className='my-5 w-1/6'
                            color='red'
                            onClick={props.onCancel}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className='my-5 w-1/6'

                            onClick={onSave}
                        >
                            Cargar
                        </Button>
                    </div>
            }



        </div>
    );

}

export default FileUploadForm;