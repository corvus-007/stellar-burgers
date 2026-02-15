import {
  addIngredient,
  burgerConstructorSlice,
  setBun,
  TBurgerConstructorState
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

describe('Проверяют редьюсер слайса burgerConstructor', () => {
  test('добаление булочки', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };
    const expectedBun: TIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      setBun(expectedBun)
    );

    const {
      constructorItems: { bun }
    } = newState;

    expect(bun).toEqual(expectedBun);
  });

  test('добавление ингредиента', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };
    const ingredient: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );

    const {
      constructorItems: {
        ingredients: [expectedIngredient]
      }
    } = newState;

    expect(expectedIngredient).toHaveProperty('id');
    const { id, ...rest } = expectedIngredient;
    expect(rest).toEqual(ingredient);
  });
});
