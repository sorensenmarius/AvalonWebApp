import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
  {
    path: '/',
    exact: true,
    name: 'join-game',
    title: 'Join Game',
    icon: 'play-circle',
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/GameStart'))
  },
];

export const appRouters: any = [
  {
    path: '/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
  },
];

export const routers = [...userRouter, ...appRouters];
