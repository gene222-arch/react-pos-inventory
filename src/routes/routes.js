import React, { lazy, useContext } from 'react'
import {PermissionContext} from '../hooks/useContext/PermissionContext'
import { Route, Switch, useHistory } from "react-router-dom";
import * as Cookie from '../utils/cookies'
const LoginForm = lazy(() => import('../views/auth/LoginForm'));
const ForgotPassword = lazy(() => import('../views/auth/forgot-password/ForgotPassword'));
const ResetPassword = lazy(() => import('../views/auth/forgot-password/ResetPassword'));
const RegisterForm = lazy(() => import('../views/auth/RegistrationForm'));
const Dashboard = lazy(() => import('../views/pages/Dashboard/Dashboard'))
const Pos = lazy(() => import('../views/pages/Pos/Pos'))
const Receipt = lazy(() => import('../views/pages/Receipts/Receipt'))
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
const AccessRights = lazy(() => import('../views/pages/Employees/AccessRights/AccessRights'));
const CreateAccessRight = lazy(() => import('../views/pages/Employees/AccessRights/CreateAccessRight'));
const EditAccessRight = lazy(() => import('../views/pages/Employees/AccessRights/EditAccessRight'));
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
const StockAdjustmentList = lazy(() => import('../views/pages/InventoryManagement/Stocks/StockAdjustmentList'))
const StockAdjustmentDetails = lazy(() => import('../views/pages/InventoryManagement/Stocks/StockAdjustmentDetails'))
const CreateStockAdjustment = lazy(() => import('../views/pages/InventoryManagement/Stocks/CreateStockAdjustment'))
const SalesReturnList = lazy(() => import('../views/pages/SalesReturns/SalesReturnList'))
const SalesReturnDetails = lazy(() => import('../views/pages/SalesReturns/SalesReturnDetails'))
const CreateSalesReturn = lazy(() => import('../views/pages/SalesReturns/CreateSalesReturn'))
const ReceivedStockTransactions = lazy(() => import('../views/pages/Transactions/ReceivedStockTransactions'));
const CustomerOrderTransactions = lazy(() => import('../views/pages/Transactions/CustomerOrderTransactions'));
const InvoiceTransactions = lazy(() => import('../views/pages/Transactions/InvoiceTransactions'));
const PurchaseOrderTransactions = lazy(() => import('../views/pages/Transactions/PurchaseOrderTransactions'));
const Settings = lazy(() => import('../views/pages/Settings'))
const NotFound = lazy(() => import('../views/errors/NotFound'));
const Unauthorized = lazy(() => import('../views/errors/UnAuthorized'))
const ProductsImport = lazy(() => import('../views/pages/Imports/Product/ProductsImport'))




