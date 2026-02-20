import {
  setIsAuthChecked,
  setIsAuthenticated,
  setUser,
  TAuthSliceState,
  userSlice
} from './userSlice';
import { loginUser, logoutUser, registerUser, updateUser } from './userThunks';

const initialState: TAuthSliceState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: undefined
};

describe('Тестирование userSlice', () => {
  describe('Редьюсеры', () => {
    test('[setUser]', () => {
      const expectedUser = {
        name: 'User Name',
        email: 'user@email.com'
      };
      const { user } = userSlice.reducer(initialState, setUser(expectedUser));

      expect(user).toEqual(expectedUser);
    });

    test('[setIsAuthChecked]', () => {
      const { isAuthChecked } = userSlice.reducer(
        initialState,
        setIsAuthChecked(true)
      );

      expect(isAuthChecked).toBe(true);
    });

    test('[setIsAuthenticated]', () => {
      const { isAuthenticated } = userSlice.reducer(
        initialState,
        setIsAuthenticated(true)
      );

      expect(isAuthenticated).toBe(true);
    });
  });

  describe('Асинхронные редьюсеры', () => {
    describe('[registerUser] регистрация пользователя', () => {
      test('pending', () => {
        const { error } = userSlice.reducer(initialState, {
          type: registerUser.pending.type
        });

        expect(error).toBeUndefined();
      });

      test('rejected', () => {
        const errorMessage = 'error';
        const { isAuthChecked, error } = userSlice.reducer(initialState, {
          type: registerUser.rejected.type,
          error: { message: errorMessage }
        });

        expect(isAuthChecked).toBe(true);
        expect(error).toBe(errorMessage);
      });

      test('fulfilled', () => {
        const expectedUser = {
          name: 'User Name',
          email: 'user@email.com'
        };
        const { user, isAuthChecked, error } = userSlice.reducer(initialState, {
          type: registerUser.fulfilled.type,
          payload: { user: expectedUser }
        });

        expect(error).toBeUndefined();
        expect(user).toEqual(expectedUser);
        expect(isAuthChecked).toBe(true);
      });
    });

    describe('[loginUser] вход пользователя', () => {
      test('pending', () => {
        const { error } = userSlice.reducer(initialState, {
          type: registerUser.pending.type
        });

        expect(error).toBeUndefined();
      });

      test('rejected', () => {
        const errorMessage = 'error';
        const { error, isAuthChecked } = userSlice.reducer(initialState, {
          type: loginUser.rejected.type,
          error: { message: errorMessage }
        });

        expect(error).toBe(errorMessage);
        expect(isAuthChecked).toBe(true);
      });

      test('fulfilled', () => {
        const expectedUser = {
          name: 'User Name',
          email: 'user@email.com'
        };
        const { user, isAuthChecked, isAuthenticated, error } =
          userSlice.reducer(initialState, {
            type: loginUser.fulfilled.type,
            payload: { user: expectedUser }
          });

        expect(error).toBeUndefined();
        expect(user).toEqual(expectedUser);
        expect(isAuthChecked).toBe(true);
        expect(isAuthenticated).toBe(true);
      });
    });

    describe('[logoutUser] логаут пользователя', () => {
      test('fulfilled', () => {
        const { user, isAuthenticated } = userSlice.reducer(
          {
            ...initialState,
            user: {
              name: 'User Name',
              email: 'user@email.com'
            },
            isAuthenticated: true
          },
          {
            type: logoutUser.fulfilled.type
          }
        );

        expect(user).toBeNull();
        expect(isAuthenticated).toBe(false);
      });
    });

    describe('[updateUser]', () => {
      test('pending', () => {
        const { error } = userSlice.reducer(initialState, {
          type: updateUser.pending.type
        });

        expect(error).toBeUndefined();
      });

      test('rejected', () => {
        const errorMessage = 'error';
        const { error } = userSlice.reducer(initialState, {
          type: updateUser.rejected.type,
          error: { message: errorMessage }
        });

        expect(error).toBe(errorMessage);
      });

      test('fulfilled', () => {
        const oldUser = {
          name: 'User Name',
          email: 'user@email.com'
        };
        const updatedUserName = 'New User Name';
        const { user } = userSlice.reducer(
          { ...initialState, user: oldUser },
          {
            type: updateUser.fulfilled.type,
            payload: { user: { name: updatedUserName } }
          }
        );

        expect(user?.name).toBe(updatedUserName);
      });
    });
  });
});
