import React from 'react';
import {State} from "./index";
import {Action, Dispatch} from "redux";
import {connect} from "react-redux";
import {ACTION_MOVE, ACTION_POSITION} from "./constants";

export interface AppPropsData {
    valStore: State
}

export interface AppPropsCallback {
    incr: () => void
    decr: () => void
    move: (id: string, onTopOf: string) => void
}

export interface AppProps extends AppPropsData, AppPropsCallback {

}

const App = (props: AppProps) => {

    const items = props.valStore.items.map((item) => {
        return (
            <li key={item.id}><strong>{item.id}</strong> - {item.nameHere}</li>
        )
    })

    const clicker = () => {
        props.move('4', '2')
    }

    return (
        <div>
            <h2>General</h2>
            <div>first stuff</div>
            <div>props here: {props.valStore.position}</div>
            <button onClick={props.incr}>increment here</button>
            <button onClick={props.decr}>decrement here</button>
            <h2>Items</h2>
            <ul>
                {items}
            </ul>
            <button onClick={clicker}>go ahead and move</button>
        </div>
    );
}

const storeToProps = (s: State): AppPropsData => {
    return {
        valStore: s
    }
}

export interface ActionPositon extends Action {
    type: string;
    value: number;
}

const createActionPosition = (val: number): ActionPositon => {
    return {
        type: ACTION_POSITION,
        value: val
    }
}

export interface ActionMove extends Action {
    type: string;
    id: string;
    idOnTop: string;
}

export const createActionMove = (id: string, idOnTop: string) : ActionMove => {
    return {
        type: ACTION_MOVE,
        id,
        idOnTop
    }
}

const dispatcher = (dispatch: Dispatch): AppPropsCallback => {
    return {
        decr: () => {
            dispatch(createActionPosition(-1));
        },
        incr: () => {
            dispatch(createActionPosition(1));
        },
        move: (id: string, idOnTopOf: string) => {
            dispatch(createActionMove(id, idOnTopOf));
        }
    }
}

export default connect(storeToProps, dispatcher)(App);

