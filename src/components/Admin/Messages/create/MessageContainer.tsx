import { FormEvent, useState } from "react";
import MessageUseCase from "../../../../domain/useCases/MessageUseCase/MessageUseCase";
import MessagePresenter from "./MessagePresenter";

function MessageContainer({
    usecase
}: {
    usecase: MessageUseCase
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        usecase.createNewMessage(title, content);
        setTitle('');
        setContent('');
    }

    return (
        <MessagePresenter 
            handleSubmit={handleSubmit}
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
        />
    )
}

export default MessageContainer