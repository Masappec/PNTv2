import { FormEvent } from "react";
import {  Button, Textarea, Timeline } from "flowbite-react";
import { Label } from "flowbite-react";
import CreatableSelect from "react-select/creatable";
import { Row } from "../../../../utils/interface";



interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  data: Row[][];

  detail: [];
}
/**
 *
 * @param props {Props} propiedades del componente
 * @returns {JSX.Element} componente
 */
const SolicityDetailPresenter = (props: Props) => {
  return (
    <div className="container">
    <form className="flex  mt-5" onSubmit={props.handleSubmit}>
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Detalles de Solicitud
                        </h2>


                    </div>

                  
                </div>
                <div className="flex items-center mt-4 gap-x-3">

                    <Button
                        type="button"
                        onClick={props.onCancel}
                        className="flex items-center justify-center w-1/2 text-sm tracking-wide
                        text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    
                        <span>
                            Regresar
                        </span>
                    </Button>
                  
  
</div>
                </div>
                <div className="mt-10">
              <  div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <Timeline className="text-lg font-semibold text-gray-900 dark:text-white"> Solicitud de insistencia</Timeline>
    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                    <Label htmlFor="" value="Descripción" />
                                        <Textarea
                              />
                     </div></div>
                
        </li>

        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                    <Label htmlFor="" value="Categoria" />
                                        <Textarea/>
                     </div></div>
                
        </li>
        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                    <Label htmlFor="" value="Archivos" />
                                        <Textarea/>
                     </div></div>
                
        
        </li>
</ol>
</div>

<  div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <Timeline className="text-lg font-semibold text-gray-900 dark:text-white">Prórroga </Timeline>
    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                                        <Textarea
                              />
                     </div></div>
                
        </li>


          </ol>
          </div>

          <  div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <Timeline className="text-lg font-semibold text-gray-900 dark:text-white">Respuesta</Timeline>
    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                                        <Textarea
                              />
                     </div></div>
                
        </li>


          </ol>
          </div>

          <  div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <Timeline className="text-lg font-semibold text-gray-900 dark:text-white">Respuesta </Timeline>
    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        <li>
        <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                                        <Textarea
                              />
                     </div></div>
                
        </li>


          </ol>
        </div>
          </div>
      
          
                </section>
                </form>
                </div>
                
              
  )

}
               
            
export default SolicityDetailPresenter