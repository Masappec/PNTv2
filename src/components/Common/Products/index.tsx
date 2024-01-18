interface Props{
    title: string;
    subtitle: string;
    items: Array<{
        title: string;
        description: string;
        icon: React.ReactNode;
    }>
}

const Product = (props: Props) => {

    return (
        <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">{props.title}</h2>
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">{props.subtitle}</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                {
                    props.items.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                                {item.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                    ))
                }
                
            </div>
        </div>
      </section>

    )

}

export default Product;