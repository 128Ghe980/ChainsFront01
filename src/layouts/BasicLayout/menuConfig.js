const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: '主面板',
    path: '/',
    icon: 'smile',
  },
  {
    name: '面板1',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name:"guide01",
        path: "/01/guide01",
      },
    ],
  },
  {
    name:'面板2',
    path:'/02',
    icon: 'chart-pie',
    children: [
      {
        name:"guide01",
        path: "/02/Panel",
      },
    ],
  },
  {
    name:'矿机数据面板',
    path:'/',
    icon: 'chart-pie',
    children: [
      {
        name:"矿机过滤",
        path: "/dataTable/Singlecol",
      },
    ],
  }
];
export { headerMenuConfig, asideMenuConfig };
