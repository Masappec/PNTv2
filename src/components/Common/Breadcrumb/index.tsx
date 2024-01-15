import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";


interface breadcrumItem {
  name: string;
  path: string;

}

const Breadcrumb_ = ({ items }: { items: breadcrumItem[] }) => {
  return (

    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="#" icon={HiHome}>
        Inicio
      </Breadcrumb.Item>
      {
        items.map((item, index) => (
          <Breadcrumb.Item className="flex items-center" key={index}>
            <Link to={item.path} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
              {item.name}
            </Link>
          </Breadcrumb.Item >
        ))
      }
    </Breadcrumb>
  )
}
export default Breadcrumb_;