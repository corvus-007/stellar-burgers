import { feedsSlice, TFeedsState } from './feedsSlice';
import { fetchFeeds } from './feedsThunks';

const initialState: TFeedsState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

describe('Тестирование feedsSlice', () => {
  describe('Асинхронные редьюсеры', () => {
    describe('[fetchFeeds] Лента заказов', () => {
      test('[pending] отправка', () => {
        const { error, isLoading } = feedsSlice.reducer(initialState, {
          type: fetchFeeds.pending.type
        });

        expect(error).toBeUndefined();
        expect(isLoading).toBe(true);
      });

      test('[rejected] ошибка', () => {
        const errorMessage = 'error';
        const { error, isLoading } = feedsSlice.reducer(initialState, {
          type: fetchFeeds.rejected.type,
          error: { message: errorMessage }
        });

        expect(error).toBe(errorMessage);
        expect(isLoading).toBe(false);
      });

      test('[fulfilled] успех', () => {
        const payloadMock = {
          success: true,
          orders: [
            {
              _id: '6998231ba64177001b32c943',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa0949',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d'
              ],
              status: 'done',
              name: 'Space метеоритный экзо-плантаго флюоресцентный люминесцентный бургер',
              createdAt: '2026-02-20T09:02:19.023Z',
              updatedAt: '2026-02-20T09:02:19.228Z',
              number: 101246
            },
            {
              _id: '69981cada64177001b32c936',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093d'
              ],
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2026-02-20T08:34:53.849Z',
              updatedAt: '2026-02-20T08:34:54.053Z',
              number: 101245
            }
          ],
          total: 25240,
          totalToday: 2
        };
        const { error, isLoading, total, totalToday, orders } =
          feedsSlice.reducer(initialState, {
            type: fetchFeeds.fulfilled.type,
            payload: payloadMock
          });

        expect(error).toBeUndefined();
        expect(orders).toEqual(payloadMock.orders);
        expect(total).toBe(payloadMock.total);
        expect(totalToday).toBe(payloadMock.totalToday);
        expect(isLoading).toBe(false);
      });
    });
  });
});
