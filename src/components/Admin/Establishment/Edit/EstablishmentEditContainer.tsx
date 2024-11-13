import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import { useNavigate, useParams } from "react-router-dom";
import EstablishmentEditPresenter from "./EstablishmentEditPresenter";
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface";
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import { MultiValue } from "react-select";

const EstablishmentEditContainer = ({
  usecase,
  numeralUsecase,
}: {
  usecase: EstablishmentUseCase;
  numeralUsecase: NumeralUseCase;
}) => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExtraNumeral, setSelectedExtraNumeral] = useState<number[]>(
    [],
  );
  const [modified, setModified] = useState<boolean>(false);

  const [data, setData] = useState<EstablishmentEntity>({
    abbreviation: "",
    code: "",
    email_authority: "",
    first_name_authority: "",
    highest_authority: "",
    last_name_authority: "",
    job_authority: "",
    logo: "",
    name: "",
    email_accesstoinformation: "No",
    email_committe: "",
    first_name_committe: "",
    highest_committe: "",
    job_committe: "",
    last_name_committe: "",
    identification: "",
    extra_numerals: "",
    address: "",
  });
  const [options, setOptions] = useState<OptionsSelectCreate>({
    functions: [],
    organizations: [],
    institutions: [],
  });
  const [numerals, setNumerals] = useState<NumeralDetail[]>([]);

  useEffect(() => {
    usecase
      .getOptions()
      .then((res) => {
        setOptions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    numeralUsecase
      .getNumeralsAllowed()
      .then((res) => {
        setNumerals(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener detalle del establecimiento
        const es = await usecase.detail(id || "");

        // Obtener numerales permitidos
        const res = await numeralUsecase.getNumeralByEstablishment(
          parseInt(id || "0"),
        );
        // Filtrar los numerales no predeterminados y convertirlos en una cadena
        const res_ = res
          .filter((item) => !item.isDefault && !item.isSelected)
          .map((item) => item.id);
        // Actualizar el estado con los datos del establecimiento y numerales
        setData({ ...es, extra_numerals: res_.join(",") });
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, [id]); // Ejecuta este efecto cada vez que cambia el 'id'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    data.highest_authority = "NINGUNO";
    data.highest_committe = "NINGUNO";
    data.extra_numerals = selectedExtraNumeral.join(",");
    console.log("handleSubmit", data.extra_numerals);

    if (data.name === "") {
      setError("Ingrese el nombre");
      setLoading(false);
      return;
    }
    if (data.abbreviation === "") {
      setError("Ingrese la abreviatura");
      setLoading(false);
      return;
    }
    if (data.email_authority === "") {
      setError("Ingrese el correo de la autoridad");
      setLoading(false);
      return;
    }
    if (data.first_name_authority === "") {
      setError("Ingrese el nombre de la autoridad");
      setLoading(false);
      return;
    }
    if (data.highest_authority === "") {
      setError("Ingrese el cargo de la autoridad");
      setLoading(false);
      return;
    }
    if (data.last_name_authority === "") {
      setError("Ingrese el apellido de la autoridad");
      setLoading(false);
      return;
    }
    if (data.job_authority === "") {
      setError("Ingrese el trabajo de la autoridad");
      setLoading(false);
      return;
    }

    if (data.email_committe === "") {
      setError("Ingrese el correo del comité");
      setLoading(false);
      return;
    }
    if (data.first_name_committe === "") {
      setError("Ingrese el nombre del comité");
      setLoading(false);
      return;
    }

    if (data.job_committe === "") {
      setError("Ingrese el trabajo del comité");
      setLoading(false);
      return;
    }
    if (data.last_name_committe === "") {
      setError("Ingrese el apellido del comité");
      setLoading(false);
      return;
    }

    if (data.identification === "") {
      setError("Ingrese la identificación");
      setLoading(false);
      return;
    }

    if (data.name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.abbreviation.length < 3) {
      setError("La abreviatura debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.email_authority.length < 3) {
      setError("El correo de la autoridad debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.first_name_authority.length < 3) {
      setError("El nombre de la autoridad debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.highest_authority.length < 3) {
      setError("El cargo de la autoridad debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.last_name_authority.length < 3) {
      setError("El apellido de la autoridad debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.job_authority.length < 3) {
      setError("El trabajo de la autoridad debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.email_committe == undefined || data.email_committe.length < 3) {
      setError("El correo del comité debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (
      data.first_name_committe == undefined ||
      data.first_name_committe.length < 3
    ) {
      setError("El nombre del comité debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.highest_committe.length < 3) {
      setError("El cargo del comité debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.job_committe == undefined || data.job_committe.length < 3) {
      setError("El trabajo del comité debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (
      data.last_name_committe == undefined ||
      data.last_name_committe.length < 3
    ) {
      setError("El apellido del comité debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (data.identification.length < 3) {
      setError("La identificación debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }
    if (data.logo === "") {
      setError("Debe seleccionar un logo");
      setLoading(false);
      return;
    }
    usecase
      .update(data, id || "")
      .then(() => {
        setSuccess("Institución actualizada correctamente");
        setLoading(false);
      })
      .catch((err) => {
        setModified(false);
        setError(err.message);
        setLoading(false);
      });
  };
  const handleChageLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    const image = file[0];
    setData({ ...data, logo: image });
  };

  const getSelectedExtraNumeral = (extra_numerals: string) => {
    const numerals_selected = extra_numerals.split(",");
    const selected = numerals
      .map((numeral) => {
        if (numerals_selected.includes(numeral.id.toString())) {
          return { value: numeral.id.toString(), label: numeral.name };
        }
        return null;
      })
      .filter((item) => item !== null) as MultiValue<{
      value: string;
      label: string;
    }>;
    return selected;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    navigation("/admin/entities");
  };
  const hangelChangeExtraNumeral = (
    e: MultiValue<{ value: string; label: string }>,
  ) => {
    setSelectedExtraNumeral(e.map((item) => parseInt(item.value)));
    setData({ ...data, extra_numerals: e.map((item) => item.value).join(",") });
  };

  const handleRemoveNumeral = async (numeralId: string) => {
    try {
      // Convierte el numeralId a número
      const numeralIdAsNumber = parseInt(numeralId, 10);

      if (isNaN(numeralIdAsNumber)) {
        throw new Error(`El numeralId "${numeralId}" no es un número válido.`);
      }

      // Llama al backend para actualizar el estado de isDefault a false
      await numeralUsecase.updateNumeralState(numeralIdAsNumber, {
        isDefault: true,
      });

      // Actualiza el estado local eliminando el numeral del arreglo
      setData((prevData) => {
        const updatedNumerals = (prevData.extra_numerals || "") // Si es undefined, asigna un string vacío
          .split(",")
          .filter((id) => id !== numeralId) // Aquí sigue siendo string para comparar correctamente
          .join(",");
        console.log("updatedNumerals", updatedNumerals);
        return { ...prevData, extra_numerals: updatedNumerals };
      });
    } catch (error) {
      console.error("Error al eliminar el numeral:", error);
    }
  };

  const validateFields = (name: string) => {
    if (modified) {
      console.log(data[name as keyof EstablishmentEntity], name);
      if (
        data[name as keyof EstablishmentEntity] == "" ||
        data[name as keyof EstablishmentEntity] == null ||
        data[name as keyof EstablishmentEntity] == undefined
      ) {
        return "failure";
      }
      return "success";
    }
    return "default";
  };
  return (
    <EstablishmentEditPresenter
      handleSubmit={handleSubmit}
      onCancel={handleCancel}
      data={data}
      setData={handleChange}
      onChageLogo={handleChageLogo}
      error={error}
      loading={loading}
      success={success}
      setError={setError}
      setSuccess={setSuccess}
      options={options}
      hangelChangeExtraNumeral={hangelChangeExtraNumeral}
      handleRemoveNumeral={handleRemoveNumeral}
      numerals={numerals}
      getSelectedExtraNumeral={getSelectedExtraNumeral}
      validateFields={validateFields}
    />
  );
};

export default EstablishmentEditContainer;
