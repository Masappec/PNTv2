
import { Button, FileInput, Label, Progress, TextInput, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react';
import Alert from "../../Common/Alert";

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
    const [error, setError] = useState<string>('');

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
        if (!file) {
            setError('Debe seleccionar un archivo');
            return;
        }
        if (file.size > 1048576){
            setError('El archivo debe ser menor a 1MB');
            return;
        }
        if (!name) {
            setError('Debe ingresar un nombre');
            return;
        }
        if (!description) {
            setError('Debe ingresar una descripción');
            return;
        }

        props.onSave(file!, name, description);
        setError('');
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
                Se aceptan archivos de hasta 1MB
            </p>
            {
                error ? (
                    <Alert
                        onClose={() => setError('')}
                        message={error}
                        type='error'
                    >
                    </Alert>
                ) : null
            }
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
                color='primary'

                className={loading ? 'my-5 bg-primary-600' : 'hidden'}
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
                            className='my-5 w-1/6 bg-primary-500 text-white'
                            color={'primary'}

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