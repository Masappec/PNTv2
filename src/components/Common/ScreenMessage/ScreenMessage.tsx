

interface Props {
    message: string;
    type: string;
    children?: React.ReactNode;
}
const ScreenMessage = ({ message, type, children }: Props) => {
    return (
        <section className='mt-8 flex h-full flex-col items-center justify-center'>
            <div
                className='text-zin mx-auto w-full max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
                <h2 className='mb-4 text-2xl font-bold text-gray-700'>{type}</h2>

                <p className='mx-auto mb-4 w-full text-center text-lg text-slate-600'>
                    {message}
                </p>
                {
                    children
                }

                
            </div>
        </section>
    )
}

export default ScreenMessage