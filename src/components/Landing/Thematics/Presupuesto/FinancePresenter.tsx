
import { ResponsePresupuestos } from "../../../../infrastructure/Api/PublicDataApi/interface";
import { ColourOption } from "../../../../utils/interface";
import CustomInputSearch from "../../../Common/CustomInputSearch";
import { MapIsotipo } from "../../../Common/MapIsotipo";
import axios from "axios";
import { FaCalendarAlt, FaFileCsv } from "react-icons/fa";
import { URL_API } from "../../../../utils/constans";
import { TRANSPARENCY_PATH } from "../../../../infrastructure/Api";
import Spinner from "../../../Common/Spinner";
import Alert from "../../../Common/Alert";
import { CalendarMonth } from "../../../Common/CalendarYear";
import { useState } from "react";
import Table from "../../../Common/Table";

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
  length: number;
  loading: boolean;
  data: ResponsePresupuestos[]
  alert: {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string
  }
  setAlert: (alert: { type: 'success' | 'error' | 'warning' | 'info'; message: string }) => void;

}
const FinancePresenter = (props: Props) => {


  const [year, setYear] = useState<number>(props.selectedYear);
  const [month, setMonth] = useState<number>(props.month);
  const [visible, setVisible] = useState<boolean>(false);
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
              <label className='text-sm font-medium text-gray-900'>Mes Y Año</label>

              <section className='mt-4 flex max-w-max items-center gap-4'>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Mes"
                    className="border rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                    value={month}
                    onChange={(e) => {
                      const month = parseInt(e.target.value);
                      if (month >= 1 && month <= 12) {
                        setMonth(month);
                        props.onSelectMonth(month);
                      }
                    }
                    }
                  />
                  <input
                    type="number"
                    placeholder="Año"
                    className="border rounded-md px-3 py-2 w-20 focus:outline-none focus:ring focus:border-blue-300"
                    value={year}
                    onChange={(e) => {
                      const year = parseInt(e.target.value);
                      setYear(year);
                      props.onSelectYear(year);
                    }}
                  />
                  <div className="relative">

                    <button className="text-primary hover:text-primary-dark
                      focus:outline-none focus:ring-2 focus:ring-primary-dark
                      rounded-md px-3 py-2"
                      type="button"

                      onClick={() => setVisible(!visible)}
                    >
                      <FaCalendarAlt />

                    </button>
                    <CalendarMonth
                      visible={visible}
                      onMonthSelect={(month) => {
                        props.onSelectMonth(month + 1)
                        setMonth(month + 1)
                      }}
                      onYearSelect={(year) => {
                        setYear(year)

                        props.onSelectYear(year)
                      }}
                      setVisible={setVisible}
                    />
                  </div>

                  {/* You can add a calendar icon for date selection */}
                </div>
              </section>
            </div>
          </section>
          {
            props.loading ?
              <Spinner></Spinner> :
              <button
                onClick={() => { props.onSearch() }}
                type='button'
                className='mt-8 rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                Buscar
              </button>
          }
        </form>
        {
          props.alert.message && (
            <Alert
              type={props.alert.type}
              message={props.alert.message}
              onClose={() => { props.setAlert({ type: 'info', message: '' }) }}
            />)
        }
        <div className='mt-8 h-min rounded-md bg-gray-100'>
          <Table
            show={true}
            columns={[
              {
                title: "INSTITUCIÓN",
                render: (row) => (
                  <p className="text-wrap text-left justify-start xl:max-w-[200px]">
                    {row.establishment_name}</p>
                ),
                classes:'text-left'
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
                  return <div className="flex flex-row justify-center">
                    <a key={row.id} href="#"
                      onClick={() => onDownloadFile(URL_API + TRANSPARENCY_PATH + "/media/" + file?.url_download as string,
                        `transparencia-activa-${props.selectedYear}-${props.month}-${file?.description}`
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
                  return <div className="flex flex-row justify-center">  <a key={row.id} href="#" onClick={() => onDownloadFile(URL_API + TRANSPARENCY_PATH + "/media/" + file?.url_download as string,
                    `transparencia-activa-${props.selectedYear}-${props.month}-${file?.description}`
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
                  return <div className="flex flex-row justify-center"> <a key={row.id} href="#" onClick={() => onDownloadFile(URL_API + TRANSPARENCY_PATH + "/media/" + file?.url_download as string,
                    `transparencia-activa-${props.selectedYear}-${props.month}-${file?.description}`
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
            data={props.data}


          />
        </div>
      </section>
    </main>


  )
}

export default FinancePresenter;


