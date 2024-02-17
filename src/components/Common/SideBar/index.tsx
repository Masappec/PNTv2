import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../../../utils/menu";
import { Sidebar } from "flowbite-react";
import React from "react";
import Input from "../Input";

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


		<Sidebar aria-label="Default sidebar example" className="border-r bg-slate-200 w-64 h-full overflow-y-auto scrollbar-hide">
			
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Input placeholder="Buscar" className="w-full" />
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup>
					{
						menu.filter((item) => item.visible).
							map((item, index) => (

								permissions.includes(item.permission_required) &&
								<Link className={"flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#EAF7FC]" +
									(path === item.path ? " bg-[#EAF7FC]" : "")}

									to={item.path} key={index}>
									{item.icon}
									<span className="ml-2 text-sm font-medium text-slate-700">{item.name}</span>
								</Link>
							))
					}
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}

export default Sidebar_;