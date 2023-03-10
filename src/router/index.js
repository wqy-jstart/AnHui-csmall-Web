import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/ManageView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomeView,
        redirect: '/sys-admin',
        children: [ //嵌套路由,在HomeView里的router里
            {
                path: '/sys-admin',
                component: () => import( '../views/sys-admin/SystemAdminIndex.vue')
            },
            {
                path: '/sys-admin/main/address/list',
                component: () => import( '../views/sys-admin/main/AddressListView')
            },
            {
                path: '/sys-admin/main/admin/add-new',
                component: () => import( '../views/sys-admin/main/AdminAddNewView.vue')
            },
            {
                path: '/sys-admin/main/admin/list',
                component: () => import( '../views/sys-admin/main/AdminListView.vue')
            },
            {
                path: '/sys-admin/main/album/add-new',
                component: () => import( '../views/sys-admin/main/AlbumAddNewView.vue')
            },
            {
                path: '/sys-admin/main/album/list',
                component: () => import( '../views/sys-admin/main/AlbumListView.vue')
            },
            {
                path: '/sys-admin/main/picture/add-new',
                component: () => import( '../views/sys-admin/main/PictureAddNewView.vue')
            },
            {
                path: '/sys-admin/main/picture/list',
                component: () => import( '../views/sys-admin/main/PictureListView.vue')
            },
            {
                path: '/sys-admin/main/attribute/add-new',
                component: () => import( '../views/sys-admin/main/AttributeAddNewView.vue')
            },
            {
                path: '/sys-admin/main/attribute/list',
                component: () => import( '../views/sys-admin/main/AttributeListView.vue')
            },
            {
                path: '/sys-admin/main/attributeTemplate/add-new',
                component: () => import( '../views/sys-admin/main/AttributeTemplateAddNewView.vue')
            },
            {
                path: '/sys-admin/main/attributeTemplate/list',
                component: () => import( '../views/sys-admin/main/AttributeTemplateListView.vue')
            },
            {
                path: '/sys-admin/main/brand/add-new',
                component: () => import( '../views/sys-admin/main/BrandAddNewView.vue')
            },
            {
                path: '/sys-admin/main/brand/list',
                component: () => import( '../views/sys-admin/main/BrandListView.vue')
            },
            {
                path: '/sys-admin/main/category/add-new',
                component: () => import( '../views/sys-admin/main/CategoryAddNewView.vue')
            },
            {
                path: '/sys-admin/main/category/list',
                component: () => import( '../views/sys-admin/main/CategoryListView.vue')
            },
            {
                path: '/sys-admin/main/user/list',
                component: () => import( '../views/sys-admin/main/UserListView')
            },
            {
                path: '/sys-admin/main/banner/list',
                component: () => import( '../views/sys-admin/main/BannerListView.vue')
            },
            {
                path: '/sys-admin/main/banner/add-new',
                component: () => import( '../views/sys-admin/main/BannerAddNewView.vue')
            },
            {
                path: '/sys-admin/main/spu/listToCheck',
                component: () => import( '../views/sys-admin/main/SpuListToCheckView.vue')
            },
            {
                path: '/sys-admin/main/spu/listToPublish',
                component: () => import( '../views/sys-admin/main/SpuListToCheckPublishView.vue')
            },
            // --------------------------------------------------------------------
            {
                path: '/sys-admin/product/spu-add-new',
                component: () => import( '../views/sys-admin/product/SpuAddNewStep1View.vue')
            },
            {
                path: '/sys-admin/product/spu-add-new2',
                component: () => import('../views/sys-admin/product/SpuAddNewStep2View.vue')
            },
            {
                path: '/sys-admin/product/spu-add-new3',
                component: () => import('../views/sys-admin/product/SpuAddNewStep3View.vue')
            },
            {
                path: '/sys-admin/product/spu-add-new4',
                component: () => import('../views/sys-admin/product/SpuAddNewStep4View.vue')
            },
            {
                path: '/sys-admin/product/spuFinish',
                component: () => import('../views/sys-admin/product/SpuFinishWaitView.vue')
            },
            {
                path: '/sys-admin/order/distribute',
                component: () => import('../views/sys-admin/main/OrderListToDistribute.vue')
            },
            {
                path: '/sys-admin/order/notDistribute',
                component: () => import('../views/sys-admin/main/OrderListToNotDistribute.vue')
            },
            {
                path: '/sys-admin/order/back',
                component: () => import('../views/sys-admin/main/OrderListToBack.vue')
            },
        ]
    },
    {
        path: '/login',
        component: () => import( '../views/LoginView.vue')
    },
    {
        path: '/adminLogin',
        component: () => import( '../views/AdminLoginView')
    },
    {
        path: '/register',
        component: () => import( '../views/RegisterView.vue')
    },
    {
        path: '/index',
        component: () => import( '../views/IndexView.vue')
    },
    {
        path: '/index/result',
        component: () => import( '../views/sys-admin/main/SearchResultView.vue')
    },
    {
        path: '/product/detail',
        component: () => import( '../views/sys-admin/product/ProductDetailView.vue')
    },
    {
        path: '/product/order',
        component: () => import( '../views/sys-admin/product/ProductOrderView.vue')
    },
    {
        path: '/product/paySuccess',
        component: () => import( '../views/sys-admin/product/PaySuccessView.vue')
    },
    {
        path: '/user/detail',
        component: () => import( '../views/sys-admin/user/UserDetailView.vue')
    },
    {
        path: '/user/index',
        component: () => import( '../views/sys-admin/user/UserIndexView.vue')
    },
    {
        path: '/user/address',
        component: () => import( '../views/sys-admin/user/UserAddressView.vue')
    },
    {
        path: '/user/shoppingCart',
        component: () => import( '../views/sys-admin/user/ShoppingCartView.vue')
    },
    {
        path: '/user/waitToDistribute',
        component: () => import( '../views/sys-admin/user/WaitToDistribute.vue')
    },
    {
        path: '/user/waitToPay',
        component: () => import( '../views/sys-admin/user/WaitToPay.vue')
    },
    {
        path: '/user/waitToTake',
        component: () => import( '../views/sys-admin/user/WaitToTake.vue')
    },
    {
        path: '/user/waitToBack',
        component: () => import( '../views/sys-admin/user/WaitToBack.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
