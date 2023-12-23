// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const rearrange = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'rearrange',
      title: 'Rearrange',
      type: 'item',
      url: '/mainlayout/Rearrange',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
  
};

export default rearrange;
