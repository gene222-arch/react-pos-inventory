import React, { useState, useEffect, useContext } from 'react';
import { fetchAuthUser } from './../../services/auth/auth';
import { fetchAllAsync } from './../../services/roles-permissions/permissions';
import {logoutAsync} from '../../services/auth/login/login'
import { NavLink, useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dashboard from '@material-ui/icons/Home';
import Pos from '@material-ui/icons/Dvr';
import InventoryManagement from '@material-ui/icons/ListAlt';
import Product from '@material-ui/icons/ShoppingBasket';
import Employee from '@material-ui/icons/AccountBox';
import Customer from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import Report from '@material-ui/icons/Assessment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TransactionsIcon from '@material-ui/icons/ThumbsUpDown';
import SalesReturnsIcon from '@material-ui/icons/RemoveShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import UserIcon from '@material-ui/icons/AccountBox';
import { AdminLayoutUseStyles } from '../../assets/material-styles/styles'
import * as Cookie from '../../utils/cookies'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PermissionContext } from './../../hooks/useContext/PermissionContext';
import Grid from '@material-ui/core/Grid'




const MainLayout = ({children}) => 
{
    const classes = AdminLayoutUseStyles();
    const theme = useTheme();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openAccountMenu = Boolean(anchorEl);
    const [openReport, setOpenReport] = useState(false);
    const [openInventoryMngmt, setOpenInventoryMngmt] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openEmployees, setOpenEmployees] = useState(false);
    const [ openTransactions, setOpenTransactions ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(localStorage.getItem('selectedItem') || 'Dashboard');
    const [ selectedDropdown, setSelectedDropdown ] = useState('');

    /**
     * User
     */
    const {userPermissions, setUserPermissions } = useContext(PermissionContext);
    const [auth, setAuth] = useState(true);
    const [role, setRole] = useState('');
    const [user, setUser] = useState({
        name: ''
    });

    const userHasPermissionTo = (permission) => {
        if (Array.isArray(permission))
        {
            let isAnyPermissionFound = false;

            permission.forEach(per => {
                const hasPermission = userPermissions.includes(per);
                if (hasPermission)
                {
                    isAnyPermissionFound = true;
                }
            });

            return isAnyPermissionFound;
        }
        else 
        {
            return userPermissions.includes(permission);
        }
    };

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () =>  setOpen(false);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleOpenReportDropdown = (path) => 
    {
        handleDrawerOpen();
        setOpenReport(!openReport);
        closeDropDownExcept(path);
        setSelectedDropdown(path);
    }; 

    const handleOpenProductDropdown = (path) => 
    {
        handleDrawerOpen();
        setOpenProduct(!openProduct);
        closeDropDownExcept(path);
        setSelectedDropdown(path);
    }; 

    const handleOpenInventoryMngmtDropdown = (path) => 
    {
        handleDrawerOpen();
        setOpenInventoryMngmt(!openInventoryMngmt);
        closeDropDownExcept(path);
        setSelectedDropdown(path);
    }; 

    const handleOpenEmployeesDropdown = (path) => 
    {
        handleDrawerOpen();
        setOpenEmployees(!openEmployees);
        closeDropDownExcept(path);
        setSelectedDropdown(path);
    }; 

    const handleOpenTransactionsDropdown = (path) => 
    {
        handleDrawerOpen();
        setOpenTransactions(!openTransactions);
        closeDropDownExcept(path);
        setSelectedDropdown(path);
    }; 

    const handleSelectedItem = (selectedItemName, selectedItemDropDown) => 
    {
        localStorage.setItem('selectedItem', selectedItemName);

        if (selectedItemDropDown)
        {
            handleDrawerOpen();
        }
        setSelectedItem(selectedItemName);
        closeDropDownExcept(selectedItemDropDown);
    };

    const closeDropDownExcept = (path) => 
    {
        switch (path) {
            case 'Report':
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
                setOpenTransactions(false);
                break;

            case 'Product':
                setOpenReport(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
                setOpenTransactions(false);
                break;

            case 'Inventory Management':
                setOpenReport(false);
                setOpenProduct(false);
                setOpenEmployees(false);
                setOpenTransactions(false);            
                break;

            case 'Employees':
                setOpenReport(false);
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenTransactions(false);            
                break;

            case 'Transactions':
                setOpenReport(false);
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);       
                break;
        
            default:
                setOpenReport(false);
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
                setOpenTransactions(false);
                break;
        }
    }

    const openDropDownExcept = (path) => 
    {
        switch (path) {
            case 'Report':
                setOpenReport(true);
                break;

            case 'Product':
                setOpenProduct(true);
                break;

            case 'Inventory Management':
                setOpenInventoryMngmt(true);      
                break;

            case 'Employees':
                setOpenEmployees(true);          
                break;

            case 'Transactions':
                setOpenTransactions(true);      
                break;
        }
    }

    const logout = async () => 
    {
        const result = await logoutAsync();

        if (result.status = 'Success')
        {
            Cookie.removeItem('access_token');

            if (!Cookie.has('access_token'))
            {
                setUserPermissions([]);
                history.push('/auth/login')
            }
        }
    }


    const fetchAuthenticatedUser = async () => 
    {
        const result = await fetchAuthUser();
  
        if (result.status === 'Success')
        {
            const {user, role, permissions} = result.data;

            setUser(user)
            setRole(role);
            setUserPermissions(permissions)
        }
    }



    useEffect(() => {

        if (Cookie.has('access_token'))
        {
            fetchAuthenticatedUser();
        }
    }, [])

    useEffect(() => {
        if (!open)
        {
            closeDropDownExcept('');
        }
        else 
        {
            openDropDownExcept(selectedDropdown);
        }
    }, [open]);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant='h5' noWrap className={classes.title}>
                        {selectedItem}
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={openAccountMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Grid container spacing={1} alignItems='center' justify='space-between'>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <UserIcon />
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                            <ListItemText primary={user.name} secondary={role} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    
                </div>

                <Divider />

                <List>
                {/* Dashboard */}
                    {
                        userHasPermissionTo('View Dashboard') && (
                            <NavLink className={classes.navLinks} to={'/'}>
                                <ListItem 
                                    selected={ selectedItem === 'Dashboard' }
                                    onClick={ () => handleSelectedItem( 'Dashboard') }
                                    button
                                >
                                    <ListItemIcon><Dashboard className={classes.dashboard}/></ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                            Dashboard
                                        </Typography>} 
                                    />
                                </ListItem>
                            </NavLink>
                        )
                    }

                {/* Report */}
                    {
                        userHasPermissionTo('View Reports') && (
                            <>
                                <ListItem 
                                    onClick={() => handleOpenReportDropdown('Report')}
                                    selected={selectedItem === 'Report'}
                                    button
                                >
                                    <ListItemIcon><Report className={classes.reports}/></ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                            Report
                                        </Typography>} />
                                    {openReport ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openReport} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
        
                                    {/* Sales by item */}
                                    <NavLink className={classes.navLinks} to={'/reports/sales-by-item'}>
                                        <ListItem 
                                            button 
                                            className={classes.dropdownLists} 
                                            selected={ selectedItem === 'Sales by item' }
                                            onClick={ e => handleSelectedItem( 'Sales by item', 'Report') }
                                        >
                                            <ListItemText primary="Sales by item" className={classes.dropDownItem}/>
                                        </ListItem>
                                    </NavLink>
        
                                    {/* Sales by category */}
                                    <NavLink className={classes.navLinks} to={'/reports/sales-by-category'}>
                                        <ListItem 
                                            button 
                                            className={classes.dropdownLists} 
                                            selected={ selectedItem === 'Sales by category' }
                                            onClick={ e => handleSelectedItem( 'Sales by category', 'Report') }
                                        >
                                            <ListItemText primary="Sales by category" className={classes.dropDownItem}/>
                                        </ListItem>
                                    </NavLink>
        
                                    {/* Sales by employee */}
                                    <NavLink className={classes.navLinks} to={'/reports/sales-by-employee'}>
                                        <ListItem 
                                            button 
                                            className={classes.dropdownLists} 
                                            selected={ selectedItem === 'Sales by employee' }
                                            onClick={ e => handleSelectedItem( 'Sales by employee', 'Report') }
                                        >
                                            <ListItemText primary="Sales by employee" className={classes.dropDownItem}/>
                                        </ListItem>
                                    </NavLink>
                                    {/* Sales by payment type */}
                                    <NavLink className={classes.navLinks} to={'/reports/sales-by-payment-type'}>
                                        <ListItem 
                                            button 
                                            className={classes.dropdownLists} 
                                            selected={ selectedItem === 'Sales by payment type' }
                                            onClick={ e => handleSelectedItem( 'Sales by payment type', 'Report') }
                                        >
                                            <ListItemText primary="Sales by payment type" className={classes.dropDownItem}/>
                                        </ListItem>
                                    </NavLink>
                                </List>
                            </Collapse>   
                        </>
                        )
                    }
                {/* End of Report */}

                {/* Pos */}
                {
                    userHasPermissionTo('Manage POS') && (
                        <NavLink className={classes.navLinks} to={'/pos'}>
                            <ListItem 
                                selected={ selectedItem === 'POS' }
                                onClick={ () => handleSelectedItem( 'POS') }
                                button>
                                <ListItemIcon><Pos /></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                        POS
                                    </Typography>} className={classes.pos}/>
                            </ListItem>
                        </NavLink>
                    )
                }
                {/* End of Pos */}
                
                {/* Receipt */}
                {
                    userHasPermissionTo('View All Receipts') && (
                        <NavLink className={classes.navLinks} to={'/receipts'}>
                            <ListItem 
                                selected={ selectedItem === 'Receipts' }
                                onClick={ () => handleSelectedItem( 'Receipts') }
                                button>
                                <ListItemIcon><ReceiptIcon /></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                        Receipts
                                    </Typography>} className={classes.pos}/>
                            </ListItem>
                        </NavLink>
                    )
                }
                {/* End of Receipt */}

                {/* Product */}
                {
                    userHasPermissionTo([
                        'Manage Products',
                        'Manage Categories',
                        'Manage Discounts'
                    ]) && (
                        <>                  
                            <ListItem 
                                onClick={() => handleOpenProductDropdown('Product')}
                                selected={selectedItem === 'Product'}
                                button
                            >
                                <ListItemIcon><Product className={classes.product}/></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                        Product
                                    </Typography>} />
                                {openProduct ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    {/*Products */}
                                    {
                                        userHasPermissionTo('Manage Products') && (
                                            <NavLink className={classes.navLinks} to={'/products'}>
                                                <ListItem 
                                                    button 
                                                    className={classes.dropdownLists} 
                                                    selected={ selectedItem === 'Products' }
                                                    onClick={ e => handleSelectedItem('Products', 'Product') }
                                                >
                                                    <ListItemText primary="Products" className={classes.dropDownItem}/>
                                                </ListItem>
                                            </NavLink>
                                        )
                                    }

                                    {/* Categories */}
                                    {
                                        userHasPermissionTo('Manage Categories') && (
                                            <NavLink className={classes.navLinks} to={'/products/categories'}>
                                                <ListItem 
                                                    button 
                                                    className={classes.dropdownLists} 
                                                    selected={ selectedItem === 'Categories' }
                                                    onClick={ e => handleSelectedItem( 'Categories', 'Product') }
                                                >
                                                    <ListItemText primary="Categories" className={classes.dropDownItem}/>
                                                </ListItem>
                                            </NavLink>
                                        )
                                    }

                                    {/* Discounts */}
                                    {
                                        userHasPermissionTo('Manage Discounts') && (
                                            <NavLink className={classes.navLinks} to={'/products/discounts'}>
                                                <ListItem 
                                                    button 
                                                    className={classes.dropdownLists} 
                                                    selected={ selectedItem === 'Discounts' }
                                                    onClick={ e => handleSelectedItem( 'Discounts', 'Product') }
                                                >
                                                    <ListItemText primary="Discounts" className={classes.dropDownItem}/>
                                                </ListItem>    
                                            </NavLink>   
                                        )
                                    }             
                                </List>
                            </Collapse>   
                
                        </>
                    )
                }
                {/* End of Product */}

                {/* Inventory Management */}
                {
                    userHasPermissionTo([
                        'Manage Purchase Orders',
                        'Manage Bad Orders',
                        'Manage Suppliers',
                        'Manage Stock Adjustments'
                    ]) && (
                        <>
                        <ListItem 
                            onClick={() => handleOpenInventoryMngmtDropdown('Inventory Management')}
                            selected={selectedItem === 'Inventory Management'}
                            button
                        >
                            <ListItemIcon>
                                <InventoryManagement className={classes.inventoryMngmt}/>
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Inventory Management
                                </Typography>} />
                            {openInventoryMngmt ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={openInventoryMngmt} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {/*Purchase Orders */}
                                {
                                    userHasPermissionTo('Manage Purchase Orders') && (
                                        <NavLink className={classes.navLinks} to={'/inventory-mngmt/purchase-orders'}>
                                            <ListItem 
                                                button 
                                                className={classes.dropdownLists} 
                                                selected={ selectedItem === 'Purchase Orders' }
                                                onClick={ 
                                                    e => handleSelectedItem( 'Purchase Orders', 'Inventory Management') 
                                                }
                                            >
                                                <ListItemText primary="Purchase Orders" className={classes.dropDownItem}/>
                                            </ListItem>
                                        </NavLink>
                                    )
                                }


                                {/* Suppliers */}
                                {
                                    userHasPermissionTo('Manage Suppliers') && (
                                        <NavLink className={classes.navLinks} to={'/inventory-mngmt/suppliers'}>
                                            <ListItem 
                                                button 
                                                className={classes.dropdownLists} 
                                                selected={ selectedItem === 'Suppliers' }
                                                onClick={ 
                                                    e => handleSelectedItem( 'Suppliers', 'Inventory Management') 
                                                }
                                            >
                                                <ListItemText primary="Suppliers" className={classes.dropDownItem}/>
                                            </ListItem>  
                                        </NavLink> 
                                    )
                                }

                                {/*Bad Orders */}
                                {
                                    userHasPermissionTo('Manage Bad Orders') && (
                                        <NavLink className={classes.navLinks} to={'/inventory-mngmt/bad-orders'}>
                                            <ListItem 
                                                button 
                                                className={classes.dropdownLists} 
                                                selected={ selectedItem === 'Bad Orders' }
                                                onClick={ 
                                                    e => handleSelectedItem( 'Bad Orders', 'Inventory Management') 
                                                }
                                            >
                                                <ListItemText primary="Bad Orders" className={classes.dropDownItem}/>
                                            </ListItem>
                                        </NavLink>
                                    )
                                }

                                {/* Stock Adjustments */}
                                {
                                    userHasPermissionTo('Manage Stock Adjustments') && (
                                        <NavLink className={classes.navLinks} to={'/inventory-mngmt/stock-adjustments'}>
                                            <ListItem 
                                                button 
                                                className={classes.dropdownLists} 
                                                selected={ selectedItem === 'Stock Adjustments' }
                                                onClick={ 
                                                    e => handleSelectedItem( 'Stock Adjustments', 'Inventory Management') 
                                                }
                                            >
                                                <ListItemText primary="Stock Adjustments" className={classes.dropDownItem}/>
                                            </ListItem>  
                                        </NavLink> 
                                    )
                                }
    
                            </List>
                        </Collapse>   

                        </>
                    )
                }

                    {/* Sales Returns */}
                    {
                        userHasPermissionTo('Manage Sales Returns') && (
                            <NavLink className={classes.navLinks} to={'/sales-returns'}>
                                <ListItem 
                                    selected={ selectedItem === 'Sales Returns' }
                                    onClick={ 
                                        () => handleSelectedItem( 'Sales Returns') 
                                    }
                                    button
                                >
                                    <ListItemIcon><SalesReturnsIcon className={classes.salesReturnsIcon}/></ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                            Sales Returns
                                        </Typography>} />
                                </ListItem>
                            </NavLink>   
                        )
                    }             
                </List>
                {/* End of Inventory Management */}
                    <Divider />

                <List>
                
                {/* Customer */}
                    {
                        userHasPermissionTo('Manage Customers') && (
                            <NavLink className={classes.navLinks} to={'/customers'}>
                                <ListItem 
                                    selected={ selectedItem === 'Customers' }
                                    onClick={ 
                                        () => handleSelectedItem( 'Customers') 
                                    }
                                    button
                                >
                                    <ListItemIcon><Customer className={classes.customers}/></ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                            Customers
                                        </Typography>} />
                                </ListItem>
                            </NavLink>
                        )
                    }
                {/* Employees */}
                {
                    userHasPermissionTo([
                        'Manage Employees',
                        'Manage Access Rights'
                    ]) && (
                        <>
                            <ListItem 
                                onClick={() => handleOpenEmployeesDropdown('Employees')}
                                selected={selectedItem === 'Employees'}
                                classes={{ 
                                    
                                }}
                                button
                            >
                                <ListItemIcon><Employee className={classes.employees}/></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                        Employees
                                    </Typography>} />
                                {openEmployees ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openEmployees} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    {/*Employee list */}
                                    {
                                        userHasPermissionTo('Manage Employees') && (
                                            <NavLink className={classes.navLinks} to={'/employees'}>
                                                <ListItem 
                                                    button 
                                                    className={classes.dropdownLists} 
                                                    selected={ selectedItem === 'Employees list' }
                                                    onClick={ 
                                                        e => handleSelectedItem( 'Employees list', 'Employees') 
                                                    }
                                                >
                                                    <ListItemText primary="Employee list" className={classes.dropDownItem}/>
                                                </ListItem>
                                            </NavLink>
                                        )
                                    }

                                    {/* Employee access rights */}
                                    {
                                        userHasPermissionTo('Manage Access Rights') && (
                                            <NavLink className={classes.navLinks} to={'/employees/access-rights'}>
                                                <ListItem 
                                                    button 
                                                    className={classes.dropdownLists} 
                                                    selected={ selectedItem === 'Access Rights' }
                                                    onClick={ 
                                                        e => handleSelectedItem( 'Access Rights', 'Employees') 
                                                    }
                                                >
                                                    <ListItemText primary="Access Rights" className={classes.dropDownItem}/>
                                                </ListItem>   
                                            </NavLink> 
                                        )
                                    }            
                                </List>
                            </Collapse>
                        </>
                    )
                }
                {/* End of Employees */}


                {/* Transactions */}
                {
                    userHasPermissionTo('View Transactions') && (
                        <>
                            <ListItem 
                                onClick={() => handleOpenTransactionsDropdown('Transactions')}
                                selected={selectedItem === 'Transactions'}
                                button
                            >
                                    <ListItemIcon><TransactionsIcon className={classes.transactions}/></ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                            Transactions
                                        </Typography>} />
                                    {openTransactions ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                        <Collapse in={openTransactions} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                            {/* Customer order transactions */}
                                <NavLink className={classes.navLinks} to={'/transactions/customer-orders'}>
                                    <ListItem 
                                        button 
                                        className={classes.dropdownLists} 
                                        selected={ selectedItem === 'Customer order transactions' }
                                        onClick={ e => handleSelectedItem( 'Customer order transactions', 'Transactions') }
                                    >
                                        <ListItemText primary="Customer order" className={classes.dropDownItem}/>
                                    </ListItem>
                                </NavLink>

                            {/* Invoices transactions */}
                                <NavLink className={classes.navLinks} to={'/transactions/invoices'}>
                                    <ListItem 
                                        button 
                                        className={classes.dropdownLists} 
                                        selected={ selectedItem === 'Invoices transactions' }
                                        onClick={ e => handleSelectedItem( 'Invoices transactions', 'Transactions') }
                                    >
                                        <ListItemText primary="Invoices" className={classes.dropDownItem}/>
                                    </ListItem>
                                </NavLink>  

                            {/* Purchase order transactions */}
                                <NavLink className={classes.navLinks} to={'/transactions/purchase-orders'}>
                                    <ListItem 
                                        button 
                                        className={classes.dropdownLists} 
                                        selected={ selectedItem === 'Purchase order transactions' }
                                        onClick={ e => handleSelectedItem( 'Purchase order transactions', 'Transactions') }
                                    >
                                        <ListItemText primary="Purchase order" className={classes.dropDownItem}/>
                                    </ListItem>
                                </NavLink>                 

                                {/* Received stocks transactions */}
                                <NavLink className={classes.navLinks} to={'/transactions/received-stocks'}>
                                    <ListItem 
                                        button 
                                        className={classes.dropdownLists} 
                                        selected={ selectedItem === 'Received stocks transactions' }
                                        onClick={ e => handleSelectedItem( 'Received stocks transactions', 'Transactions') }
                                    >
                                        <ListItemText primary="Received stocks" className={classes.dropDownItem}/>
                                    </ListItem>
                                </NavLink>
                            </List>
                        </Collapse>
                    </>   
                    )
                }
                {/* End of Transactions */}

                {/* Settings */}
                {
                    userHasPermissionTo('Manage Settings') && (
                        <NavLink className={classes.navLinks} to={'/settings'}>
                            <ListItem 
                                button
                                selected={ selectedItem === 'Settings' }
                                onClick={ 
                                    () => handleSelectedItem( 'Settings') 
                                }
                            >
                                <ListItemIcon><Settings className={classes.settings}/></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                        Settings
                                    </Typography>}/>
                            </ListItem>
                        </NavLink>
                    )
                }
                </List>
            </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} />
                {userPermissions.length > 0 && (
                    <Container maxWidth="xl" className={classes.container}>
                        {children}
                    </Container>
                )}
            </main>
        </div>
    );
}


export default MainLayout