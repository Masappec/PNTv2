import { useState } from 'react';
import MessageUseCase from "../../../../domain/useCases/MessagesUseCase/MessagesUseCase"

const InboxCreatePresenter = ({usecase}: {usecase: MessageUseCase}) => {
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [receiverId, setReceiverId] = useState('');
        const handleSubmit = (e: any) => {
          e.preventDefault();
          usecase.createNewMessage({ title, content, receiver_id: receiverId });
          setTitle('');
          setContent('');
          setReceiverId('');
        };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">Enviar mensajes a supervisores</h2>
            <div className="w-full max-w-xs mt-10">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Titulo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Contenido
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Receptor
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            placeholder="Receiver ID"
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                        />
                    </div>
                    <button className='btn bg-teal-400 rounded' type="submit">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    )
}

export default InboxCreatePresenter