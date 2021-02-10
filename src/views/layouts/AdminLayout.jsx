import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
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
import { AdminLayoutUseStyles } from '../../assets/material-styles/styles'
import * as Cookie from '../../utils/cookies'



const AdminLayout = ({children}) => 
{
// Styling
    const classes = AdminLayoutUseStyles();
    const theme = useTheme();

// Buttons
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAccountMenu = Boolean(anchorEl);
    const [openReport, setOpenReport] = useState(false);
    const [openInventoryMngmt, setOpenInventoryMngmt] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openEmployees, setOpenEmployees] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('/dashboard');

// 
    const [auth, setAuth] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenReport = (e) => setOpenReport(!openReport); 
    const handleOpenProduct = (e) => setOpenProduct(!openProduct); 
    const handleOpenInventoryMngmt = (e) => setOpenInventoryMngmt(!openInventoryMngmt); 
    const handleOpenEmployees = (e) => setOpenEmployees(!openEmployees); 

    const handleSelectedItem = (e, path) => setSelectedItem(path);

    const handleSetAuth = () => {
        setAuth(!auth);
        Cookie.removeItem('access_token');
        return <Redirect to='/auth/login' />
    };

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
                    <Typography variant="subtitle1" noWrap className={classes.title}>
                        
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
                                <MenuItem onClick={handleSetAuth}>Logout</MenuItem>
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
                    <NavLink className={classes.navLinks} to={'/dashboard'}>
                        <ListItem button>
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
                        onClick={handleOpenReport}
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

                            {/* Sales Summary */}
                            <NavLink className={classes.navLinks} to={'/reports/sales-summary'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/reports/sales-summary' }
                                    onClick={ e => handleSelectedItem(e, '/reports/sales-summary') }
                                >
                                    <ListItemText primary="Sales Summary" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Sales by item */}
                            <NavLink className={classes.navLinks} to={'/reports/sales-by-item'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/reports/sales-by-item' }
                                    onClick={ e => handleSelectedItem(e, '/reports/sales-by-item') }
                                >
                                    <ListItemText primary="Sales by item" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Sales by category */}
                            <NavLink className={classes.navLinks} to={'/reports/sales-by-category'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/reports/sales-by-category' }
                                    onClick={ e => handleSelectedItem(e, '/reports/sales-by-category') }
                                >
                                    <ListItemText primary="Sales by category" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Sales by employee */}
                            <NavLink className={classes.navLinks} to={'/reports/sales-by-employee'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/reports/sales-by-employee' }
                                    onClick={ e => handleSelectedItem(e, '/reports/sales-by-employee') }
                                >
                                    <ListItemText primary="Sales by employee" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>
                            {/* Sales by payment type */}
                            <NavLink className={classes.navLinks} to={'/reports/sales-by-payment-type'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/reports/sales-by-payment-type' }
                                    onClick={ e => handleSelectedItem(e, '/reports/sales-by-payment-type') }
                                >
                                    <ListItemText primary="Sales by payment type" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>   
                {/* End of Report */}

                {/* Pos */}
                    <NavLink className={classes.navLinks} to={'/pos'}>
                        <ListItem button>
                            <ListItemIcon><Pos /></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Pos
                                </Typography>} className={classes.pos}/>
                        </ListItem>
                    </NavLink>
                {/* End of Pos */}

                {/* Product */}
                    <ListItem 
                        onClick={handleOpenProduct}
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
                                    selected={ selectedItem === '/products' }
                                    onClick={ e => handleSelectedItem(e, '/products') }
                                >
                                    <ListItemText primary="Products" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Categories */}
                            <NavLink className={classes.navLinks} to={'/products/categories'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/products/categories' }
                                    onClick={ e => handleSelectedItem(e, '/products/categories') }
                                >
                                    <ListItemText primary="Categories" className={classes.dropDownItem}/>
                                </ListItem>
                            </NavLink>

                            {/* Discounts */}
                            <NavLink className={classes.navLinks} to={'/products/discounts'}>
                                <ListItem 
                                    button 
                                    className={classes.dropdownLists} 
                                    selected={ selectedItem === '/products/discounts' }
                                    onClick={ e => handleSelectedItem(e, '/products/discounts') }
                                >
                                    <ListItemText primary="Discounts" className={classes.dropDownItem}/>
                                </ListItem>    
                            </NavLink>                
                        </List>
                    </Collapse>   
                {/* End of Product */}

                {/* Inventory Management */}
                    <ListItem 
                        onClick={handleOpenInventoryMngmt}
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
                                    selected={ selectedItem === '/inventory-mngmt/purchase-orders' }
                                    onClick={ 
                                        e => handleSelectedItem(e, '/inventory-mngmt/purchase-orders') 
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
                                    selected={ selectedItem === '/inventory-mngmt/suppliers' }
                                    onClick={ 
                                        e => handleSelectedItem(e, '/inventory-mngmt/suppliers') 
                                    }
                                >
                                    <ListItemText primary="Suppliers" className={classes.dropDownItem}/>
                                </ListItem>  
                            </NavLink>                      
                        </List>
                    </Collapse>                   
                </List>
                {/* End of Inventory Management */}
                            
                    <Divider />

                <List>
                
                {/* Customer */}
                    <NavLink className={classes.navLinks} to={'/customers'}>
                        <ListItem button>
                            <ListItemIcon><Customer className={classes.customers}/></ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='subtitle1' className={classes.dropdownTitle}>
                                    Customers
                                </Typography>} />
                        </ListItem>
                    </NavLink>
                {/* Employees */}
                    <ListItem 
                        onClick={handleOpenEmployees}
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
                                    selected={ selectedItem === '/employees' }
                                    onClick={ 
                                        e => handleSelectedItem(e, '/employees') 
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
                                    selected={ selectedItem === '/employees/access-rights' }
                                    onClick={ 
                                        e => handleSelectedItem(e, '/employees/access-rights') 
                                    }
                                >
                                    <ListItemText primary="Access Rights" className={classes.dropDownItem}/>
                                </ListItem>   
                            </NavLink>             
                        </List>
                    </Collapse>   
                    {/* End of Employees */}

                {/* Settings */}
                    <NavLink className={classes.navLinks} to={'/settings'}>
                        <ListItem button>
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
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </div>
    );
}


export default AdminLayout