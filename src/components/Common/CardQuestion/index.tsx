import { ReactElement } from "react";


interface Props {
    title: string;
    content?: string | null;
    backgroundColor: string;
    text?: string | null;
    icon?: () => ReactElement;
    color: string;
    bgcolor?: string | null;
    classnames?: string | null;
    onFollow?: () => void;


}

const CardQuestion = (props: Props) => {



    return (<article
        onClick={props.onFollow}
        className={`group flex h-full w-full cursor-pointer flex-col justify-between ${props.backgroundColor} px-8 py-8 text-white hover:text-gray-700`}>
        <div className='grid grid-rows-[92px,100px,max-content]'>


            {props.icon ? props.icon() : null}


            <h2 className='text-2xl  mb-4 text-balance font-bold transition'>
                {props.title}
            </h2>
            <p className='mb-8 text-pretty text-lg font-medium leading-7 transition'>
                {props.content}
            </p>
        </div>

        <div className='inline-flex items-center justify-start gap-x-4 text-lg font-semibold'>
            <span>Ir a la Sección</span>

            <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 transition group-hover:translate-x-4'>
                <path
                    d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                    fill='currentColor'
                    fill-rule='evenodd'
                    clip-rule='evenodd'></path>
            </svg>
        </div>
    </article>)
}

export default CardQuestion;
