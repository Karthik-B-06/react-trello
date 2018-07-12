import React, { Component } from "react";
import {connect} from 'react-redux';

import { Droppable, Draggable} from "react-beautiful-dnd";

import AddCardModal from './addcardmodal';

import moment from 'moment';
import {addNewCard} from '../actions/board';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
          board: '',
          title : '',
          assignee: '',
          dueDate : '',
          tags: '',
          createdAt: ''
    };
  }
  addNewCard = (boardId) => (e) => {
    const uuidv1 = require('uuid/v1');
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code === 13) {
      e.preventDefault();
      if(e.target.value === "") {
        alert("Value Missing");
        return;
      }
      let card = {};
      card.id = uuidv1();
      card.title = e.target.value;
      card.assignee = "";
      card.dueDate = "";
      card.tags = [""];
      card.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a')
      card.boardId = boardId;
      this.props.addCard(boardId,card);
      this.props.dispatch(addNewCard(boardId,card));
      e.target.value = "";
    }
  }
  render() {
    return (
      <Droppable type="Card" droppableId={this.props.board.droppableId}>
           {(provided) => (
                  <div className="cardBoard"
                      ref={provided.innerRef}>
                      <div className="card-header">
                        <h5> {this.props.board.boardTitle}
                        </h5>
                        <button data-toggle="modal" data-target="#addCardModal" id="add" className="fa fa-plus" aria-hidden="true">
                        </button>   
                      </div>
                      {this.props.board.cards.map((card, index) => (
                          <Draggable
                              type="Card"
                              key={index}
                              draggableId={card.id}
                              index={index}>
                                  {(provided, snapshot) => (
                                      <div className="card"
                                          style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          >
                                          <div className="card-header text-muted"> {card.title} </div>
                                          <div className="card-body">
                                              <h6> {card.assignee} </h6>
                                              {
                                                card.tags.map((tag, index) => 
                                                <span key={index} className="badge badge-secondary">{tag}</span>)
                                              }
                                          </div>
                                          <div className="card-footer text-muted">
                                            <p className="dueDate"> {card.dueDate} </p>
                                          </div>
                                      </div>
                                  )}                             
                          </Draggable>
                      ))}
                      <br/>
                      <div className="input-group">
                        <button className="btn"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>                      
                        <input type="text" required onKeyPress={this.addNewCard(this.props.board.droppableId)}  id="newCard" placeholder="Add Task"></input>
                      </div>
                      <AddCardModal boardId={this.props.board.droppableId}/>
                      {provided.placeholder}
                  </div>                        
            )}                         
      </Droppable>
    );
  }
}

const mapStateToProps = store => {
  return {
    store
  }
}

export default connect(mapStateToProps)(Card);




