import Login from './login/Login';
import Admin from './admin/admin';
import Client from './client/Client';

const routes = [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/admin/*',
    exact: false,
    component: Admin
  },
  {
    path: '/client',
    exact: false,
    component: Client
  }
];

export default routes;
