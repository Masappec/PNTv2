import { Label, Select, TextInput } from "flowbite-react";
import Table from "../../Common/Table";
import { AnualReportEntity, IndexInformationClassifiedEntity } from "../../../domain/entities/AnualReportEntity";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { SolicityStatsAnualReportDto } from "../../../infrastructure/Api/AnualReport/interface";
import { Pagination } from "../../../infrastructure/Api";
import { TransparencyActivePublicResponse } from "../../../infrastructure/Api/TansparencyActive/interface";
{/* import { formatDate2 } from "../../../utils/functions";*/}
import Alert from "../../Common/Alert";
{/* import { BiCheck, BiEdit } from "react-icons/bi";*/}

interface Props {
  OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addItemElements: () => void;
  Items: IndexInformationClassifiedEntity[]
  onTextTable: (index: number, name: keyof IndexInformationClassifiedEntity, value: string) => void;
  onBooleanTable: (index: number, name: keyof IndexInformationClassifiedEntity, value: boolean) => void;
  establishment: EstablishmentEntity;
  solicityStats: SolicityStatsAnualReportDto[];

  onPageTAE: (page: number) => void
  onPageTA: (page: number) => void
  onPageTF: (page: number) => void
  onPageTC: (page: number) => void
  resultsTAE: Pagination<TransparencyActivePublicResponse>
  resultsTA: {
    numeral: string,
    enero: string,
    febrero: string,
    marzo: string,
    abril: string,
    mayo: string,
    junio: string,
    julio: string,
    agosto: string,
    septiembre: string,
    octubre: string,
    noviembre: string,
    diciembre: string,
  }[],
  resultTF: {
    numeral:string,
    enero: string,
    febrero: string,
    marzo: string,
    abril: string,
    mayo: string,
    junio: string,
    julio: string,
    agosto: string,
    septiembre: string,
    octubre: string,
    noviembre: string,
    diciembre: string,
  }[],
  resultTC: {
    numeral: string,
    enero: string,
    febrero: string,
    marzo: string,
    abril: string,
    mayo: string,
    junio: string,
    julio: string,
    agosto: string,
    septiembre: string,
    octubre: string,
    noviembre: string,
    diciembre: string,
  }[],
  error: string;
  success: string;
  setError: (e: string) => void;
  form: AnualReportEntity;
  setSuccess: (e: string) => void;
  onEdit: (index: number) => void;
  isEdit: (index: number) => boolean;
  onChangeValue: (mes: number, name: keyof SolicityStatsAnualReportDto, value: string) => void;
  total_saip: number;
}

