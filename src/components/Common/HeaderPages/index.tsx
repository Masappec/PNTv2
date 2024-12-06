import { Link } from 'react-router-dom'
import { LogoPortal } from '../LogoPortal'

interface HeaderPagesProps {
  name: string
  email: string
  onLogout: () => void
}

const HeaderPages = (props: HeaderPagesProps) => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-300 antialiased">
      <nav className="bg-gray-200 px-4 py-2.5 lg:px-6">
        <div className="flex flex-wrap items-center justify-between">
          <a href="/">
            <LogoPortal className="ml-10 max-w-32 xl:ml-0" />
          </a>
          <div className="flex items-center lg:order-2">
          <Link to="/admin/notifications" className="group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20 w-[110px] text-center">
              <span className="text-pretty text-base font-medium">Aviso 📢​</span>
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
            </Link>

            <Link to="/admin/perfil" className="group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20 w-[110px] text-center">
              <span className="text-pretty text-base font-medium">Ver Perfil</span>
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
            </Link>

            <Link to="/tutoriales" className="group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20 w-[110px] text-center">
              <span className="text-pretty text-base font-medium">Ayuda</span>
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
            </Link>

            <Link
              to="/"
              onClick={props.onLogout}
              className="group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20 w-[110px] text-center"
            >
              <span className="text-pretty text-base font-medium">Salir</span>
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
              <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6"></span>
            </Link>

            {/* <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <div className="mx-3 flex rounded-full border border-gray-300 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0">
                  <span className="sr-only">abrir menu</span>
                  <svg className="size-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
                    <path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z" />
                  </svg>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{props.name}</span>
                <span className="block truncate text-sm text-gray-500">{props.email}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={props.onLogout}>Cerrar ssesión</Dropdown.Item>
            </Dropdown> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderPages
