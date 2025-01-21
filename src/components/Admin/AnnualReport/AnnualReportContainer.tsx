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

    const [editedMeses, setEditedMeses] = useState<number[]>([])
    const [establishment, setEstablishment] = useState<EstablishmentEntity>(SessionService.getEstablishmentData())
    const [paginableTA, setPaginableTA] = useState<Pagination<TransparencyActivePublicResponse>>({
        from:0,
        to:0,
        total:0,
        current:1,
        limit:1000,
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



    useEffect(()=>{

        if(new DatePnt().getYearToUpload()==2024){
            console.log(establishment.identification,establishment.id)
            props.api.getActive(establishment.identification).then(res=>{
                setPnt1Active(res)
            })
            props.api.getColaborator(establishment.identification).then(res=>{
                setPnt1Colab(res)
            })

            props.api.getFocal(establishment.identification).then(res=>{
                setPnt1Focal(res)
            })

            props.api.getReservada(establishment.identification).then(res=>{
                setPnt1Reserved(res)
            })

            props.api.getPasive(establishment.identification).then(res=>{
                setPnt1Pasive(res)
                
                setTotalSaipPnt1(res.length)
            })

            props.api.getReservada(establishment.identification).then(res=>{
                setPnt1Reserved(res)
            })
            
        }


        props.usecase.getReservas(establishment.identification, new DatePnt().getYearToUpload()).then(res => {
            setReservas(res)
        })

        props.usecase.getSolicityStats(establishment.id||0).then(res=>{
            setSolicityStats(res)
            const total = res.reduce((acc, item) => acc + item.total, 0)

            setTotalSaip(total)

            setForm({
                ...form,
                solicity_infor_anual_report: res as SolicityStatsAnualReportEntity[],

            })
        })
        
        props.usecase.getTAResume(establishment.id || 0, false, paginableTAE.current ||0,paginableTAE.limit).then(res=>{
           
            
            setPaginableTAE(res)
        })
        props.usecase.getTAResume(establishment.id || 0, true, paginableTA.current || 0, paginableTA.limit).then(res => {
            const array = res.results.sort((a, b) => {
                let c = a.numeral.name
                c = c.replace("Numeral ", "")
                const c_int = parseInt(c)
                let d = b.numeral.name
                d = d.replace("Numeral ", "")
                const d_int = parseInt(d)
                return c_int - d_int
            })
            setPaginableTA({
                ...res,
                results: array
            })
        })
        props.usecase.getTFResume(establishment.id || 0, paginableTF.current || 0, paginableTF.limit).then(res => {
            setPaginableTF(res)
        })
        props.usecase.getTCResume(establishment.id || 0, paginableTC.current || 0, paginableTC.limit).then(res => {
            setPaginableTC(res)
        })
    }, [paginableTAE.current, paginableTA.current, paginableTF.current, paginableTC.current,])

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

    

        useEffect(() => {
            const _total = totalSaip + totalSaipPnt1;
            console.log('total', _total);
            if (_total > 0 && form.total_saip <= 0) {
                setForm((prevForm) => ({
                    ...prevForm,
                    total_saip: _total,
                }));
            }
        }, [totalSaip, totalSaipPnt1, form.total_saip]);

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



    const buildFocal = ()=>{


        const resultTf = paginableTF.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )


        const mapfinal = resultTf.map((item) => {
            
            

            if(new DatePnt().getYearToUpload()==2024){

                const rest = pnt1focal.find((_e) =>
                    _e.numeral == item.numeral.name)  
                

                const data = {
                    numeral:item.numeral.name,
                    enero: rest?.enero ? 'Si' : 'No',
                    febrero: rest?.febrero ? 'Si' : 'No',
                    marzo: rest?.marzo ? 'Si' : 'No',
                    abril: rest?.abril ? 'Si' : 'No',
                    mayo: rest?.mayo ? 'Si' : 'No',
                    junio: rest?.junio ? 'Si' : 'No',
                    julio: rest?.julio ? 'Si' : 'No',
                    agosto: rest?.agosto ? 'Si' : 'No',
                    septiembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
                return data

            }else{
                return {
                    numeral: item.numeral.name,
                    enero: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 1) ?
                        'Si' : 'No',
                    febrero: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 2) ?
                        'Si' : 'No',
                    marzo: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 3) ?
                        'Si' : 'No',
                    abril: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 4) ?
                        'Si' : 'No',
                    mayo: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 5) ?
                        'Si' : 'No',
                    junio: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 6) ?
                        'Si' : 'No',
                    julio: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 7) ?
                        'Si' : 'No',
                    agosto: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 8) ?
                        'Si' : 'No',
                    septiembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'

                }
            }
     
        })

        return mapfinal
        
    }




    const buildColab = () =>{
        const resultTf = paginableTC.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )

        


        const mapfinal = resultTf.map((item) => {



            if (new DatePnt().getYearToUpload() == 2024) {
                /*pnt1focal.find((_e) =>
                        _e.enero)*/
                const rest = pnt1colab.length > 0 ? pnt1colab[0]:undefined

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
                    septiembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'
                }
                return data

            } else {
                return {
                    numeral: item.numeral.name,
                    enero: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 1) ?
                        'Si' : 'No',
                    febrero: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 2) ?
                        'Si' : 'No',
                    marzo: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 3) ?
                        'Si' : 'No',
                    abril: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 4) ?
                        'Si' : 'No',
                    mayo: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 5) ?
                        'Si' : 'No',
                    junio: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 6) ?
                        'Si' : 'No',
                    julio: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 7) ?
                        'Si' : 'No',
                    agosto: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 8) ?
                        'Si' : 'No',
                    septiembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 9) ?
                        'Si' : 'No',
                    octubre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 10) ?
                        'Si' : 'No',
                    noviembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 11) ?
                        'Si' : 'No',
                    diciembre: resultTf.find((_e) =>
                        _e.numeral.id == item.numeral.id && _e.month == 12) ?
                        'Si' : 'No'

                }
            }

        })
        return mapfinal
    }


    const buildActive = ()=>{
        const diff = paginableTA.results.filter((item, index, array) =>
            array.findIndex(other => other.numeral.id === item.numeral.id) === index
        )
        const mapfinal = diff.map((item) => {
            if (new DatePnt().getYearToUpload()==2024){
                const rest = pnt1active.find((_e) =>
                    "Numeral "+_e.numeral == item.numeral.name)
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
            }else{
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



    const buildPasive = () => {

        if(new DatePnt().getYearToUpload()==2024){

            
            
            const solicitiesmap = solicityStats.map(e=>{
                
                
                
                const total = pnt1pasive.filter((item) => item.date.includes('-' + e.month +'-') ||
                    item.date.includes('2024-0' + e.month + '-') ||
                    item.date.includes('/' + e.month + '/') ||
                    item.date.includes('/0' + e.month + '/') 
                ).length
                
                const percent = (totalSaip+totalSaipPnt1) == 0 ? 0 : 
                    (total / (totalSaip+totalSaipPnt1)) * 100

                return {
                    ...e,
                    total: e.month < 9? total:e.total,
                    total_response_to_10_days: e.month < 9? 
                        total :e.total_response_to_10_days,
                    percent_response_to_10_days: e.month < 9?
                        (total == 0 ? 0 : percent):e.percent_response_to_10_days,
                }
            })
            return solicitiesmap
        }else{
            return solicityStats
        }



    
    }


    const buildItems = ()=>{

        const lista_final: IndexInformationClassifiedEntity[] = []
        if(new DatePnt().getYearToUpload()==2024){
            pnt1reserved.forEach((item) => {
                lista_final.push(new IndexInformationClassifiedEntity(
                    item.theme,
                    item.base_legal,
                    item.date_classification,
                    item.period_extension,
                    item.extension.toLowerCase() == 'si' ? true : false,
                    item.description,
                    item.date_extension,
                    item.period_extension,
                ))
            })
        }

        reservas.forEach((item) => {
            lista_final.push(new IndexInformationClassifiedEntity(
                item.theme,
                item.resolution_number,
                item.classification_date,
                item.period_of_validity,
                false,
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
            resultsTAE={paginableTAE}
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
            total_saip={totalSaip+totalSaipPnt1}

        />

    )
}

export default AnnualReportContainer