import React, {Component} from 'react';

import {connect} from 'react-redux';
import SearchBar from './searchBar';

import BoardList from './board';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import moment from 'moment';


import {setBoard, updateBoards, deleteCard, addNewCard} from '../actions/board';

const link = "http://localhost:5000";
// const link = "http://192.168.1.13"


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


/** 
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};



class Index extends Component {
   
  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.addBoard = this.addBoard.bind(this);
  }
  
  state = {
    isLoading: false  
  };
  componentDidMount() {
    axios.get(`${link}/getBoard`)
      .then((result) => {
        this.props.dispatch(setBoard(result.data.boards));
        this.setState(
          {isLoading: true}
        )
      });
  }
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */

   // Add Board Functionality 
   addBoard(id, boardTitle) {
     let board = {
       outerDropId: "board:" + id,
       droppableId: "droppable:" + id,
       boardTitle: boardTitle,
       cards : [],
       order: this.props.store.boards.length,
       createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
     }
     axios.post(`${link}/addBoard`, board)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

   }
   // Add Card Functionality 
    addCard(boardId, newCard) {
      this.props.store.boards.map((board) => {
        if(board.droppableId === boardId) {
          axios.post(`${link}/addCard`, newCard)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        }
      });
    }
  getList = id => {
    for(var i=0; i<this.props.store.boards.length; i++ ) {
      if(this.props.store.boards[i].droppableId === id) {
        return this.props.store.boards[i].cards;
      }
    }
  };
  onDragStart = () => {
    console.log("Drag Started");
  };
  onDragUpdate = () => {
    console.log("Drag Updated");
  }
  onDragEnd = result => {
      const { source, destination } = result;
      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          // Within The Same List
          // Board Moved
            if(destination.droppableId === "outerDroppable") {
              const items = reorder(
                this.props.store.boards,
                source.index,
                destination.index
              );
              for(let i=0; i<result.length; i++) {
                result[i].order = i;
              } 
              this.props.dispatch(updateBoards(items));
              axios.put(`${link}/reorderBoard`, items)
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });

            }
            // Card Moved
            else{
              result.card = this.getList(source.droppableId)[source.index];
              const card = this.getList(source.droppableId)[source.index];
              this.props.dispatch(deleteCard(source.droppableId, source.index, card));
              this.props.dispatch(addNewCard(source.droppableId, card, destination.index));
              axios.put(`${link}/reorderCard`, result)
                .then(response => console.log(response))
                .catch(err => console.log(err));
            }  

      } 
      else {

        // Card Moved Between Two Boards

        console.log("Between Lists");
        let data = {
            card: this.props.store.boards.filter(board => board.droppableId === source.droppableId)[0].cards[source.index],
            source: source,
            destination: destination,
            title: this.getList(source.droppableId)[source.index].title 
          }
          this.props.dispatch(deleteCard(source.droppableId, source.index, data.card));
          this.props.dispatch(addNewCard(destination.droppableId, data.card, destination.index));  
          axios.put(`${link}/moveCard`, data)
            .then(response => console.log(response))
            .catch(err => console.log(err));
      }
      console.log("Drag Ended");
      
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
      if(this.state.isLoading) {
        return(
          <div className="container-fluid">
          <div className="alert alert-info"> Photon </div>
          <SearchBar/>
          <br/>
          <DragDropContext className="drop" onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}
                     onDragUpdate={this.onDragUpdate}>
                <BoardList addBoard={this.addBoard} addCard={this.addCard}/>
          </DragDropContext>
          <br/>
          </div>
        );
      }
      else {
        return (
          <div className="loader-wrapper" id="loader-1">
              <div id="loader"></div>
          </div>
      );
      }
  }
}

const mapStateToProps = (state) => ({store: state});

export default connect(mapStateToProps)(Index);