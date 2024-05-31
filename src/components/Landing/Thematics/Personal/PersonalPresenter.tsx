import { FaSearch } from "react-icons/fa";
import { ColourOption, Row } from "../../../../utils/interface";
import Input from "../../../Common/Input";
import Select from 'react-select/async'
import { Label } from "flowbite-react";
import DynamicReadTable from "../../../Common/DimanycReadTable";
interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;

  onSelect: () => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onSearch:()=>void
  onChangeEstablishment: (value: string) => void;
  data:Row[][]
}
const PersonalPresenter = (props: Props) => {
  return (
    <form action="" className="justify-center">

      <div className="w-full h-auto  md:xl:justify-center flex 
       flex-auto ">
        <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
          Personal y Remuneración
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
            noOptionsMessage={()=><>Sin Resultados</>}
            onChange={(value) => {
              props.onChangeEstablishment(value?.value || "")
            }}
          />
          <Input
            type="month"
            placeholder="Año/Mes"
          />
          <div className="w-full flex justify-center mt-3">

            <button
              type="button"
              onClick={props.onSearch}
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
              <FaSearch size="20" />
            </button>
          </div>
          
        </div>


      </div>
      <div className="w-full h-auto  md:xl:justify-center flex">
      
      
      </div>
      <div className="m-8">
        <DynamicReadTable
          isSaved={true}
          data={props.data}
          onSaveTable={() => { }}
          limitRows={10}
        />
      </div>

      
    </form>


  )
}

export default PersonalPresenter;