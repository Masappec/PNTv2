
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

    const [month,setMonth] = useState<number>(new Date().getMonth())

    

    useEffect(() => {
        props.usecase.getNumeralByUserInSession(new Date().getFullYear(),month+1).then(_numerals => {
            setNumerals(_numerals.sort((a, b) => parseInt(a.name.replace("Numeral", "")) - parseInt(b.name.replace("Numeral", ""))))
            setLoading(false)
        }).catch((e) => {
            setError(e.message)
            setLoading(false)
        })
    }, [month])

    


    const handleClickItem = (numeral: NumeralEntity) => {
        if (numeral.publication == null) {
            navigate('/admin/active/create', {
                state: {
                    numeral: numeral,
                    childs: numerals.filter(x => x.parent == numeral.id),
                    month:month,
                    year: new Date().getFullYear()
                } as INeedProps
            })
        } else {
            navigate('/admin/active/edit', {
                state: {
                    numeral: numeral,
                    childs: numerals.filter(x => x.parent == numeral.id),
                    month: month,
                    year: new Date().getFullYear()
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
            OnselectedMonth={setMonth}
            selectedMonth={month}
        />
    )
}

export default ActiveNumeralsContainer;