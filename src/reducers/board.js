import {getBoard} from '../selectors/boardSelector';

const boardInitialState = [];

export const boardReducer = (state = boardInitialState, action) => {
  switch(action.type) {
    case 'SET_BOARD':
      // console.log("From SET_BOARD",[...action.boards]);
      return [...action.boards];
    case 'ADD_BOARD':
      // console.log("From ADD_BOARD",[...action.boards])
      return [...state, action.board];
    case 'ADD_CARD':
      // console.log("From ADD_BOARD",[...action.boards])
      if(action.index === -1) {
        let [boardToChange, boardNotToChange] = getBoard(state, action.boardId);
        boardToChange[0].cards.push(action.card);
        // console.log(boardToChange);
        return [...boardToChange, ...boardNotToChange].sort((a,b) => (a.order>b.order));
      }
      else {
        // console.log(action);
        [boardToChange, boardNotToChange] = getBoard(state, action.boardId);
        boardToChange[0].cards.splice(action.index, 0, action.card);
        return [...boardToChange, ...boardNotToChange].sort((a,b) => (a.order>b.order));
      } 
    case 'DELETE_CARD':
      let [boardToChange, boardNotToChange] = getBoard(state, action.boardId);
      boardToChange[0].cards.splice(action.index, 1);
      return [...boardToChange, ...boardNotToChange].sort((a,b) => (a.order>b.order));      
    case 'UPDATE_BOARD':
      // console.log("From UPDATE_BOARD",[...action.boards])
      return [...action.boards];
    default:
      // console.log("From Board Reducer Default",state, action)
      return state;
  }
};

