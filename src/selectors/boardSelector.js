export const getBoard = (boards, boardId) => {
  const boardToChange = boards.filter(board => board.droppableId === boardId);
  const boardNotToChange = boards.filter(board => board.droppableId != boardId);
  return [boardToChange, boardNotToChange];
}