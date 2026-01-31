import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { Preloader } from '@ui';
import { getIsIngredientsLoading } from '../../services/slices/burger-ingredients/burgerIngredientsSlice';
import { fetchBurgerIngredients } from '../../services/slices/burger-ingredients/burgerIngredientsThunks';

const App = () => {
  const isIngredientsLoading = useSelector(getIsIngredientsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const matchedFeed = useMatch('/feed/:number');
  const feedNumber = matchedFeed?.params?.number ?? '';
  const matchedProfileOrder = useMatch('/profile/orders/:number');
  const profileOrderNumber = matchedProfileOrder?.params?.number ?? '';

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal
                    title={`#${feedNumber}`}
                    onClose={() => navigate(-1)}
                    children={<OrderInfo />}
                  />
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal
                    title='Детали ингредиента'
                    onClose={() => navigate(-1)}
                    children={<IngredientDetails />}
                  />
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal
                    title={`#${profileOrderNumber}`}
                    onClose={() => navigate(-1)}
                    children={<OrderInfo />}
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
