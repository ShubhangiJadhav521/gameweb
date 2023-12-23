import { useRoutes } from 'react-router-dom';

// project import

import {MainRoutes, Main,Login} from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {

  return useRoutes([MainRoutes,Main,Login]);
}
