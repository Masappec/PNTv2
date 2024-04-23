import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../../../utils/menu";
import { Sidebar } from "flowbite-react";
import React from "react";
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

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
			className="border-r bg-slate-200 w-64 z-30 h-screen ">

			<Sidebar.Items className="flex flex-col 
			justify-between ">
				<Sidebar.ItemGroup >
					{
						menu.filter((item) => item.visible).
							map((item, index) => (

								item.permission_required == "" ? <Link className={"flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#EAF7FC]" +
									(path === item.path ? " bg-[#EAF7FC]" : "")}

									to={item.path} key={index}>
									{item.icon}
									<span className="ml-2 text-sm font-medium text-slate-700">{item.name}</span>
								</Link> : permissions.includes(item.permission_required) &&
								<Link className={"flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#EAF7FC]" +
									(path === item.path ? " bg-[#EAF7FC]" : "")}

									to={item.path} key={index}>
									{item.icon}
									<span className="ml-2 text-sm font-medium text-slate-700">{item.name}</span>
								</Link>
							))
					}
				</Sidebar.ItemGroup>

				<Sidebar.ItemGroup className="relative p-4 ">
					<div className="flex items-col">

						<div className="flex flex-row">
							<FaUserCircle size={38} className="text-slate-500" />
							<div className="flex-col flex ml-2">
								<span className="text-sm font-medium text-slate-700">
									{user && user.length > 15 ? user.split(" ")[0] + "..." : user}
								</span>
								<span className="text-xs text-slate-500">
									{email && email.length > 15 ? email.substring(0, 15) + "..." : email}
								</span>
							</div>
							<a href="#" onClick={onLogout} className="ml-2 mt-3">
								<LuLogOut size={20} className="text-slate-500" />
							</a>
						</div>

					</div>
				</Sidebar.ItemGroup>
			</Sidebar.Items>

		</Sidebar >
	)
}

export default Sidebar_;