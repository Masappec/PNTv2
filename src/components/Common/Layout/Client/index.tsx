import { Outlet } from "react-router-dom";
import FooterInfo from "../../FooterInfo";
import Header from "../../Header";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import MenuMobile from "../../MenuMobile";
import { useState } from "react";

interface Props {
  usecase: PublicUseCase;
  transparencyUseCase?: TransparencyUseCase;
}
const LayouClient = (props: Props) => {

  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
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
