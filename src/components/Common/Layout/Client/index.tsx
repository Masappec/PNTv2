import { Outlet } from "react-router-dom";
import FooterInfo from "../../FooterInfo";
import Header from "../../Header";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import { useEffect } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useDispatch } from "react-redux";
import { setEstablishments } from "../../../../infrastructure/Slice/EstablishmentSlice";

interface Props {
  usecase: PublicUseCase;
  transparencyUseCase?: TransparencyUseCase;
}
const LayouClient = (props: Props) => {
  const dispatch = useDispatch()



  useEffect(() => {

    props.usecase.getEstablishments().then(res => {
      const result = res.results.map((item) => item.data)
      const final: EstablishmentEntity[] = []
      result.map((item) => {
        item.map((_item) => {
          final.push(_item)
        })
      })
      dispatch(setEstablishments(final))

    }).catch(() => {
      console.log("Error")
    })

  }, [])

  return (
    <>
      <Header/>
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