export const RenderRoutes = ({routes}) => 
{
    const history = useHistory();
    const {userPermissions} = useContext(PermissionContext);

    return (
            <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index} 
                        path={route.path}
                        strict={route.strict}
                        exact={route.exact}
                        render={ props => { 
                            if (route.restricted)
                            {
                                if (!userPermissions.includes(route.access))
                                {
                                    return <Unauthorized />
                                }
                                else 
                                {
                                    if (Cookie.has('access_token'))
                                    {
                                        return <route.component {...props} route={route} />
                                    }
                                    else 
                                    {
                                    history.push('/auth/login')
                                    }
                                }
                            }
                            else 
                            {
                                if (Cookie.has('access_token'))
                                {
                                    history.push('/');
                                }
                                else 
                                {
                                    return <route.component {...props} route={route} />
                                }   
                            }
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
        
    )
}


export const globalPublicRoutes = {
    loginRoute: [
    {
        path: '/auth/login',
        name: 'LoginForm',
        icon: '',
        exact: true,
        component: LoginForm,
        access: '',
        restricted: false
    }],
    registerRoute: [
        {
            path: '/auth/register',
            name: 'RegisterForm',
            icon: '',
            exact: true,
            component: RegisterForm,
            access: '',
            restricted: false
        }],
    forgotPasswordRoute: [
        {
            path: '/forgot-password/email',
            name: 'ForgotPassword',
            icon: '',
            exact: true,
            component: ForgotPassword,
            access: '',
            restricted: false
        },
        {
            path: '/forgot-password/reset',
            name: 'ResetPassword',
            icon: '',
            exact: true,
            component: ResetPassword,
            access: '',
            restricted: false
        },
    ]

};

export const adminRoutes = {
    publicRoutes: [
        {},
    ],
    privateRoutes: [
        {
            path: '/',
            name: 'Dashboard',
            icon: '',
            exact: true,
            component: Dashboard,
            access: 'View Dashboard',
            restricted: true
        },
        {
            path: '/pos',
            name: 'Pos',
            icon: '',
            exact: true,
            component: Pos,
            access: 'Manage POS', 
            restricted: true
        },
        {
            path: '/receipts',
            name: 'Receipt',
            icon: '',
            exact: true,
            component: Receipt,
            access: 'View All Receipts', 
            restricted: true
        },
        {
            path: '/reports/sales-summary',
            name: 'SalesSummary',
            icon: '',
            exact: true,
            component: SalesSummary,
            access: 'View Reports',
            restricted: true 
        },
        {
            path: '/reports/sales-by-item',
            name: 'SalesByItem',
            icon: '',
            exact: true,
            component: SalesByItem,
            access: 'View Reports', 
            restricted: true
        },
        {
            path: '/reports/sales-by-category',
            name: 'SalesByCategory',
            icon: '',
            exact: true,
            component: SalesByCategory,
            access: 'View Reports',
            restricted: true 
        },
        {
            path: '/reports/sales-by-employee',
            name: 'SalesByEmployee',
            icon: '',
            exact: true,
            component: SalesByEmployee,
            access: 'View Reports',
            restricted: true 
        },
        {
            path: '/reports/sales-by-payment-type',
            name: 'SalesByPaymentType',
            icon: '',
            exact: true,
            component: SalesByPaymentType,
            access: 'View Reports',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/purchase-orders',
            name: 'PurchaseOrderList',
            icon: '',
            exact: true,
            component: PurchaseOrderList,
            access: 'Manage Purchase Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/create-order',
            name: 'PurchaseOrder',
            icon: '',
            exact: true,
            component: PurchaseOrder,
            access: 'Manage Purchase Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/purchase-order-details/:purchaseOrderId',
            name: 'PurchaseOrdersDetails',
            icon: '',
            exact: true,
            component: PurchaseOrderDetails,
            access: 'Manage Purchase Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/purchase-order/:purchaseOrderId/edit',
            name: 'PurchaseOrderEdit',
            icon: '',
            exact: true,
            component: PurchaseOrderEdit,
            access: 'Manage Purchase Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/receive-purchase-orders/:purchaseOrderId',
            name: 'PurchaseOrderReceive',
            icon: '',
            exact: true,
            component: PurchaseOrderReceive,
            access: 'Manage Purchase Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/bad-orders',
            name: 'BadOrderList',
            icon: '',
            exact: true,
            component: BadOrderList,
            access: 'Manage Bad Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/bad-order-details/:badOrderId',
            name: 'BadOrderDetails',
            icon: '',
            exact: true,
            component: BadOrderDetails,
            access: 'Manage Bad Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/create-bad-order',
            name: 'CreateBadOrders',
            icon: '',
            exact: true,
            component: CreateBadOrders,
            access: 'Manage Bad Orders',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/suppliers',
            name: 'Suppliers',
            icon: '',
            exact: true,
            component: Suppliers,
            access: 'Manage Suppliers',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/create-supplier',
            name: 'CreateSupplier',
            icon: '',
            exact: true,
            component: CreateSupplier,
            access: 'Manage Suppliers',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/suppliers/:supplierId/edit',
            name: 'EditSupplier',
            icon: '',
            exact: true,
            component: EditSupplier,
            access: 'Manage Suppliers',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/stock-adjustments',
            name: 'StockAdjustmentList',
            icon: '',
            exact: true,
            component: StockAdjustmentList,
            access: 'Manage Stock Adjustments',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/stock-adjustments/:stockAdjustmentId/:stockAdjustmentReason',
            name: 'StockAdjustmentDetails',
            icon: '',
            exact: true,
            component: StockAdjustmentDetails,
            access: 'Manage Stock Adjustments',
            restricted: true 
        },
        {
            path: '/inventory-mngmt/create-stock-adjustment',
            name: 'CreateStockAdjustment',
            icon: '',
            exact: true,
            component: CreateStockAdjustment,
            access: 'Manage Stock Adjustments',
            restricted: true 
        },
        {
            path: '/sales-returns',
            name: 'SalesReturnList',
            icon: '',
            exact: true,
            component: SalesReturnList,
            access: 'Manage Sales Returns',
            restricted: true 
        },
        {
            path: '/sales-return-details/:salesReturnId',
            name: 'SalesReturnDetails',
            icon: '',
            exact: true,
            component: SalesReturnDetails,
            access: 'Manage Sales Returns',
            restricted: true 
        },
        {
            path: '/create-sales-return',
            name: 'CreateSalesReturn',
            icon: '',
            exact: true,
            component: CreateSalesReturn,
            access: 'Manage Sales Returns',
            restricted: true 
        },
        {
            path: '/products',
            name: 'ProductList',
            icon: '',
            exact: true,
            component: ProductList,
            access: 'Manage Products',
            restricted: true 
        },
        {
            path: '/products/import',
            name: 'ProductsImport',
            icon: '',
            exact: true,
            component: ProductsImport,
            access: 'Import Products',
            restricted: true 
        },
        {
            path: '/create-product',
            name: 'CreateProduct',
            icon: '',
            exact: true,
            component: CreateProduct,
            access: 'Manage Products',
            restricted: true 
        },
        {
            path: '/products/:productId/edit',
            name: 'EditProduct',
            icon: '',
            exact: true,
            component: EditProduct,
            access: 'Manage Products',
            restricted: true 
        },
        {
            path: '/products/categories',
            name: 'Categories',
            icon: '',
            exact: true,
            component: Categories,
            access: 'Manage Categories',
            restricted: true 
        },
        {
            path: '/products/create-category',
            name: 'CreateCategory',
            icon: '',
            exact: true,
            component: CreateCategory,
            access: 'crManage Categories',
            restricted: true 
        },
        {
            path: '/products/categories/:categoryId/edit',
            name: 'EditCategory',
            icon: '',
            exact: true,
            component: EditCategory,
            access: 'crManage Categories',
            restricted: true 
        },
        {
            path: '/products/discounts',
            name: 'Discounts',
            icon: '',
            exact: true,
            component: Discounts,
            access: 'Manage Discounts',
            restricted: true 
        },
        {
            path: '/products/create-discount',
            name: 'CreateDiscount',
            icon: '',
            exact: true,
            component: CreateDiscount,
            access: 'Manage Discounts',
            restricted: true 
        },
        {
            path: '/products/discounts/:discountId/edit',
            name: 'EditDiscount',
            icon: '',
            exact: true,
            component: EditDiscount,
            access: 'Manage Discounts',
            restricted: true 
        },
        {
            path: '/customers',
            name: 'Customers',
            icon: '',
            exact: true,
            component: Customers,
            access: 'Manage Customers',
            restricted: true 
        },
        {
            path: '/create-customer',
            name: 'CreateCustomer',
            icon: '',
            exact: true,
            component: CreateCustomer,
            access: 'Manage Customers',
            restricted: true 
        },
        {
            path: '/customers/:customerId/edit',
            name: 'EditCustomer',
            icon: '',
            exact: true,
            component: EditCustomer,
            access: 'Manage Customers',
            restricted: true 
        },
        {
            path: '/employees',
            name: 'EmployeeList',
            icon: '',
            exact: true,
            component: EmployeeList,
            access: 'Manage Employees',
            restricted: true 
        },
        {
            path: '/create-employee',
            name: 'CreateEmployee',
            icon: '',
            exact: true,
            component: CreateEmployee,
            access: 'Manage Employees',
            restricted: true 
        },
        {
            path: '/employees/:employeeId/edit',
            name: 'EditEmployee',
            icon: '',
            exact: true,
            component: EditEmployee,
            access: 'Manage Employees',
            restricted: true 
        },
        {
            path: '/employees/access-rights',
            name: 'AccessRights',
            icon: '',
            exact: true,
            component: AccessRights,
            access: 'Manage Access Rights',
            restricted: true 
        },
        {
            path: '/employees/create-access-right',
            name: 'CreateAccessRight',
            icon: '',
            exact: true,
            component: CreateAccessRight,
            access: 'Manage Access Rights',
            restricted: true 
        },
        {
            path: '/employees/access-right/:accessRightId/edit',
            name: 'EditAccessRight',
            icon: '',
            exact: true,
            component: EditAccessRight,
            access: 'Manage Access Rights',
            restricted: true 
        },
        {
            path: '/transactions/customer-orders',
            name: 'CustomerOrderTransactions',
            icon: '',
            exact: true,
            component: CustomerOrderTransactions,
            access: 'View Transactions',
            restricted: true 
        },
        {
            path: '/transactions/invoices',
            name: 'InvoiceTransactions',
            icon: '',
            exact: true,
            component: InvoiceTransactions,
            access: 'View Transactions',
            restricted: true 
        },
        {
            path: '/transactions/purchase-orders',
            name: 'PurchaseOrderTransactions',
            icon: '',
            exact: true,
            component: PurchaseOrderTransactions,
            access: 'View Transactions',
            restricted: true 
        },
        {
            path: '/transactions/received-stocks',
            name: 'ReceivedStockTransactions',
            icon: '',
            exact: true,
            component: ReceivedStockTransactions,
            access: 'View Transactions',
            restricted: true 
        },
        {
            path: '/settings',
            name: 'Settings',
            icon: '',
            exact: true,
            component: Settings,
            access: 'Manage Settings',
            restricted: true 
        },
    ]
};

export const managerRoutes = {
    publicRoutes: [
        {},
    ],

    privateRoutes: [

    ]
};

export const cashierRoutes = {
    publicRoutes: [
        {},
    ],

    privateRoutes: [

    ]
};

