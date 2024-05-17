import { Accordion } from "flowbite-react"
import TransparencyActive from "../../../../../domain/entities/TransparencyActive";
import Table from "../../../../Common/Table";
import { FaFileCsv } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";


interface Props {
    month: string;
    number_month: number;
    year: number;
    data: TransparencyActive[]
    onOpen: (month: number) => void
}
const TA = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleOpen = () => {
        if (!isOpen) {
            props.onOpen(props.number_month)
        }

        setIsOpen(!isOpen)
    }

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
                        columns={[
                            {
                                render: (item) => {
                                    return (
                                        <p className="text-gray-900 dark:text-white text-base">{item.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "")}</p>
                                    )
                                },
                                title: "#"
                            },
                            {
                                render: (item) => {
                                    return (
                                        <p className="text-gray-900 dark:text-white text-base">{item.numeralPartial?.description}</p>
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
                                    return <div className="flex flex-row space-x-5">
                                        {
                                            item.files.map((file, i) =>
                                                <a key={i}
                                                    href={file.url_download as string}
                                                    onClick={() => onDownloadFile(file.url_download as string,
                                                        `${props.year}-${props.month}-${file.name}`
                                                    )}
                                                    className="text-primary-500 
                                                hover:text-primary-600 text-base">
                                                    <FaFileCsv className="text-primary-500 
                                                hover:text-primary-600 text-base ml-5" />
                                                    {file.description}

                                                </a>
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