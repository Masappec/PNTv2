import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export const NotFount404 = () => {
  return (
    <section className="w-screen h-screen flex justify-center gap-11 items-center ">
      <div className="w-[600px]">
        <dotlottie-player
          classname="w-4 h-4"
          src="https://lottie.host/3b924da1-bbc7-4df4-8bac-3819b4044144/rMY1Nr4YXO.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
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
