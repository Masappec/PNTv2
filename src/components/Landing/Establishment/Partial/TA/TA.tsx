import { Accordion } from "flowbite-react"
import TransparencyActive from "../../../../../domain/entities/TransparencyActive";
import Table from "../../../../Common/Table";
import { FaFileCsv } from "react-icons/fa";


interface Props {
    month: string;
    number_month: number;
    year: number;
    data: TransparencyActive[]
}
const TA = (props: Props) => {
    return (
        <Accordion className="mt-28 mb-24">
            <Accordion.Panel>
                <Accordion.Title>
                    {props.month}
                </Accordion.Title>
            </Accordion.Panel>
            <Accordion.Content>
                <Table<TransparencyActive>
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
                                            <a key={i} href={file.url_download as string}
                                                className="text-primary-500 
                                                hover:text-primary-600 text-base">
                                                <FaFileCsv className="text-primary-500 
                                                hover:text-primary-600 text-base ml-5" />
                                                {file.name}

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
        </Accordion>
    )
}

export default TA