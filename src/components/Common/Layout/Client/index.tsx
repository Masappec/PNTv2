import { Outlet } from "react-router-dom";
import FooterInfo from "../../FooterInfo";
import Header from "../../Header";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import MenuMobile from "../../MenuMobile";
import { useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import { useDispatch } from "react-redux";
import { setEstablishments } from "../../../../infrastructure/Slice/EstablishmentSlice";

interface Props {
  usecase: PublicUseCase;
  transparencyUseCase?: TransparencyUseCase;
}
const LayouClient = (props: Props) => {
  const dispatch = useDispatch()

  const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)


  useEffect(() => {
    if (_establishments.length == 0) {
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
    }
  }, [])

  const [visible, setVisible] = useState(false);
  return (
    <div className="">
      <MenuMobile
        onClose={() => setVisible(false)}
        open={visible}
      />

      <Header
        onOpen={() => setVisible(true)}
      />
      <div className="bg-[#fbf9f8]">
        <Outlet
          context={{
            usecase: props.usecase,
            transparencyUseCase: props.transparencyUseCase,
          }}
        />
      </div>
      <FooterInfo />
    </div>
  );
};

export default LayouClient;
