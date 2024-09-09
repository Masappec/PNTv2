import { Accordion, Badge, Dropdown } from "flowbite-react";
import { CalendarYear } from "../../../../Common/CalendarYear";
import { FiCalendar } from "react-icons/fi";
import TC from "../../Partial/TC";
import TF from "../../Partial/TF/TF";
import TA from "../../Partial/TA/TA";
import { AcordionMonthYear } from "../../../../../utils/interface";
import TransparencyCollab from "../../../../../domain/entities/TransparencyCollab";
import TransparencyFocusEntity from "../../../../../domain/entities/TransparencyFocus";
import TransparencyActive from "../../../../../domain/entities/TransparencyActive";
import EstablishmentEntity from "../../../../../domain/entities/Establishment";
import Alert from "../../../../Common/Alert";

interface Props {
    entity: EstablishmentEntity;
    error: string;
    loading: boolean;
    publications: AcordionMonthYear<TransparencyActive>[];
    onChangePage: (page: number) => void;
    onItemPublicationClick: (slug: string) => void;

    onSearch: (search: string) => void;
    mesesTA: string[];
    mesesTF: string[];
    mesesTC: string[];
    years: number[];
    onSelectYear: (year: number) => void;
    selectedYear: number;
    onOpenMonth: (month: number) => void
    onSelectYearTC: (year: number) => void;
    selectedYearTC: number;
    onOpenMonthTC: (month: number) => void
    publicationsTC: AcordionMonthYear<TransparencyCollab>[];

    onSelectedYearTF: (year: number) => void;
    selectedYearTF: number;
    onOpenMonthTF: (month: number) => void;
    publicationsTF: AcordionMonthYear<TransparencyFocusEntity>[];

}

