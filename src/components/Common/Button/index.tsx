import React from 'react'

const Button=({ title, width }: { title: string, width: string }  )=>{
    return (
        <>
 
      <button className={' bg-sky-500 rounded-full px-20 py-2 md:ml-8 max-h-screen  hover:bg-orange-300 duration-500 '+ width}>{title}</button>
     
      </>
      
      )
}
export default Button