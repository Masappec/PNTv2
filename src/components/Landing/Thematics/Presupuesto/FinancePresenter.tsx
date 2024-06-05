import { Alert, Label, Spinner } from "flowbite-react";
import { ColourOption, Row } from "../../../../utils/interface";
import Select from "../../../Common/Select";
import { FaSearch } from "react-icons/fa";
import DynamicReadTable from "../../../Common/DimanycReadTable";
import Input from "../../../Common/Input";
import { MapIsotipo } from "../../../Common/MapIsotipo";
import Table from "../../../Common/Table/index"
import TablePublic from "../../../Common/TablePublic";

interface Props {
  // loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;

  // onSelect: () => void;
  // selectedYear: number;
  // onSelectYear: (year: number) => void;
  // month: string;
  // onSelectMonth: (month: string) => void;
  // onSearch: () => void
  // onChangeEstablishment: (value: string) => void;
  // tables: {
  //   numeral: string,
  //   data: Row[][]
  // }[]
  // loading: boolean,
  // alert: {
  //   type: 'success' | 'failure' | 'warning' | 'info'
  //   message: string
  // }

  setPage: (page: number) => void
  from: number;
  to: number;
  total: number;
  totalPage: number;
  page: number;
  length:number;
 


}
const FinancePresenter = (props:Props) => {
  return (
  
    <main>
    <section className='section-container my-16'>
      <header className='mb-8'>
        <h1 className='mb-4 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
          Presupuestos por Instituciones
        </h1>
        <p className='text-balance text-gray-600'>
          Consulta los presupuestos de las instituciones sujetas al ámbito de la LOTAIP.
        </p>
      </header>

      <form className='mb-4 w-full'>
        <div className='max-w-2xl'>
          <label className='text-sm font-medium text-gray-900'>Institución</label>
          <div className='group relative'>
            <svg
              className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 24 24'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
              ><path
                d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'
              ></path>
            </svg>
            <input
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
              type='text'
              placeholder='Escribe el nombre de la institución a consultar'
              name='first_name'
               onChange={()=>{}}
              required
            />
          </div>
        </div>

        <section className='mt-4 flex max-w-max items-center gap-4'>
          <div>
          <Select
                        placeholder={"Año"}
                        
                        options={[
                            {
                                value: "",
                                label: "Seleccione un año",
                                
                            },
                        ]}
                       
                        className="block w-full rounded-lg  text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                        required 
                        value={""}
                         onChange={()=>{}} />
          </div>

          <div>
            <Select
                        placeholder={"Mes"}
                        value={""}
                        onChange={() => { }}
                        options={[
                            {
                                value: "",
                                label: "Seleccione un mes",
                                
                            },
                        ]}
                       
                        className="block w-full rounded-lg  text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                        required    />
          </div>
        </section>

        <button
          onClick={()=>{}}
          type='submit'
          className='mt-8 rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          Buscar
        </button>
      </form>

      <div className='mt-8 h-min rounded-md bg-gray-100'>
                <TablePublic

                    columns={[
                      {
                        title: "INSTITUCIÓN",
                        render: () => (
                            <p>{}</p>
                        )
                    },
                    {
                      title: "AÑO",
                      render: () => (
                          <p>{}</p>
                      )
                     },
                     {
                      title: "MES",
                    render: () => (
                        <p>{}</p>
                    )
                   },
                   {
                   title: "CONJUNTO DE DATOS",
                   render: () => (
                      <p>{}</p>
                   )
                   },
                   {
                   title: "METADATOS",
                   render: () => (
                    <p>{}</p>
                    )
                    },
                    {
                      title: "DICCIONARIO",
                      render: () => (
                       <p>{}</p>
                       )
                       }
                  

                  ]
                }
                    currentPage={props.page}
                    data={[]}
                    length={0}
                    
                    key={"roles-table"}
                    onChangePage={props.setPage}
                    
                     from={props.from}
                    to={props.to}
                    total={props.total}
                    totalPages={props.totalPage}


                />
                </div>
    </section>
  </main>
  

  )
}

export default FinancePresenter;

// <form action="" className="justify-center">

    //   <div className="w-full h-auto  md:xl:justify-center flex 
    //    flex-auto ">
    //     <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
    //       Presupuesto
    //     </p>
    //   </div>

    //   <div className="relative search 
    //   lg:mt-8 w-full h-auto 
      
    //   xl:justify-center flex   lg:m-0
    //    flex-auto">
    //     <div className="relative lg:w-full w-[90%] xl:w-[730px] mb-16">
    //       <Label>
    //         Entidad
    //       </Label>
    //       <Select
    //         loadOptions={props.loadOptions}
    //         placeholder="Buscar por entidad"
    //         noOptionsMessage={() => <>Sin Resultados</>}
    //         onChange={(value) => {
    //           props.onChangeEstablishment(value?.value || "")
    //         }}
    //       />
    //       <Input
    //         type="month"
    //         placeholder="Año/Mes"
    //         value={new Date(props.selectedYear, parseInt(props.month) - 1).toISOString().slice(0, 7)}
    //         onChange={(value) => {
    //           const [year, month] = value.target.value.split("-")
    //           console.log(year, month)
    //           props.onSelectYear(parseInt(year))
    //           props.onSelectMonth(parseInt(month) + "")
    //         }}
    //       />
    //       <div className="w-full flex justify-center mt-3">

    //         <button
    //           type="button"
    //           onClick={props.onSearch}
    //           disabled={props.loading}
    //           className="!absolute w-[86px] h-[50px] border-black  
                 
    //               text-white bg-primary-500
                  
    //                hover:bg-primary-800 focus:ring-4
    //                justify-center
    //                  font-normal 
    //                 flex items-center
    //                 xl:w-[150px]
    //                 xl:space-x-5
    //                 -ml-20
    //                 rounded-full text-xl  "
    //         >

    //           <p className='hidden xl:flex'>
    //             Buscar
    //           </p>
    //           {
    //             props.loading ? <Spinner aria-label="Extra large spinner example" size="md" /> :
    //               <FaSearch size="20" />


    //           }
    //         </button>
    //       </div>

    //     </div>


    //   </div>
    //   <div className="w-full h-auto m-5 md:xl:justify-center flex">

    //     {props.alert.message != '' &&
    //       <Alert
    //         color={props.alert.type}
    //         className="w-full mb-8"
    //       >
    //         <span className="font-medium"> {props.alert.message}</span>

    //       </Alert>
    //     }
    //   </div>
    //   <div className="m-8">
    //     {
    //       props.tables.map((table, index) => (
    //         <div key={index} className="mb-8">
    //           <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
    //             {table.numeral}
    //           </p>
    //           <DynamicReadTable
    //             isSaved={true}
    //             data={table.data}
    //             onSaveTable={() => { }}
    //             limitRows={10}
    //           />
    //         </div>
    //       ))

    //     }
    //   </div>


    // </form>
