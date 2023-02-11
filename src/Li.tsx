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

    // please see drop: it is important, it is the function that is being called when drop happens
    // this function is invoked with the object being dropped and the monitor that shows the state of
    // the drop operation. The first object is the object being dragged, defined as itm inside the useDrag call

    // VERY IMPORTANT - you cannot make the same html tag to be a drag source and a drop target, however
    // I put the li html tag inside a drag, I made the drag source the li html tag and the drop target
    // the encompassing div tag

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
