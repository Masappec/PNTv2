import { useEffect, useState } from "react"
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import SessionService from "../../../../infrastructure/Services/SessionService";
import AllTAPresenter from "./AllTAPresenter";
import { ColourOption } from "../../../../utils/interface";
import { RootState } from "../../../../infrastructure/Store";
import { useSelector } from "react-redux";
import { DatePnt } from "../../../../utils/date";


interface Props {
    transparencyUseCase?: TransparencyActiveUseCase;

}
const AllTAContainer = (props: Props) => {

    const [isSearching, SetSearching] = useState<boolean>(false)


    const [year, setYear] = useState<number>(new DatePnt().getYearToUpload())
    const [month, setMonth] = useState<number>(new DatePnt().getMonthOneBased())

    const [publications, setPublications] = useState<TransparencyActive[]>([])
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
        props.transparencyUseCase?.getPublicationsPublics(month, year, entity.id || 0).then((response) => {


            console.log(response)
            const numeral = response.sort((a, b) => parseInt(a.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0") -
                parseInt(b.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0"))



            const datos = numeral.map((item) => {
                const files = item.files;

                files.sort((a, b) => {
                    const order = ["Conjunto de datos", "Metadatos", "Diccionario"];
                    //remplazar numeros
                    a.description = a.description.replace(/\d+/g, '');
                    b.description = b.description.replace(/\d+/g, '');
                    return order.indexOf(a.description) - order.indexOf(b.description);
                });

                item.files = files;
                return item;
            })

            setPublications(datos)




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

    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        }).slice(0, 3)
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

            <AllTAPresenter
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

                onSearch={() => {}}
            />
        </>

    )
}

export default AllTAContainer;