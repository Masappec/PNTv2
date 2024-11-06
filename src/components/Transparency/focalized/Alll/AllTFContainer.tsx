import { useEffect, useState } from "react"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import SessionService from "../../../../infrastructure/Services/SessionService";
import AllTFPresenter from "./AllTFPresenter";
import { ColourOption } from "../../../../utils/interface";
import { RootState } from "../../../../infrastructure/Store";
import { useSelector } from "react-redux";
import TransparencyFocusUseCase from "../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import { DatePnt } from "../../../../utils/date";


interface Props {
    transparencyUseCase?: TransparencyFocusUseCase;

}
const AllTFContainer = (props: Props) => {

    const [isSearching, SetSearching] = useState<boolean>(false)


    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new DatePnt().getMonthOneBased())

    const [publications, setPublications] = useState<TransparencyFocusEntity[]>([])
    const [error, setError] = useState<string>("")

    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])

    const [entity, setEntity] = useState<EstablishmentEntity>(EstablishmentEntity.generateAllEstablishment(""));
    const [loading, setLoading] = useState<boolean>(false);
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

    useEffect(() => {
        const _est = SessionService.getEstablishmentData();
        setEntity(_est)

    }, [])
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])
    useEffect(() => {
        getDataTA()
    }, [entity, month, year])

    const getDataTA = () => {
        props.transparencyUseCase?.getTransparencyFocusPublics(month, year, entity.id || 0)
            .then((response) => {



            setPublications(response)




        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }


    const handleChangeDate = (date: string) => {
        console.log(date)
        const [Y, M] = date.split('-');

        setMonth(parseInt(M))
        setYear(parseInt(Y));
    }
    const todas = EstablishmentEntity.generateAllEstablishment('Todas')

    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const _filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        const filter: EstablishmentEntity[] = []

        filter.push(todas, ..._filter)
        SetSearching(false)
        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.identification || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
    }

    return (
        <>

            <AllTFPresenter
                year={year}
                month={month}
                data={publications}
                establishment={entity.name}
                onChangeDate={handleChangeDate}
                loading={loading}
                error={error}
                onCloseError={() => setError("")}
                loadOptions={loadOptions}
                onInstitutionChange={(value) => {
                    const _est = listEnt.find((item) => item.identification === value);
                    if (_est) {
                        setEntity(_est)
                    }
                }}

                onSearch={() => { }}
            />
        </>

    )
}

export default AllTFContainer;