import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Home from './views/Home';
import Login from './views/Login';
import Reservation from './views/Reservation';
import UserProfile from './views/UserProfile';
import PaymentGateway from './views/PaymentGateway';
import ErrorPage from './views/error-page'; // Ruta 404
import ReservasList from './views/ReservasList';
import Footer from './components/Footer';
import ResetPassword from './views/ResetPassword';
import './login.css';
import ReservasEmpleado from './views/ReservasEmpleado';

// Definición de las rutas utilizando createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reservas-empleado",
    element: <ReservasEmpleado />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
  path: "/reservas-list",
    element: <ReservasList />,
  },
  {
    path: "/reset-password/:uid/:token",
    element: <ResetPassword />,
  },

  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/payment-receipt",
    element: <PaymentGateway />,
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
  },
  {
    path: "/payment-gateway",
    element: <PaymentGateway />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

const App = () => (
  <>
    <Header />
    <main className="main-container">
      <RouterProvider router={router} />
    </main>
    <Footer />
  </>
);

export default App;


/* 
 */