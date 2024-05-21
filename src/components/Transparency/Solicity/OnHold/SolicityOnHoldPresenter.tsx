import { LuCheck } from "react-icons/lu";
import Spinner from "../../../Common/Spinner";
import { Alert, Button, Textarea } from "flowbite-react";
import { Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface Props {
  handleSubmit: () => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  setComment: (value:string)=>void;
  comment:string;
}
const SolicityOnHoldPresenter = (props: Props) => {
  return (
    <div className="container">
      <div className="flex items-center  justify-center">
        {props.error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error!</span> {props.error}
          </Alert>
        )}
      </div>
      <div className="flex ">
        <section className="container px-4 mx-auto">
          

          <div className="mt-10">
            {props.success && (
              <Alert color="success" icon={HiInformationCircle}>
                <span className="font-medium">Exitoso!</span> {props.success}
              </Alert>
            )}

            <div className="grid grid-cols ">
              <div className="flex  flex-col m-2">
                <Label htmlFor="" value={`Comentar. \n
                                        Si necesitas comentar algo sobre la respuesta recibida, ingresarla a continuación`
                } />
                <Textarea
                  placeholder={""}
                  value={props.comment}
                  name="abbreviation"
                  onChange={(e)=>props.setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mt-4 gap-x-3">
              
              {props.loading ? (
                <Spinner />
              ) : (
                <Button
                    onClick={()=>props.handleSubmit()}
                  type="button"
                  className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-primary-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuCheck className="w-5 h-5" />
                  <span>Enviar comentario</span>
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
    
  );
};

export default SolicityOnHoldPresenter;
