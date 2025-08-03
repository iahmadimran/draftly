"use client";

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.action';
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter()
  const addDocumentHandler = async () => {
    try {
    const room = await createDocument({ userId, email })

    if (room) {
      router.push(`/documents/${room.id}`)
    }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button className='gradient-blue cursor-pointer flex gap-1 shadow-md' type='submit' onClick={addDocumentHandler}>
      <Image src={'/assets/icons/add.svg'} alt='add' width={24} height={24} unoptimized/>
      <p className='hidden sm:block'>Start a document</p>
    </Button>
  )
}

export default AddDocumentBtn
