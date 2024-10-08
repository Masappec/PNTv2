import { useEffect, useState } from "react";
import LandingPresenter from "./LandingPresenter"
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { ColourOption } from "../../../utils/interface";
import { useNavigate } from "react-router-dom";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/Store";
import api from "../../../infrastructure/Api";
import PublicApi from "../../../infrastructure/Api/Public/PublicApi";
import { slugtext } from "../../../utils/functions";



const LandingContainer = () => {

    const _public = new PublicApi(api)
    const [faq,] = useState<FrequencyAsked[]>([
        {
            question: "¿Qué puedo hacer en el portal?",
            answer: "Consulta los datos e información que publican las entidades sujetas al cumplimiento de la LOTAIP.",
            isActive: true,

        },
        {
            question: "¿Qué información voy a encontrar?",
            answer: "Directorios de personal, presupuestos,  normativas, y toda la información de las distintas modalidades de transparencia.",
            isActive: true,
        },
        {
            question: "¿Cómo solicito información?",
            answer: "Si necesitas que una entidad te envíe información adicional a la publicada solicítala desde este sitio.",
            isActive: true,
        }
    ])
    const [isSearching, SetSearching] = useState<boolean>()
    const navigate = useNavigate()
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [selected, setSelected] = useState<ColourOption | null>(null)
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [countFiles, setCountFiles] = useState<number>(0)

    useEffect(() => {
        setListEnt(_establishments)
        _public.getCountFiles().then((data) => {
            setCountFiles(data.count)
        }).catch((error) => {
            console.log('error', error)
        })
    }, [_establishments])






    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }

        if (inputValue.length < 1) {
            return;
        }

        if (isSearching) {
            return;
        }

        SetSearching(true)
        const filter = listEnt.filter((item) => {
            return slugtext(item.name).includes(slugtext(inputValue))
        }).slice(0, 3)
        SetSearching(false)
        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.slug || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))


    }

    const onSelect = (value: ColourOption) => {

        console.log('value', value)
        setSelected(value)
    }

    const onSearch = () => {
        if (selected) {
            navigate(`/entidades/${selected.value}`)
        }
    }


    const onQuestion = (index: number) => {

        if (index === 0) {

            navigate('/area-pedagogica');
        }
        if (index === 1) {

            navigate('/tutoriales');
        }

        if (index === 2) {


            navigate('/normativa');

        }

    }






    const onFollow = () => {
        navigate('/presupuesto')

    }

    const onPersonal = () => {
        navigate('/personal-remuneracion')
    }

    const onAudience = () => {
        navigate('/audiencias-reuniones')
    }

    const onForm = () => {
        navigate('/formularios-solicitudes')
    }



    return (
        <LandingPresenter
            faq={faq}
            countEntities={listEnt.length}
            countFiles={countFiles}
            loadOptions={loadOptions}
            onSelect={onSelect}
            onFollow={onFollow}
            onPersonal={onPersonal}
            onAudience={onAudience}
            onForm={onForm}
            onQuestion={onQuestion}
            onSearch={onSearch}
        />
    )

}

export default LandingContainer;