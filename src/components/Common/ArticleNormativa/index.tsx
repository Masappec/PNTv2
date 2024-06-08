
interface Props{
    title:string;
    onClick: ()=>void;
}


const ArticleNormativa = (props:Props) =>{
    return(
                       <article className='flex w-full items-center gap-4 rounded-md bg-gray-100 p-4 transition-colors hover:bg-gray-200'>
                        <section className='w-full gap-2  text-sm font-semibold sm:text-base'>
                          <svg
                            className='mb-2 size-6 align-middle text-gray-600'
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 -960 960 960'
                            width='24px'
                            fill='currentColor'>
                            <path d='M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z' />
                          </svg>

                          <div className='flex items-end justify-between gap-4'>
                            <span className='text-left align-middle text-gray-600'>
                              {props.title}
                            </span>
                            <button
                              id='view-doc'
                              className='flex h-max items-center gap-2 rounded-md border border-primary px-4 py-2 font-medium text-primary hover:bg-primary hover:text-white'
                              onClick={props.onClick}>
                            
                              <span>Consultar</span>
                            </button>
                          </div>
                        </section>
                      </article>
    )
}
export default ArticleNormativa