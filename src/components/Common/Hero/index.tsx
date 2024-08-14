
import { ColourOption } from "../../../utils/interface";
import CustomSearch from "../CustomSearch";
import { LogoPortal } from "../LogoPortal";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
  onSearch: () => void;
}
const Hero = (props: Props) => {



  return (
    <section className='section-container relative flex flex-wrap justify-between gap-8 py-24'>
      <LogoPortal className='max-w-64' />

      <article className='max-w-3xl'>
        <h1 className='mb-4 text-balance text-3xl font-normal leading-tight md:text-[40px] 2xl:text-5xl'>
          Accede a la información que publican las entidades del estado ecuatoriano en cumplimiento
          de la LOTAIP
        </h1>

        <CustomSearch
          loadOptions={props.loadOptions}
          onSelect={props.onSelect}
          onSearch={props.onSearch}
        />
        <p className='mt-4 text-slate-600 2xl:text-lg'>
          Contamos con {props.countFiles} conjuntos de datos registrados de {props.countEntities} instituciones
        </p>
      </article>
    </section>)
};

export default Hero;
