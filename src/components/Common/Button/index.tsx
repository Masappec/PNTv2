
const Button = ({ title, width }: { title: string, width: string }) => {
  return (
    <>

      <button className={' bg-sky-500 rounded-full py-2 md:ml-8 max-h-screen text-white hover:bg-orange-300 duration-500 ' + width}>
        {title}
      </button>

    </>

  )
}
export default Button