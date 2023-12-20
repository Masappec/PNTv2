import React from 'react'
import Form from '../../Common/form/form'
import Title from '../../Common/Title/Ttle'
import Button from '../../Common/Button'


const LoginContainer= () => {
   
    return (
        <>
         <div className='bg-sky-700 min-h-screen flex  '> 
         <div className='items-center flex  justify-center h-auto flex-col flex-auto justify-items-start' >
         <Title  title="GoFinance" text="The most popular............" />
         <Button title='Read More' width="w-20"/> 
    
        </div> 
     
        <Form/>

        </div>
            
      </>
    )
}
export default LoginContainer