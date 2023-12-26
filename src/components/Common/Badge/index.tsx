
interface BadgeProps {
    text: string
    color: "primary" | "secondary" | "danger" | "warning" | "success" | "info"
}
const Badge = (props: BadgeProps) => {

    const colors = {
        primary: "bg-blue-400",
        secondary: "bg-green-100",
        danger: "bg-red-100",
        warning: "bg-yellow-100",
        success: "bg-green-100",
        info: "bg-blue-100"
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-2 text-white rounded-full text-xs font-medium ${colors[props.color]} bg-${colors[props.color]}-100`}>
            {props.text}
        </span>
    )
    
}

export default Badge

