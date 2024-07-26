import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react'

interface IFoodElementProps {
    food: {
        id: number;
        name: string;
    }
}

const FoodElement = ({ food }: IFoodElementProps) => {

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: food.id });

    useEffect(() => {
        console.log("transform", transform);
        console.log("transition", transition);
    }, [transform, transition])

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='p-4 m-4 text-white bg-pink-400 rounded-md shadow-md'
        >
            <h1>{food.name}</h1>
        </div>
    )
}

export default FoodElement
