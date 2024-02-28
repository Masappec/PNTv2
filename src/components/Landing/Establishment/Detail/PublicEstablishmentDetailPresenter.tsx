import { Button, Label } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment";

import PublicationEntity from "../../../../domain/entities/PublicationEntity";

import CreatableSelect from "react-select/creatable";

import { CiMenuBurger } from "react-icons/ci";



import { FiCalendar } from "react-icons/fi";
import TableInfo from "../../../Common/TableInfo";
import CardQuestion from "../../../Common/CardQuestion";
import { SiZebratechnologies } from "react-icons/si";




interface Props {
    entity: EstablishmentEntity;
    error: string;
    loading: boolean;
    publications: PublicationEntity[];
    total: number;
    totalPages: number;
    from: number;
    to: number;
    current_page: number;
    onChangePage: (page: number) => void;
    onItemPublicationClick: (slug: string) => void;

    onSearch: (search: string) => void

 

}

const colors = [
    {
      contrast: "#F7941D",
      bgcolor: "#F7941D0D",
    },
    {
      contrast: "#A5C330",
      bgcolor: "#A5C3300D",
    },
    {
      contrast: "#D26497",
      bgcolor: "#FFF9FC",
    },
  ];


const PublicEstablishmentDetailPresenter = (props: Props) => {

   return(
    <div  className=" flex flex-col w-full  bg-white lg:pr-10 ">
        <div></div>
            <div className="border-l-2 border-gray-400  ml-0 md:ml-14">
                <div className="container  w-screen px-20">
        <h2 className="text-3xl font-bold">Municipio de Guayaquil</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 pr-10 w-full gap-y-32 border-b ">

              <CardQuestion
                mostrarIcono= {false}
                title="Información 
                publicada 
                hasta el 
                momento"
                content={""}
                contrast= "#F7941D"
                bgcolor= "#F7941D0D"

              ></CardQuestion>
    
    
        </div>

    <div className="mb-2  text-gray-400 mt-14 w-[759px] ">
        
              
  <CreatableSelect
  placeholder= {"Transparencia Activa"}
  
    isClearable
    options={[]}
    isMulti={true}
    onInputChange={() => {}}
    onCreateOption={() => {}}
    onChange={() => {}}
  /></div>

<p className="text-start text-lg font-medium mt-14">Transparencia activa </p>

<h2 className="text-2xl font-semibold mt-4">Municipio de Guayaquil</h2>
<p className=" text-sm w-[697px] mt-8 font-medium">La ley Orgánica de Transparencia y Acceso de la Información Pública (LOTAIP) obliga a todas las instituciones del Estado que conforman el sector público a difundir a trasvés de la página web institucional, información mínima actualizada de naturaleza obligatoria.</p>

<Button
                                type="button"
                                onClick={()=>{}}
                                className="flex items-center justify-center w-1/2 text-lg tracking-wide
                                text-gray-700 font-semibold bg-gray-200 rounded-md border-gray-300 border-2  sm:w-auto gap-x-2 hover:bg-slate-400 mt-12 mb-10 ">
                                <span className="flex col-2 gap-6 "> 
                                <FiCalendar className="w-5 h-5" />
                               
                                    Seleccionar año
                                </span>
                            </Button>
<div className="w-[1216px]">

                         <TableInfo
                         
                         columns={[

                          
                            {
                                
                                
                                render: () => (
                                    <p >{""}</p>
                                ),
                            
                                title: "File name",

    
                            },
                            {
                                render: () => (
                                    <p>{""}</p> 
                                ),
                                title: "Tamaño de archivo"
                            },
                            {
                                render: () => (
                                    <p>{}</p>
                                ),
                                title: "Fecha de carga"
                            },
                            {
                                render: () => (
                                    <p>{""}</p>
                                ),
                                title: "Fecha de actualización"
                            },
                            {
                                render: () => (
                                    <p>{""}</p>
                                ),
                                title: "Cargado por"
                            },
                            {
                                render: () => (
                                    <p> <button
                                    onClick={() => {
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                    < CiMenuBurger />
                                </button></p>
                                ),
                                title: ""
                            },
                            


                         ]} title={""} description={""} onFilter={function (type: string): void {
                   throw new Error("Function not implemented.");
               } } length={0} data={[]} onSearch={function (search: string): void {
                   throw new Error("Function not implemented.");
               } } search={""}      
               
               />
               </div>
                 <div className="mb-2  text-gray-400 mt-14 w-[759px] ">
        
    

    <CreatableSelect
    placeholder= {"Transparencia focaalizada"}
      isClearable
      options={[]}
      isMulti={true}
      onInputChange={() => {}}
      onCreateOption={() => {}}
      onChange={() => {}}
    />
  </div>
  <div className="mb-20 text-gray-400 mt-14 w-[759px] ">
        
    

    <CreatableSelect
    placeholder= {"Transparencia colaborativa"}
      isClearable
      options={[]}
      isMulti={true}
      onInputChange={() => {}}
      onCreateOption={() => {}}
      onChange={() => {}}
    />
  </div>

                        
                    

</div>
</div>
</div>
    )
}
export default PublicEstablishmentDetailPresenter