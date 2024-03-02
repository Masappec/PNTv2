import { FormEvent, useEffect, useState } from "react";
import Spinner from "../../../Common/Spinner";
import { LuCheck, LuFileEdit, LuPlusCircle } from "react-icons/lu";
import Alert from "../../../Common/Alert";
import Collapse from "../../../Common/Collapse";
import PedagogyAreaEntity from "../../../../domain/entities/PedagodyAreaEntity";
import Input from "../../../Common/Input";
import { FaTrash } from "react-icons/fa";

interface PedagogyAreaCreatePresenterProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setData: (name: string, value: string | number | boolean) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  data: PedagogyAreaEntity;
  edit: boolean;
  setEdit: (e: boolean) => void;
  onEdit: () => void;
  onAddQuestion: () => void;
  onDropQuestion: (index: number) => void;
  onAddTutorial: () => void;
  onDropTutorial: (index: number) => void;
  onAddNormative: () => void;
  onDropNormative: (index: number) => void;
  onChangeValue: (
    root: string,
    name: string,
    value: string,
    index: number
  ) => void;
}

const PedagogyAreaCreatePresenter = (
  props: PedagogyAreaCreatePresenterProps
) => {
  const [_edit, set_edit] = useState(props.edit);

  const [itemsOpen, set_itemsOpen] = useState<number[]>([]);

  useEffect(() => {
    set_edit(props.edit);
  }, [props.edit]);

  return (
    <div className="container max-h-max mx-auto">
      <div className="flex items-center py-5 justify-center"></div>
      <form className="flex  mt-5" onSubmit={props.handleSubmit}>
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Area Pedagógica
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-x-3">
              {props.loading ? (
                <Spinner />
              ) : _edit ? (
                <button
                  type="submit"
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                            text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuCheck className="w-5 h-5" />
                  <span>Guardar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => props.onEdit()}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuFileEdit className="w-5 h-5" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-10">
            {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}
            {props.success && (
              <Alert
                message={props.success}
                type="success"
                onClose={() => props.setSuccess("")}
              />
            )}

            <div className="flex flex-col m-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Normativas
              </h3>
              {props.data.normatives.map((e, i) => (
                <>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-full m-2">
                      <Input
                        placeholder="Titulo"
                        value={e.title}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "title",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="Descripción"
                        value={e.description}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "description",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="URL"
                        value={e.url}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "normatives",
                            "url",
                            value.target.value,
                            i
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col m-2">
                      {_edit && (
                        <div className="rounded-full border bg-red-500 border-red-500 w-7 h-7 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => props.onDropNormative(i)}
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
              {_edit && (
                <div className="flex items-center justify-center w-full mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      props.onAddNormative();
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                  >
                    <LuPlusCircle className="w-5 h-5" />
                    <span>Agregar Normativa</span>
                  </button>
                </div>
              )}
              <hr className="my-5"></hr>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Vídeos Tutoriales
              </h3>
              {props.data.tutorials.map((e, i) => (
                <>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-full m-2">
                      <Input
                        placeholder="Titulo"
                        value={e.title}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "title",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="Descripción"
                        value={e.description}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "description",
                            value.target.value,
                            i
                          )
                        }
                      />

                      <Input
                        placeholder="URL"
                        value={e.url}
                        disabled={!_edit}
                        onChange={(value) =>
                          props.onChangeValue(
                            "tutorials",
                            "url",
                            value.target.value,
                            i
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col m-2">
                      {_edit && (
                        <div className="rounded-full border bg-red-500 border-red-500 w-7 h-7 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => props.onDropTutorial(i)}
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
            </div>
            {_edit && (
              <div className="flex items-center justify-center w-full mt-5">
                <button
                  type="button"
                  onClick={() => {
                    props.onAddTutorial();
                  }}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  <LuPlusCircle className="w-5 h-5" />
                  <span>Agregar Tutorial</span>
                </button>
              </div>
            )}

            <hr className="my-5"></hr>

            <div className="flex  flex-col m-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Preguntas Frecuentes
              </h3>
              <Collapse
                edit={_edit}
                items={props.data.faq.map((e) => {
                  return {
                    content: e.answer,
                    title: e.question,
                  };
                })}
                itemsOpen={itemsOpen}
                setItemsOpen={set_itemsOpen}
                key={0}
                onDrop={props.onDropQuestion}
                isDroppeable={_edit}
                onContentChange={(index, content) => {
                  props.onChangeValue("faq", "answer", content, index);
                }}
                onTitleChange={(index, title) => {
                  props.onChangeValue("faq", "question", title, index);
                }}
              />

              <div className="flex items-center justify-center w-full mt-5">
                {_edit && (
                  <button
                    type="button"
                    onClick={() => {
                      props.onAddQuestion();
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                                    text-white transition-colors duration-200 bg-primary-300 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600 
                                                    dark:hover:bg-blue-500 dark:bg-blue-600"
                  >
                    <LuPlusCircle className="w-5 h-5" />
                    <span>Agregar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default PedagogyAreaCreatePresenter;
