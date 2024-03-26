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
    <div className="container w-full md:p-4 mx-auto mt-2 h-screen">
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

            </div>
          </div>
          <div className="mt-14">
            <div className="grid lg:grid-cols-1 gap-4 grid-cols-1 md:grid-cols-2">
              {
                props.numerals.map(numeral => (

                  numeral.parent === null ? (
                    <>
                      <h2 className="text-2xl font-bold  text-gray-800 dark:text-white">
                        {numeral.name}
                      </h2>
                      {
                        props.numerals.filter(n => n.parent === numeral.id).map(child => (
                          <Numeral title={child.name} text={child.description}
                            onClick={() => props.onClickItem(child)}
                            isPublished={child.published}
                          />
                        ))
                      }
                      {
                        props.numerals.filter(n => n.parent === numeral.id).length === 0 ? (
                          <Numeral title={numeral.name} text={numeral.description}
                            onClick={() => props.onClickItem(numeral)}
                            isPublished={numeral.published}
                          />
                        ) : null
                      }
                    </>
                  ) : null

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
