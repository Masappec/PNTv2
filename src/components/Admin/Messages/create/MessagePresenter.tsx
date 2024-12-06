import { FormEvent } from "react";

interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    title: string;
    content: string;
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
}

const MessagePresenter = ({
    handleSubmit,
    title,
    content,
    setTitle,
    setContent,
}: Props) => {
    return (
        <div className="flex flex-col justify-center item-center">
            <h2 className="text-3xl">Enviar Mensajes a Supervisores</h2>
            <div className="w-full max-w-xs mt-10">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Titulo</label>
                        <input 
                            type="text" 
                            placeholder="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                        <input 
                            type="text" 
                            placeholder="Contenido"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex text-center">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    )
}

export default MessagePresenter