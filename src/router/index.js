import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginForm.vue'
import { auth } from '../firebase'
import Home from '../views/HomeView.vue'
import ManageOrderView from '../views/ManageOrderView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import LoginChatView from '../views/LoginChatView'
import Products from '../views/ProductsView.vue'
import ProductDetail from '../views/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'TrangChu',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'add',
    component: ManageOrderView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/:id', // Đường dẫn tới trang chi tiết đơn hàng với một tham số id
    name: 'OrderDetail',
    component: OrderDetailView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/productdetail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/chatview',
    name: 'chatview',
    component: LoginChatView,
   
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }
  next();
})

export default router
