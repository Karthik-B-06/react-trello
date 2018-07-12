
export function setBoard(boards) {
  return {
    type: 'SET_BOARD',
    boards
  }
}


export function addNewBoard(board) {
  return {
    type: 'ADD_BOARD',
    board
  }
}

export function addNewCard(boardId, card, index = -1) {
  return {
    type: 'ADD_CARD',
    card,
    boardId,
    index
  }
}

export function updateBoards(boards) {
  return {
    type : 'UPDATE_BOARD',
    boards
  }
}

export function deleteCard(boardId, index, card) {
  return {
    type: 'DELETE_CARD',
    card,
    boardId, 
    index
  }
}

