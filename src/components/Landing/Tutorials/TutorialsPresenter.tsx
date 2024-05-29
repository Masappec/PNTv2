import { Card } from "flowbite-react";
import { FrequencyAsked, Tutorial } from "../../../domain/entities/PedagodyAreaEntity";



interface Props {
    tutorial: Tutorial[];
    faq: FrequencyAsked[];
    loading: boolean;
    error: string;
    
}
const TutorialsPresenter = (props:Props) => {
    return (
        <div className="h-auto">
             <div className="row flex items-center justify-center mt-10 w-full">
                <div className="col-md-12 items-center justify-center w-full">
                    <h2 className="text-center
                    text-4xl
                    font-bold
                    text-primary-800
                    
                    ">Tutoriales</h2>
                </div>

            </div>
            <div className="row  flex items-center justify-center mt-10 w-full">
                <div className=" flex items-center justify-center w-1/2">
                    {
                        props.tutorial.map((item)=>{
                            return (
                                <Card
                                className="col-md-12"
                                renderImage={() => <iframe width="560" height="315" src={item.url} title="YouTube video player"  allowFullScreen></iframe>                            }
                              >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {
                                        item.title
                                  }
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                 {
                                        item.description
                                    
                                 }
                                </p>
                              </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default TutorialsPresenter;
        