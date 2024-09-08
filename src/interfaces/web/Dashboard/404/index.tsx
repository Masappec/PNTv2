import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/404.svg'
export const NotFount404 = () => {
  return (
    <section className="w-screen h-screen flex justify-center gap-11 items-center ">
      <div className="w-[600px]">
        <img src={logo} alt="Imagen de error 404" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-gray-500 text-[40px] font-semibold">Sitio no Encontrado</h1>
        <Button className="bg-primary-500 w-1/3 mt-10" size="sm" as={Link} to="/">
          Ir a Inicio
        </Button>
      </div>
    </section>
  )
}
