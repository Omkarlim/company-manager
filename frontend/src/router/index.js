import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var routes = [
  {
    path: '/companies',
    name: 'Company Dashboard',
    component: () => import('../views/CompanyDashboard.vue')
  },{
    path: '/employees',
    name: 'Employee Dashboard',
    component: () => import('../views/EmployeeDashboard.vue')
  }, {
    path: '/company/:id',
    name: 'companyDetails',
    component: () => import('../views/CompanyDetailsPage.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/CompanyDashboard.vue')
  },
  {
    path: '/*',
    redirect: '/companies'
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  sessionStorage.removeItem('actions');
  if (window.defaultView) {
    const defaultView = window.defaultView.slice(2);
    if (to.fullPath === '/') next({ path: defaultView, });
  }
  next();
});

export default router;
