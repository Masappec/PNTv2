import { CustomSearch } from "../../../Common/CustomSearch";

interface Props {
    loadOptions: (inputValue: string, callback: (options: []) => void) => void;
   
    onSelect: ()=> void;
}
const SolicityPresenter = (props: Props) =>{
    return(
        <form action="" className="justify-center">

        <div className="w-full h-auto  md:xl:justify-center flex 
       flex-auto ">
        <p className="text-gray-700 text-2xl mt-12 mb-2  font-semibold">
          Formularios y Solicitudes
        </p>
      </div>

      <div className="relative search 
      lg:mt-8 w-full h-auto 
      
      xl:justify-center flex   lg:m-0
       flex-auto">
        <div className="relative lg:w-full w-[90%] xl:w-[730px] mb-16">
          <CustomSearch
            colourOptions={[]}
            loadOptions={props.loadOptions}
            onSelect={props.onSelect}
          />
        </div>


      </div>
</form>


    )
}

export default SolicityPresenter;