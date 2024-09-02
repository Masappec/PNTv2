import { useNavigate } from "react-router-dom"
import { InvalidSessionPresenter } from "./401Presenter"



export const ForbidenContainer = () => {
    const navigation = useNavigate()

    return (
        <InvalidSessionPresenter
            buttonText="Iniciar Sesión"
            description="“Tiempo de sesión agotado, por favor vuelve a ingresar con tu usuario y contraseña"
            error={"Sesión Caducada"}
            title="Sesión Caducada"
            isLoading={false}
            onSubmit={() => { navigation("/ingreso") }}
            subtitle=""
        />
    )
}