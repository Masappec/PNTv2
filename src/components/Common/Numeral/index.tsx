
interface Props {
  title: string;
  text: string;
  onClick: () => void
  isPublished?: boolean;
}

const Numeral = ({ title, text, onClick, isPublished }: Props) => {

  return (
    <button
      onClick={() => onClick()}
      className='flex w-full  items-center gap-4 rounded-md bg-gray-100 p-4 transition-colors hover:bg-gray-200'>
      {isPublished ? (
        <div className='flex w-max items-center gap-2 rounded-lg text-xs font-normal text-white'>
          <svg
            className='size-8 text-custom-green'
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='currentColor'>
            <path d='m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z' />
          </svg>
        </div>
      ) : (
        <svg
          className='size-8 text-custom-red'
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 -960 960 960'
          width='24px'
          fill='currentColor'>
          <path d='M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z' />
        </svg>
      )}

      <section className='w-full gap-2  text-sm font-semibold text-gray-200 sm:text-base'>
        <div className='flex w-full justify-between'>
          <p className='mb-2 flex items-center justify-start text-gray-600'>
            {title}
          </p>

          {isPublished ? (
            <span className='h-max rounded-md bg-custom-green px-2 py-1 text-xs font-normal text-white'>
              Información Cargada
            </span>
          ) : (
            <span className='h-max rounded-md bg-custom-red px-2 py-1 text-xs font-normal text-white'>
              Sin publicar
            </span>
          )}
        </div>

        <p className='text-left align-middle text-gray-900'>{text}</p>
      </section>
    </button>
  )
  /*return (
    <div className="flex bg-stone-100  px-4  py-2.5 dark:bg-gray-800  h-auto rounded-lg"

      onClick={() => onClick()}>
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div className={`${isPublished == true ? "bg-green-600" : "bg-amber-500 hover:bg-amber-300"} text-white font-bold py-2 px-2 rounded-lg mt-2 cursor-pointer`}>

            {
              isPublished == false ? <FaArrowUp size={30} /> : <BiCheckCircle size={30} />
            }
          </div>
        </div>
        <div className="text-base font-medium text-gray-500 my-2 whitespace-nowrap">{title}</div>

        <div className="border-l-2 border-gray-300 h-6 my-2 "></div>
        <div className="text-base font-medium my-2 ">{text}</div>
      </div>
    </div>
  );*/
};
export default Numeral;
