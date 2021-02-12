import React, { lazy } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { determineIsAuthenticated } from '../utils/helpers'
const LoginForm = lazy(() => import('../views/auth/LoginForm'));
const AdminRegistrationForm = lazy(() => import('../views/auth/admin/RegistrationForm'));
const ManagerRegistrationForm = lazy(() => import('../views/auth/manager/RegistrationForm'));
const CashierRegistrationForm = lazy(() => import('../views/auth/cashier/RegistrationForm'));
const Dashboard = lazy(() => import('../views/pages/Dashboard/Dashboard'))
const Pos = lazy(() => import('../views/pages/Pos/Pos'))
const SalesSummary = lazy(() => import('../views/pages/Reports/SalesSummary'))
const SalesByItem = lazy(() => import('../views/pages/Reports/SalesByItem'))
const SalesByCategory = lazy(() => import('../views/pages/Reports/SalesByCategory'))
const SalesByEmployee = lazy(() => import('../views/pages/Reports/SalesByEmployee'))
const SalesByPaymentType = lazy(() => import('../views/pages/Reports/SalesByPaymentType'))
const ProductList = lazy(() => import('../views/pages/Products/Products/ProductList'));
const CreateProduct = lazy(() => import('../views/pages/Products/Products/CreateProduct'));
const EditProduct = lazy(() => import('../views/pages/Products/Products/EditProduct'));
const Categories = lazy(() => import('../views/pages/Products/Categories/Categories'));
const CreateCategory = lazy(() => import('../views/pages/Products/Categories/CreateCategory'));
const EditCategory = lazy(() => import('../views/pages/Products/Categories/EditCategory'));
const Discounts = lazy(() => import('../views/pages/Products/Discounts/Discounts'));
const CreateDiscount = lazy(() => import('../views/pages/Products/Discounts/CreateDiscount'));
const EditDiscount = lazy(() => import('../views/pages/Products/Discounts/EditDiscount'));
const Customers = lazy(() => import('../views/pages/Customers/Customer'));
const CreateCustomer = lazy(() => import('../views/pages/Customers/CreateCustomer'));
const EditCustomer = lazy(() => import('../views/pages/Customers/EditCustomer'));
const AccessRights = lazy(() => import('../views/pages/Employees/AccessRights'));
const EmployeeList = lazy(() => import('../views/pages/Employees/Employees/EmployeeList'));
const CreateEmployee = lazy(() => import('../views/pages/Employees/Employees/CreateEmployee'));
const EditEmployee = lazy(() => import('../views/pages/Employees/Employees/EditEmployee'));
const PurchaseOrderList = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/PurchaseOrderList'));
const PurchaseOrder = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/PurchaseOrder'));
const PurchaseOrderEdit = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/PurchaseOrderEdit'));
const PurchaseOrderReceive = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/PurchaseOrderReceive'));
const PurchaseOrderDetails = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/PurchaseOrderDetails'));
const CreateBadOrders = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/BadOrders/CreateBadOrders'));
const BadOrderList = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/BadOrders/BadOrderList'));
const BadOrderDetails = lazy(() => import('../views/pages/InventoryManagement/PurchaseOrder/BadOrders/BadOrderDetails'));
const Suppliers = lazy(() => import('../views/pages/InventoryManagement/Suppliers/Suppliers'));
const CreateSupplier = lazy(() => import('../views/pages/InventoryManagement/Suppliers/CreateSupplier'));
const EditSupplier = lazy(() => import('../views/pages/InventoryManagement/Suppliers/EditSupplier'));
const ReceivedStocks = lazy(() => import('../views/pages/Transactions/ReceivedStocks'));
const Settings = lazy(() => import('../views/pages/Settings'))
const NotFound = lazy(() => import('../views/errors/NotFound'));



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
            name: 'PurchaseOrderList',
            icon: '',
            exact: true,
            component: PurchaseOrderList,
            access: 'view_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/create-order',
            name: 'PurchaseOrder',
            icon: '',
            exact: true,
            component: PurchaseOrder,
            access: 'create_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/purchase-order-details/:purchaseOrderId',
            name: 'PurchaseOrdersDetails',
            icon: '',
            exact: true,
            component: PurchaseOrderDetails,
            access: 'view_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/purchase-order/:purchaseOrderId/edit',
            name: 'PurchaseOrderEdit',
            icon: '',
            exact: true,
            component: PurchaseOrderEdit,
            access: 'update_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/receive-purchase-orders',
            name: 'PurchaseOrderReceive',
            icon: '',
            exact: true,
            component: PurchaseOrderReceive,
            access: 'receive_purchase_orders', 
        },
        {
            path: '/inventory-mngmt/bad-orders',
            name: 'BadOrderList',
            icon: '',
            exact: true,
            component: BadOrderList,
            access: 'view_bad_orders', 
        },
        {
            path: '/inventory-mngmt/bad-order-details/:badOrderId',
            name: 'BadOrderDetails',
            icon: '',
            exact: true,
            component: BadOrderDetails,
            access: 'view_bad_orders', 
        },
        {
            path: '/inventory-mngmt/create-bad-order',
            name: 'CreateBadOrders',
            icon: '',
            exact: true,
            component: CreateBadOrders,
            access: 'create_bad_orders', 
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
            path: '/inventory-mngmt/create-supplier',
            name: 'CreateSupplier',
            icon: '',
            exact: true,
            component: CreateSupplier,
            access: 'create_suppliers',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/suppliers/:supplierId/edit',
            name: 'EditSupplier',
            icon: '',
            exact: true,
            component: EditSupplier,
            access: 'update_suppliers',
            restricted: true 
        },
        {
            path: '/products',
            name: 'ProductList',
            icon: '',
            exact: true,
            component: ProductList,
            access: 'view_products',
            restricted: true 
        },
        {
            path: '/products',
            name: 'ProductList',
            icon: '',
            exact: true,
            component: ProductList,
            access: 'view_products',
            restricted: true 
        },
        {
            path: '/create-product',
            name: 'CreateProduct',
            icon: '',
            exact: true,
            component: CreateProduct,
            access: 'create_products',
            restricted: true 
        },
        {
            path: '/products/:productId/edit',
            name: 'EditProduct',
            icon: '',
            exact: true,
            component: EditProduct,
            access: 'update_products',
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
            path: '/products/create-category',
            name: 'CreateCategory',
            icon: '',
            exact: true,
            component: CreateCategory,
            access: 'create_categories',
            restricted: true 
        },
        {
            path: '/products/categories/:categoryId/edit',
            name: 'EditCategory',
            icon: '',
            exact: true,
            component: EditCategory,
            access: 'create_categories',
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
            path: '/products/create-discount',
            name: 'CreateDiscount',
            icon: '',
            exact: true,
            component: CreateDiscount,
            access: 'create_discounts',
            restricted: true 
        },
        {
            path: '/products/discounts/:discountId/edit',
            name: 'EditDiscount',
            icon: '',
            exact: true,
            component: EditDiscount,
            access: 'update_discounts',
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
            path: '/create-customer',
            name: 'CreateCustomer',
            icon: '',
            exact: true,
            component: CreateCustomer,
            access: 'create_customers',
            restricted: true 
        },
        {
            path: '/customers/:customerId/edit',
            name: 'EditCustomer',
            icon: '',
            exact: true,
            component: EditCustomer,
            access: 'update_customers',
            restricted: true 
        },
        {
            path: '/employees',
            name: 'EmployeeList',
            icon: '',
            exact: true,
            component: EmployeeList,
            access: 'view_employees',
            restricted: true 
        },
        {
            path: '/create-employee',
            name: 'CreateEmployee',
            icon: '',
            exact: true,
            component: CreateEmployee,
            access: 'create_employees',
            restricted: true 
        },
        {
            path: '/employees/:employeeId/edit',
            name: 'EditEmployee',
            icon: '',
            exact: true,
            component: EditEmployee,
            access: 'update_employees',
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

