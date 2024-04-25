import Numeral from "../../../Common/Numeral";
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
    <div className=" w-full md:p-4 mx-auto ">
      <div className="flex items-center  justify-center"></div>

      <form className="flex ">
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Transparencia Activa
                </h2>
              </div>

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
