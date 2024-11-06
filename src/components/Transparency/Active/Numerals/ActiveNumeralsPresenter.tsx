import Numeral from "../../../Common/Numeral";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";
import Spinner from "../../../Common/Spinner";
import { Alert } from "flowbite-react";




interface ActiveNumeralsPresenterProps {
  onAdd?: () => void;
  numerals: NumeralEntity[];
  loading: boolean;
  onClickItem: (numeral: NumeralEntity) => void;
  error?: string;
  setError?: (error: string) => void;
  OnselectedMonth: (month:number)=>void
  selectedMonth:number
}

const meses = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const ActiveNumeralsPresenter = (props: ActiveNumeralsPresenterProps) => {
  if (props.loading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="mb-2 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary">
        Transparencia Activa | {meses[props.selectedMonth]} {new Date().getFullYear()}
      </h2>
      <h2 className="text-xs  text-primary">
        En esta sección puedes publicar los conjuntos de datos, metadatos y
        diccionario para cada una de las obligaciones de transparencia activa.
      </h2>
      
      
     
      <section id="list-buttons" className="mb-16 max-w-6xl">
        <h2 className="mb-4 mt-8 rounded-md bg-primary p-4 text-left text-xl font-bold text-white">
          Obligaciones Generales
        </h2>
        <section className="flex flex-col items-center justify-center gap-4">
          {props.error && (
            <Alert color="failure" className="mt-4">
              {props.error}
            </Alert>
          )}
          {props.numerals
            .filter((x) => x.isDefault)
            .map((numeral) => (
              <Numeral
                title={numeral.name}
                text={numeral.description}
                onClick={() => props.onClickItem(numeral)}
                isPublished={numeral.published}
              />
            ))}
        </section>
        {
            props.numerals.length > 0 && (
        <section id="list-buttons" className="mb-16 max-w-6xl">
          <h2 className="mb-4 mt-8 rounded-md bg-primary p-4 text-left text-xl font-bold text-white">
            Obligaciones Especificas
          </h2>
          <section className="flex flex-col items-center justify-center gap-4">
            {props.numerals
              .filter((x) => !x.isDefault)
              .map((numeral) => (
                <Numeral
                  title={numeral.name}
                  text={numeral.description}
                  onClick={() => props.onClickItem(numeral)}
                  isPublished={numeral.published}
                />
              ))}
          </section>
         
        </section> 
        )
        }
      </section>
    </>
  );
};

export default ActiveNumeralsPresenter;
