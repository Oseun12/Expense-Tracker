import React from 'react'
import BudgetList from './_components/BudgetList'

const Budget = () => {
  return (
    <div>

      <div className='p-10'>
          <h2 className='font-bold text-5xl'>Budgetary Outline</h2>
          <BudgetList/>
      </div>
    
    </div>
  )
}

export default Budget