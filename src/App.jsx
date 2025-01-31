import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Layout from './components/Layout';
import HolidayDetails from './pages/HolidayDetails'
import HolidayCollection from './pages/HolidayCollection';
import HolidayCreate from './pages/HolidayCreate';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: 'holidays/',
        element: <HolidayCollection />,
      },
      {
        path: 'holidays/create',
        element: <HolidayCreate />,
      },
      {
        path: 'holidays/:id',
        element: <HolidayDetails />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;