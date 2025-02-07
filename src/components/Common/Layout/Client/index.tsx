import { Outlet } from "react-router-dom";
import FooterInfo from "../../FooterInfo";
import Header from "../../Header";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import { useEffect } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useDispatch } from "react-redux";
import { setDateGet, setEstablishments } from "../../../../infrastructure/Slice/EstablishmentSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import api from "../../../../infrastructure/Api/index.ts";
import PublicApi from "../../../../infrastructure/Api/Public/PublicApi.ts";
import PublicService from "../../../../infrastructure/Services/PublicService.ts";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase.ts";

interface Props {
  usecase: PublicUseCase;
  transparencyUseCase?: TransparencyUseCase;
}
const LayouClient = (props: Props) => {
  const dispatch = useDispatch()

  const _date_get = useSelector((state: RootState) => state.establishment?.dateGet)

  // Crear una instancia para api
  const anualReportApiInstance = new PublicApi(api);
  // Crear una instancia de AnualReportService
  const anualReportServiceInstance = new PublicService(anualReportApiInstance);
  // Pasar el servicio al constructor de AnualReportUseCase
  const anualReportUseCaseInstance = new PublicUseCase(anualReportServiceInstance);

  useEffect(() => {
    const date = new Date(_date_get)
    if (date === null || date?.toDateString() !== new Date().toDateString()) {
      props.usecase.getEstablishments().then(res => {
        const result = res.results.map((item) => item.data)
        const final: EstablishmentEntity[] = []
        result.map((item) => {
          item.map((_item) => {
            final.push(_item)
          })
        })
        dispatch(setEstablishments(final))
        dispatch(setDateGet(new Date()))

      }).catch(() => {
        console.log("Error")
      })
    }

  }, [_date_get])

  return (
    <>
      <Header usecase={anualReportUseCaseInstance} />
      {/* <main className='relative'>
        <div className='absolute left-8 hidden h-full w-[1px] bg-gray-900 lg:block'></div> */}
      <>
        <Outlet
          context={{
            usecase: props.usecase,
            transparencyUseCase: props.transparencyUseCase,
          }}
        />
      </>
      {/* </main> */}
      <FooterInfo />
    </>
  );
};

export default LayouClient;