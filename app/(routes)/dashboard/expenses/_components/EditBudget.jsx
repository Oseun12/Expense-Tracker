'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Edit } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../../../components/ui/dialog"
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '../../../../../components/ui/input';
import { db } from '../../../../../utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Budgets } from '../../../../../utils/schema';

function EditBudget({budgetInfo, refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const {user} = useUser();

    useEffect(() => {
        if(budgetInfo) {
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo?.amount)
            setName(budgetInfo?.name)
        }
    }, [budgetInfo])

    const onUpdateBudget = async() => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
        .returning();

        if (result) {
            refreshData();
            toast('Updated successful!!!')
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
            <Button className='flex gap-2'> <Edit/> Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Budget</DialogTitle>
                    <DialogDescription>
                        <div className='mt-5'>
                            <Button variant='outline'
                            className='text-lg'
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >{emojiIcon}</Button>
                            <div className='absolute z-10'>
                                <EmojiPicker 
                                open={openEmojiPicker}
                                // To make the emoji picked to be the one that will appear at the display emoji
                                onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false)
                                }}
                                />
                            </div>
                            {/* Budgetlist input section */}
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                <Input placeholder='e.g Accessories' defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                <Input type='number' placeholder='e.g $2000' defaultValue={budgetInfo?.amount} onChange={(e) => setAmount(e.target.value)}/>
                            </div>
                            
                        </div>
                        
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button 
                        // This feature to disable the save button when nothing is being inputed
                        disabled={!(name&&amount)}
                        // To update the budget
                        onClick={onUpdateBudget}
                        className='mt-5 w-full bg-green-900 hover:bg-green-700'>Save
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default EditBudget