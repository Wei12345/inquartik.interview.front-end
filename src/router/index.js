import { createRouter, createWebHashHistory } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout';

import HomePage from '@/pages/Home/Index';
import AddPage from '@/pages/Add/Index';

const routes = [
   {
      path: '/',
      component: DefaultLayout,
      children: [
         { path: '', component: HomePage },
         { path: 'add', component: AddPage }

      ]
   }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router;
