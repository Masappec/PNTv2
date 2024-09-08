import React, { useEffect, useState } from 'react'
import EntityComplianceV2Presenter from './EntityComplianceV2Presenter'
import { Pagination } from '../../../infrastructure/Api'
import { ComplianceEstablisment } from '../../../infrastructure/Api/PublicDataApi/interface'
import PublicDataApi from '../../../infrastructure/Api/PublicDataApi'

function EntityComplianceV2Container() {

    const api = new PublicDataApi();
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth()+1)

    const [page,setPage] = useState(1)

    const [data,setData] = useState<Pagination<ComplianceEstablisment>>({
      current:0,
      limit:0,
      next:0,
       
      previous:0,
      results:[],
      to:0,
      total:0,
      from:0,
      total_pages:0
    })


    useEffect(()=>{
      api.getComplianceEstablishment(year,month,page).then(res=>{
        setData(res)
      }).catch(e=>{
        console.log(e)
      })
    },[year,month,page]
  ) 
  return (
    <EntityComplianceV2Presenter
      data={data}
      current={data.current}
      from={data.from||0}
      onPaginate={setPage}
      pageSize={data.limit}
      to={data.to}
      total={data.total}
      total_pages={data.total_pages||0}
      onSearch={()=>{}}
      onSelectedMonth={setMonth}
      onSelectedYear={setYear}

      month={month}
      year={year}
    />
  )
}

export default EntityComplianceV2Container