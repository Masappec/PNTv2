import { FaDownload, FaPlus } from "react-icons/fa6";
import { FilePublicationEntity } from "../../../../../domain/entities/PublicationEntity";
import { Pagination, Tooltip } from "flowbite-react";
import IconSearch from "../../../../Common/IconSearch";


interface IListUploadsFilesProps {
    files: FilePublicationEntity[]
    onDownloadFileFromUrl: (url: string) => void
    onAddFileToPublication: (file: FilePublicationEntity) => void
    currentPage: number
    totalPages: number
    onChangePage: (page: number) => void
}


export const ListUploadsFiles = (props: IListUploadsFilesProps) => {





    return (
        <div>
            <h1>
                Archivos subidos
            </h1>
            <div>

            </div>
            <div className="grid grid-cols-5 gap-3 mb-5">
                {
                    props.files.map((file, index) => (
                        <Tooltip content={file.name} key={index}>
                            <div className="flex flex-col w-40 h-full m-2 bg-slate-100 p-5 rounded-lg shadow-xl" key={index}>
                                <IconSearch type={file.name} />
                               
                                <span className=" text-gray-500 text-sm dark:text-gray-300 flex-wrap w-1/2">
                                    {file.description.length > 10 ? file.description.substring(0, 10) + "..." : file.description}
                                </span>
                                <span className=" text-gray-500 text-sm dark:text-gray-300 overflow-auto">
                                    {
                                        file.created_at ?
                                            new Date(file.created_at).toLocaleDateString()
                                            : ""
                                    }
                                </span>
                                <span className="flex mt-5 text-gray-500 text-sm space-x-11 dark:text-gray-300">
                                    <FaDownload className=" text-primary-500 cursor-pointer" size={15} onClick={() => props.onDownloadFileFromUrl(file.url_download as string)} />
                                    <FaPlus className=" text-primary-500 cursor-pointer" size={15} onClick={() => props.onAddFileToPublication(file)} />
                                </span>
                                
                            </div>
                        </Tooltip>
                    ))
                }
            </div>
            <Pagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                onPageChange={props.onChangePage}
                nextLabel="Siguiente"
                previousLabel="Anterior"
            />
        </div>
    )
};