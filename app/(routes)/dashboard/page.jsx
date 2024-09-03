'use client'
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from './_components/CardInfo'
import { useEffect, useState } from "react";
import { db } from "../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from "./budgets/_components/BudgetItem";

const Dashboard = () => {
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([])

  useEffect(() => {
      user&&getBudgetList();
  }, [user])

  // To get the budget list
  const getBudgetList = async () => {
      const result = await db.select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

      setBudgetList(result);
  }
  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">Spend wisely, Be bouyant!! Be Confident!!</p>

      <CardInfo budgetList={budgetList}/>
      <div className=" mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard
            budgetList={budgetList}
          />
        </div>
        <h2 className="font-bold text-3xl mt-10 mb-10">My Budgets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard