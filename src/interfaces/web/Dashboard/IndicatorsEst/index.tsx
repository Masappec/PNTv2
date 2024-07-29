import { useEffect, useState } from "react";
import IndicatorsEstablishment from "../../../../components/Landing/Establishment/Detail/Indicators/IndicatorsEstablishment"
import SessionService from "../../../../infrastructure/Services/SessionService";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { generarQR } from "../../../../utils/options";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import IndicatorsAdmin from "../IndicatorsAdmin";
import UserEntity from "../../../../domain/entities/UserEntity";




const IndicatorsEst = () => {


    const publicApi = new PublicDataApi();
    const [est, setEst] = useState<EstablishmentEntity>({} as EstablishmentEntity);
    const [qr, setQr] = useState<string>("")
    const [user, setUser] = useState<UserEntity>({} as UserEntity);

    useEffect(() => {
        const establishment = SessionService.getEstablishmentData()
        setEst(establishment)
        const userSession = SessionService.getUserData()
        setUser(userSession)
        const imgQR = generarQR(window.location.protocol + "//" + window.location.host + "/entidades/" + establishment.slug + "#indicadores")
        setQr(imgQR)
    }, [])


    return(
        user.is_superuser? <IndicatorsAdmin /> :
        user.user_permissions?.find((p) => p.codename === "view_general_indicators")
        ?
            <IndicatorsEstablishment
                establishment_id={est.id || 0}
                qrUrl={qr}
                usecase={publicApi}
                year={new Date().getFullYear()}

            /> :<IndicatorsAdmin />
    )
}

export default IndicatorsEst;