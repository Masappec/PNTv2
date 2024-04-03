interface Props {
    status: string;
}

const StatusBadge = ({ status }: Props) => {
    /*CREATED = 'CREATED', 'CREADO'
    PENDING = 'PENDING', 'PENDIENTE'
    READING = 'READING', 'LEÍDO'
    PROCESSING = 'PROCESSING', 'EN PROCESO'
    FINISHED = 'FINISHED', 'FINALIZADO'*/
    const statusColor = {
        CREATED: 'bg-blue-500',
        PENDING: 'bg-yellow-500',
        READING: 'bg-green-500',
        PROCESSING: 'bg-purple-500',
        FINISHED: 'bg-red-500',
    };

    const statusText = {
        CREATED: 'CREADO',
        PENDING: 'PENDIENTE',
        READING: 'LEÍDO',
        PROCESSING: 'EN PROCESO',
        FINISHED: 'FINALIZADO',
    };

    return (
        <span
            className={`text-white font-bold py-1 px-2 rounded-2xl ${statusColor[status as keyof typeof statusColor]}`}
        >
            {statusText[status as keyof typeof statusText]}
        </span>
    );
}

export default StatusBadge;