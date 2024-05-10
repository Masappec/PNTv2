
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
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()


    

    useEffect(() => {
        props.usecase.getNumeralByUserInSession().then(_numerals => {
            setNumerals(_numerals.sort((a, b) => parseInt(a.name.replace("Numeral", "")) - parseInt(b.name.replace("Numeral", ""))))
            setLoading(false)
        }).catch((e) => {
            setError(e.message)
            setLoading(false)
        })
    }, [])

    


    const handleClickItem = (numeral: NumeralEntity) => {
        if (numeral.publication == null) {
            navigate('/admin/active/create', {
                state: {
                    numeral: numeral,
                    childs: numerals.filter(x => x.parent == numeral.id)
                } as INeedProps
            })
        } else {
            navigate('/admin/active/edit', {
                state: {
                    numeral: numeral,
                    childs: numerals.filter(x => x.parent == numeral.id)
                } as INeedProps
            })

        }

    }

    return (
        <ActiveNumeralsPresenter
            numerals={numerals}
            loading={loading}
            onAdd={() => { }}
            onClickItem={handleClickItem}
            error={error}
        />
    )
}

export default ActiveNumeralsContainer;