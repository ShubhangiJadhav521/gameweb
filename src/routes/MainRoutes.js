import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { Route, Routes } from 'react-router-dom';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const RearrangePage = Loadable(lazy(() => import('pages/Rearrange')));
const Home = Loadable(lazy(() => import('pages/Home')));
const Loginpage = Loadable(lazy(() => import('pages/AdminLogin')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
 
  path: '/mainlayout',
  element: <MainLayout />,
  children: [
   
      {
        path: 'dashboard',
        element: <DashboardDefault />
      },
      {
        path: 'Rearrange',
        element: <RearrangePage />
      } 

  ]
};

const Main = {
 
  path: '/',
  element: <Home/>,
 
  
};
const Login = {
 
  path: '/login',
  element: <Loginpage/>,
 
  
};

export  {MainRoutes, Main,Login};