const EstablishmentPublicationsPresenter = (props: Props) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]



    return (
        <>
            <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end' id='publications'>
                <h2 className='text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                    Información publicada
                </h2>
                <div className='h-[1px] w-full bg-gray-400'></div>
            </section>
            <Accordion className="mt-28 mb-24" collapseAll

            >
                <Accordion.Panel>
                    <Accordion.Title>
                        <p className="text-start text-primary  text-lg font-medium ">
                            Transparencia activa{" "}
                        </p>
                    </Accordion.Title>
                    <Accordion.Content>
                        <>


                            <h2 className="text-2xl font-semibold mt-4">
                                {props.entity.name}
                            </h2>
                            <p className=" text-sm xl:w-full w-auto  mt-8 font-medium mb-10">
                                Consulta los archivos publicados mensualmente por la institución en cumplimiento de la Ley (Transparencia activa)
                            </p>
                            <Dropdown label={
                                <>
                                    <FiCalendar className="w-5 h-5 mr-5 ">

                                    </FiCalendar>

                                    Seleccionar año
                                    <Badge className="ml-2" color="info">
                                        {props.selectedYear}
                                    </Badge>
                                </>

                            }
                                size={"md"}
                                arrowIcon={false}
                                dismissOnClick={true}
                                color={"cyan"}

                            >



                                <CalendarYear
                                    onSelect={props.onSelectYear}

                                />
                            </Dropdown>


                            <div className="">
                                <Accordion className="mt-14" key={"TA"} >
                                    <>
                                        {
                                            props.mesesTA.length == 0 && <Alert type="info"
                                                message="No hay información publicada en este año"
                                                onClose={() => { }} />

                                        }
                                        {
                                            meses.map((mes, index) => {
                                                const mesIndex = meses.findIndex(x => x == mes) + 1;
                                                return (
                                                    <TA
                                                        data={props.publications.find(x => x.month == mesIndex && x.year == props.selectedYear)?.data || []}
                                                        month={
                                                            props.mesesTA.find(x => x == mes) ? mes : mes + " (No publicado)"
                                                        }
                                                        number_month={meses.findIndex(x => x == mes) + 1}
                                                        year={props.selectedYear}
                                                        key={index}
                                                        onOpen={(month) => props.onOpenMonth(month)}
                                                        establishment={props.entity.name}
                                                    />
                                                );
                                            })
                                        }
                                    </>
                                </Accordion>


                            </div>


                        </>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        <p className="text-start  text-[#F15A31]/80 text-lg font-medium">

                            Transparencia focalizada

                        </p>
                    </Accordion.Title>
                    <Accordion.Content>
                        <>
                            <p className="text-start text-lg font-bold mt-14  ">
                                Consulta la información temática recopilada por la institución
                            </p>

                            <h2 className="text-2xl font-semibold mt-4">
                                {props.entity.name}
                            </h2>
                            <p className=" text-sm xl:w-full mt-8 font-medium mb-10">
                                Consulta los archivos publicados mensualmente por la institución en cumplimiento de la Ley (Transparencia activa)
                            </p>

                            <Dropdown label={
                                <>
                                    <FiCalendar className="w-5 h-5 mr-5 "></FiCalendar>

                                    Seleccionar año
                                    <Badge className="ml-2" color="info">
                                        {props.selectedYearTF}
                                    </Badge>
                                </>

                            }
                                size={"md"}
                                arrowIcon={false}
                                dismissOnClick={true}
                                color={"cyan"}

                            >



                                <CalendarYear onSelect={props.onSelectedYearTF} />
                            </Dropdown>

                            <div>
                                <Accordion className="mt-14" key={"TA"}>
                                    <>
                                        {
                                            props.mesesTF.length == 0 && <Alert type="info"
                                                message="No hay información publicada en este año"
                                                onClose={() => { }} />

                                        }
                                        {
                                            meses.map((mes, index) => {
                                                const mesIndex = meses.findIndex(x => x == mes) + 1;
                                                return (
                                                    <TF
                                                        data={props.publicationsTF.find(x => x.month == mesIndex && x.year == props.selectedYear)?.data || []}
                                                        month={
                                                            props.mesesTF.find(x => x == mes) ? mes : mes + " (No publicado)"
                                                        }
                                                        number_month={meses.findIndex(x => x == mes) + 1}
                                                        year={props.selectedYear}
                                                        key={index}
                                                        onOpen={(month) => props.onOpenMonthTF(month)}
                                                        establishment={props.entity.name}
                                                    />
                                                );
                                            })
                                        }
                                    </>

                                </Accordion>
                            </div>
                        </>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel >
                    <Accordion.Title>
                        <p className="text-start text-[#F7941D]/80 text-lg font-medium">

                            Transparencia colaborativa
                        </p>
                    </Accordion.Title>
                    <Accordion.Content>
                        <>
                            <p className="text-start text-lg font-medium mt-14">
                                Consulta la información recopilada colaborativamente por la institución
                            </p>

                            <h2 className="text-2xl font-semibold mt-4">
                                {props.entity.name}
                            </h2>
                            <p className=" text-sm xl:w-full mt-8 font-medium mb-10">
                                Consulta los archivos publicados mensualmente por la institución en cumplimiento de la Ley (Transparencia activa)
                            </p>
                            <Dropdown label={
                                <>
                                    <FiCalendar className="w-5 h-5 mr-5 "></FiCalendar>

                                    Seleccionar año
                                    <Badge className="ml-2" color="info">
                                        {props.selectedYearTC}
                                    </Badge>
                                </>

                            }
                                size={"md"}
                                arrowIcon={false}
                                dismissOnClick={true}
                                color={"cyan"}

                            >



                                <CalendarYear onSelect={props.onSelectYearTC} />
                            </Dropdown>

                            <div >


                                <div>
                                    <Accordion className="mt-14" key={"TA"}>
                                        <>
                                            {
                                                props.mesesTC.length == 0 && <Alert type="info"
                                                    message="No hay información publicada en este año"
                                                    onClose={() => { }} />

                                            }
                                            {
                                                meses.map((mes, index) => {
                                                    const mesIndex = meses.findIndex(x => x == mes) + 1;
                                                    return (
                                                        <TC
                                                            data={props.publicationsTC.find(x => x.month == mesIndex
                                                                && x.year == props.selectedYear)?.data || []}
                                                            month={
                                                                props.mesesTC.find(x => x == mes) ? mes : mes + " (No publicado)"
                                                            }
                                                            number_month={meses.findIndex(x => x == mes) + 1}
                                                            year={props.selectedYear}
                                                            key={index}
                                                            onOpen={(month) => props.onOpenMonthTC(month)}
                                                            establishment={props.entity.name}
                                                        />
                                                    );
                                                })
                                            }

                                        </>

                                    </Accordion>
                                </div>
                            </div>
                        </>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

        </>
    )
}

export default EstablishmentPublicationsPresenter;