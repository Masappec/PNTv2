import { useEffect, useState } from "react";
import MessageUseCase from "../../../domain/useCases/MessageUseCase/MessageUseCase"

type Message = {
    id: string;
    title: string;
    content: string;
}

const MessageList = ({
    usecase
}:{
    usecase: MessageUseCase
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const data = await usecase.getAllMessages();
                setMessages(data)
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchMessages();
    }, [])

    if (loading) return <p className="text-3xl">Loading...</p>

    return (
        <ul className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
            {
                messages.map((msg: any) => (
                    <li
                        key={msg.id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{msg.title}</h3>
                        <p className="text-gray-600 text-sm">{msg.content}</p>
                        <p className="text-gray-400 text-xs mt-4 text-right">
                            {new Date(msg.created_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}

export default MessageList