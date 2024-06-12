import { Accordion } from "flowbite-react";
import { FrequencyAsked, Tutorial } from "../../../domain/entities/PedagodyAreaEntity";



interface Props {
    tutorial: Tutorial[];
    faq: FrequencyAsked[];
    loading: boolean;
    error: string;

}
const FAQPresenter = (props: Props) => {


    return (
        <section id='faq' className='section-container my-16'>
            <h2 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                ¿Qué puedo hacer en este portal?
            </h2>

            <p className='mb-8 text-sm text-gray-600 md:text-base'>
                A continuación, te presentamos las respuestas a las preguntas más frecuentes sobre este
                Portal.
            </p>
            <Accordion collapseAll>
            {
                props.faq.map((item) => {
                    return (
                        <Accordion.Panel
                        
                        >
                            <Accordion.Title> <span>{item.question}</span></Accordion.Title>
                            <Accordion.Content>


                                <p className="text-gray-500 dark:text-gray-400">
                                    <div className='border border-b-0 border-gray-300 p-4'>
                                        <p className='mb-2 text-gray-600'>
                                            {item.answer}
                                        </p>
                                    </div>
                                </p>

                            </Accordion.Content>
                        </Accordion.Panel>

                    )
                })
            }
            </Accordion>

        </section>

    )
}
export default FAQPresenter;