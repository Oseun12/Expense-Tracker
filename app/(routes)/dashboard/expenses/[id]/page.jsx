'use client'

import { Budgets, Expenses } from '../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import { db } from '../../../../../utils/dbConfig';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpensesListTable';
import EditBudget from '../_components/EditBudget'
import { Button } from '../../../../../components/ui/button';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


function ExpensesCheck({ params }) {

  const {user} = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter()
  
  useEffect(() => {
    user&&getBudgetInfo();
  }, [user]);

  // To get budget info
  const getBudgetInfo = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      getExpensesList();

      }
//To display the latest expenses after creation
      const getExpensesList = async() => {
        const result = await db.select().from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));
        setExpensesList(result);

        console.log(result)
      }

      const deleteBudget = async() => {

        const deleteExpense = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning()
        
        if (deleteExpense) {
          const result = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning();
        }
        toast('Budget deleted!')
        router.replace('/dashboard/budgets');
      }
    return (
      <div className='p-10'>
        <h2 className='text-sm md:text-2xl font-bold flex justify-between items-center'>
          <span className='flex gap-2 items-center'>
          <ArrowLeft onClick={() => router.back()} className='cursor-pointer'/> My expenses
          </span>
        
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo}/>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2' variant='destructive' > 
              <Trash/> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your budget and expense
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()} >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        </h2>
          
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4'>
          { budgetInfo? <BudgetItem 
          budget={budgetInfo}
          />: 
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse' >

          </div>}
          <AddExpense budgetId = {params.id} user ={user} refreshData={() => getBudgetInfo()}/>
        </div>
        <div className='mt-4'>
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData = {() => getBudgetInfo()}/>
        </div>
      </div>
    )
}

export default ExpensesCheck