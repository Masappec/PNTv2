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
                answer: "",
                question: "",
                isActive: true,

            }
        ],
        normatives: [
            {
                description: "",
                title: "",
                url: "",
                isActive: true,
            }
        ],
        tutorials: [{
            description: "",
            title: "",
            url: "",
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
            answer: "",
            question: "",
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

        if(value.length > 3000){
            return;
        }
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
        //validar camois vacuis
        if (data.faq.filter((item) => item.question === "" || item.answer === "").length > 0) {
            setError("Debe completar todas las preguntas y respuestas");
            return;
        }
        if (data.tutorials.filter((item) => item.title === "" || item.url === "" || item.description === "").length > 0) {
            setError("Debe completar todos los tutoriales");
            return;
        }

        if (data.normatives.filter((item) => item.title === "" || item.url === "" || item.description === "").length > 0) {
            setError("Debe completar todas las normativas");
            return;
        }

        if (data.faq.length === 0) {
            data.faq.push({
                answer: "",
                question: "",
                isActive: true,
            });
        }
        if (data.tutorials.length === 0) {
            data.tutorials.push({
                title: "",
                url: "",
                isActive: true,
                description: "",
            });
        }
        if (data.normatives.length === 0) {
            data.normatives.push({
                title: "",
                url: "",
                isActive: true,
                description: "",
            });
        }

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