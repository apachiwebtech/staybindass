import Header from './Header';
import Footer from './Footer';
import Error from './Error';
import Body from './Body';
import MyBooking from './MyBooking';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import Profile from './Profile';
import ListingPage from './ListingPage';
import useOnline from '../utils/OnlinePage';
import WishList from './WishList';
import HotelMenu from './HotelMenu';
import ManageProfile from './ManageProfile';
import ListProperty from './ListProperty';
import LoginPage from './LoginPage';

import ChangePass from './ChangePass';
import ContactUs from './ContactUs';
import Register from './Register';
import PaymentPage from './PaymentPage'
import NewListingPage from './NewListinPage';



const Routing = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/hotelmenu/:hotid/:price',
        element: <HotelMenu />,
      },
      {
        path: '/mybooking',
        element: <MyBooking />,
      },
      {
        path: '/myprofile',
        element: <Profile />,
      },
      {
        path: '/listing',
        element: <ListingPage />,
      },
      {
        path: '/listingNew/:location',
        element: <NewListingPage />,
      },
      {
        path: '/wishlist',
        element: <WishList />,
      },
      {
        path: '/manageprofile',
        element: <ManageProfile />,
      },
      {
        path: '/listproperty',
        element: <ListProperty />,
      },
      {
        path: '/loginpage',
        element: <LoginPage />,
      },
      {
        path: '/changepass',
        element: <ChangePass />,
      },
      {
        path: '/contactus',
        element: <ContactUs />,
      },
      {
        path: '/error',
        element: <Error />,
      },
      {
        path: '/reg',
        element: <Register />,
      },
      {
        path: '/paymentpage',
        element: <PaymentPage />,
      },
   
    ],
  },
]);

function App() {
  const isOnline = useOnline();

  if (isOnline !== true) {
    return (
      <>
        <Header />
        <div className='text-center mt80'>
          <h1>You are offline now</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (

 
        <Outlet />
     

  );
}

export default Routing;
