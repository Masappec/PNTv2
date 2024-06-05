import { Timeline } from "flowbite-react";
import { FrequencyAsked, Tutorial } from "../../../domain/entities/PedagodyAreaEntity";



interface Props {
    tutorial: Tutorial[];
    faq: FrequencyAsked[];
    loading: boolean;
    error: string;
    
}
const FAQPresenter = (props:Props) => {
    return (
        <div className="h-auto">
            <div className="row mt-10">
                <div className="col-md-12">
                    <h2 className="text-center
                    text-4xl
                    font-bold
                    text-primary-800
                    
                    ">Preguntas frecuentes</h2>
                </div>
            </div>
            <div className="row flex items-center justify-center mt-10 w-1/2">
                <Timeline>

                
                {
                    props.faq.map((item,index)=>{
                        return (
                            <Timeline.Item>

                                <Timeline.Content>
                                    <Timeline.Point className="text-primary-600" /> 
                                    <Timeline.Time>{index+1}</Timeline.Time>
                                    <Timeline.Title className="text-primary-800  text-2xl"
                                    >{item.question}</Timeline.Title>
                                    <Timeline.Body>
                                        {item.answer}
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                        )
                    })
                }
                </Timeline>
            </div>
          
        </div>
    );
}
export default FAQPresenter;