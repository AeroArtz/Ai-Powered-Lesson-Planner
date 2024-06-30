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
    <div className='m-20 p-7 rounded-lg border border-gray-600'>
        <Carousel>
          <CarouselContent>
            {items.map((elm) => 
                <CarouselItem key={elm}>
                    <h4 className='text-white'>
                      {elm}
                    </h4>
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
