import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { determineIsAuthenticated } from '../utils/helpers'
const LoginForm = React.lazy(() => import('../views/auth/LoginForm'));
const AdminRegistrationForm = React.lazy(() => import('../views/auth/admin/RegistrationForm'));
const ManagerRegistrationForm = React.lazy(() => import('../views/auth/manager/RegistrationForm'));
const CashierRegistrationForm = React.lazy(() => import('../views/auth/cashier/RegistrationForm'));
const Dashboard = React.lazy(() => import('../views/pages/Dashboard/Dashboard'))
const Pos = React.lazy(() => import('../views/pages/Pos/Pos'))
const SalesSummary = React.lazy(() => import('../views/pages/Reports/SalesSummary'))
const SalesByItem = React.lazy(() => import('../views/pages/Reports/SalesByItem'))
const SalesByCategory = React.lazy(() => import('../views/pages/Reports/SalesByCategory'))
const SalesByEmployee = React.lazy(() => import('../views/pages/Reports/SalesByEmployee'))
const SalesByPaymentType = React.lazy(() => import('../views/pages/Reports/SalesByPaymentType'))
const ProductList = React.lazy(() => import('../views/pages/Products/ProductList'));
const Categories = React.lazy(() => import('../views/pages/Products/Categories'));
const Discounts = React.lazy(() => import('../views/pages/Products/Discounts'));
const Customers = React.lazy(() => import('../views/pages/Customers/Customer'));
const AccessRights = React.lazy(() => import('../views/pages/Employees/AccessRights'));
const EmployeeList = React.lazy(() => import('../views/pages/Employees/EmployeeList'));
const PurchaseOrders = React.lazy(() => import('../views/pages/InventoryManagement/PurchaseOrders'));
const PurchaseOrderDetails = React.lazy(() => import('../views/pages/InventoryManagement/PurchaseOrderDetails'));
const Suppliers = React.lazy(() => import('../views/pages/InventoryManagement/Suppliers'));
const ReceivedStocks = React.lazy(() => import('../views/pages/Transactions/ReceivedStocks'));
const Settings = React.lazy(() => import('../views/pages/Settings'))
const NotFound = React.lazy(() => import('../views/errors/NotFound'));



export const RenderRoutes = ({routes}) => {
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index} 
                        path={route.path}
                        strict={route.strict}
                        exact={route.exact}
                        render={ props => { return <route.component {...props} route={route} />
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}


export const globalRoutes = [
    {
        path: '/auth/login',
        name: 'LoginForm',
        icon: '',
        exact: true,
        component: LoginForm,
        access: '',
        restricted: false
    },
];

export const adminRoutes = {
    publicRoutes: [
        {
            path: '/admin/auth/register',
            name: 'AdminRegistrationForm',
            icon: '',
            exact: true,
            component: AdminRegistrationForm,
            access: '',
            restricted: false 
        },
    ],
    privateRoutes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: '',
            exact: true,
            component: Dashboard,
            access: 'view_dashboard',
            restricted: true
        },
        {
            path: '/pos',
            name: 'Pos',
            icon: '',
            exact: true,
            component: Pos,
            access: 'view_pos', 
        },
        {
            path: '/reports/sales-summary',
            name: 'SalesSummary',
            icon: '',
            exact: true,
            component: SalesSummary,
            access: 'view_sales_summary_reports', 
        },
        {
            path: '/reports/sales-by-item',
            name: 'SalesByItem',
            icon: '',
            exact: true,
            component: SalesByItem,
            access: 'view_sales_by_item_reports', 
        },
        {
            path: '/reports/sales-by-category',
            name: 'SalesByCategory',
            icon: '',
            exact: true,
            component: SalesByCategory,
            access: 'view_sales_by_category_reports', 
        },
        {
            path: '/reports/sales-by-employee',
            name: 'SalesByEmployee',
            icon: '',
            exact: true,
            component: SalesByEmployee,
            access: 'view_sales_by_employee_reports', 
        },
        {
            path: '/reports/sales-by-payment-type',
            name: 'SalesByPaymentType',
            icon: '',
            exact: true,
            component: SalesByPaymentType,
            access: 'view_sales_by_payment_type_reports', 
        },
        {
            path: '/inventory-mngmt/purchase-orders',
            name: 'PurchaseOrders',
            icon: '',
            exact: true,
            component: PurchaseOrders,
            access: 'view_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/purchase-order-details',
            name: 'PurchaseOrdersDetails',
            icon: '',
            exact: true,
            component: PurchaseOrderDetails,
            access: 'view_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/suppliers',
            name: 'Suppliers',
            icon: '',
            exact: true,
            component: Suppliers,
            access: 'view_suppliers',
            restricted: true 
        },
        {
            path: '/products/list',
            name: 'ProductList',
            icon: '',
            exact: true,
            component: ProductList,
            access: 'view_products',
            restricted: true 
        },
        {
            path: '/products/categories',
            name: 'Categories',
            icon: '',
            exact: true,
            component: Categories,
            access: 'view_categories',
            restricted: true 
        },
        {
            path: '/products/discounts',
            name: 'Discounts',
            icon: '',
            exact: true,
            component: Discounts,
            access: 'view_discounts',
            restricted: true 
        },
        {
            path: '/customers',
            name: 'Customers',
            icon: '',
            exact: true,
            component: Customers,
            access: 'view_customers',
            restricted: true 
        },
        {
            path: '/employees/list',
            name: 'EmployeeList',
            icon: '',
            exact: true,
            component: EmployeeList,
            access: 'view_employees',
            restricted: true 
        },
        {
            path: '/employees/access-rights',
            name: 'AccessRights',
            icon: '',
            exact: true,
            component: AccessRights,
            access: 'view_employees_access_rights',
            restricted: true 
        },
        {
            path: '/transactions/received-stocks',
            name: 'ReceivedStocks',
            icon: '',
            exact: true,
            component: ReceivedStocks,
            access: 'view_received_stocks',
            restricted: true 
        },
        {
            path: '/settings',
            name: 'Settings',
            icon: '',
            exact: true,
            component: Settings,
            access: 'manage_settings',
            restricted: true 
        },
    ]
};


export const managerRoutes = {
    publicRoutes: [
        {
            path: '/manager/auth/register',
            name: 'ManagerRegistrationForm',
            icon: '',
            exact: true,
            component: ManagerRegistrationForm,
            access: '',
            restricted: false
        },
    ],

    privateRoutes: [

    ]
};


export const cashierRoutes = {
    publicRoutes: [
        {
            path: '/auth/register',
            name: 'CashierRegistrationForm',
            icon: '',
            exact: true,
            component: CashierRegistrationForm,
            access: '',
            restricted: false 
        },
    ],

    privateRoutes: [

    ]
};

