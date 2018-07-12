import React, { Component } from "react";
import { connect } from 'react-redux';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from "./card";
import '../../public/styles/board.scss';

import { addNewBoard } from '../actions/board';

import moment from 'moment';
import { getBoardsInScope } from "../selectors/filterStore";


class BoardList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    addNewBoard = () => (e) => {
        const uuidv1 = require('uuid/v1');
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            if (e.target.value === "") {
                alert("Enter the card name");
                return;
            }
            const id = uuidv1();

            // its for posting the board to DB
            this.props.addBoard(id, e.target.value);
            let board = {
                outerDropId: "board:" + id,
                droppableId: "droppable:" + id,
                boardTitle: e.target.value,
                cards: [],
                order: this.props.store.boards.length,
                createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')._d
            }
            e.target.value = "";
            this.props.dispatch(addNewBoard(board));
        }
    }
    componentWillReceiveProps(propsFromRedux){
        console.log("CWRP",propsFromRedux);
    }
    click() {
        document.getElementById('boardName').focus();
    }
    render() {
        return (
            //   The outer droppable container
            <div>
                <Droppable direction="horizontal" key={1} droppableId="outerDroppable">
                    {(provided) => (
                        <div className="boards" ref={provided.innerRef}>
                            {getBoardsInScope(this.props.store).map((board, index) => (
                                <Draggable key={index}
                                    draggableId={board.outerDropId}
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps} >
                                            <Card addCard={this.props.addCard} board={board} />
                                        </div>)}
                                </Draggable>
                            ))}
                            <div className="input-group mb-2">
                                <span>
                                    <button onClick={this.click} className="btn"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                    <input required type="text" id="boardName" onKeyPress={this.addNewBoard("outerDroppable")} name="boardName" placeholder="Add Board" />
                                </span>
                            </div>


                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({ store })

export default connect(mapStateToProps)(BoardList);
// export default BoardList;