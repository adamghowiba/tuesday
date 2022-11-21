export const QUERY_KEY = {
  listBoards: 'boards',
  retriveBoard: (params: { boardId: number }) => [
    'boards',
    `${{ boardId: params.boardId }}`,
  ],
};
