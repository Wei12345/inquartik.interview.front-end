import { createRouter, createWebHashHistory } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout';

import HomePage from '@/pages/Home/Index';

const routes = [
   {
      path: '/',
      component: DefaultLayout,
      children: [
         { path: '', component: HomePage }
      ]
   }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router;
