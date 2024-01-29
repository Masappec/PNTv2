import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import Spinner from "../../../Common/Spinner";
import { Alert, Button, Textarea } from "flowbite-react";
import { Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  data:[];
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
}
const SolicityOnHoldPresenter = (props: Props) => {
  return (
    <div className="container">
      <div className="flex items-center py-5 justify-center">
        {props.error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error!</span> {props.error}
          </Alert>
        )}
      </div>
      <form className="flex  mt-5" onSubmit={props.handleSubmit}>
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Prórroga
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-x-3">
              <Button
                type="button"
                onClick={props.onCancel}
                className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                <LuX className="w-5 h-5" />
                <span>Cancelar</span>
              </Button>
              {props.loading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuCheck className="w-5 h-5" />
                  <span>Crear</span>
                </Button>
              )}
            </div>
          </div>

          <div className="mt-10">
            {props.success && (
              <Alert color="success" icon={HiInformationCircle}>
                <span className="font-medium">Exitoso!</span> {props.success}
              </Alert>
            )}

            <div className="grid grid-cols ">
              <div className="flex  flex-col m-2">
                <Label htmlFor="" value="Motivo " />
                <Textarea
                  placeholder={"Motivo"}
                  value={""}
                  name="abbreviation"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SolicityOnHoldPresenter;
