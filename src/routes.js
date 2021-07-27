import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import newdash from './pages/01';
import Panel from './pages/Panel';
import FusionSinglecolTable from './pages/SingleColFilter';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/01/guide01',
        component: newdash,
      },
      {
        path: '/02/Panel',
        component: Panel,

      },
      {
        path: '/02',
        component: newdash,

      },
      {
        path: '/dataTable/Singlecol',
        component: FusionSinglecolTable,
      },
      {
        path: '/',
        component: Dashboard,
      },

      {
        path: '/',
        redirect: '/',
      },
    ],
  },
];
export default routerConfig;
