
import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";



const LandingPresenter = () => {
    return (
        <div className="flex flex-col w-full bg-white pr-10">
            <div>

            </div>
            <div className="border-l-2 border-gray-900 ml-0 md:ml-10">
                <Hero />


                <div className="flex flex-row  w-full border-b">
                    {
                        Array.from({ length: 3 }).map((_, i) => (
                            <CardQuestion key={i} />
                        ))
                    }
                </div>
                <div className="flex flex-row w-full mt-28 ">
                    <p className="text-3xl ml-5  text-gray-800 dark:text-white  w-52" tabIndex={7}>
                        <FormattedMessage id="search_by_tematic"/>
                    </p>
                    <hr className="w-full ml-5  border-gray-900 mt-10" />
                </div>
            </div>
        </div>
    )

}

export default LandingPresenter;