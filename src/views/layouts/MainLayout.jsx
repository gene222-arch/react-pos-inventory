import React, { useState, useEffect } from 'react';
import {logoutAsync} from '../../services/auth/login/login'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
import { AdminLayoutUseStyles } from '../../assets/material-styles/styles'
import * as Cookie from '../../utils/cookies'



const MainLayout = ({children}) => 
{
// Styling
    const classes = AdminLayoutUseStyles();
    const theme = useTheme();
    const history = useHistory();

// Buttons
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openAccountMenu = Boolean(anchorEl);
    const [openReport, setOpenReport] = useState(false);
    const [openInventoryMngmt, setOpenInventoryMngmt] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openEmployees, setOpenEmployees] = useState(false);
    const [ openTransactions, setOpenTransactions ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('Dashboard');
    const [ selectedMenu, setSelectedMenu ] = useState('');

// 
    const [auth, setAuth] = useState(true);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () =>  setOpen(false);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleOpenReportDropdown = (path) => 
    {
        setOpenReport(!openReport);
        setSelectedMenu(path);
        closeDropdownExcept(path);
    }; 

    const handleOpenProductDropdown = (path) => 
    {
        setOpenProduct(!openProduct);
        setSelectedMenu(path);
        closeDropdownExcept(path);
    }; 

    const handleOpenInventoryMngmtDropdown = (path) => 
    {
        setOpenInventoryMngmt(!openInventoryMngmt);
        setSelectedMenu(path);
        closeDropdownExcept(path);
    }; 

    const handleOpenEmployeesDropdown = (path) => 
    {
        setOpenEmployees(!openEmployees);
        setSelectedMenu(path);
        closeDropdownExcept(path);
    }; 

    const handleOpenTransactionsDropdown = (path) => 
    {
        setOpenTransactions(!openTransactions);
        setSelectedMenu(path);
        closeDropdownExcept(path);
    }; 

    const handleSelectedMenu = (menuName) => {
        setSelectedItem('');
        setSelectedMenu(menuName);
        closeDropdownExcept(menuName);
    };

    const handleSelectedItem = (selectedItemName) => setSelectedItem(selectedItemName);

    const closeDropdownExcept = (path) => {
        
        setSelectedItem('');

        switch (path) {
            case 'Report':
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
                break;
            case 'Product': 
                setOpenReport(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
                break;
            case 'Inventory Management':
                setOpenReport(false);
                setOpenProduct(false);
                setOpenEmployees(false);
                break;
            case 'Employees':
                setOpenReport(false);
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                break;
            default:                
                setOpenReport(false);
                setOpenProduct(false);
                setOpenInventoryMngmt(false);
                setOpenEmployees(false);
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
                history.push('/auth/login')
            }
        }
    }


    useEffect(() => {
        if (open === false) 
        {
            closeDropdownExcept('');
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
                        {selectedItem || selectedMenu}
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
                                <AccountCircle />
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
                    <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                {/* Dashboard */}
                    <NavLink className={classes.navLinks} to={'/'}>
                        <ListItem 
                            selected={ selectedMenu === 'Dashboard' }
                            onClick={ () => handleSelectedMenu( 'Dashboard') }
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

                {/* Report */}
                    <ListItem 
                        onClick={() => handleOpenReportDropdown('Report')}
                        selected={selectedMenu === 'Report'}
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
                                    onClick={ e => handleSelectedItem( 'Sales by item') }
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
                                    onClick={ e => handleSelectedItem( 'Sales by category') }
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
                                    onClick={ e => handleSelectedItem( 'Sales by employee') }
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
                                    onClick={ e => handleSelectedItem( 'Sales by payment type') }
                                >
                                    <ListItemText primary="Sales by payment type" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>   
                {/* End of Report */}

                {/* Pos */}
                    <NavLink className={classes.navLinks} to={'/pos'}>
                        <ListItem 
                            selected={ selectedMenu === 'POS' }
                            onClick={ () => handleSelectedMenu( 'POS') }
                            button>
                            <ListItemIcon><Pos /></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    POS
                                </Typography>} className={classes.pos}/>
                        </ListItem>
                    </NavLink>
                {/* End of Pos */}

                {/* Product */}
                    <ListItem 
                        onClick={() => handleOpenProductDropdown('Product')}
                        selected={selectedMenu === 'Product'}
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
                            <NavLink className={classes.navLinks} to={'/products'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Products' }
                                    onClick={ e => handleSelectedItem('Products') }
                                >
                                    <ListItemText primary="Products" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Categories */}
                            <NavLink className={classes.navLinks} to={'/products/categories'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Categories' }
                                    onClick={ e => handleSelectedItem( 'Categories') }
                                >
                                    <ListItemText primary="Categories" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Discounts */}
                            <NavLink className={classes.navLinks} to={'/products/discounts'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Discounts' }
                                    onClick={ e => handleSelectedItem( 'Discounts') }
                                >
                                    <ListItemText primary="Discounts" className={classes.dropDownItem}/>
                                </ListItem>    
                            </NavLink>                
                        </List>
                    </Collapse>   
                {/* End of Product */}

                {/* Inventory Management */}
                    <ListItem 
                        onClick={() => handleOpenInventoryMngmtDropdown('Inventory Management')}
                        selected={selectedMenu === 'Inventory Management'}
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
                            <NavLink className={classes.navLinks} to={'/inventory-mngmt/purchase-orders'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Purchase Orders' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Purchase Orders') 
                                    }
                                >
                                    <ListItemText primary="Purchase Orders" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>


                            {/* Suppliers */}
                            <NavLink className={classes.navLinks} to={'/inventory-mngmt/suppliers'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Suppliers' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Suppliers') 
                                    }
                                >
                                    <ListItemText primary="Suppliers" className={classes.dropDownItem}/>
                                </ListItem>  
                            </NavLink> 

                            {/*Bad Orders */}
                            <NavLink className={classes.navLinks} to={'/inventory-mngmt/bad-orders'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Bad Orders' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Bad Orders') 
                                    }
                                >
                                    <ListItemText primary="Bad Orders" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Stock Adjustments */}
                            <NavLink className={classes.navLinks} to={'/inventory-mngmt/stock-adjustments'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Stock Adjustments' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Stock Adjustments') 
                                    }
                                >
                                    <ListItemText primary="Stock Adjustments" className={classes.dropDownItem}/>
                                </ListItem>  
                            </NavLink> 
 
                        </List>
                    </Collapse>   

                    {/* Sales Returns */}
                    <NavLink className={classes.navLinks} to={'/sales-returns'}>
                            <ListItem 
                            selected={ selectedMenu === 'Sales Returns' }
                            onClick={ 
                                () => handleSelectedMenu( 'Sales Returns') 
                            }
                            button>
                            <ListItemIcon><SalesReturnsIcon className={classes.salesReturnsIcon}/></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Sales Returns
                                </Typography>} />
                        </ListItem>
                    </NavLink>                
                </List>
                {/* End of Inventory Management */}
                    <Divider />

                <List>
                
                {/* Customer */}
                    <NavLink className={classes.navLinks} to={'/customers'}>
                        <ListItem 
                            selected={ selectedMenu === 'Customers' }
                            onClick={ 
                                () => handleSelectedMenu( 'Customers') 
                            }
                            button>
                            <ListItemIcon><Customer className={classes.customers}/></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Customers
                                </Typography>} />
                        </ListItem>
                    </NavLink>
                {/* Employees */}
                    <ListItem 
                        onClick={() => handleOpenEmployeesDropdown('Employees')}
                        selected={selectedMenu === 'Employees'}
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
                            <NavLink className={classes.navLinks} to={'/employees'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Employees list' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Employees list') 
                                    }
                                >
                                    <ListItemText primary="Employee list" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Employee access rights */}
                            <NavLink className={classes.navLinks} to={'/employees/access-rights'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === 'Access Rights' }
                                    onClick={ 
                                        e => handleSelectedItem( 'Access Rights') 
                                    }
                                >
                                    <ListItemText primary="Access Rights" className={classes.dropDownItem}/>
                                </ListItem>   
                            </NavLink>             
                        </List>
                    </Collapse>   
                    {/* End of Employees */}


                {/* Transactions */}
                <ListItem 
                        onClick={() => handleOpenTransactionsDropdown('Transactions')}
                        selected={selectedMenu === 'Transactions'}
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
                                    onClick={ e => handleSelectedItem( 'Customer order transactions') }
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
                                    onClick={ e => handleSelectedItem( 'Invoices transactions') }
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
                                    onClick={ e => handleSelectedItem( 'Purchase order transactions') }
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
                                    onClick={ e => handleSelectedItem( 'Received stocks transactions') }
                                >
                                    <ListItemText primary="Received stocks" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>   
                {/* End of Transactions */}

                {/* Settings */}
                    <NavLink className={classes.navLinks} to={'/settings'}>
                        <ListItem 
                            button
                            selected={ selectedMenu === 'Settings' }
                            onClick={ 
                                () => handleSelectedMenu( 'Settings') 
                            }
                        >
                            <ListItemIcon><Settings className={classes.settings}/></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Settings
                                </Typography>}/>
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} />
                <Container maxWidth="xl" className={classes.container}>
                    {children}
                </Container>
            </main>
        </div>
    );
}


export default MainLayout