const AnnualReportPresenter = (props: Props) => {
  return (
    <>
      <h2 className="mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary">
        {"Informe anual"}
      </h2>
      <form className="grid grid-cols-1 items-start justify-center gap-4 text-start "
        onSubmit={props.onSubmit}>
        <section className="container w-full lg:lg:w-2/5">
          <h2 className="text-xl font-semibold text-primary">Institución</h2>
          <div>
            <div className="mb-1 block">
              <Label
                htmlFor="small"
                value="Nombre de entidad:"
                className="text-gray-500"
              />
            </div>
            <TextInput id="small" type="text" sizing="sm"
              value={props.establishment.name}
              disabled
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label
                htmlFor="small"
                value=" Función del estado a la que pertenece:"
                className="text-gray-500"
              />
            </div>
            <TextInput id="small" type="text" sizing="sm"
              value={props.establishment.function_organization}
              disabled
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label
                htmlFor="small"
                value="Fecha de emisión del informe: "
                className="text-gray-500"
              />
            </div>
            <TextInput id="small" type="text" sizing="sm"

              value={new Date().toLocaleString()}
              disabled
            />
          </div>
        </section>
        <h4 className="text-lg font-semibold text-primary text-wrap lg:w-2/5">
          {"a) Información del período anterior sobre el cumplimiento de las obligaciones que le asigna esta ley"}
        </h4>
        <p className="text-base font-medium text-primary">
          Artículo 4 de la LOTAIP: número 9:
        </p>
        <p className="text-base font-medium text-primary ">
          - Transparencia colaborativa:
        </p>

        <Table
          show={false}
          columns={[
            {
              render: (e) => <p className="text-left">{
                e.numeral
              }</p>,
              title: "Articulo",
            },
            {
              render: (e) => <p className="text-left">{
                e.enero
              }</p>,
              title: "Enero"
            },
            {
              render: (e) => <p className="text-left">{
                e.febrero
              }</p>,
              title: "Febrero"
            },
            {
              render: (e) => <p className="text-left">{
                e.marzo
              }</p>,
              title: "Marzo"
            },
            {
              render: (e) => <p className="text-left">{
                e.abril
              }</p>,
              title: "Abril"
            },
            {
              render: (e) => <p className="text-left">{
                e.mayo
              }</p>,
              title: "Mayo"
            },
            {
              render: (e) => <p className="text-left">{
                e.junio
              }</p>,
              title: "Junio"
            },
            {
              render: (e) => <p className="text-left">{
                e.julio
              }</p>,
              title: "Julio"
            },
            {
              render: (e) => <p className="text-left">{
                e.agosto
              }</p>,
              title: "Agosto"
            },
            {
              render: (e) => <p className="text-left">{
                e.septiembre
              }</p>,
              title: "Septiembre"
            },
            {
              render: (e) => <p className="text-left">{
                e.octubre
              }</p>,
              title: "Octubre"
            },
            {
              render: (e) => <p className="text-left">{
                e.noviembre
              }</p>,
              title: "Noviembre"
            },
            {
              render: (e) => <p className="text-left">{
                e.diciembre
              }</p>,
              title: "Diciembre"
            },
          ]}
          description={""}
          length={props.resultTC.length}
          data={props.resultTC}
        />
        <p className="text-base font-medium text-primary">
          Artículo 4 de la LOTAIP: número 10:
        </p>
        <p className="text-base font-medium text-primary ">
          - Transparencia focalizada:
        </p>

        <Table
          show={false}
          columns={[
            {
              render: (e) => <p className="text-left">{
                e.numeral
              }</p>,
              title: "Articulo",
            },
            {
              render: (e) => <p className="text-left">{
                e.enero
              }</p>,
              title: "Enero"
            },
            {
              render: (e) => <p className="text-left">{
                e.febrero
              }</p>,
              title: "Febrero"
            },
            {
              render: (e) => <p className="text-left">{
                e.marzo
              }</p>,
              title: "Marzo"
            },
            {
              render: (e) => <p className="text-left">{
                e.abril
              }</p>,
              title: "Abril"
            },
            {
              render: (e) => <p className="text-left">{
                e.mayo
              }</p>,
              title: "Mayo"
            },
            {
              render: (e) => <p className="text-left">{
                e.junio
              }</p>,
              title: "Junio"
            },
            {
              render: (e) => <p className="text-left">{
                e.julio
              }</p>,
              title: "Julio"
            },
            {
              render: (e) => <p className="text-left">{
                e.agosto
              }</p>,
              title: "Agosto"
            },
            {
              render: (e) => <p className="text-left">{
                e.septiembre
              }</p>,
              title: "Septiembre"
            },
            {
              render: (e) => <p className="text-left">{
                e.octubre
              }</p>,
              title: "Octubre"
            },
            {
              render: (e) => <p className="text-left">{
                e.noviembre
              }</p>,
              title: "Noviembre"
            },
            {
              render: (e) => <p className="text-left">{
                e.diciembre
              }</p>,
              title: "Diciembre"
            },
          ]}
          description={""}
          length={props.resultTF.length}
          data={props.resultTF}
          
        />
        <section className="lg:lg:w-2/5">
          <h2 className="text-xl font-semibold text-primary">Artículo 10 de la LOTAIP</h2>
          <p className="text-base font-medium text-primary">
            Custodia de la información
          </p>

          <div>
            <div className="mb-1 block mt-5]">
              <Label
                htmlFor="small"
                value="¿Se han creado y se mantienen registros públicos de manera profesional para el manejo y archivo de la información y documentación?"
                className="text-gray-500"
              />
            </div>
            <Select
              className="w-44 mt-3"
              onChange={props.onSelected}
              name="have_public_records"
              required
            >
              <option
                value={"si"}
              >Si</option>
              <option
                value={"no"}
              >No</option>
            </Select>
          </div>
          {
            props.form.have_public_records && (
              <>
                <div className="">
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Norma archivística utilizada:"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    name="norme_archive_utility"
                    onChange={props.OnChange}

                  />
                </div>
                <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Comentario/aclaración:"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    name="comment_aclaration"
                    onChange={props.OnChange}
                  />
                </div>
              </>
            )
          }

        </section>

        <section>


          <p className="text-base font-medium text-primary ">
            - Transparencia activa:
          </p>
          <p className="font-semibold text-gray-500 text-sm my-3">
            Obligaciones generales
          </p>
          <Table
            show={false}
            columns={[
              {
                render: (e) => <p className="text-left">{
                  e.numeral
                }</p>,
                title: "Articulo",
              },
              {
                render: (e) => <p className="text-left">{
                  e.enero
                }</p>,
                title: "Enero"
              },
              {
                render: (e) => <p className="text-left">{
                  e.febrero
                }</p>,
                title: "Febrero"
              },
              {
                render: (e) => <p className="text-left">{
                  e.marzo
                }</p>,
                title: "Marzo"
              },
              {
                render: (e) => <p className="text-left">{
                  e.abril
                }</p>,
                title: "Abril"
              },
              {
                render: (e) => <p className="text-left">{
                  e.mayo
                }</p>,
                title: "Mayo"
              },
              {
                render: (e) => <p className="text-left">{
                  e.junio
                }</p>,
                title: "Junio"
              },
              {
                render: (e) => <p className="text-left">{
                  e.julio
                }</p>,
                title: "Julio"
              },
              {
                render: (e) => <p className="text-left">{
                  e.agosto
                }</p>,
                title: "Agosto"
              },
              {
                render: (e) => <p className="text-left">{
                  e.septiembre
                }</p>,
                title: "Septiembre"
              },
              {
                render: (e) => <p className="text-left">{
                  e.octubre
                }</p>,
                title: "Octubre"
              },
              {
                render: (e) => <p className="text-left">{
                  e.noviembre
                }</p>,
                title: "Noviembre"
              },
              {
                render: (e) => <p className="text-left">{
                  e.diciembre
                }</p>,
                title: "Diciembre"
              },
            ]}
            description={""}
            length={props.resultsTA.length}
            data={props.resultsTA}
            
          />
          <p className="font-semibold text-gray-500 my-3 text-sm">
            Obligaciones específicas
          </p>
          <Table
            show={false}
            columns={[
              
              {
                render: (e) => <p className="text-left">{
                  e.numeral.name.replace("Art", "")
                }</p>,
                title: "Articulo",
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 1) ?
                    'Si' : 'No'
                }</p>,
                title: "Enero"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 2) ?
                    'Si' : 'No'
                }</p>,
                title: "Febrero"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 3) ?
                    'Si' : 'No'
                }</p>,
                title: "Marzo"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 4) ?
                    'Si' : 'No'
                }</p>,
                title: "Abril"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 5) ?
                    'Si' : 'No'
                }</p>,
                title: "Mayo"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 6) ?
                    'Si' : 'No'
                }</p>,
                title: "Junio"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 7) ?
                    'Si' : 'No'
                }</p>,
                title: "Julio"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 8) ?
                    'Si' : 'No'
                }</p>,
                title: "Agosto"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 9) ?
                    'Si' : 'No'
                }</p>,
                title: "Septiembre"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 10) ?
                    'Si' : 'No'
                }</p>,
                title: "Octubre"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 11) ?
                    'Si' : 'No'
                }</p>,
                title: "Noviembre"
              },
              {
                render: (e) => <p className="text-left">{
                  props.resultsTAE.results.find((_e) =>
                    _e.numeral.id == e.numeral.id && _e.month == 12) ?
                  'Si': 'No'
                }</p>,
                title: "Diciembre"
              },
            ]}
            description={""}
            length={props.resultsTAE.results.length}
            data={props.resultsTAE.results.filter((item, index, array) =>
              array.findIndex(other => other.numeral.id === item.numeral.id) === index
            )}
            
          />
        </section>
        <section className="lg:w-2/5">
          <h2 className="text-xl font-semibold text-primary">Artículo 40</h2>
          <p className="font-semibold text-primary my-3">Gestión Oficiosa</p>
          <div>
            <div className="mb-1 block mt-5">
              <Label
                htmlFor="small"
                value="¿Alguna persona que solicitó información indicó que la recibida no era de calidad, o existió ambigüedad en el manejo de la información registrada en el Portal Nacional de Transparencia o sobre la información que se difunde en la propia institución, y resolvió solicitar la corrección en la difusión de la información; o alguna persona solicitó la intervención del Defensor del Pueblo para que se corrija y se brinde mayor claridad y sistematización en la organización de la información ?"
                className="text-gray-500"
              />
            </div>
            <Select
              className="w-44 mt-3"
              name="have_quality_problems"
              onChange={props.onSelected}
              required
            >
              <option
                value={"si"}
              >Si</option>
              <option
                value={"no"}
              >No</option>
            </Select>
          </div>
          {props.form.have_quality_problems && (<><div>
            <div className="mb-1 block mt-5">
              <Label
                htmlFor="small"
                value="Cantidad de gestiones oficiosas"
                className="text-gray-500"
              />
            </div>
            <TextInput
              id="small"
              type="number" min={0}
              sizing="sm"
              name="total_quality_problems"
              onChange={props.OnChange}
            />
          </div>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="Descripción específica de la corrección de información"
                  className="text-gray-500"
                />
              </div>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                name="description_quality_problems"
                onChange={props.OnChange}
              />
            </div></>)}

        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">
            Artículo 42 de la LOTAIP
          </h2>
          <p className="font-semibold text-primary my-3">
            Sanciones administrativas
          </p>
          <div>
            <div className="mb-1 block mt-5 lg:w-2/5">
              <Label
                htmlFor="small"
                value="¿Personas servidoras públicas de su entidad o personas del sector privado han recibido sanciones por omisión o negativa en el acceso a la información pública?"
                className="text-gray-500"
              />
            </div>
            <Select
              className="w-44 mt-3"
              name="have_sanctions"
              onChange={props.onSelected}
              required
            >
              <option
                value={"si"}
              >Si</option>
              <option
                value={"no"}
              >No</option>
            </Select>
          </div>
          {
            props.form.have_sanctions && (

              <table className="w-full divide-y divide-gray-200 mt-5 ">
                <thead className="sticky top-0 z-10 w-full bg-gray-100 text-center">
                  <tr className="text-sm">
                    <th scope="col" className="rounded-tl-md">
                      Ley
                    </th>
                    <th scope="col">Cantidad</th>
                    <th scope="col" className="rounded-tr-md">
                      Descripción específica de la sanción administrativa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td>
                      <span className="text-sm font-medium text-gray-400 flex justify-start">
                        Ley Orgánica del Servicio Público
                      </span>
                    </td>
                    <td>
                      <TextInput
                        id="small"
                        type="number" min={0}
                        sizing="sm"
                        className="w-48"
                        name="total_organic_law_public_service"
                        onChange={props.OnChange}
                        
                      />
                    </td>

                    <td className="text-center">
                      <textarea
                        className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                        name="description_organic_law_public_service"
                        onChange={props.onText}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-sm text-gray-400 flex font-medium justify-start">
                        Ley Orgánica de la Contraloría General del Estado
                      </span>
                    </td>
                    <td>
                      <TextInput
                        id="small"
                        type="number" min={0}
                        sizing="sm"
                        className="w-48"
                        name="total_organic_law_contraloria"
                        onChange={props.OnChange}
                      />
                    </td>

                    <td className="text-center">
                      <textarea
                        className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                        name="description_organic_law_contraloria"
                        onChange={props.onText}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-sm text-gray-400 flex font-medium justify-start">
                        Ley Orgánica del Sistema Nacional de Contratación Pública
                      </span>
                    </td>
                    <td>
                      <TextInput
                        id="small"
                        type="number" min={0}
                        sizing="sm"
                        className="w-48"
                        name="total_organic_law_national_system"
                        onChange={props.OnChange}
                      />
                    </td>

                    <td className="text-center">
                      <textarea
                        className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                        name="description_organic_law_national_system"
                        onChange={props.onText}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-sm font-medium text-gray-400 flex justify-start">
                        Ley Orgánica de Participación Ciudadana
                      </span>
                    </td>
                    <td>
                      <TextInput
                        id="small"
                        type="number" min={0}
                        sizing="sm"
                        className="w-48"
                        name="total_organic_law_citizen_participation"
                        onChange={props.OnChange}
                      />
                    </td>

                    <td className="text-center">
                      <textarea
                        className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                        name="description_organic_law_citizen_participation"
                        onChange={props.onText}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>)}
          <section className="lg:w-2/5">
            <h2 className="text-xl font-semibold text-primary mt-7">
              Disposición transitoria séptima
            </h2>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="¿Su entidad implementó programas de difusión, capacitación y fortalecimiento sobre la LOTAIP dirigido a las personas servidoras públicas de su institución? "
                  className="text-gray-500"
                />
              </div>
              <Select
                className="w-44 "
                name="implemented_programs"
                onChange={props.onSelected}
                required
              >
                <option
                  value={"si"}
                >Si</option>
                <option
                  value={"no"}
                >No</option>
              </Select>
            </div>

            {

              props.form.implemented_programs && (
                 <>
                 
                 <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Cantidad"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="number" min={0}
                    sizing="sm"
                    name="total_programs"
                    onChange={props.OnChange}
                  />
                </div>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="Descripción específica del programa de difusión, capacitación y fortalecimiento sobre la LOTAIP"
                  className="text-gray-500"
                />
              </div>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                name="description_programs"
                onChange={props.OnChange}
              />
            </div>
                 </>


              )

            }
            
          </section>
          <section className="lg:w-2/5">
            <h2 className="text-xl font-semibold mt-7 text-primary">
              Disposición transitoria octava
            </h2>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="¿Sí su entidad es un establecimiento educativo público o privado, desarrolló actividades y programas de promoción del derecho de acceso a la información pública, sus garantías y referente a la transparencia sus garantías y referente a la transparencia colaborativa? "
                  className="text-gray-500"
                />
              </div>
              <Select
                className="w-44 "
                name="have_activities"
                onChange={props.onSelected}
                required
              >
                <option
                  value={"si"}
                >Si</option>
                <option
                  value={"no"}
                >No</option>
              </Select>
            </div>
            { props.form.have_activities && (
              <>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="Cantidad 
"
                  className="text-gray-500"
                />
              </div>
              <TextInput
                id="small"
                type="number" min={0}
                sizing="sm"
                name="total_activities"
                onChange={props.OnChange}
              />
            </div>

            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="Descripción específica de la actividad o programa desarrollado
"
                  className="text-gray-500"
                />
              </div>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                name="description_activities"
                onChange={props.OnChange}
              />
            </div>
              </>
            )}
          </section>

        </section>
        <section>
          <p className="font-semibold text-primary my-3 lg:w-2/5">
            {`b) Detalle de las solicitudes de acceso a la información y el trámite 
            dado a cada una de ellas; con indicación del tiempo que ha tomado
             en responder`}
          </p>
          <Table
            show={false}
            columns={[
              {
                render: (item) => <p className="text-center">{
                  item.month
                }</p>,
                title: "Mes",
              },
              {
                render: (item) => <p className="text-center">{
                  item.total
                }</p> ,
                title: "Total de SAIP recibidas"
              },
              {
                render: (item) => <p className="text-center">{
                  item.total_response_to_10_days + " / " + item.percent_response_to_10_days + "%"
                }</p> ,

                title: "Respondidas en hasta 10 días Cantidad / Porcentaje",
              },
              {
                render: (item) => <p className="text-center">{
                  item.total_reponse_to_11_days + " / " + item.percent_reponse_to_11_days + "%"
                }</p>,
                title: "Respondidas entre 11 y 15 días Cantidad / Porcentaje",
              },
              {
                render: (item) => <p className="text-center">{
                  item.total_response_plus_15_days + " / " + item.percent_response_plus_15_days + "%"
                }</p> ,
                title: "Respondidas en más de 15 días Cantidad / Porcentaje",
              },
              {
                render: (item) => <p className="text-center">{
                  item.total_no_response + " / " + item.percent_no_response + "%"
                }</p>,
                title: "No respondidas Cantidad / Porcentaje",
              },
              
            ]}
            description={""}
            length={0}
            data={props.solicityStats}
            currentPage={0}
            onChangePage={() => { }}
            totalPages={0}
            from={0}
            to={0}
            total={0}
          />
          <div className="lg:w-2/5">
            <p className="text-primary font-semibold my-3 ">
              Ingrese el número de solicitudes de acceso a la información
              pública que su entidad recibió y gestionó en el período
              enero-diciembre
            </p>
            <div>
              <div className="mb-1 block mt-5">
                <Label
                  htmlFor="small"
                  value="Cantidad"
                  className="text-gray-500"
                />
              </div>
              <TextInput
                id="small"
                type="number" 
                min={0}
                sizing="sm"
                className="lg:w-2/5"
                name="total_saip"
                value={props.form.total_saip}
                onChange={props.OnChange}

              />
            </div>
            <div>
              <div className="mb-1 block mt-5 ">
                <Label
                  htmlFor="small"
                  value="¿Su entidad recibió y gestionó una cantidad  diferente de solicitudes de las que registró en el Portal Nacional de Transparencia?"
                  className="text-gray-500"
                />
              </div>
              <Select
                className="w-44 "
                required
                name="did_you_entity_receive"
                onChange={props.onSelected}
              >
                <option
                  value={"si"}
                >Si</option>
                <option
                  value={"no"}
                >No</option>
              </Select>
            </div>

            {props.form.did_you_entity_receive && (
              <>
                <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Cantidad de SAIP registradas en el portal"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="number" min={0}
                    sizing="sm"
                    name="total_saip_in_portal"
                    onChange={props.OnChange}
                  />
                </div>
                <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Cantidad de SAIP NO registradas en el portal"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="number" min={0}
                    sizing="sm"
                    name="total_saip_no_portal"
                    onChange={props.OnChange}
                  />
                </div>

                <div>
                  <div className="mb-2 block mt-4">
                    <Label
                      htmlFor="small"
                      value="Descripción de las razones por las que no fueron ingresadas al portal"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    name="description_rason_no_portal"
                    onChange={props.OnChange}
                  />
                </div>
                <p className="text-primary font-semibold  my-3">
                  ¿Las solicitudes de acceso a la información pública que NO fueron
                  registradas en el Portal Nacional de Transparencia, fueron
                  respondidas?
                </p>
                <Select
                  className="w-44 "
                  required
                  name="have_responded_solicities_no_portal"
                  onChange={props.onSelected}
                >
                  <option
                    value={"si"}
                  >Si</option>
                  <option
                    value={"no"}
                  >No</option>
                </Select>
                {
                  props.form.have_responded_solicities_no_portal && (
                <>
                <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Cantidad "
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    type="number" min={0}
                    sizing="sm"
                    name="total_no_registered"
                    onChange={props.OnChange}
                  />
                </div>
                <div>
                  <div className="mb-1 block mt-5">
                    <Label
                      htmlFor="small"
                      value="Comentario/aclaración"
                      className="text-gray-500"
                    />
                  </div>
                  <TextInput
                    id="small"
                    sizing="sm"
                    name="comment_aclaration_no_registered"
                    onChange={props.OnChange}
                  />
                </div>
                </>
                  )
                }
              </>
            )}
          </div>
        </section>
        <section>
          <div className="lg:w-2/5">
            <p className="font-semibold text-primary my-3">
              {`c) Informe semestral actualizado sobre el listado índice de
              información reservada`}
            </p>
            <div>
              <div className="mb-1 block ">
                <Label
                  htmlFor="small"
                  value="Información reservada"
                  className="text-gray-500"
                />
              </div>
              <Select
                className="w-44 "
                name="reserve_information"
                onChange={props.onSelected}
                required
              >
                <option
                  value={"si"}
                >Si</option>
                <option
                  value={"no"}
                >No</option>
              </Select>
            </div>
            {props.form.reserve_information && (<>
              <p className="text-base font-medium text-gray-500">
                En caso de seleccionar Sí, debe completar los siguientes campos:
              </p>
              <div>
                <div className="mb-1 block mt-5">
                  <Label
                    htmlFor="small"
                    value="Número de temas clasificados como Reservados: "
                    className="text-gray-500"
                  />
                </div>
                <TextInput
                  id="small"
                  type="number" min={0}
                  sizing="sm"
                  name="number_of_reserves"
                  onChange={props.OnChange}
                />
              </div>
              <div>
                <div className="mb-1 block mt-5">
                  <Label
                    htmlFor="small"
                    value="Número de temas clasificados como Confidencial (Ley Orgánica de Empresas Públicas): "
                    className="text-gray-500"
                  />
                </div>
                <TextInput
                  id="small"
                  type="number" min={0}
                  sizing="sm"
                  name=" number_of_confidential"
                  onChange={props.OnChange}
                />
              </div>

              <div>
                <div className="mb-2 block mt-5">
                  <Label
                    htmlFor="small"
                    value="Número de temas clasificados como Secreto: "
                    className="text-gray-500"
                  />
                </div>
                <TextInput
                  id="small"
                  type="number" min={0}
                  sizing="sm"
                  name="number_of_secret"
                  onChange={props.OnChange}
                />
              </div>
              <div>
                <div className="mb-1 block mt-5">
                  <Label
                    htmlFor="small"
                    value="Número de temas clasificados como Secretísimo:"
                    className="text-gray-500"
                  />
                </div>
                <TextInput
                  id="small"
                  type="number" min={0}
                  sizing="sm"
                  name="number_of_secretism"
                  onChange={props.OnChange}
                />
              </div>
            </>
            )}


          </div>

          <p className="lg:w-2/5 font-semibold text-primary my-3">
            {`d) El índice de la información clasificada como reservada, detallando
            la fecha de la resolución de clasificación de la reserva y el
            período de vigencia de la misma`}
          </p>
          <table className="w-full divide-y divide-gray-200 mt-5">
            <thead className="sticky top-0 z-10 w-full bg-gray-100 text-center">
              <tr className="text-xs">
                <th scope="col" className="rounded-tl-md w-72 ">

                  Tema
                </th>
                <th scope="col" className="w-72">
                  Base Legal
                </th>
                <th scope="col" className="w-28">
                  Fecha de la clasificación de la información reservada -
                  semestral
                </th>
                <th scope="col" className="rounded-tr-md w-60">
                  Periodo de vigencia de la clasificación de la reserva
                </th>
                <th scope="col" className="rounded-tl-md w-20">
                  Se ha efectuado ampliación
                </th>
                <th scope="col" className="w-60">
                  Descripción de la ampliación
                </th>
                <th scope="col" className="w-32">
                  Fecha de la ampliación
                </th>
                <th scope="col" className="rounded-tr-md w-60">
                  Período de vigencia de la ampliación
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
              {
                props.Items.map((element, index) => {
                  console.log(element)
                  return (
                    <tr>
                      <td>
                        <textarea
                          className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                          onChange={(e) => {
                            props.onTextTable(index,
                              "topic" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>
                      <td>
                        <textarea
                          className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                          onChange={(e) => {
                            props.onTextTable(index,
                              "legal_basis" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>
                      <td>
                        <TextInput
                          id="small"
                          type="date"
                          sizing="sm"
                          className="w-28"
                          onChange={(e) => {
                            console.log(e.target.value)
                            props.onTextTable(index,
                              "classification_date" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>
                      <td>
                        <textarea
                          className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                          placeholder=""
                          name="data"
                          onChange={(e) => {
                            props.onTextTable(index,
                              "period_of_validity" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>
                      <td>
                        <Select className="w-16 " required
                          onChange={(e) => {
                            props.onBooleanTable(index,
                              "amplation_effectuation" as keyof IndexInformationClassifiedEntity,
                              e.target.value === "si"

                            )
                          }}
                          disabled
                          >
                          <option
                            value={"si"}
                          >Si</option>
                          <option
                            value={"no"}
                          >No</option>
                        </Select>
                      </td>
                      <td>
                        <textarea
                          className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                          onChange={(e) => {
                            props.onTextTable(index,
                              "ampliation_description" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>{" "}
                      <td>
                        <TextInput
                          id="small"
                          type="date"
                          sizing="sm"
                          className="w-32"
                          onChange={(e) => {
                            props.onTextTable(index, "ampliation_date", e.target.value)
                          }}
                          disabled
                        />
                      </td>{" "}
                      <td>
                        <textarea
                          className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-80"
                          onChange={(e) => {
                            props.onTextTable(index,
                              "ampliation_period_of_validity" as keyof IndexInformationClassifiedEntity,
                              e.target.value

                            )
                          }}
                          disabled
                        />
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
          
        </section>

        {props.error != "" && (
          <Alert
            message={props.error}
            type="error"
            onClose={() => props.setError("")}
          />
        )}
        {props.success != "" && (
          <Alert
            message={props.success}
            type="success"
            onClose={() => props.setSuccess("")}
          />
        )}
        <div className="flex w-full items-end justify-center gap-2 p-2 text-sm">
          <button
            type="submit"
            className="items-center mt-5 rounded-lg bg-primary 
                    py-2.5 text-sm
                    px-10
                    font-medium text-white hover:opacity-80 focus:outline-none 
                    focus:ring-4 focus:ring-blue-300"
          >
            <span >Guardar</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default AnnualReportPresenter;
