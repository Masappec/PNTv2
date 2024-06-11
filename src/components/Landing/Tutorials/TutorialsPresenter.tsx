import { FrequencyAsked, Tutorial } from "../../../domain/entities/PedagodyAreaEntity";
import Iframe from "../../Common/Iframe";
import { MapIsotipo } from "../../Common/MapIsotipo";



interface Props {
    tutorial: Tutorial[];
    faq: FrequencyAsked[];
    loading: boolean;
    error: string;
    
}
const TutorialsPresenter = (props:Props) => {
      console.log(props)
        return (
            <main>
                 <MapIsotipo />
            <section id='videos' className='section-container my-16'>
              <h2 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                ¿Qué información voy a encontrar?
              </h2>
        
              <p className='mb-8 text-sm text-gray-600 md:text-base'>
                En este espacio encontrarás videos tutoriales que te ayudarán a navegar por el Portal
                Nacional de Transparencia.
              </p>
        
              <div className='space-y-8'>
            <Iframe title=" YouTube video player" link="https://www.youtube.com/embed/V-gmeM5g_pA?si=IrFwPnhaIH0egXmu"/>
            <Iframe title=" YouTube video player" link="https://www.youtube.com/embed/vNCI0y2LVwM?si=dns1uLvF6vJZpnE0"/>
            </div>
            </section>
            </main>
           
        );
    }
export default TutorialsPresenter; 






// <div className="h-auto">
        //      <div className="row flex items-center justify-center mt-10 w-full">
        //         <div className="col-md-12 items-center justify-center w-full">
        //             <h2 className="text-center
        //             text-4xl
        //             font-bold
        //             text-primary-800
                    
        //             ">Tutoriales</h2>
        //         </div>

        //     </div>
        //     <div className="row  flex items-center justify-center mt-10 w-full">
        //         <div className=" flex items-center justify-center w-1/2">
        //             {
        //                 props.tutorial.map((item)=>{
        //                     return (
        //                         <Card
        //                         className="col-md-12"
        //                         renderImage={() => <iframe width="560" height="315" src={item.url} title="YouTube video player"  allowFullScreen></iframe>                            }
        //                       >
        //                         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //                           {
        //                                 item.title
        //                           }
        //                         </h5>
        //                         <p className="font-normal text-gray-700 dark:text-gray-400">
        //                          {
        //                                 item.description
                                    
        //                          }
        //                         </p>
        //                       </Card>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        // </div>
        