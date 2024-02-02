import LayouClient from "../../../components/Common/Layout/Client";
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../domain/useCases/Transparency/TransparencyUseCase";
import { LOCALES } from "../../../i18n/locales";
import { messages } from "../../../i18n/messages";
import api from "../../../infrastructure/Api";
import PublicApi from "../../../infrastructure/Api/Public/PublicApi";
import TransparencyApi from "../../../infrastructure/Api/Transparency/TransparencyApi";
import PublicService from "../../../infrastructure/Services/PublicService";
import TransparencyService from "../../../infrastructure/Services/TransparencyService";
import { IntlProvider } from "react-intl";

const Landing = () => {

    const publicApi = new PublicApi(api);
    const publicService = new PublicService(publicApi);
    const usecase = new PublicUseCase(publicService);

    const transparencyApi = new TransparencyApi(api);
    const transparencyService = new TransparencyService(transparencyApi);
    const usecaseTransparency = new TransparencyUseCase(transparencyService);


    const locale = LOCALES.SPANISH;
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <LayouClient
                usecase={usecase}
                transparencyUseCase={usecaseTransparency}
            />
        </IntlProvider>
    )

}

export default Landing;