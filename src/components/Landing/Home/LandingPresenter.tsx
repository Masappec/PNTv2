import Hero from "../../Common/Hero";
import CardConsulta from "../../Common/Card";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { ColourOption } from "../../../utils/interface";
import CardQuestion from "../../Common/CardQuestion";
import logo from "../../../assets/logoestadoabierto.png";
interface Props {
  loadOptions: (
    inputValue: string,
    callback: (options: ColourOption[]) => void
  ) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
  faq: FrequencyAsked[];
  onPersonal: () => void;
  onFollow: () => void;
  onAudience: () => void;
  onForm: () => void;
  onSearch: () => void;
  onQuestion: (index:number)=> void;

}
const LandingPresenter = (props: Props) => {

  const Icon = [
    () => (<svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'>
      <path
        d='M30 57C44.9117 57 57 44.9117 57 30C57 15.0883 44.9117 3 30 3C15.0883 3 3 15.0883 3 30C3 44.9117 15.0883 57 30 57Z'
        stroke='currentColor'
        stroke-width='6'></path>
      <path
        d='M26.8472 36.8643V36.4963C26.8564 34.7883 27.0131 33.4294 27.3172 32.4197C27.6306 31.4099 28.0729 30.5984 28.6443 29.9851C29.2156 29.3622 29.9114 28.7913 30.7316 28.2723C31.2937 27.9137 31.796 27.5221 32.2384 27.0974C32.6898 26.6633 33.0447 26.1821 33.3027 25.6536C33.5607 25.1158 33.6898 24.5165 33.6898 23.856C33.6898 23.1105 33.5192 22.4641 33.1783 21.9167C32.8373 21.3694 32.3766 20.9448 31.796 20.6428C31.2246 20.3408 30.5841 20.1898 29.8746 20.1898C29.2202 20.1898 28.5982 20.3361 28.0084 20.6287C27.4278 20.9117 26.944 21.3458 26.557 21.9309C26.1792 22.5065 25.9672 23.2378 25.921 24.1249H21C21.0461 22.332 21.47 20.8315 22.2717 19.6236C23.0827 18.4158 24.1517 17.5099 25.4787 16.9059C26.815 16.302 28.2895 16 29.9022 16C31.6623 16 33.2105 16.3161 34.5468 16.9484C35.8923 17.5806 36.9382 18.4818 37.6847 19.652C38.4404 20.8127 38.8182 22.1904 38.8182 23.7852C38.8182 24.861 38.6477 25.8235 38.3067 26.6728C37.975 27.5221 37.5004 28.277 36.883 28.9376C36.2655 29.5982 35.5328 30.1879 34.685 30.707C33.9385 31.1788 33.3258 31.6695 32.8465 32.1791C32.3766 32.6886 32.0263 33.2879 31.796 33.9767C31.5748 34.6561 31.4596 35.496 31.4504 36.4963V36.8643H26.8472ZM29.2524 45.697C28.4231 45.697 27.7089 45.395 27.1099 44.791C26.5109 44.1871 26.2114 43.451 26.2114 42.5829C26.2114 41.7336 26.5109 41.007 27.1099 40.403C27.7089 39.7991 28.4231 39.4971 29.2524 39.4971C30.0727 39.4971 30.7823 39.7991 31.3813 40.403C31.9895 41.007 32.2936 41.7336 32.2936 42.5829C32.2936 43.1586 32.1508 43.6822 31.8651 44.1541C31.5886 44.6259 31.22 45.0034 30.7592 45.2865C30.3076 45.5601 29.8054 45.697 29.2524 45.697Z'
        fill='currentColor'></path>
    </svg>),
    () => (<svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='61'
      viewBox='0 0 60 61'
      fill='none'>
      <path
        d='M30 3.5L3 17L30 30.5L57 17L30 3.5Z'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 44L30 57.5L57 44'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 30.5L30 44L57 30.5'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>),
    () => (<svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'>
      <path
        d='M27 6.00002H17.4C12.3595 6.00002 9.83928 6.00002 7.91407 6.98095C6.22063 7.8438 4.84378 9.22066 3.98093 10.9141C3 12.8393 3 15.3595 3 20.4V42.6C3 47.6405 3 50.1607 3.98093 52.0859C4.84378 53.7794 6.22063 55.1562 7.91407 56.0191C9.83928 57 12.3595 57 17.4 57H39.6C44.6405 57 47.1607 57 49.0859 56.0191C50.7793 55.1562 52.1562 53.7794 53.0191 52.0859C54 50.1607 54 47.6405 54 42.6V33M33 45H15M39 33H15M54.3639 5.63606C57.8787 9.15074 57.8787 14.8493 54.3639 18.3639C50.8493 21.8787 45.1507 21.8787 41.6361 18.3639C38.1213 14.8493 38.1213 9.15074 41.6361 5.63606C45.1507 2.12131 50.8493 2.12131 54.3639 5.63606Z'
        stroke='currentColor'
        stroke-width='4.8'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>)

  ];


  const IconsConsulta = [
    () => (<svg
      className='mb-4 md:group-hover:hidden'
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'>
      <rect width='72' height='72' rx='36' fill='#FFBD71'></rect>
      <path
        d='M29.3335 51V27.6667C29.3335 26.1167 29.3335 25.3417 29.5039 24.7059C29.9662 22.9804 31.3139 21.6327 33.0394 21.1704C33.6752 21 34.4502 21 36.0002 21C37.5501 21 38.3251 21 38.9609 21.1704C40.6864 21.6327 42.0341 22.9804 42.4965 24.7059C42.6668 25.3417 42.6668 26.1167 42.6668 27.6667V51M24.6668 51H47.3335C49.2003 51 50.1338 51 50.8468 50.6367C51.474 50.3171 51.9839 49.8072 52.3035 49.18C52.6668 48.4669 52.6668 47.5335 52.6668 45.6667V33C52.6668 31.1332 52.6668 30.1997 52.3035 29.4867C51.9839 28.8595 51.474 28.3496 50.8468 28.03C50.1338 27.6667 49.2003 27.6667 47.3335 27.6667H24.6668C22.8 27.6667 21.8666 27.6667 21.1535 28.03C20.5263 28.3496 20.0164 28.8595 19.6968 29.4867C19.3335 30.1997 19.3335 31.1332 19.3335 33V45.6667C19.3335 47.5335 19.3335 48.4669 19.6968 49.18C20.0164 49.8072 20.5263 50.3171 21.1535 50.6367C21.8666 51 22.8 51 24.6668 51Z'
        stroke='#FFF7EC'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>),
    () => (<svg
      className='mb-4 md:group-hover:hidden'
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'>
      <rect width='72' height='72' rx='36' fill='#B4C365'></rect>
      <path
        d='M36.0002 19.333C38.1889 19.333 40.3561 19.7641 42.3782 20.6017C44.4003 21.4393 46.2376 22.6669 47.7853 24.2146C49.3329 25.7622 50.5606 27.5995 51.3982 29.6216C52.2357 31.6437 52.6668 33.811 52.6668 35.9997M36.0002 19.333V35.9997M36.0002 19.333C26.7954 19.333 19.3335 26.7949 19.3335 35.9997C19.3335 45.2044 26.7954 52.6663 36.0002 52.6663C45.2049 52.6663 52.6668 45.2044 52.6668 35.9997M36.0002 19.333C45.2049 19.333 52.6668 26.7949 52.6668 35.9997M52.6668 35.9997L36.0002 35.9997M52.6668 35.9997C52.6668 38.6299 52.0443 41.2227 50.8503 43.5662C49.6562 45.9097 47.9244 47.9373 45.7966 49.4833L36.0002 35.9997'
        stroke='#FCFFF0'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>),
    () => (<svg
      className='mb-4 md:group-hover:hidden'
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'>
      <rect width='72' height='72' rx='36' fill='#D26497'></rect>
      <path
        d='M39.3332 34.3335H29.3332M32.6665 41.0002H29.3332M42.6665 27.6668H29.3332M49.3332 32.6668V27.3335C49.3332 24.5332 49.3332 23.1331 48.7882 22.0635C48.3088 21.1227 47.5439 20.3578 46.6031 19.8785C45.5336 19.3335 44.1334 19.3335 41.3332 19.3335H30.6665C27.8662 19.3335 26.4661 19.3335 25.3966 19.8785C24.4557 20.3578 23.6908 21.1227 23.2115 22.0635C22.6665 23.1331 22.6665 24.5332 22.6665 27.3335V44.6668C22.6665 47.4671 22.6665 48.8672 23.2115 49.9368C23.6908 50.8776 24.4557 51.6425 25.3966 52.1219C26.4661 52.6668 27.8662 52.6668 30.6665 52.6668H36.8332M45.9998 51.0002C45.9998 51.0002 50.9998 48.617 50.9998 45.0422V40.8716L47.3538 39.5688C46.4778 39.2551 45.5198 39.2551 44.6438 39.5688L40.9998 40.8716V45.0422C40.9998 48.617 45.9998 51.0002 45.9998 51.0002Z'
        stroke='#FFF9FC'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>
),
    () => (<svg
      className='mb-4 md:group-hover:hidden'
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'>
      <rect width='72' height='72' rx='36' fill='#70DED8'></rect>
      <path
        d='M49.3332 36.833V27.333C49.3332 24.5327 49.3332 23.1326 48.7882 22.0631C48.3088 21.1222 47.5439 20.3573 46.6031 19.878C45.5336 19.333 44.1334 19.333 41.3332 19.333H30.6665C27.8662 19.333 26.4661 19.333 25.3966 19.878C24.4557 20.3573 23.6908 21.1222 23.2115 22.0631C22.6665 23.1326 22.6665 24.5327 22.6665 27.333V44.6663C22.6665 47.4666 22.6665 48.8667 23.2115 49.9363C23.6908 50.8771 24.4557 51.642 25.3966 52.1214C26.4661 52.6663 27.8662 52.6663 30.6665 52.6663H35.9998M39.3332 34.333H29.3332M32.6665 40.9997H29.3332M42.6665 27.6663H29.3332M40.1665 47.6663L43.4998 50.9997L50.9998 43.4997'
        stroke='white'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>)
  ];




  return (
    <>

      <Hero
        onSearch={props.onSearch}
        countEntities={props.countEntities}
        countFiles={props.countFiles}
        loadOptions={props.loadOptions}
        onSelect={props.onSelect} />
        <section
          className='section-container mt-32 grid min-h-64 w-full grid-cols-[repeat(auto-fit,minmax(18rem,_1fr))] 
          place-items-center'>

        <CardQuestion
        
          title="¿Qué puedo hacer en este portal?"
          content="Consulta las preguntas frecuentes para resolver tus principales dudas sobre esta plataforma."
          backgroundColor="bg-custom-orange"
          color="text-black"
          onFollow={()=>props.onQuestion(0)}
          icon={Icon[0]}
        />
        <CardQuestion

          title="¿Qué información voy a encontrar?"
          content="Revisa nuestros vídeo tutoriales que explican paso a paso cómo utilizar este sitio."
          backgroundColor="bg-custom-green"
          color="text-black"
          onFollow={() => props.onQuestion(1)}
          icon={Icon[1]}
        />
        <CardQuestion

          title="¿Deben las entidades responder mis solicitudes?"
          content=" Encuentra las leyes y normativas que regulan el derecho de acceso a la información
              pública."
          backgroundColor="bg-custom-pink"
          color="text-black"
          onFollow={() => props.onQuestion(1)}
          icon={Icon[2]}
        />

        

      </section>
      <section className='section-container my-16 flex flex-col gap-y-4 md:flex-row md:items-end'>
        <h2 className='text-balance text-2xl font-normal leading-tight md:text-[40px]'>
          Buscar por eje temático
        </h2>
        <div className='h-[1px] w-full bg-gray-300'></div>
      </section>
      <section
        className='section-container grid min-h-[22rem] w-full grid-cols-[repeat(auto-fit,minmax(18rem,_1fr))] place-items-center gap-4'>
      
      
        <CardConsulta
          backgroundColor=" bg-custom-orange-orange-light  hover:bg-custom-orange"
          icon={IconsConsulta[0]}
          title="Personal y Remuneraciones"
          content={'Encuentra información sobre remuneraciones y cargos de personas que laboran en el sector público.'}
          onFollow={props.onPersonal}
        />
        
        <CardConsulta
        backgroundColor="bg-custom-green-light  hover:bg-custom-green"
      icon={IconsConsulta[1]}
        title="Presupuestos por Instituciones"
        content={'Consulta los presupuestos de las instituciones sujetas al ámbito de la LOTAIP.'}
        onFollow={props.onFollow}

      />
        <CardConsulta
          backgroundColor="bg-custom-pink-light  hover:bg-custom-pink"
          icon={IconsConsulta[2]}
          title="Audiencias y Reuniones"
          content={'Revisa las audiencias y reuniones sostenidas por autoridades y servidores del jerarquíco superior.'}
          onFollow={props.onAudience}

        />
        <CardConsulta
          backgroundColor="bg-custom-turquoise-light  hover:bg-custom-turquoise"
          icon={IconsConsulta[3]}
          title="Formularios y Solicitudes"
          content={'Descarga los formularios y formatos que se requieren para realizar los trámites en las distintas entidades públicas.'}
          onFollow={props.onForm}
        />
      </section>
      <section className='section-container mt-16 pb-16'>
        <article className='mx-auto flex max-w-lg flex-col items-center gap-4 sm:flex-row'>
          <a href="https://www.gobiernoabierto.ec/'" target='_blank' rel='noopener noreferrer'>
            <span className='sr-only'>Gobierno Abierto Ecuador</span>
            <img
              className='mx-auto h-auto w-full max-w-[120px]'
              loading='lazy'
              src={logo}
              alt='Logo del Gobierno Abierto Ecuador'
            />
          </a>

          <div className='flex max-w-xs flex-col items-end justify-between'>
            <p className=''>
              Este <strong>"Portal Nacional de Transparencia"</strong> es uno de los compromisos del Segundo
              Plan de
              <a
                className='hover:underline hover:underline-offset-2'
                href='https://www.gobiernoabierto.ec/'
                target='_blank'
                rel='noopener noreferrer'>
                Estado Abierto Ecuador
              </a>
              2022-2024.
            </p>
            <a
              className='text-primary hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Conoce más
            </a>
          </div>
        </article>
      </section>

    </>
  )
};

export default LandingPresenter;
