import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Shop from './pages/Search';
import Tours from './pages/Tours/Tours';
import Tour from './pages/tour/Tour';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { SET_TOKEN, SET_USER } from './redux/features/auth/authSlice';
import useAppDispatch from './hooks/useAppDispatch';
import { SET_BASKET, selectTourState } from './redux/features/tour/tourSlice';
import Basket from './pages/basket/Basket';
import useAppSelector from './hooks/useAppSelector';
import Payment from './pages/Payment';
import Orders from './pages/auth/Orders';
import Order from './pages/auth/Order';
import Profile from './pages/auth/Profile';
import Login from './pages/auth/login/Login';
import AdminPanel from './pages/admin/Admin-panel';
import CreateTour from './pages/admin/tour/create/Create-tour';
import UpdateTour from './pages/admin/tour/update/Update-tour';
import CreateCategory from './pages/admin/category/create/CreateCategory';
import UpdateCategory from './pages/admin/category/update/UpdateCategory';
import Register from './pages/auth/register/Register';
import LoadingCircle from './components/LoadingSpinner';
import { selectIsLoading } from './redux/features/loadingSlice';
import { IBasket } from './redux/features/tour/tourSlice.interface';


const App: React.FC = () =>  {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector(selectTourState);
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    const storedBasket = localStorage.getItem('basket');

    if (storedUserInfo) {
      dispatch(SET_USER(JSON.parse(storedUserInfo)));
    };

    if(storedToken) {
      dispatch(SET_TOKEN(storedToken));
    };

    if(storedBasket && basket.length === 0) {
      const parsedBasket: IBasket = JSON.parse(storedBasket);

      dispatch(SET_BASKET(parsedBasket));
    }
  }, []);
  
  return (
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <LoadingCircle isLoading={isLoading}/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='search' element={<Shop/>} />
          <Route path="tours" element={<Tours />} />
          <Route path="tour/:slug" element={<Tour />} />
          <Route path="backpack" element={<Basket />} />
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path='register' element={<Register/>}/>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/orders" element={<Orders />} />
          <Route path="profile/orders/:orderId" element={<Order />}/>

          <Route path='admin/panel' element={<AdminPanel/>}/>
          <Route path='admin/create-tour' element={<CreateTour/>}/>
          <Route path='admin/update-tour/:slug' element={<UpdateTour/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/update-category/:slug' element={<UpdateCategory/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
