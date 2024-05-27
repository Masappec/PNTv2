import { useEffect, useState } from "react";
import PedagogyAreaEntity from "../../../../domain/entities/PedagodyAreaEntity";
import PedagogyAreaCreatePresenter from "./PedagodyAreaCrearePresenter";
import PedagogyAreaUseCase from "../../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";


interface Props {
    usecase: PedagogyAreaUseCase;
}

const PedagogyAreaCreateContainer = (props: Props) => {

    const [data, set_data] = useState<PedagogyAreaEntity>({
        faq: [
            {
                answer: "Ingrese la respuesta aquí",
                question: "Ingrese la pregunta aquí",
                isActive: true,

            }
        ],
        normatives: [
            {
                description: "Ingrese la descripción aquí",
                title: "Ingrese el título aquí",
                url: "Ingrese la url aquí",
                isActive: true,
            }
        ],
        tutorials: [{
            description: "Ingrese la descripción aquí",
            title: "Ingrese el título aquí",
            url: "Ingrese la url aquí",
            isActive: true,
        }],
    });

    const [edit, set_edit] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    useEffect(() => {
        props.usecase.getPedagogyArea().then((data) => {
            set_data(data);
        })
    }, []);

    const handleEdit = () => {
        set_edit(true);
    }

    const handleAddQuestion = () => {
        const newData = { ...data };
        newData.faq.push({
            answer: "Ingrese la respuesta aquí",
            question: "Ingrese la pregunta aquí",
            isActive: true,
        });
        set_data(newData);
    }

    const handleDropQuestion = (index: number) => {
        const newData = { ...data };
        newData.faq.splice(index, 1);
        set_data(newData);
    }

    const handleAddTutorial = () => {
        const newData = { ...data };
        newData.tutorials.push({
            title: "",
            url: "",
            isActive: true,
            description: "",
        });
        set_data(newData);
    }
    const handleDropTutorial = (index: number) => {
        const newData = { ...data };
        newData.tutorials.splice(index, 1);
        set_data(newData);
    }

    const handleAddNormative = () => {
        const newData = { ...data };
        newData.normatives.push({
            title: "",
            url: "",
            isActive: true,
            description: "",
        });
        set_data(newData);
    }

    const handleDropNormative = (index: number) => {
        const newData = { ...data };
        newData.normatives.splice(index, 1);
        set_data(newData);
    }

    const handleChange = (root: string, name: string, value: string, index: number) => {
        const newData = { ...data };
        if (root === "faq") {
            newData.faq[index] = {
                ...newData.faq[index],
                [name]: value,

            }
        }

        if (root === "tutorials") {
            newData.tutorials[index] = {
                ...newData.tutorials[index],
                [name]: value,

            }
        }

        if (root === "normatives") {
            newData.normatives[index] = {
                ...newData.normatives[index],
                [name]: value,

            }
        }

        set_data(newData);
    }


    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.usecase.createPedagogyArea(data).then((res) => {
            set_edit(false);
            setSuccess("Se ha guardado correctamente");
            set_data(res);
        }).catch((error) => {
            setError(error.message);
        })
    }
    return (
        <PedagogyAreaCreatePresenter
            data={data}
            edit={edit}
            error={error}
            handleSubmit={handleSave}
            loading={false}
            onEdit={handleEdit}
            setData={() => { }}
            setEdit={() => { }}
            setError={setError}
            setSuccess={setSuccess}
            success={success}
            key={0}
            onAddQuestion={handleAddQuestion}
            onDropQuestion={handleDropQuestion}
            onAddNormative={handleAddNormative}
            onAddTutorial={handleAddTutorial}
            onDropNormative={handleDropNormative}
            onDropTutorial={handleDropTutorial}
            onChangeValue={handleChange}
        />
    )

};

export default PedagogyAreaCreateContainer;