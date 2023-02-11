import React from 'react';
import {ItemData} from "./index";


const Li = (item: ItemData) => {
    return (
        <li><strong>{item.id}</strong> - {item.nameHere}</li>
    );
}

export default Li;
