import {Action, Reducer} from "redux";
import {State} from "./index";
import {ACTION_MOVE, ACTION_POSITION} from "./constants";
import {ActionMove, ActionPositon} from "./App";

export const currentReducer : Reducer<State, Action> = (store: State | undefined, action: Action): State => {
    let res = store!!

    if (action.type === ACTION_POSITION) {
        const act = action as ActionPositon;

        const position = res.position + act.value;
        res = {...store!!, position}
    } else if(action.type === ACTION_MOVE) {
        const act = action as ActionMove;
        const id = act.id;
        const idOnTop = act.idOnTop;

        const items = store!!.items
        const itemId = items.filter((item) => {
            return item.id === id;
        })[0];

        // flatmap the array
        const itemFlattened = items.flatMap((item) => {
            const arr = []

            const idCurrent = item.id

            // if id is the normal one, don't return anything, just return this
            if (idCurrent !== id) {
                if (idCurrent !== idOnTop) {
                    arr.push(item);
                } else {
                    arr.push(itemId);
                    arr.push(item);
                }
            }

            return arr;
        });

        res = {...store!!, items: itemFlattened}
    }

    return res;
}
