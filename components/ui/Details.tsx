import { BlogTypes } from '@/types/blog'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'


const Details = ({ id, title, description, content, image, userId, createdAt, trigger }: BlogTypes & {trigger: React.ReactElement}) => {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className='min-w-[70vw] max-h-[160vw] md:max-h-[40vw] overflow-y-scroll'>
                <DialogHeader>
                    <DialogTitle className='text-5xl font-semibold'>{title}</DialogTitle>
                    <DialogDescription className=''>{description}</DialogDescription>
                    <div className='mt-2'>
                        <Image
                            src={image  }
                            alt=""
                            width={800}
                            height={400}
                            className='w-full '
                        />
                    </div>
                    <div className='w-full mt-2'>
                        {content}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Details