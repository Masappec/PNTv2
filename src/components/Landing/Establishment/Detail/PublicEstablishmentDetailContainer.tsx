import { useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import PublicEstablishmentDetailPresenter from "./PublicEstablishmentDetailPresenter"
import { useNavigate, useParams } from "react-router-dom";
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import { AcordionMonthYear } from "../../../../utils/interface";

interface Props {
    usecase: PublicUseCase;
    transparencyUseCase?: TransparencyActiveUseCase
}
const PublicEstablishmentDetailContainer = (props: Props) => {

    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    const [entity, setEntity] = useState<EstablishmentEntity>({
        abbreviation: "",
        code: "",
        email_authority: "",
        first_name_authority: "",
        highest_authority: "",
        job_authority: "",
        last_name_authority: "",
        logo: "",
        name: "",
        email_accesstoinformation: "",
        email_committe: "",
        first_name_committe: "",
        highest_committe: "",
        id: 0,
        is_active: false,
        job_committe: "",
        last_name_committe: "",
    })

    const [publications, setPublications] = useState<AcordionMonthYear<TransparencyActive>[]>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    useEffect(() => {
        props.usecase.getEstablishment(slug || "").then((response) => {
            setEntity(response)
            setLoading(false)
        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })


    }, [])








    const handlePageChange = (page: number) => {
        console.log(page)
    }

    const handleClickItem = (slug: string) => {
        navigate(`/publicaciones/${slug}`)
    }


    const onOpenMonth = (month: number) => {


        props.transparencyUseCase?.getPublicationsPublics(month, year, entity.id || 0).then((response) => {

            const data: AcordionMonthYear<TransparencyActive> = {
                data: response,
                isLoading: false,
                month: month,
                total: response.length,
                year: year
            }

            const searchPub = publications.find(x => x.year == year && x.month == month)
            if (!searchPub) {
                setPublications([...publications, data])
            } else {
                const index = publications.indexOf(searchPub);
                if (index != -1) {
                    const copy = publications;

                    copy[index] = data;
                    setPublications(copy)
                }
            }

        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <PublicEstablishmentDetailPresenter
            onSelectYear={(year) => setYear(year)}
            selectedYear={year}
            years={Array.from({
                length: 10
            }).map((_, index) => 2015 + index)}
            entity={entity}
            error={error}
            loading={loading}
            publications={publications}
            onChangePage={handlePageChange}
            onItemPublicationClick={handleClickItem}
            onSearch={(type) => {
                console.log(type)
            }}
            meses={meses}
            onOpenMonth={onOpenMonth}


        />
    )
}

export default PublicEstablishmentDetailContainer