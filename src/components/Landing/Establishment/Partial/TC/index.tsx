import { Accordion } from "flowbite-react"
import Table from "../../../../Common/Table";
import { FaFileCsv } from "react-icons/fa";
import { useState } from "react";
import TransparencyCollab from "../../../../../domain/entities/TransparencyCollab";
import axios from "axios";


interface Props {
    month: string;
    number_month: number;
    year: number;
    data: TransparencyCollab[]
    onOpen: (month: number) => void
}
const TC = (props: Props) => {
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
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-5">
                <Accordion.Title>
                    {props.month}
                </Accordion.Title>
                <Accordion.Content>
                    <Table<TransparencyCollab>
                        show={true}
                        columns={[
                            {
                                render: (_item, index) => {
                                    return (
                                        <p className="text-gray-900 dark:text-white text-base">{index}</p>
                                    )
                                },
                                title: "#"
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
                                                <a key={i} href="#" onClick={() => onDownloadFile(file.url_download as string,
                                                    `transparencia-colaborativa-${props.year}-${props.number_month}-${file.description}`
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
                        onSearch={() => { }}
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
                        totalPages={1}
                    />
                </Accordion.Content>
            </Accordion.Panel>

        </>
    )
}

export default TC