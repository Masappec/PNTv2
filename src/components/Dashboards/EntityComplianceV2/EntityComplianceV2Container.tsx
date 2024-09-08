import React, { useEffect, useState } from 'react'
import EntityComplianceV2Presenter from './EntityComplianceV2Presenter'

function EntityComplianceV2Container() {
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth()+1)

  return (
    <EntityComplianceV2Presenter
    data={[]}
    current={0}
    from={0}
    onPaginate={0}
    pageSize={0}
    to={0}
    total={0}
    total_pages={0}
    onSearch={()=>{}}
    onSelectedMonth={setMonth}
    onSelectedYear={setYear}

    month={month}
    year={year}
    />
  )
}

export default EntityComplianceV2Container