
import { ResponsePresupuestos } from "../../../../infrastructure/Api/PublicDataApi/interface";
import { ColourOption } from "../../../../utils/interface";
import CustomInputSearch from "../../../Common/CustomInputSearch";
import { MapIsotipo } from "../../../Common/MapIsotipo";
import TablePublic from "../../../Common/TablePublic";
import Input from "../../../Common/Input";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";
import { URL_API } from "../../../../utils/constans";
import { PUBLIC_PATH } from "../../../../infrastructure/Api";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;

   selectedYear: number;
   onSelectYear: (year: number) => void;
  month: number;
  onSelectMonth: (month: number) => void;
  onSearch: () => void
   onChangeEstablishment: (value: string) => void;
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
 
  data: ResponsePresupuestos[]

}
const FinancePresenter = (props:Props) => {

  const onDownloadFile = async (url: string, name: string) => {
    try {
      const res = await axios.get(url, {
        responseType: 'blob'
      })
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name + '.csv'
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.log(e)
    }
  }
  return (
  
    <main>
       <MapIsotipo />
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
            <CustomInputSearch

              loadOptions={props.loadOptions}
              onSearch={props.onSearch}
              onSelect={(e) => props.onChangeEstablishment(e.value)}
            />
        </div>

        <section className='mt-4 flex max-w-max items-center gap-4'>
          
          <div>
            <Input
              placeholder={"Mes y Año"}
              
              onChange={(e) => { 

                const [year, month] = e.target.value.split("-")
                props.onSelectYear(parseInt(year))
                props.onSelectMonth(parseInt(month))
              }}
              type="month"
              
              className="block w-full rounded-lg  text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              required    />
          </div>
        </section>

        <button
          onClick={()=>{props.onSearch()}}
          type='button'
          className='mt-8 rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          Buscar
        </button>
      </form>

      <div className='mt-8 h-min rounded-md bg-gray-100'>
                <TablePublic
                    
                    columns={[
                      {
                        title: "INSTITUCIÓN",
                        render: (row) => (
                            <p>{row.establishment_name}</p>
                        )
                    },
                    {
                      title: "AÑO",
                      render: (row) => (
                          <p>{row.year}</p>
                      )
                     },
                     {
                      title: "MES",
                    render: (row) => (
                        <p>{row.month}</p>
                    )
                   },
                   {
                   title: "CONJUNTO DE DATOS",
                   render: (row) => {
                     const file = row.files.find(e => e.description.toLowerCase() == 'conjunto de datos')
                      return<div className="flex flex-row justify-center"> 
                        <a key={row.id} href="#" 
                        onClick={() => onDownloadFile(URL_API+PUBLIC_PATH+file?.url_download as string,
                                                    `transparencia-focalizada-${props.selectedYear}-${props.month}-${file?.description}`
                                                )}
                                                    className="text-primary-500 
                                                hover:text-primary-600 text-base">
                                                    <FaFileCsv className="text-primary-500 
                                                hover:text-primary-600 text-base ml-5" 
                                                
                                                />
                                                Descargar
                                                    

                      </a></div>
                   }
                   },
                   {
                   title: "METADATOS",
                   render: (row) => {
                     const file = row.files.find(e => e.description.toLowerCase() == 'metadatos')
                     return <div className="flex flex-row justify-center">  <a key={row.id} href="#" onClick={() => onDownloadFile(URL_API +PUBLIC_PATH+file?.url_download as string,
                       `transparencia-focalizada-${props.selectedYear}-${props.month}-${file?.description}`
                     )}
                       className="text-primary-500 
                                                hover:text-primary-600 text-base">
                       <FaFileCsv className="text-primary-500 
                                                hover:text-primary-600 text-base ml-5" />
                       Descargar

                     </a></div>
                   }
                    },
                    {
                      title: "DICCIONARIO",
                      render: (row) => {
                        const file = row.files.find(e => e.description.toLowerCase() == 'diccionario')
                        return <div className="flex flex-row justify-center"> <a key={row.id} href="#" onClick={() => onDownloadFile(URL_API +PUBLIC_PATH+file?.url_download as string,
                          `transparencia-focalizada-${props.selectedYear}-${props.month}-${file?.description}`
                        )}
                          className="text-primary-500 
                                                hover:text-primary-600 text-base">
                          <FaFileCsv className="text-primary-500 
                                                hover:text-primary-600 text-base ml-5" />
                          
                          Descargar
                        </a></div>
                      }
                       }
                  

                  ]
                }
                    currentPage={props.page}
                    data={props.data}
                    length={0}
                    
                    key={"roles-table"}
                    
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


