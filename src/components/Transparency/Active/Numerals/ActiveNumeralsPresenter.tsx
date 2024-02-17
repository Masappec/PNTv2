import Numeral from "../../../Common/Numeral";
import { Label } from "flowbite-react";
import CreatableSelect from "react-select/creatable";

interface ActiveNumeralsPresenterProps {
  onAdd?: () => void;

  loading: boolean;
}

const ActiveNumeralsPresenter = (props: ActiveNumeralsPresenterProps) => {
  return (
    <div className="container">
      <div className="flex items-center  justify-center"></div>

      <form className="flex  mt-5">
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Transparencia Activa
                </h2>
              </div>
              <div className="mb-2 block  text-gray-400 mt-14 w-80 ">
                <Label htmlFor="" value="Numeral" />
              </div>
              <CreatableSelect
                isClearable
                options={[]}
                isMulti={true}
                onInputChange={() => {}}
                onCreateOption={() => {}}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="grid grid-cols-2 gap-4">
              <Numeral title="Numero 1" text="Organización Interna"  />
              <Numeral title="Numero 2" text="Directorio de la institución " />
              <Numeral title="Numero 3" text="Remuneración" />
              <Numeral title="Numero 4" text="Licencias" />
              <Numeral title="Numero 5" text="Servicios" />
              <Numeral title="Numero 6" text="Presupuesto" />
              <Numeral title="Numero 7" text="Auditoría" />
              <Numeral title="Numero 8" text="Información clasificada" />
              <Numeral title="Numero 9" text="Contratos colectivos" />
              <Numeral title="Numero 10" text="Convenios" />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ActiveNumeralsPresenter;
