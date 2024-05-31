import { FaSearch } from "react-icons/fa";
import { ColourOption, Row } from "../../../../utils/interface";
import Input from "../../../Common/Input";
import Select from 'react-select/async'
import { Alert, Label, Spinner } from "flowbite-react";
import DynamicReadTable from "../../../Common/DimanycReadTable";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;

  onSelect: () => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  month: string;
  onSelectMonth: (month: string) => void;
  onSearch: () => void
  onChangeEstablishment: (value: string) => void;
  tables: {
    numeral: string,
    data: Row[][]
  }[]
  loading: boolean,
  alert: {
    type: 'success' | 'failure' | 'warning' | 'info'
    message: string
  }
}
const AudiencePresenter = (props: Props) =>{
    return(
      <form action="" className="justify-center">

        <div className="w-full h-auto  md:xl:justify-center flex 
       flex-auto ">
          <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
            Audiencias y Reuniones
          </p>
        </div>

        <div className="relative search 
      lg:mt-8 w-full h-auto 
      
      xl:justify-center flex   lg:m-0
       flex-auto">
          <div className="relative lg:w-full w-[90%] xl:w-[730px] mb-16">
            <Label>
              Entidad
            </Label>
            <Select
              loadOptions={props.loadOptions}
              placeholder="Buscar por entidad"
              noOptionsMessage={() => <>Sin Resultados</>}
              onChange={(value) => {
                props.onChangeEstablishment(value?.value || "")
              }}
            />
            <Input
              type="month"
              placeholder="Año/Mes"
              value={new Date(props.selectedYear, parseInt(props.month) - 1).toISOString().slice(0, 7)}
              onChange={(value) => {
                const [year, month] = value.target.value.split("-")
                console.log(year, month)
                props.onSelectYear(parseInt(year))
                props.onSelectMonth(parseInt(month) + "")
              }}
            />
            <div className="w-full flex justify-center mt-3">

              <button
                type="button"
                onClick={props.onSearch}
                disabled={props.loading}
                className="!absolute w-[86px] h-[50px] border-black  
                 
                  text-white bg-primary-500
                  
                   hover:bg-primary-800 focus:ring-4
                   justify-center
                     font-normal 
                    flex items-center
                    xl:w-[150px]
                    xl:space-x-5
                    -ml-20
                    rounded-full text-xl  "
              >

                <p className='hidden xl:flex'>
                  Buscar
                </p>
                {
                  props.loading ? <Spinner aria-label="Extra large spinner example" size="md" /> :
                    <FaSearch size="20" />


                }
              </button>
            </div>

          </div>


        </div>
        <div className="w-full h-auto  md:xl:justify-center flex">

          {props.alert.message != '' &&
            <Alert
              color={props.alert.type}
              className="w-full mb-8"
            >
              <span className="font-medium"> {props.alert.message}</span>

            </Alert>
          }
        </div>
        <div className="m-8">
          {
            props.tables.map((table, index) => (
              <div key={index} className="mb-8">
                <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
                  {table.numeral}
                </p>
                <DynamicReadTable
                  isSaved={true}
                  data={table.data}
                  onSaveTable={() => { }}
                  limitRows={10}
                />
              </div>
            ))

          }
        </div>


      </form>

    )
}

export default AudiencePresenter;