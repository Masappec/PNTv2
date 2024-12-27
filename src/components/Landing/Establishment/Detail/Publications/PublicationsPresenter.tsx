import { useEffect, useState } from "react";
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
//import Alert from "../../../../Common/Alert";

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
    onOpenMonth: (month: number) => void;
    onSelectYearTC: (year: number) => void;
    selectedYearTC: number;
    onOpenMonthTC: (month: number) => void;
    publicationsTC: AcordionMonthYear<TransparencyCollab>[];
    onSelectedYearTF: (year: number) => void;
    selectedYearTF: number;
    onOpenMonthTF: (month: number) => void;
    publicationsTF: AcordionMonthYear<TransparencyFocusEntity>[];
}

const EstablishmentPublicationsPresenter = (props: Props) => {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [openPanel, setOpenPanel] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                if (hash.includes("TA")) {
                    setOpenPanel("TA");
                } else if (hash.includes("TF")) {
                    setOpenPanel("TF");
                } else if (hash.includes("TC")) {
                    setOpenPanel("TC");
                }

                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        }
    }, []);

    const handlePanelToggle = (panel: string) => {
        // Si el usuario hace clic, permitimos alternar entre abrir y cerrar
        setOpenPanel((prevPanel) => (prevPanel === panel ? null : panel));
    };

    return (
        <>
            <section className="my-16 flex flex-col gap-y-4 md:flex-row md:items-end" id="publications">
                <h2 className="text-balance text-2xl font-normal leading-tight md:text-[40px]">
                    Información publicada
                </h2>
                <div className="h-[1px] w-full bg-gray-400"></div>
            </section>
            <Accordion className="mt-28 mb-24" collapseAll>
                <Accordion.Panel>
                    <Accordion.Title onClick={() => handlePanelToggle("TA")}>
                        <p className="text-start text-primary text-lg font-medium">
                            Transparencia activa
                        </p>
                    </Accordion.Title>
                    <Accordion.Content className={openPanel === "TA" ? "block" : "hidden"}>
                        {/* Contenido de Transparencia Activa */}
                        {renderTransparencySection(
                            "TA",
                            props.mesesTA,
                            props.selectedYear,
                            props.onSelectYear,
                            props.onOpenMonth,
                            props.publications,
                            TA,
                            meses
                        )}
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title onClick={() => handlePanelToggle("TF")}>
                        <p className="text-start text-[#F15A31]/80 text-lg font-medium">
                            Transparencia focalizada
                        </p>
                    </Accordion.Title>
                    <Accordion.Content className={openPanel === "TF" ? "block" : "hidden"}>
                        {/* Contenido de Transparencia Focalizada */}
                        {renderTransparencySection(
                            "TF",
                            props.mesesTF,
                            props.selectedYearTF,
                            props.onSelectedYearTF,
                            props.onOpenMonthTF,
                            props.publicationsTF,
                            TF,
                            meses
                        )}
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title onClick={() => handlePanelToggle("TC")}>
                        <p className="text-start text-[#F7941D]/80 text-lg font-medium">
                            Transparencia colaborativa
                        </p>
                    </Accordion.Title>
                    <Accordion.Content className={openPanel === "TC" ? "block" : "hidden"}>
                        {/* Contenido de Transparencia Colaborativa */}
                        {renderTransparencySection(
                            "TC",
                            props.mesesTC,
                            props.selectedYearTC,
                            props.onSelectYearTC,
                            props.onOpenMonthTC,
                            props.publicationsTC,
                            TC,
                            meses
                        )}
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </>
    );

    function renderTransparencySection(
        key: string,
        mesesData: string[],
        selectedYear: number,
        onSelectYear: (year: number) => void,
        onOpenMonth: (month: number) => void,
        publications: AcordionMonthYear<any>[],
        Component: any,
        meses: string[]
    ) {
        return (
            <>
                <h2 className="text-2xl font-semibold mt-4">{props.entity.name}</h2>
                <p className="text-sm xl:w-full w-auto mt-8 font-medium mb-10">
                    Consulta los archivos publicados mensualmente por la institución en cumplimiento de la Ley
                </p>
                <Dropdown
                    label={
                        <>
                            <FiCalendar className="w-5 h-5 mr-5" />
                            Seleccionar año
                            <Badge className="ml-2" color="info">
                                {selectedYear}
                            </Badge>
                        </>
                    }
                    size="md"
                    arrowIcon={false}
                    dismissOnClick
                    color="cyan"
                >
                    <CalendarYear onSelect={onSelectYear} />
                </Dropdown>
                <div className="mt-14">
                    {meses.map((mes, index) => {
                        const mesIndex = index + 1;
                        const id = `${key}${mes}`;
                        return (
                            <div id={id} key={id}>
                                <Component
                                    data={publications.find(
                                        (x) => x.month === mesIndex && x.year === selectedYear
                                    )?.data || []}
                                    month={
                                        mesesData.find((x) => x === mes)
                                            ? mes
                                            : `${mes} (No publicado)`
                                    }
                                    number_month={mesIndex}
                                    year={selectedYear}
                                    onOpen={onOpenMonth}
                                    establishment={props.entity.name}
                                />
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
};

export default EstablishmentPublicationsPresenter;
