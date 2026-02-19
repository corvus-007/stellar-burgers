import {
  burgerIngredientsSlice,
  TBurgerIngredientsState
} from './burgerIngredientsSlice';
import { fetchBurgerIngredients } from './burgerIngredientsThunks';

const initialState: TBurgerIngredientsState = {
  all: [],
  isIngredientsLoading: false
};

describe('Тестирование burgerIngredientsSlice', () => {
  describe('Асинхронные редьюсеры', () => {
    describe('[addCase]', () => {
      test('pending', () => {
        const { all, isIngredientsLoading } = burgerIngredientsSlice.reducer(
          initialState,
          {
            type: fetchBurgerIngredients.pending.type
          }
        );

        expect(all.length).toBe(0);
        expect(isIngredientsLoading).toBe(true);
      });

      test('rejected', () => {
        const { all, isIngredientsLoading } = burgerIngredientsSlice.reducer(
          initialState,
          {
            type: fetchBurgerIngredients.rejected.type
          }
        );

        expect(all.length).toBe(0);
        expect(isIngredientsLoading).toBe(false);
      });

      test('fulfilled', () => {
        const allIngredientsMock = [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          }
        ];
        const { all, isIngredientsLoading } = burgerIngredientsSlice.reducer(
          initialState,
          {
            type: fetchBurgerIngredients.fulfilled.type,
            payload: allIngredientsMock
          }
        );

        expect(all).toEqual(allIngredientsMock);
        expect(isIngredientsLoading).toBe(false);
      });
    });
  });
});
