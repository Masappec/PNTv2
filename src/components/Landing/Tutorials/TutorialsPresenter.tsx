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

    const formatUrlYoutube = (url: string) => {
        
      if (url.includes('embed')) return url;

      if (url.includes('youtube') && !url.includes('embed')) {

          const urlParts = url.split('/');


          const videoId = urlParts[urlParts.length - 1];
          return `https://www.youtube.com/embed/${videoId}`;

      }

      return url;

      

    }

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
            
              {
                props.tutorial.map((data) => {
                  return (
                    <>
                      <Iframe title={data.title} link={formatUrlYoutube(data.url)} />
                    </>
                  )
                })
              }
            </div>
            </section>
            </main>
           
        );
    }
export default TutorialsPresenter; 



