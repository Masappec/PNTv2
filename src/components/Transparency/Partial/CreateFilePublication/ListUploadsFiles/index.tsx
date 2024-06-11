import { FilePublicationEntity } from "../../../../../domain/entities/PublicationEntity";
import { Pagination, } from "flowbite-react";


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
        <>
            {props.files.map(item => <article
                className='grid w-full max-w-2xl mt-5  grid-cols-[max-content,1fr] items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
                <svg
                    className='h-7 w-7 text-primary'
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 -960 960 960'
                    width='24px'
                    fill='currentColor'
                ><path
                    d='M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z'
                ></path>
                </svg>
                <section className='flex items-center justify-between'>
                    <label
                        className='inline-block text-sm font-semibold text-gray-900'
                        data-testid='flowbite-label'>
                        {item.description} | <span className='text-gray-600'>
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}
                        </span>
                    </label>

                    <footer className='flex items-end justify-end gap-2'>
                        <button
                            title='Descargar archivo'
                            onClick={() => {
                                props.onDownloadFileFromUrl(item.url_download as string);
                            }}
                            className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                height='24px'
                                viewBox='0 -960 960 960'
                                width='24px'
                                fill='currentColor'
                            ><path
                                d='m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z'
                            ></path>
                            </svg>
                            <span>Descargar archivo</span>
                        </button>

                        <button
                            title='Reutilizar archivo'
                            onClick={() => {
                                props.onAddFileToPublication(item);
                            }}
                            className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                height='24px'
                                viewBox='0 -960 960 960'
                                width='24px'
                                fill='currentColor'
                            ><path
                                d='M314-115q-104-48-169-145T80-479q0-26 2.5-51t8.5-49l-46 27-40-69 191-110 110 190-70 40-54-94q-11 27-16.5 56t-5.5 60q0 97 53 176.5T354-185l-40 70Zm306-485v-80h109q-46-57-111-88.5T480-800q-55 0-104 17t-90 48l-40-70q50-35 109-55t125-20q79 0 151 29.5T760-765v-55h80v220H620ZM594 0 403-110l110-190 69 40-57 98q118-17 196.5-107T800-480q0-11-.5-20.5T797-520h81q1 10 1.5 19.5t.5 20.5q0 135-80.5 241.5T590-95l44 26-40 69Z'
                            ></path>
                            </svg>
                            <span>Reutilizar archivo</span>
                        </button>
                    </footer>
                </section>
            </article>
            )}

            < Pagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                onPageChange={props.onChangePage}
                nextLabel="Siguiente"
                previousLabel="Anterior"
            />
        </>
    )


};