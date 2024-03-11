import Numeral from "../../../Common/Numeral";
import { Label } from "flowbite-react";
import CreatableSelect from "react-select/creatable";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";

interface ActiveNumeralsPresenterProps {
  onAdd?: () => void;
  numerals: NumeralEntity[]
  loading: boolean;
  onClickItem: (numeral: NumeralEntity) => void
}

const ActiveNumeralsPresenter = (props: ActiveNumeralsPresenterProps) => {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container w-full md:p-4 mx-auto mt-2 h-fit">
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
                onInputChange={() => { }}
                onCreateOption={() => { }}
                onChange={() => { }}
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="grid lg:grid-cols-2 gap-4 grid-cols-1 md:grid-cols-2">
              {
                props.numerals.map(numeral => (
                  <Numeral title={numeral.name} text={numeral.description}
                    onClick={() => props.onClickItem(numeral)}
                    isPublished={numeral.published}
                  />

                ))
              }
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ActiveNumeralsPresenter;
