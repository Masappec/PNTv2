import { Normative } from "../../../domain/entities/PedagodyAreaEntity"
import Spinner from "../../Common/Spinner"
import { MapIsotipo } from "../../Common/MapIsotipo"
import ArticleNormativa from "../../Common/ArticleNormativa"


interface Props {
  normatives: Normative[]
  error: string
  loading: boolean
  setError: (error: string) => void


}



const NormativePresenter = (props: Props) => {

  if (props.loading) {
    return (
      <Spinner />
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
          <h2 className='mb-4 mt-8 rounded-md bg-primary p-4 text-left text-xl font-bold text-white'>
            Normativas y guías
          </h2>
          <section className='flex flex-col items-center justify-center gap-4'>

          {
            props.normatives.map((data) => {
              return (
                <>
                

                        <ArticleNormativa title={data.title} onClick={() => { 

                          //redirect 
                            window.open(data.url, '_blank')
                            
                        }} />
                     
                </>
              )
            })
          }
          </section>




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