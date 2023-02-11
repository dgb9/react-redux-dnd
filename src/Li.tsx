import React from 'react';
import {ItemData} from "./index";
import {useDrag, useDrop} from "react-dnd";


const Li = (props: { id: string, nameHere: string, clb: (current: string, over: string) => void}) => {
    const item = {id: props.id, nameHere: props.nameHere}
    const [{ isDragging }, drag] = useDrag(() => ({
        item,
        type: "whatever",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const [{ isOver}, drop] = useDrop(() => ({
        accept: "whatever",
        drop: (alfa: ItemData, monitor) => {
            props.clb(alfa.id, item.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
    }))

    return (
        <div ref={drop}><li ref={drag}><strong>{item.id}</strong> - {item.nameHere}</li></div>
    );
}

export default Li;
