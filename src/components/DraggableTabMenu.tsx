import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableTabMenu = () => {
    const [items, setItems] = useState([
        {label: 'Home', icon: 'pi pi-fw pi-home', id: 'home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar', id: 'calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil', id: 'edit'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file', id: 'documentation'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog', id: 'settings'}
    ]);
    const [activeIndex, setActiveIndex] = useState(0);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over!.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over!.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <TabMenu model={items.map((item, index) => ({
                    ...item,
                    template: () => {
                        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
                        const style = {
                            transform: CSS.Transform.toString(transform),
                            transition
                        };

                        return (
                            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                                <a className={index === activeIndex ? 'p-menuitem-link p-ripple p-highlight' : 'p-menuitem-link p-ripple'}>
                                    <span className={`p-menuitem-icon ${item.icon}`}></span>
                                    <span className="p-menuitem-text">{item.label}</span>
                                </a>
                            </div>
                        );
                    }
                }))} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </SortableContext>
        </DndContext>
    );
};

export default DraggableTabMenu;
