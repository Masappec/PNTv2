import { useEffect, useState } from "react";
import { AnualReportUseCase } from "../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import AnnualReportPresenter from "./AnnualReportPresenter"
import { AnualReportEntity, IndexInformationClassifiedEntity, SolicityStatsAnualReportEntity } from "../../../domain/entities/AnualReportEntity";
import SessionService from "../../../infrastructure/Services/SessionService";
import EstablishmentUseCase from "../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { Pnt1ActiveDto, Pnt1ColabDto, Pnt1FocalDto, Pnt1PasiveDto, Pnt1ReservadaDto, ReservasPnt2, SolicityStatsAnualReportDto } from "../../../infrastructure/Api/AnualReport/interface";
import { Pagination } from "../../../infrastructure/Api";
import { TransparencyActivePublicResponse } from "../../../infrastructure/Api/TansparencyActive/interface";
import { TransparencyFocusListDto } from "../../../infrastructure/Api/TransparencyFocus/interface";
import { TransparencyCollabListDto } from "../../../infrastructure/Api/TransparencyCollab/interface";
import { DatePnt } from "../../../utils/date";
import { Pnt1Api } from "../../../infrastructure/Api/AnualReport/Pnt1Api";
import { AnualReportMapper } from "../../../domain/mappers/AnualReportMapper";

