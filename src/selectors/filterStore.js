
export const getBoardsInScope = ({boards, filters}) => {
  boards = boards.map((board) => {
    board.cards = board.cards.filter((card) => {
      const textMatch = card.title.toLowerCase().includes(filters.text.toLowerCase());
      // console.log(card.title,textMatch);
      return textMatch;
    });
    return board;
  });
  return boards;
}