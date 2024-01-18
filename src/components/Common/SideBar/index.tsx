import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../../../utils/menu";
import { Sidebar } from "flowbite-react";
import React from "react";

interface Props {
	menu: MenuItem[]
	permissions: string[]
}

const Sidebar_ = ({ menu, permissions }: Props) => {


	const [path, setPath] = React.useState("")

	const location = useLocation()

	React.useEffect(() => {
		setPath(location.pathname)
		
	}, [location.pathname])

	return (


		<Sidebar aria-label="Default sidebar example">
			<a className="flex items-center w-full px-3 mt-6" href="#">
				<svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
				</svg>
				<span className="ml-2 text-sm font-bold">The App</span>
			</a>
			<hr className="my-4 dark:border-gray-600" />
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					{
						menu.filter((item) => item.visible).
							map((item, index) => (

								permissions.includes(item.permission_required) &&
								<Link className={"flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" +
									(path === item.path ? " bg-gray-300" : "")}

									to={item.path} key={index}>
									{item.icon}
									<span className="ml-2 text-sm font-medium">{item.name}</span>
								</Link>
							))
					}
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}

export default Sidebar_;