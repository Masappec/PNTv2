import React from 'react'
import Table from '../../Common/Table';

interface Props {

  data: [];
  current: number;
  pageSize: number;
  from: number;
  to: number;
  total: number;
  total_pages: number;
  onPaginate: (page: number) => void;



}

const DetailEntityPresenter= (props: Props)=> {
  return (
    <main>
  
    <div className="flex-col">
        <h2 className='text-2xl font-semibold text-center text-gray-900'>Transparencia Activa</h2>       
    <ul className='mb-12 mt-8'>
    <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
      <h2 className='font-medium text-gray-600'>Institución:</h2>
     
    </li>
    <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
      <h2 className='font-medium text-gray-600'>Mes:</h2>
     
    </li>
    <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
      <h2 className='font-medium text-gray-600'>Año:</h2>
     
    </li>
  </ul>
  </div>

    <section className='h-min rounded-md bg-gray-100'>
    <Table
        show={false}
        columns={[
            {
                title: "Numeral LOTAIP",
                render: () => (
                    <p className="text-left text-wrap">{}</p>
                )
            },
            {
                title: "Estado",
                render: () => (
                    <p className="text-left">{}</p>
                )
            },
            {
                title: "Fecha y hora de carga",
                render: () => (
                    <p className="text-left" >{}</p>
                )
            },
          
            
     
    
    ]}
    data={[]}

    from={props.from}
    onChangePage={props.onPaginate}
    to={props.to}
    total={props.total}
    totalPages={props.total_pages}

  />
</section>
</main>

  )
}

export default DetailEntityPresenter
