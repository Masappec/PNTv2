import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../../../utils/menu";
import React from "react";
interface Props {
	menu: MenuItem[]
	permissions: string[]
	establishmentName: string
}

const Sidebar_ = ({ menu, permissions, establishmentName }: Props) => {


	const [path, setPath] = React.useState("")

	const location = useLocation()
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		setPath(location.pathname)

	}, [location.pathname])

	return (
		<>
			<button
				data-drawer-target='default-sidebar'
				data-drawer-toggle='default-sidebar'
				aria-controls='default-sidebar'
				type='button'
				onClick={() => setIsOpen(!isOpen)}

				className='fixed left-2 top-2 z-50 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 xl:hidden'>
				<span className='sr-only'>Open sidebar</span>
				<svg
					className='h-6 w-6'
					aria-hidden='true'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						clip-rule='evenodd'
						fill-rule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					></path>
				</svg>
			</button>
			<aside
				id='default-sidebar'
				className={`fixed left-0 top-[57.91px] z-40 h-screen w-64 border-r border-gray-300 bg-gray-200 pb-28 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
					} xl:translate-x-0`}
				aria-label='Sidenav'>
				<div className='flex h-full flex-col justify-between overflow-y-auto px-3 py-5'>
					<section>
						<ul className='space-y-2'>
							{
								menu.filter((item) => item.visible).
									map((item, index) => (
										item.permission_required == "" ?
											permissions.find(
												permission => permission == 'view_solicity'
											) && item.hidden_for_citicen ?
												<></> :
												<li key={index}>
													<Link
														className={`group flex items-center rounded-lg p-2 text-base 
												font-normal text-gray-900 hover:bg-gray-300
												${path === item.path ? "bg-gray-300" : ""}
												`}
														to={item.path}>
														{item.icon}
														<span className='ml-3'>{item.name}</span>
													</Link>
												</li> : permissions.includes(item.permission_required) &&
											<li key={index}>
												<Link
													className={`group flex items-center rounded-lg p-2 
												text-base font-normal text-gray-900 hover:bg-gray-300
												${path === item.path ? "bg-gray-300" : ""}
												`}
													to={item.path}>
													{item.icon}
													<span className='ml-3'>{item.name}</span>
												</Link>
											</li>
									))
							}
						</ul>
					</section>
					{
						establishmentName &&

						<article
							className='max-w-xs text-balance rounded bg-primary/5 p-2 text-sm font-medium text-primary'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								height='24px'
								viewBox='0 -960 960 960'
								width='24px'
								fill='currentColor'
							><path
								d='M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z'
							></path>
							</svg>
							<p className='mt-2'>
								{establishmentName}
							</p>
						</article>
					}
				</div>
			</aside>
		</>
	)

	/*return (


		<Sidebar aria-label="Default sidebar example"
			className="border-r bg-slate-200 w-64 z-30 h-full">

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

				<Sidebar.CTA className="relative p-4 ">
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
				</Sidebar.CTA>
			</Sidebar.Items>

		</Sidebar >
	)*/
}

export default Sidebar_;