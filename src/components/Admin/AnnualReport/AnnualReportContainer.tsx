import { useEffect, useState } from "react";
import { AnualReportUseCase } from "../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import AnnualReportPresenter from "./AnnualReportPresenter"
import { AnualReportEntity, IndexInformationClassifiedEntity, SolicityStatsAnualReportEntity } from "../../../domain/entities/AnualReportEntity";
import SessionService from "../../../infrastructure/Services/SessionService";
import EstablishmentUseCase from "../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { SolicityStatsAnualReportDto } from "../../../infrastructure/Api/AnualReport/interface";
import { Pagination } from "../../../infrastructure/Api";
import { TransparencyActivePublicResponse } from "../../../infrastructure/Api/TansparencyActive/interface";
import { TransparencyFocusListDto } from "../../../infrastructure/Api/TransparencyFocus/interface";
import { TransparencyCollabListDto } from "../../../infrastructure/Api/TransparencyCollab/interface";
import { DatePnt } from "../../../utils/date";

interface Props {
    usecase: AnualReportUseCase;
    establishmentUsecase: EstablishmentUseCase

}
const AnnualReportContainer = (props: Props) => {

    const [form, setForm] = useState<AnualReportEntity>(AnualReportEntity.buildVoid())
    const [table, setTable] = useState<IndexInformationClassifiedEntity[]>([])

    const [solicityStats, setSolicityStats] = useState<SolicityStatsAnualReportDto[]>([])

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")


    const [editedMeses, setEditedMeses] = useState<number[]>([])
    const [establishment, setEstablishment] = useState<EstablishmentEntity>(SessionService.getEstablishmentData())

    const [paginableTA, setPaginableTA] = useState<Pagination<TransparencyActivePublicResponse>>({
        from:0,
        to:0,
        total:0,
        current:1,
        limit:0,
        next:0,
        previous:0,
        results:[],
        total_pages:0
    })


    const [paginableTAE, setPaginableTAE] = useState<Pagination<TransparencyActivePublicResponse>>({
        from: 0,
        to: 0,
        total: 0,
        current: 1,
        limit: 0,
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
        limit: 0,
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
        limit: 0,
        next: 0,
        previous: 0,
        results: [],
        total_pages: 0
    })
    useEffect(()=>{
        props.usecase.getSolicityStats(establishment.id||0).then(res=>{
            setSolicityStats(res)
            setForm({
                ...form,
                solicity_infor_anual_report: res as SolicityStatsAnualReportEntity[]
            })
        })
        props.usecase.getTAResume(establishment.id || 0, false, paginableTAE.current ||0,paginableTAE.limit).then(res=>{
           
            
            setPaginableTAE(res)
        })
        props.usecase.getTAResume(establishment.id || 0, true, paginableTA.current || 0, paginableTA.limit).then(res => {
            setPaginableTA(res)
        })
        props.usecase.getTFResume(establishment.id || 0, paginableTF.current || 0, paginableTF.limit).then(res => {
            setPaginableTF(res)
        })
        props.usecase.getTCResume(establishment.id || 0, paginableTC.current || 0, paginableTC.limit).then(res => {
            setPaginableTC(res)
        })
    }, [paginableTAE.current, paginableTA.current, paginableTF.current, paginableTC.current])

    useEffect(() => {

        props.establishmentUsecase.getOptions().then((res) => {
            const _function_org = res.functions.find(x => x.id == parseInt(establishment.function_organization||""))
            console.log(_function_org)
            setEstablishment({
                ...establishment,
                function_organization: _function_org?.name
            })
        }
        ).catch((err) => {
            console.log(err)
        })

    }, [])

    const addItemsTable = () => {
        const newTable = [...table, new IndexInformationClassifiedEntity("", "", "", "", false, "", "", "",)]
        setTable(newTable)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        form.establishment_id = establishment.id as number
        form.information_classified = table
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

    const handlePageTAE = (page:number)=>{
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


    const onEditRow = (mes:number) => {
        if (editedMeses.includes(mes)) {
            setEditedMeses(editedMeses.filter(x => x != mes))
        } else {
            setEditedMeses([...editedMeses, mes])
        }
    }

    const isEdited = (mes:number) => {
        return editedMeses.includes(mes)
    }

    const onChangeValue = (mes:number, name: keyof SolicityStatsAnualReportEntity, value: string) => {
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


    return (
        <AnnualReportPresenter
            OnChange={handleChange}
            onSelected={handleChageSelect}
            onSubmit={handleSubmit}
            onText={handleAdd}
            Items={table}
            addItemElements={addItemsTable}
            onTextTable={handleTextTable}
            onBooleanTable={handleBooleanTable}
            establishment={establishment}
            solicityStats={solicityStats}
            onPageTAE={handlePageTAE}
            onPageTA={handlePageTA}
            onPageTF={handlePageTF}
            onPageTC={handlePageTC}
            resultsTAE={paginableTAE}
            resultsTA={paginableTA}
            resultTF={paginableTF}
            resultTC={paginableTC}
            error={error}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            form={form}
            isEdit={isEdited}
            onEdit={onEditRow}
            onChangeValue={onChangeValue}

        />

    )
}

export default AnnualReportContainer