interface Props {
    usecase: AnualReportUseCase;
    establishmentUsecase: EstablishmentUseCase
    api: Pnt1Api;

}
const AnnualReportContainer = (props: Props) => {

    const [form, setForm] = useState<AnualReportEntity>(AnualReportEntity.buildVoid())
    const [table, setTable] = useState<IndexInformationClassifiedEntity[]>([])

    const [solicityStats, setSolicityStats] = useState<SolicityStatsAnualReportDto[]>([])
    const [pnt1pasive, setPnt1Pasive] = useState<Pnt1PasiveDto[]>([])
    const [pnt1active, setPnt1Active] = useState<Pnt1ActiveDto[]>([])
    const [pnt1colab, setPnt1Colab] = useState<Pnt1ColabDto[]>([])
    const [pnt1focal, setPnt1Focal] = useState<Pnt1FocalDto[]>([])
    const [pnt1reserved, setPnt1Reserved] = useState<Pnt1ReservadaDto[]>([])
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [reservas, setReservas] = useState<ReservasPnt2[]>([])
    const [saved, setSaved] = useState<boolean>(false)
    const [editedMeses, setEditedMeses] = useState<number[]>([])
    const [establishment, setEstablishment] = useState<EstablishmentEntity>(SessionService.getEstablishmentData())
    const [paginableTA, setPaginableTA] = useState<Pagination<TransparencyActivePublicResponse>>({
        from: 0,
        to: 0,
        total: 0,
        current: 1,
        limit: 1000,
        next: 0,
        previous: 0,
        results: [],
        total_pages: 0
    })


    const [paginableTAE, setPaginableTAE] = useState<Pagination<TransparencyActivePublicResponse>>({
        from: 0,
        to: 0,
        total: 0,
        current: 1,
        limit: 1000,
        next: 0,
        previous: 0,
        results: [],
        total_pages: 0
    })
    const [paginableTF, setPaginableTF] = useState<Pagination<TransparencyFocusListDto>>({
        from: 0,
        to: 0,
        total: 0,
        current: 1,
        limit: 1000,
        next: 0,
        previous: 0,
        results: [],
        total_pages: 0
    })

    const [paginableTC, setPaginableTC] = useState<Pagination<TransparencyCollabListDto>>({
        from: 0,
        to: 0,
        total: 0,
        current: 1,
        limit: 1000,
        next: 0,
        previous: 0,
        results: [],
        total_pages: 0
    })

    const [totalSaipPnt1, setTotalSaipPnt1] = useState<number>(0)
    const [totalSaip, setTotalSaip] = useState<number>(0)




    const getDatafromPnt1 = () => {

        if (new DatePnt().getYearToUpload() == 2024) {
            console.log(establishment.identification, establishment.id)
            props.api.getActive(establishment.identification).then(res => {
                setPnt1Active(res)
            })
            props.api.getColaborator(establishment.identification).then(res => {
                setPnt1Colab(res)
            })

            props.api.getFocal(establishment.identification).then(res => {
                setPnt1Focal(res)
            })

            props.api.getReservada(establishment.identification).then(res => {
                setPnt1Reserved(res)
            })

            props.api.getPasive(establishment.identification).then(res => {
                setPnt1Pasive(res)

                setTotalSaipPnt1(res.length)
            })

            props.api.getReservada(establishment.identification).then(res => {
                setPnt1Reserved(res)
            })

        }
    }

    useEffect(() => {
        getDatafromPnt1();

        props.usecase.getAnualReport(establishment.id || 0, new DatePnt().getYearToUpload())
            .then(res => {
                setForm(prevForm => ({
                    ...prevForm,
                    ...AnualReportMapper.toDomain(res),
                }));
                setSaved(true);
            })
            .catch(() => {
                setSaved(false);
            });

        props.usecase.getReservas(establishment.identification, new DatePnt().getYearToUpload())
            .then(res => {
                setReservas(res);
            });

        props.usecase.getSolicityStats(establishment.id || 0)
            .then(res => {
                const total = res.reduce((acc, item) => acc + item.total, 0);
                setSolicityStats(res);
                setTotalSaip(total);

                setForm(prevForm => ({
                    ...prevForm,
                    solicity_infor_anual_report: res as SolicityStatsAnualReportEntity[],
                }));
            });

        props.usecase.getTAResume(establishment.id || 0, false, paginableTAE.current || 0, paginableTAE.limit)
            .then(res => {
                setPaginableTAE(res);
            });

        props.usecase.getTAResume(establishment.id || 0, true, paginableTA.current || 0, paginableTA.limit)
            .then(res => {
                const array = res.results.sort((a, b) => {
                    let c = a.numeral.name.replace("Numeral ", "");
                    let d = b.numeral.name.replace("Numeral ", "");
                    return parseInt(c) - parseInt(d);
                });
                setPaginableTA(prev => ({
                    ...prev,
                    results: array,
                }));
            });

        props.usecase.getTFResume(establishment.id || 0, paginableTF.current || 0, paginableTF.limit)
            .then(res => {
                setPaginableTF(res);
            });

        props.usecase.getTCResume(establishment.id || 0, paginableTC.current || 0, paginableTC.limit)
            .then(res => {
                setPaginableTC(res);
            });

        props.establishmentUsecase.getOptions()
            .then(res => {
                const _function_org = res.functions.find(x => x.id == parseInt(establishment.function_organization || ""));
                setEstablishment(prevEstablishment => ({
                    ...prevEstablishment,
                    function_organization: _function_org?.name,
                }));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);



    useEffect(() => {
        const _total = totalSaip + totalSaipPnt1;
        console.log('total', _total);
        console.log('form', form)
        if (_total > 0 && form.total_saip <= 0) {
            setForm((prevForm) => ({
                ...prevForm,
                total_saip: _total,
            }));
        }
    }, [totalSaip, totalSaipPnt1, form.total_saip]);

    const addItemsTable = () => {
        const newTable = [...table, new IndexInformationClassifiedEntity("", "", "", "", "", "", "", "",)]
        setTable(newTable)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        form.establishment_id = establishment.id as number
        console.log(table)
        form.information_classified = buildItems()
        form.month = new DatePnt().getMonthOneBased();
        form.year = new DatePnt().getFullYear();
        await props.usecase.createAnualReport(form).then(() => {
            setSuccess("Reporte anual creado con exito")
            setError("")
        }).catch((err) => {
            setError(err.message)
            setSuccess("")
        })
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleChageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.selectedOptions[0].value == 'si' ? true : false
        })
    }

    const handleAdd = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleTextTable = (index: number, name: keyof IndexInformationClassifiedEntity, value: string) => {
        const element = table[index]
        if (element) {
            element[name] = value as never
        }

    }

    const handleBooleanTable = (index: number, name: keyof IndexInformationClassifiedEntity, value: boolean) => {
        const element = table[index]
        if (element) {
            element[name] = value as never
        }
    }

    const handlePageTAE = (page: number) => {
        setPaginableTAE({
            ...paginableTAE,
            current: page
        })
    }
    const handlePageTA = (page: number) => {

        setPaginableTA({
            ...paginableTA,
            current: page
        })
    }
    const handlePageTF = (page: number) => {
        setPaginableTF({
            ...paginableTF,
            current: page
        })
    }
    const handlePageTC = (page: number) => {
        setPaginableTC({
            ...paginableTC,
            current: page
        })
    }


    const onEditRow = (mes: number) => {
        if (editedMeses.includes(mes)) {
            setEditedMeses(editedMeses.filter(x => x != mes))
        } else {
            setEditedMeses([...editedMeses, mes])
        }
    }

    const isEdited = (mes: number) => {
        return editedMeses.includes(mes)
    }

    const onChangeValue = (mes: number, name: keyof SolicityStatsAnualReportEntity, value: string) => {
        const newSolicityStats = solicityStats.map((item) => {
            if (item.month == mes) {
                return {
                    ...item,
                    [name]: value
                }
            }
            return item
        })
        setSolicityStats(newSolicityStats)
        setForm({
            ...form,
            solicity_infor_anual_report: newSolicityStats
        })
    }



    const buildFocal = () => {


        let resultTf = paginableTF.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )
        if (resultTf.length == 0) {
            resultTf = [
                {
                    numeral: {
                        id: 0,
                        name: "Transparencia focalizada",
                        description: "Transparencia focalizada"
                    },
                    establishment: establishment,
                    files: [],
                    id: 0,
                    max_date_to_publish: "",
                    published: false,
                    published_at: "",
                    slug: "",
                    status: "",
                    year: 0,
                    created_at: "",
                    deleted_at: "",
                    updated_at: "",
                    deleted: false,
                    ip: "",
                    user_created: "",
                    user_deleted: "",
                    user_updated: "",
                    month: 0
                }
            ]
        }


        const mapfinal = resultTf.map((item) => {



            if (new DatePnt().getYearToUpload() == 2024) {

                const rest = pnt1focal
                

                const data = {
                    numeral: item.numeral.name,
                    enero: rest.filter((_e) => _e.enero).length > 0 ? 'Si' : 'No',
                    febrero: rest.filter((_e) => _e.febrero).length > 0 ? 'Si' : 'No',
                    marzo: rest.filter((_e) => _e.marzo).length > 0 ? 'Si' : 'No',
                    abril: rest.filter((_e) => _e.abril).length > 0 ? 'Si' : 'No',
                    mayo: rest.filter((_e) => _e.mayo).length > 0 ? 'Si' : 'No',
                    junio: rest.filter((_e) => _e.junio).length > 0 ? 'Si' : 'No',
                    julio: rest.filter((_e) => _e.julio).length > 0 ? 'Si' : 'No',
                    agosto: rest.filter((_e) => _e.agosto).length > 0 ? 'Si' : 'No',
                    septiembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
                return data

            } else {
                return {
                    numeral: item.numeral.name,
                    enero: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 1) ?
                        'Si' : 'No',
                    febrero: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 2) ?
                        'Si' : 'No',
                    marzo: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 3) ?
                        'Si' : 'No',
                    abril: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 4) ?
                        'Si' : 'No',
                    mayo: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 5) ?
                        'Si' : 'No',
                    junio: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 6) ?
                        'Si' : 'No',
                    julio: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 7) ?
                        'Si' : 'No',
                    agosto: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 8) ?
                        'Si' : 'No',
                    septiembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTF.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'

                }
            }

        })

        return mapfinal

    }




    const buildColab = () => {
        let resultTf = paginableTC.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )

        if(resultTf.length == 0){
            resultTf = [
                {
                    numeral: {
                        id: 0,
                        name: "Transparencia colaborativa",
                        description: "Transparencia colaborativa"
                    },
                    establishment:establishment,
                    files: [],
                    id: 0,
                    max_date_to_publish: "",
                    published: false,
                    published_at: "",
                    slug: "",
                    status: "",
                    year: 0,
                    created_at: "",
                    deleted_at: "",
                    updated_at: "",
                    deleted: false,
                    ip: "",
                    user_created: "",
                    user_deleted: "",
                    user_updated: "",
                    month: 0
                }
            ]
        }


        const mapfinal = resultTf.map((item) => {



            if (new DatePnt().getYearToUpload() == 2024) {
                /*pnt1focal.find((_e) =>
                        _e.enero)*/
                const rest = pnt1colab

                const data = {
                    numeral: item.numeral.name,
                    enero: rest.filter((_e) => _e.enero).length > 0 ? 'Si' : 'No',
                    febrero: rest.filter((_e) => _e.febrero).length > 0 ? 'Si' : 'No',
                    marzo: rest.filter((_e) => _e.marzo).length > 0 ? 'Si' : 'No',
                    abril: rest.filter((_e) => _e.abril).length > 0 ? 'Si' : 'No',
                    mayo: rest.filter((_e) => _e.mayo).length > 0 ? 'Si' : 'No',
                    junio: rest.filter((_e) => _e.junio).length > 0 ? 'Si' : 'No',
                    julio: rest.filter((_e) => _e.julio).length > 0 ? 'Si' : 'No',
                    agosto: rest.filter((_e) => _e.agosto).length > 0 ? 'Si' : 'No',
                    septiembre: paginableTC.results.find((_e) =>
                         _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTC.results.find((_e) =>
                         _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTC.results.find((_e) =>
                         _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTC.results.find((_e) =>
                         _e.month == 12) ?
                        'Si' : 'No'
                }
                return data

            } else {
                return {
                    numeral: item.numeral.name,
                    enero: paginableTC.results.find((_e) =>
                         _e.month == 1) ?
                        'Si' : 'No',
                    febrero: paginableTC.results.find((_e) =>
                         _e.month == 2) ?
                        'Si' : 'No',
                    marzo: paginableTC.results.find((_e) =>
                      _e.month == 3) ?
                        'Si' : 'No',
                    abril: paginableTC.results.find((_e) =>
                        _e.month == 4) ?
                        'Si' : 'No',
                    mayo: paginableTC.results.find((_e) =>
                        _e.month == 5) ?
                        'Si' : 'No',
                    junio: paginableTC.results.find((_e) =>
                        _e.month == 6) ?
                        'Si' : 'No',
                    julio: paginableTC.results.find((_e) =>
                        _e.month == 7) ?
                        'Si' : 'No',
                    agosto: paginableTC.results.find((_e) =>
                         _e.month == 8) ?
                        'Si' : 'No',
                    septiembre: paginableTC.results.find((_e) =>
                         _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTC.results.find((_e) =>
                      _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTC.results.find((_e) =>
                         _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTC.results.find((_e) =>
                        _e.month == 12) ?
                        'Si' : 'No'

                }
            }

        })
        return mapfinal
    }


    const buildActive = () => {
        const diff = paginableTA.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )
        const mapfinal = diff.map((item) => {
            if (new DatePnt().getYearToUpload() == 2024) {
                const rest = pnt1active.filter((_e) =>
                "Numeral "+_e.numeral.replace(" - ","-") == item.numeral.name 
                && _e.art =="19"
            )
                const data = {
                    numeral: item.numeral.name,
                    enero: rest?.filter((_e) => _e.enero).length > 0 ? 'Si' : 'No',
                    febrero: rest?.filter((_e) => _e.febrero).length > 0 ? 'Si' : 'No',
                    marzo: rest?.filter((_e) => _e.marzo).length > 0 ? 'Si' : 'No',
                    abril: rest?.filter((_e) => _e.abril).length > 0 ? 'Si' : 'No',
                    mayo: rest?.filter((_e) => _e.mayo).length > 0 ? 'Si' : 'No',
                    junio: rest?.filter((_e) => _e.junio).length > 0 ? 'Si' : 'No',
                    julio: rest?.filter((_e) => _e.julio).length > 0 ? 'Si' : 'No',
                    agosto: rest?.filter((_e) => _e.agosto).length > 0 ? 'Si' : 'No',
                    septiembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
                return data
            } else {
                return {
                    numeral: item.numeral.name,
                    enero: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 1) ?
                        'Si' : 'No',
                    febrero: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 2) ?
                        'Si' : 'No',
                    marzo: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 3) ?
                        'Si' : 'No',

                    abril: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 4) ?
                        'Si' : 'No',

                    mayo: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 5) ?
                        'Si' : 'No',

                    junio: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 6) ?
                        'Si' : 'No',

                    julio: paginableTA.results.find((_e) =>

                        _e.numeral.id == item.numeral.id && _e.month == 7) ?
                        'Si' : 'No',

                    agosto: paginableTA.results.find((_e) =>

                        _e.numeral.id == item.numeral.id && _e.month == 8) ?
                        'Si' : 'No',

                    septiembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTA.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
            }
        })

        return mapfinal

    }

    const buildActiveEs = () => {
        const diff = paginableTAE.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )
        const mapfinal = diff.map((item) => {
            if (new DatePnt().getYearToUpload() == 2024) {
                const rest = pnt1active.find((_e) =>
                    item.numeral.name.includes("Art. "+_e.art) && _e.art !== "19"
                )
                const data = {
                    numeral: item.numeral.name,
                    enero: rest?.enero ? 'Si' : 'No',
                    febrero: rest?.febrero ? 'Si' : 'No',
                    marzo: rest?.marzo ? 'Si' : 'No',
                    abril: rest?.abril ? 'Si' : 'No',
                    mayo: rest?.mayo ? 'Si' : 'No',
                    junio: rest?.junio ? 'Si' : 'No',
                    julio: rest?.julio ? 'Si' : 'No',
                    agosto: rest?.agosto ? 'Si' : 'No',
                    septiembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
                return data
            } else {
                return {
                    numeral: item.numeral.name,
                    enero: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 1) ?
                        'Si' : 'No',
                    febrero: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 2) ?
                        'Si' : 'No',
                    marzo: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 3) ?
                        'Si' : 'No',

                    abril: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 4) ?
                        'Si' : 'No',

                    mayo: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 5) ?
                        'Si' : 'No',

                    junio: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 6) ?
                        'Si' : 'No',

                    julio: paginableTAE.results.find((_e) =>

                        _e.numeral.id == item.numeral.id && _e.month == 7) ?
                        'Si' : 'No',

                    agosto: paginableTAE.results.find((_e) =>

                        _e.numeral.id == item.numeral.id && _e.month == 8) ?
                        'Si' : 'No',

                    septiembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: paginableTAE.results.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
            }
        })

        return mapfinal

    }


    const buildPasive = () => {

        if (new DatePnt().getYearToUpload() == 2024) {



            const solicitiesmap = solicityStats.map(e => {



                const total = pnt1pasive.filter((item) => item.date.includes('-' + e.month + '-') ||
                    item.date.includes('2024-0' + e.month + '-') ||
                    item.date.includes('/' + e.month + '/') ||
                    item.date.includes('/0' + e.month + '/') 
                ).length + e.total
                
                let percent = (totalSaip+totalSaipPnt1) == 0 ? 0 : 
                    (total / (totalSaip+totalSaipPnt1)) * 100
                percent = Math.round(percent * 100) / 100  

                let percent_pnt2 = (totalSaip+totalSaipPnt1) == 0 ? 0 :
                    (e.total_response_to_10_days / (totalSaip+totalSaipPnt1)) * 100
                percent_pnt2 = Math.round(percent_pnt2 * 100) / 100
                

               


                //total no respondodias
                const total_no = pnt1pasive.filter((item) => item.date.includes('-' + e.month + '-') ||
                    item.date.includes('2024-0' + e.month + '-') ||
                    item.date.includes('/' + e.month + '/') ||
                    item.date.includes('/0' + e.month + '/')
                ).filter((item) => item.state.toLowerCase().includes('no respondida')).length + e.total_no_response
                let percent_no = (totalSaip+totalSaipPnt1) == 0 ? 0 :
                    (total_no / (totalSaip+totalSaipPnt1)) * 100
                percent_no = Math.round(percent_no * 100) / 100



                //total respondodias
                const total_respondidas = pnt1pasive.filter((item) => item.date.includes('-' + e.month + '-') ||
                    item.date.includes('2024-0' + e.month + '-') ||
                    item.date.includes('/' + e.month + '/') ||
                    item.date.includes('/0' + e.month + '/')
                ).length + e.total_response_to_10_days - total_no

                    let percent_respondidas = (totalSaip + totalSaipPnt1) == 0 ? 0 :
                        (total_respondidas / (totalSaip + totalSaipPnt1)) * 100
                percent_respondidas = Math.round(percent_respondidas * 100) / 100

                return {
                    ...e,
                    total: total,
                    total_response_to_10_days: total_respondidas,
                    percent_response_to_10_days: percent_respondidas,
                    month: e.month,
                    total_no_response: total_no,
                    percent_no_response: percent_no,
                }
            })
            return solicitiesmap
        } else {
            return solicityStats
        }




    }


    const buildItems = () => {

        const lista_final: IndexInformationClassifiedEntity[] = []
        if (new DatePnt().getYearToUpload() == 2024) {
            pnt1reserved.forEach((item) => {
                lista_final.push(new IndexInformationClassifiedEntity(
                    item.theme.trim() == "" ? "NO APLICA" : item.theme,
                    item.base_legal.trim() == "" ? "NO APLICA" : item.base_legal,
                    item.date_classification.trim() == "" ? "NO APLICA" : item.date_classification,
                    item.period_extension.trim() == "" ? "NO APLICA" : item.period_extension,
                    item.extension.trim() == "" ? "NO APLICA" : item.extension,
                    item.description.trim() == "" ? "NO APLICA" : item.description,
                    item.date_extension.trim() == "" ? "NO APLICA" : item.date_extension,
                    item.period_extension.trim() == "" ? "NO APLICA" : item.period_extension,
                ))
            })
        }

        reservas.forEach((item) => {
            lista_final.push(new IndexInformationClassifiedEntity(
                item.tema.trim() == "" ? "NO APLICA" : item.tema,
                item.numero_resolucion.trim() == "" ? "NO APLICA" : item.numero_resolucion,
                item.fecha_clasificacion.trim() == "" ? "NO APLICA" : item.fecha_clasificacion,
                item.periodo_vigencia.trim() == "" ? "NO APLICA" : item.periodo_vigencia,
                "NO APLICA",
                "NO APLICA",
                "NO APLICA",
                "NO APLICA",

            ))
        })

        return lista_final

    }

    return (
        <AnnualReportPresenter
            OnChange={handleChange}
            onSelected={handleChageSelect}
            onSubmit={handleSubmit}
            onText={handleAdd}
            Items={buildItems()}
            addItemElements={addItemsTable}
            onTextTable={handleTextTable}
            onBooleanTable={handleBooleanTable}
            establishment={establishment}
            solicityStats={buildPasive()}
            onPageTAE={handlePageTAE}
            onPageTA={handlePageTA}
            onPageTF={handlePageTF}
            onPageTC={handlePageTC}
            resultsTAE={buildActiveEs()}
            resultsTA={buildActive()}
            resultTF={buildFocal()}
            resultTC={buildColab()}
            error={error}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            form={form}
            isEdit={isEdited}
            onEdit={onEditRow}
            onChangeValue={onChangeValue}
            total_saip={totalSaip + totalSaipPnt1}
            isSaved={saved}

        />

    )
}

export default AnnualReportContainer