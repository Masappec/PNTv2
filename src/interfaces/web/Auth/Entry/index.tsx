import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../../../components/Common/Input";
import SessionService from "../../../../infrastructure/Services/SessionService";
import { USER_LOCKED, USER_PASSWORD_LOCKED } from "../../../../utils/constans";
import { useState } from "react";
import { Button } from "flowbite-react";

const Entry = () => {
  const [data, setData] = useState({
    user: "",
    password: "",
  });
  const navigate = useNavigate();
  const isLocked = SessionService.isLocked();

  const handleSend = () => {
    if (data.user === USER_LOCKED && data.password === USER_PASSWORD_LOCKED) {
      SessionService.setLocked(data.user + data.password);
      navigate("/");
    }
  };

  if (isLocked) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Input
        placeholder="Usuario"
        type="text"
        onChange={(e) => setData({ ...data, user: e.target.value })}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <Button onClick={handleSend}>Ingresar</Button>
    </div>
  );
};

export default Entry;
