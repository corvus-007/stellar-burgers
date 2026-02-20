import { ordersSlice, TOrdersState } from './ordersSlice';
import { fetchOrder, fetchProfileOrders } from './ordersThunks';
import { TOrder } from '@utils-types';

const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: false
};

describe('Тестирование ordersSlice', () => {
  describe('Асинхронные редьюсеры', () => {
    describe('[fetchProfileOrders]', () => {
      test('pending', () => {
        const { isLoading } = ordersSlice.reducer(initialState, {
          type: fetchProfileOrders.pending.type
        });

        expect(isLoading).toBe(true);
      });

      test('rejected', () => {
        const { isLoading } = ordersSlice.reducer(initialState, {
          type: fetchProfileOrders.rejected.type
        });

        expect(isLoading).toBe(false);
      });

      test('fulfilled', () => {
        const payloadMock: TOrder[] = [
          {
            _id: '697d9236a64177001b3296d7',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0940'
            ],
            status: 'done',
            name: 'Метеоритный люминесцентный бессмертный краторный бургер',
            createdAt: '2026-01-31T05:25:10.382Z',
            updatedAt: '2026-01-31T05:25:10.617Z',
            number: 99953
          },
          {
            _id: '697d9386a64177001b3296d8',
            ingredients: ['643d69a5c3f7b9001cfa093d'],
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2026-01-31T05:30:46.415Z',
            updatedAt: '2026-01-31T05:30:46.739Z',
            number: 99954
          }
        ];
        const { orders, isLoading } = ordersSlice.reducer(initialState, {
          type: fetchProfileOrders.fulfilled.type,
          payload: payloadMock
        });

        expect(orders).toEqual(payloadMock);
        expect(isLoading).toBe(false);
      });
    });

    describe('[fetchOrder]', () => {
      test('pending', () => {
        const { isLoading } = ordersSlice.reducer(initialState, {
          type: fetchOrder.pending.type
        });

        expect(isLoading).toBe(true);
      });

      test('rejected', () => {
        const { isLoading } = ordersSlice.reducer(initialState, {
          type: fetchOrder.rejected.type
        });

        expect(isLoading).toBe(false);
      });

      test('fulfilled', () => {
        const payloadMock = {
          orders: [
            {
              _id: '69970af2a64177001b32c7af',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093d'
              ],
              owner: '6974a4e3a64177001b32870c',
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2026-02-19T13:06:58.931Z',
              updatedAt: '2026-02-19T13:06:59.128Z',
              number: 101194,
              __v: 0
            }
          ]
        };
        const { order, isLoading } = ordersSlice.reducer(initialState, {
          type: fetchOrder.fulfilled.type,
          payload: payloadMock
        });

        expect(order).toEqual(payloadMock.orders[0]);
        expect(isLoading).toBe(false);
      });
    });
  });
});
