import { Card } from "flowbite-react"
import { Normative } from "../../../domain/entities/PedagodyAreaEntity"
import Spinner from "../../Common/Spinner"
import Alert from "../../Common/Alert"
import { MapIsotipo } from "../../Common/MapIsotipo"
import ArticleNormativa from "../../Common/ArticleNormativa"


interface Props{
    normatives: Normative[]
    error: string
    loading: boolean
    setError: (error:string)=>void


}



const FAKE_DATA = [
    {
      sectionTitle: 'Marco Normativo LOTAIP',
      data: [
        {
          docTitle: 'Ley Orgánica de Transparencia y Acceso a la Información Pública (LOTAIP)'
        },
        {
          docTitle: 'Reglamento General (LOTAIP)'
        },
        {
          docTitle: 'Guía LOTAIP para ciudadanía'
        },
        {
          docTitle: 'Guía LOTAIP para personal del servicio público'
        },
        {
          docTitle: 'Guía LOTAIP para personal Ministerio de Economía'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-los-Derechos-y-Deberes-Ciudadania-CLAD-2013'
        },
        {
          docTitle:
            'Carta-Iberoamericana-de-Ética-e-Integridad-en-la-Función-Pública-CLAD-2018 Ministerio de Economía'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-Participación-Ciudadana-CLAD-2009'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-la-función-pública-CLAD-2003'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-Gobierno-Abierto-CLAD-2016'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-Gobierno-Electrónico-CLAD-2007'
        },
        {
          docTitle: 'Carta-Iberoamericana-de-Calidad-en-la-Gestión-CLAD-2008'
        },
        {
          docTitle: 'ACUERDO-35-2020-Guia-datos-abiertos-11-12-2020-signed'
        },
        {
          docTitle: 'Acuerdo-012-2019-tratamientodatospersonalesMINTEL'
        },
        {
          docTitle: 'Acuerdo_011-2020-Política-Datos-Abiertos-17.04.20-v4-signed'
        },
        {
          docTitle: 'Cartas-iberoamericanas-CLAD-2019 erdo_01'
        },
        {
          docTitle: 'Código-Iberoamericano-de-buen-gobierno-CLAD-2006'
        },
        {
          docTitle: 'Datos Abiertos - proceso apertura (indicadores) - abr2021'
        },
        {
          docTitle: 'Decreto_Ejecutivo_No._124_2024_reglamento_LOTAIP'
        },
        {
          docTitle: 'Directrices transparencia activa datos abiertos - DPE-2023'
        },
        {
          docTitle: 'Documento sobre datos abiertos y transparencia 2023'
        },
        {
          docTitle: 'Guía-Referencial-Iberoamericana-Competencias-LaboralesSP-CLAD-2016'
        },
        {
          docTitle:
            'Guía-Referencial-Iberoamericana-de-Competencias-Laborales-en-el-Sector-Público-CLAD-2016'
        },
        {
          docTitle: 'Informe-Co-creacion-Guia-Datos-Abiertos-REDAM-MINTEL-2020'
        },
        {
          docTitle: 'Ley transformación digital RO 245 07.02.2023'
        },
        {
          docTitle: 'Ley_Orgánica_de_Protección_de_Datos_Pers_5to_S_RO_459-26.05.2021'
        },
        {
          docTitle: 'Nueva LOTAIP R.O. 245-Segundo Suplemento 07.02.2023'
        },
        {
          docTitle: 'PoliticaDatosAbiertosEC-MINTEL-021-2022'
        },
        {
          docTitle: 'Política-Datos-Abiertos-Ecuador-RO_190_20200424MINTEL'
        },
        {
          docTitle: 'PPT_Guía-de-Datos_abiertos'
        },
        {
          docTitle: 'Principios - International Open Data Charter'
        }
      ]
    },
    {
      sectionTitle: 'Notificaciones DPE',
      data: [
        {
          docTitle: 'Instructivo Parámetros Técnicos LOTAIP Resolución No. 015-DPE-CGAJ-2024'
        },
        {
          docTitle: 'Publicación Registro Oficial - 3er. Suplemento 537-Instructivo'
        },
        {
          docTitle: 'Resolución que aprueba la Guía Metodológica No. 019-DPE-CGAJ-2024'
        },
        {
          docTitle: 'Guía Metodológica Mecanismos Exigibles - Anexa Resolución No. 019-DPE-CGAJ-2024'
        },
        {
          docTitle: 'Publicación Registro Oficial - 2do. Suplemento 540 - Guía metodológica integral'
        },
        {
          docTitle: 'Manual de uso del Portal Nacional de Transparencia v1.0 15.04.2024'
        },
        {
          docTitle: 'Resolución modelo creación comité - oficial transparencia-16.04.2024'
        },
        {
          docTitle: 'Remitiendo disposiciones Defensor del Pueblo - Cumplimiento LOTAIP'
        },
        {
          docTitle:
            'Extensión de plazo para subir información generada de meses anteriores, hasta 24 de Mayo 2024'
        },
        {
          docTitle:
            'Sentencia de la Corte Constitucional sobre LOTAIP 21-23-IN-24 del 25 de Abril 2024'
        },
        {
          docTitle: 'Directices para los sujetos obligados privados'
        }
      ]
    }
  ]


const NormativePresenter = (props:Props) => {

    if (props.loading){
        return (
            <Spinner/>
        )
    }

    return (

        <main>
              <MapIsotipo />
        <section id='normativa' className='section-container mt-16'>
          <h2 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
            ¿Deben las entidades responder mis solicitudes?
          </h2>
    
          <p className='mb-8 text-sm text-gray-600 md:text-base'>
            A continuación, podrás revisar las normativas que sustentan y protegen tu derecho a la
            información pública.
          </p>
          <div className='mb-8 gap-8'>
          {
          FAKE_DATA.map((data, index) => {
            return (
              <>
                <h2 className='mb-4 mt-8 rounded-md bg-primary p-4 text-left text-xl font-bold text-white'>
                  {data.sectionTitle}
                </h2>
                <section className='flex flex-col items-center justify-center gap-4'>
                  {data.data.map(item => {
                      return (
          
            <ArticleNormativa title={item.docTitle} onClick= {()=>{}}/>
        )
    })}
  </section>
</>
)
})
}
            

        
            </div>




          </section>
          
          </main>
        
        
       
    )
}

export default NormativePresenter 








         // <div className="container h-auto">
        //     <div className="row mt-10">
        //         <div className="col-12">
        //             <h1 className="text-center text-primary-900 font-bold text-4xl">
        //                 Normativas y guías
        //             </h1>
        //         </div>
        //     </div>
        //     <div className="row mt-10">
        //         <div className="flex col-12 justify-center items-center">
        //                 {
        //                     props.error &&
        //                     <Alert type="error" message={props.error} onClose={()=>{props.setError("")}}/>
        //                 }
        //                 {
        //                     props.normatives.map((item)=>{
        //                         return (
        //                             <Card href="#" className="w-1/2">
        //                             <h5 className="text-2xl font-bold tracking-tight text-primary-800 dark:text-white">
        //                              {item.title}
        //                             </h5>
        //                             <p className="font-normal text-gray-700 dark:text-gray-400">
        //                              {item.description}
        //                             </p>
        //                             <p>
        //                                 Enlace: <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-500">
        //                                     {item.url}
        //                                 </a>
        //                             </p>
        //                           </Card>
        //                         )
        //                     })
        //                 }
        //         </div>
        //     </div>
        // </div>