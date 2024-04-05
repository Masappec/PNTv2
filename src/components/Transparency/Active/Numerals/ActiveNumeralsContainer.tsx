
import { useEffect, useState } from "react";
import ActiveNumeralsPresenter from "./ActiveNumeralsPresenter";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import { useNavigate } from "react-router-dom";
import { INeedProps } from "../Create/ActiveCreateContainer";

interface IProps {
    usecase: NumeralUseCase,

}
const ActiveNumeralsContainer = (props: IProps) => {

    const [numerals, setNumerals] = useState<NumeralEntity[]>([])
    const [, setError] = useState<string>("")

    const navigate = useNavigate()

    useEffect(() => {
        props.usecase.getNumeralByUserInSession().then(_numerals => {
            console.log(_numerals.filter(x => x.published))
            setNumerals(_numerals)
        }).catch((e) => {
            setError(e)
        })
    }, [])


    const handleClickItem = (numeral: NumeralEntity) => {
        navigate('/admin/active/create', {
            state: {
                numeral: numeral,
                childs: numerals.filter(x => x.parent == numeral.id)
            } as INeedProps
        })

    }

    return (
        <ActiveNumeralsPresenter
            numerals={numerals}
            loading={false}
            onAdd={() => { }}
            onClickItem={handleClickItem}
        />
    )
}

export default ActiveNumeralsContainer;