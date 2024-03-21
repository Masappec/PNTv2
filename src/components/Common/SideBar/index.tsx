import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../../../utils/menu";
import { Sidebar } from "flowbite-react";
import React from "react";
import Input from "../Input";
import { LuLogOut } from "react-icons/lu";

interface Props {
	menu: MenuItem[]
	permissions: string[]
	user: string,
	email: string,
	onLogout: () => void
}

const Sidebar_ = ({ menu, permissions, user, email, onLogout }: Props) => {


	const [path, setPath] = React.useState("")

	const location = useLocation()

	React.useEffect(() => {
		setPath(location.pathname)

	}, [location.pathname])

	return (


		<Sidebar aria-label="Default sidebar example"
			className="border-r bg-slate-200 w-64 z-30">

			<Sidebar.Items className="flex flex-col">
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

				<Sidebar.ItemGroup className="absolute bottom-0 p-4 md:relative lg:absolute xl:absolute">
					<div className="flex items-col">

						<div className="flex flex-row">
							<img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="avatar" className="w-8 h-8 rounded-full" />
							<div className="flex-col flex ml-2">
								<span className="text-sm font-medium text-slate-700">
									{user}
								</span>
								<span className="text-xs text-slate-500">
									{email}
								</span>
							</div>
							<a href="#" onClick={onLogout} className="ml-2 mt-3">
								<LuLogOut size={20} className="text-slate-500" />
							</a>
						</div>

					</div>
				</Sidebar.ItemGroup>
			</Sidebar.Items>

		</Sidebar>
	)
}

export default Sidebar_;