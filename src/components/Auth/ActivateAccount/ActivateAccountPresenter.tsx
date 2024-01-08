
import image from '../../../assets/activate_account.svg'
import error from '../../../assets/error.svg'

interface IProps {
    isLoading: boolean;
    error: string | null;
    title: string;
    subtitle: string;
    buttonText: string;
    onSubmit: () => void;
    description: string;
}
const ActivateAccountPresenter = (props: IProps) => {



    if (props.isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-b-4 border-primary-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    const textColor = {
        error: "text-red-500",
        success: "text-green-500"
    }

    const bgColor = {
        error: "bg-primary-400",
        success: "bg-green-50"
    }

    const bgHoverColor = {
        error: "hover:bg-red-100",
        success: "hover:bg-green-100"
    }

    const bgRingColor = {
        error: "focus:ring-red-500",
        success: "focus:ring-green-500"
    }





    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h5 className={`mb-4 text-5xl tracking-tight font-extrabold  ${props.error ? textColor.error : textColor.success
                        }`}>
                        {props.title}
                    </h5>
                    <img src={props.error ? error : image}
                    alt={props.error ? "Cuenta no activada" : "Cuenta activada"}
                    className="mx-auto w-1/2" />
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        {props.subtitle}
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        {props.description}
                    </p>
                    <a href="#" onClick={props.onSubmit}
                        className={`inline-flex text-white 
                    ${props.error ? bgColor.error : bgColor.success} 
                    ${props.error ? bgHoverColor.error : bgHoverColor.success}
                    focus:ring-4 focus:outline-none 
                    font-medium 
                    rounded-lg text-sm px-5 py-2.5 text-center
                     dark:${props.error ? bgRingColor.error : bgRingColor.success}
                     my-4`}>
                        {props.buttonText}
                    </a>
                </div>
            </div>
        </section>

    )

}

export default ActivateAccountPresenter