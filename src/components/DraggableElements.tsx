import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react'
import FoodElement from './complementary/FoodElement';

const DraggableElements = () => {

    const [food, setFood] = useState([
        { id: 1, name: 'Pizza' },
        { id: 2, name: 'Burger' },
        { id: 3, name: 'Tacos' },
        { id: 4, name: 'Sushi' },
        { id: 5, name: 'Ceviche' },
        { id: 6, name: 'Paella' },
        { id: 7, name: 'Pasta' },
        { id: 8, name: 'Salad' }
    ]);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        // console.log("active", active);
        // console.log("over", over);

        
        setFood((food) => {
            const oldIndex = food.findIndex((foodItem) => foodItem.id === active.id);
            const newIndex = food.findIndex((foodItem) => foodItem.id === over!.id);

            return arrayMove(food, oldIndex, newIndex);
        });
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <h1>Food List</h1>

            <div className='flex'>
                <SortableContext items={food} strategy={horizontalListSortingStrategy}>
                    {
                        food.map((foodItem) => ((
                            <FoodElement food={foodItem} key={foodItem.id} />
                        )))
                    }
                </SortableContext>
            </div>
        </DndContext>
    )
}

export default DraggableElements
