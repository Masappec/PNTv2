import { Badge, Card } from "flowbite-react"

interface Props {
  title: string;
  description: string;
  tags: string[];
  date?: Date;
  author?: string;
  onClick?: () => void;
}
const CardPublication = (props: Props) => {
  return (
    <Card href="#" className="w-full border-0" onClick={props.onClick}>
      <div className="flex items-center justify-between">

        <h5 className="text-2xl font-bold tracking-tight text-primary-900 dark:text-white">
          {props.title}
        </h5>
        <div>
          <div className="title">
            Formatos disponibles:

          </div>
          {
            props.tags.map((tag) => (
              <Badge color="info"
                className="w-1/2"
              >{tag}</Badge>
            ))
          }

        </div>

      </div>
      <p className="font-bold text-lg text-orange-800 dark:text-gray-400">
        {props.author}
        </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.description}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {
          props.date &&
          "Ultima actualización:  " + props.date.toLocaleDateString()

        }
      </p>
    </Card>
  )
}

export default CardPublication;