import { Accordion } from "flowbite-react"
import TransparencyActive from "../../../../../domain/entities/TransparencyActive";
import Table from "../../../../Common/Table";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import TemplateFileUseCase from "../../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TemplateService from "../../../../../infrastructure/Services/TemplateService";
import TemplateFileApi from "../../../../../infrastructure/Api/TemplateFile/TemplateFileApi";
import api from "../../../../../infrastructure/Api";
import { Transform } from "../../../../../utils/transform";


interface Props {
    month: string;
    number_month: number;
    year: number;
    data: TransparencyActive[]
    onOpen: (month: number) => void;
    establishment: string;
}
const TA = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const TemplateUsecase = new TemplateFileUseCase(new TemplateService(new TemplateFileApi(api)))

    const handleOpen = () => {
        if (!isOpen) {
            props.onOpen(props.number_month)
        }

        setIsOpen(!isOpen)
    }

    const onDownloadFile = async (url: string, name: string) => {
        try {
            console.log(url)
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

    const onDownLoadPdf = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            })

            const file = new File([res.data], name + '.csv', { type: 'text/csv' })
            TemplateUsecase.detectDelimiter(file, (delim, text) => {
                const csv = TemplateUsecase.cleanCSV(text)
                Transform.fromCsvToPdfLandScape(csv, name, props.establishment)
            })
        } catch (e) {
            console.log(e)
        }


    }

    const textFormat = (text: string) => {
        return text.replace(/_/g, " ");
    }

    const onDonwloadXlsx = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            })

            const file = new File([res.data], name + '.csv', { type: 'text/csv' })
            TemplateUsecase.detectDelimiter(file, (delim, text) => {
                console.log(delim)

                Transform.fromCsvToXlxs(text, name)
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Accordion.Panel
                isOpen={isOpen}
                setOpen={() => handleOpen()}
                className="bg-white dark:bg-gray-800 shadow-md w-full rounded-lg p-5 mb-5">
                <Accordion.Title>
                    {props.month}
                </Accordion.Title>
                <Accordion.Content>
                    <Table<TransparencyActive>
                        show={true}
                        text="La institución no ha publicado datos para este mes."
                        columns={[

                            {
                                render: (item) => {
                                    return (
                                        <p className="text-gray-900
                                         dark:text-white 
                                         text-left
                                         text-wrap
                                            flex-wrap
                                         text-base">
                                            {
                                                textFormat(item.numeralPartial?.name || "")
                                                    .replace("Numeral", "")
                                                    .replace("Art. ", "")
                                            }
                                            {" " + textFormat(item.numeralPartial?.description || "")}</p>
                                    )
                                },
                                title: "Numeral"
                            },
                            {
                                render: (item) => {
                                    return (
                                        <p className="text-gray-900 dark:text-white text-base">

                                            {new Date(item.published_at).toLocaleDateString()}

                                        </p>
                                    )
                                },
                                title: "Publicado"
                            },
                            {
                                render: (item) => {
                                    return <div className="flex flex-row space-x-5 w-full">
                                        {
                                            item.files.map((file, i) =>
                                                <div className="flex flex-col space-y-2" key={i}>
                                                    <div key={i} className="grid grid-cols-3 ">
                                                        <a key={i}
                                                            href={'#'}
                                                            onClick={() => onDownloadFile(file.url_download as string,
                                                                `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                            )}
                                                            className="text-primary-500 
                                                    hover:text-primary-600 text-base">
                                                            <FaFileCsv className="text-primary-500 
                                                    hover:text-primary-600 text-base"
                                                                size={30}
                                                            />


                                                        </a>
                                                        <a key={i}
                                                            href={'#'}
                                                            onClick={() => onDownLoadPdf(file.url_download as string,
                                                                `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                            )}
                                                            className="text-primary-500
                                                    hover:text-primary-600 text-base">
                                                            <FaFilePdf className="text-red-500 
                                                    hover:text-primary-600 text-base "
                                                                size={30}

                                                            />
                                                        </a>
                                                        <a key={i}
                                                            href={"#"}
                                                            onClick={() => onDonwloadXlsx(file.url_download as string,
                                                                `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                            )}
                                                            target="_blank"
                                                            className="text-primary-500
                                                    hover:text-primary-600 text-base"
                                                        >
                                                            <FaFileExcel className="text-green-500" size={30}
                                                            />
                                                        </a>



                                                    </div>
                                                    <div key={i} className="w-full justify-center items-center">
                                                        {file.description}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                },
                                title: "Archivos Publicados"
                            },
                        ]}
                        data={props.data}
                        description="No se encontraron resultados"
                        length={props.data.length}
                        onFilter={() => { }}
                        search=""
                        title=""
                        currentPage={1}
                        from={1}
                        isImport={false}
                        key={0}
                        onChangePage={() => { }}
                        onImport={() => { }}
                        to={props.data.length}
                        total={props.data.length}
                    />
                </Accordion.Content>
            </Accordion.Panel>

        </>
    )
}

export default TA