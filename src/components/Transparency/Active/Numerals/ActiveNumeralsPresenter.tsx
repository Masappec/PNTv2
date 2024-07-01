import Numeral from "../../../Common/Numeral";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";
import Spinner from "../../../Common/Spinner";
import { Alert } from "flowbite-react";

interface ActiveNumeralsPresenterProps {
  onAdd?: () => void;
  numerals: NumeralEntity[]
  loading: boolean;
  onClickItem: (numeral: NumeralEntity) => void,
  error?: string;
  setError?: (error: string) => void;
}
const getCurrentDate = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long'
  };
  return currentDate.toLocaleDateString(undefined, options);
};
const ActiveNumeralsPresenter = (props: ActiveNumeralsPresenterProps) => {
  if (props.loading) {
    return <Spinner />
  }

  return(
    <>
      <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
        Transparencia Activa  | {getCurrentDate()}

      </h2>
      <section id='list-buttons' className='mb-16 max-w-6xl'>
        <h2 className='mb-4 mt-8 rounded-md bg-primary p-4 text-left text-xl font-bold text-white'>
          Obligaciones Generales
        </h2>
        <section className='flex flex-col items-center justify-center gap-4'>
          {
            props.error &&
            <Alert color="failure" className="mt-4">
              {props.error}
            </Alert>
          }
          {
            props.numerals.map(numeral => (
              <Numeral title={numeral.name} text={numeral.description}
                onClick={() => props.onClickItem(numeral)}
                isPublished={numeral.published}
              />
            ))
          }
        </section>

      </section>
    </>
  )
 
};

export default ActiveNumeralsPresenter;
