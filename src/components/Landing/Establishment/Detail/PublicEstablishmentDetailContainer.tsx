import { useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import PublicEstablishmentDetailPresenter from "./PublicEstablishmentDetailPresenter"
import { useNavigate, useParams } from "react-router-dom";
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import { AcordionMonthYear } from "../../../../utils/interface";
import TransparencyFocusUseCase from "../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import TransparencyCollabUseCase from "../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import TransparencyCollab from "../../../../domain/entities/TransparencyCollab";

interface Props {
    usecase: PublicUseCase;
    transparencyUseCase?: TransparencyActiveUseCase;
    tfusecase: TransparencyFocusUseCase;
    tcusecase: TransparencyCollabUseCase
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
        identification: "",
    })
    const navigation = useNavigate()
    const [publications, setPublications] = useState<AcordionMonthYear<TransparencyActive>[]>([])
    const [publicationsTF, setPublicationsTF] = useState<AcordionMonthYear<TransparencyFocusEntity>[]>([])
    const [publicationsTC, setPublicationsTC] = useState<AcordionMonthYear<TransparencyCollab>[]>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [yearTF, setYearTF] = useState<number>(new Date().getFullYear())
    const [yearTC, setYearTC] = useState<number>(new Date().getFullYear())

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

            const numeral = response.sort((a, b) => parseInt(a.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0") -
                parseInt(b.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "") || "0"))

            

            const searchPub = publications.find(x => x.year == year && x.month == month)
            if (!searchPub) {

                const datos = numeral.map((item) => {
                    const files = Array.from({
                        length: item.files.length
                    })

                    item.files.map((file) => {
                        if (file.name.toLowerCase().startsWith('conjunto')){
                           files[0] = file;
                        }else if (file.name.toLowerCase().startsWith('metadatos')){
                            files[1] = file;
                        }else if (file.name.toLowerCase().startsWith('diccionario')){
                            files[2] = file;
                        }else{
                            files.push(file)
                        }
                    })
                    return item;
                })
                const data: AcordionMonthYear<TransparencyActive> = {
                    data: datos,
                    isLoading: false,
                    month: month,
                    total: datos.length,
                    year: year
                }

                setPublications([...publications, data])


            } else {
                const index = publications.indexOf(searchPub);
                if (index != -1) {
                    const copy = publications;

                    copy[index] = {
                        ...searchPub,
                        data: numeral
                    
                    };
                    setPublications(copy)
                }
            }

        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }


    const onOpenMonthTF = (month: number) => {

        props.tfusecase.getTransparencyFocusPublics(month, yearTF, entity.id || 0).then((response) => {

            const data: AcordionMonthYear<TransparencyFocusEntity> = {
                data: response,
                isLoading: false,
                month: month,
                total: response.length,
                year: yearTF
            }

            const searchPub = publicationsTF.find(x => x.year == yearTF && x.month == month)
            if (!searchPub) {
                setPublicationsTF([...publicationsTF, data])
            } else {
                const index = publicationsTF.indexOf(searchPub);
                if (index != -1) {
                    const copy = publicationsTF;

                    copy[index] = data;
                    setPublicationsTF(copy)
                }
            }

        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }

    const onOpenMonthTC = (month: number) => {

        props.tcusecase.getTransparencyCollabPublics(month, yearTC, entity.id || 0).then((response) => {

            const data: AcordionMonthYear<TransparencyCollab> = {
                data: response,
                isLoading: false,
                month: month,
                total: response.length,
                year: yearTC
            }

            const searchPub = publicationsTC.find(x => x.year == yearTC && x.month == month)
            if (!searchPub) {
                setPublicationsTC([...publicationsTC, data])
            } else {
                const index = publicationsTC.indexOf(searchPub);
                if (index != -1) {
                    const copy = publicationsTC;

                    copy[index] = data;
                    setPublicationsTC(copy)
                }
            }

        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }



    const handlePageInfo = () => {
        //scroll to bottom
        window.scrollTo(0, 400);
    }

    const handlePageSolicity = () => {
        navigation('/ingreso')
    }

    const handlePageIndicators = () => {
        navigate('/indicadores')
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
            onOpenMonthTC={onOpenMonthTC}
            onOpenMonthTF={onOpenMonthTF}
            onSelectYearTC={(year) => setYearTC(year)}
            onSelectedYearTF={(year) => setYearTF(year)}
            publicationsTC={publicationsTC}
            publicationsTF={publicationsTF}
            selectedYearTC={yearTC}
            selectedYearTF={yearTF}
            handlePageIndicators={handlePageIndicators}
            handlePageInfo={handlePageInfo}
            handlePageSolicity={handlePageSolicity}


        />
    )
}

export default PublicEstablishmentDetailContainer