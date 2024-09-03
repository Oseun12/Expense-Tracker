import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Amount</h2>
      <ResponsiveContainer width={'75%'} height={400} >
        <BarChart
       
        data={budgetList}
        margin={{
          top: 7
        }}
        >
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip/>
          <Legend/>
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2"/>
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF"/>

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard