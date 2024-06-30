import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

const LessonContent = ({items}) => {
  
  return (
    <div className='m-20 p-7 rounded-lg border border-gray-800'>
        <Carousel>
          <CarouselContent>
            {items.map((elm) => 
                <CarouselItem key={elm}>
                    <div className='flex flex-col space-y-4 items-center'>

                      <h4 className='text-indigo-300 text-xl'>
                        {elm.title}
                      </h4>

                      <h5 className='text-gray-100 text-sm'>
                        {elm.content}
                      </h5>

                    </div>
                </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

    </div>
  )
}

export default LessonContent
