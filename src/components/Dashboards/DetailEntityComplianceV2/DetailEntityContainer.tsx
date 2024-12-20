import React, { useEffect } from 'react'
import DetailEntityPresenter from './DetailEntityPresenter'
import NumeralUseCase from '../../../domain/useCases/NumeralUseCase/NumeraUseCase'
import { useLocation } from 'react-router-dom';
import NumeralEntity from '../../../domain/entities/NumeralEntity';
import TransparencyFocusUseCase from '../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase';
import TransparencyCollabUseCase from '../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase';
import TransparencyFocusEntity from '../../../domain/entities/TransparencyFocus';
import TransparencyCollab from '../../../domain/entities/TransparencyCollab';
import EstablishmentEntity from '../../../domain/entities/Establishment';
import { isWithinDeadline } from '../../../utils/functions';

interface IProps {
  usecase: NumeralUseCase,
  tfusecase: TransparencyFocusUseCase;
  tcusecase: TransparencyCollabUseCase

}
export interface INeedProps {
  month: number;
  year: number
  establishment_id: number
  type: string
  establishment_name: string
}
const DetailEntityContainer = (props: IProps) => {


  const location = useLocation()
  const [month, setMonth] = React.useState<number>(0)
  const [year, setYear] = React.useState<number>(0)
  const [establishment_id, setEstablishment_id] = React.useState<number>(0)
  const [establishment_name, setEstablishment_name] = React.useState<string>("")
  const [type, setType] = React.useState<string>("")
  const [data, setData] = React.useState<NumeralEntity[]>([])
  const [dataF, setDataF] = React.useState<TransparencyFocusEntity[]>([])
  const [dataC, setDataC] = React.useState<TransparencyCollab[]>([])
  const state = location.state as INeedProps;


  useEffect(() => {
    if (state) {
      setMonth(state.month)
      setYear(state.year)
      setEstablishment_id(state.establishment_id)
      setType(state.type)
      setEstablishment_name(state.establishment_name)
    }
  }, [])

  useEffect(() => {
    if (type === "TA") {
      props.usecase.getNumeralByEstablishment(establishment_id, year, month).then((data) => {
        setData(data.sort((a, b) => parseInt(a.name.replace("Numeral", "")) - parseInt(b.name.replace("Numeral", ""))))
      }).catch((error) => {
        console.log(error)
      })
    }
    if (type == "TF") {
      props.tfusecase.getTransparencyFocusPublics(month, year, establishment_id).then((data) => {
        if (data.length == 0) {
          setDataF([
            {
              establishment: {} as EstablishmentEntity,
              files: [],
              id: 0,
              max_date_to_publish: "",
              month: 0,
              numeral: {
                description: "Transparencia Focalizada",
                id: 0,
                name: "Transparencia Focalizada"
              },
              published: false,
              year: 0,
              published_at: "",
              slug: "",
              status: "",
              created_at: new Date(),
              deleted: false,
              deleted_at: new Date(),
              updated_at: new Date(),
              user_created: "",
              user_deleted: "",
              user_updated: "",
            } as TransparencyFocusEntity
          ])
        } else {
          setDataF(data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    if (type == "TC") {
      props.tcusecase.getTransparencyCollabPublics(month, year, establishment_id).then((data) => {
        if (data.length == 0) {
          setDataC([
            {
              establishment: {} as EstablishmentEntity,
              files: [],
              id: 0,
              max_date_to_publish: "",
              month: 0,
              numeral: {
                description: "Transparencia Colaborativa",
                id: 0,
                name: "Transparencia Colaborativa"
              },
              published: false,
              year: 0,
              published_at: "",
              slug: "",
              status: "",
              created_at: new Date(),
              deleted: false,
              deleted_at: new Date(),
              updated_at: new Date(),
              user_created: "",
              user_deleted: "",
              user_updated: "",
            } as TransparencyCollab
          ])
        } else {
          setDataC(data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [month, year, establishment_id])


  const isRezagado = (date: string | null) => {
    
    return isWithinDeadline(date || "");
  }

  return (
    <DetailEntityPresenter
      data={data}
      current={0}
      from={0}
      onPaginate={() => { }}
      pageSize={0}
      to={0}
      total={0}
      total_pages={0}
      month={month}
      year={year}
      dataC={dataC}
      dataF={dataF}
      type={type}
      establishment_name={establishment_name}
      isRezagado={isRezagado}



    />
  )
}

export default DetailEntityContainer