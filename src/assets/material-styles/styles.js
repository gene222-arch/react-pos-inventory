import { makeStyles } from '@material-ui/core'
import { green, red, orange, blue, yellow, indigo } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator';
import visualData from '../storage/images/background-image/visual_data.svg'


/**
 * Global Styling
 */
export const notFoundUseStyles = makeStyles({
    typography: {
        fontSize: '3rem',
    },
    errorMessage: {
        fontSize: '1rem',
    },
    root: {
        flexGrow: 1,
        width: '100%'
    },
    notFoundImg: {
        width: '100%'
    }
});


export const createPageUseStyles = makeStyles((theme) => ({
    
    cardContent: {
        [theme.breakpoints.up('md')]: {
            width: '100%',
            padding: theme.spacing(4)
        },
    },
    cardContainer: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
        }  
    },
    headerIcon: {
        fontSize: '7rem',
        color: blue[500]
    },
    formControl: {
        width: '100%',
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    deleteAction: {
        '&:hover': {
            color: red[400]
        }
    },
    textFieldIcons: {
        color: '#a8a7a7'
    },
    divider: {
        marginTop: theme.spacing(2)
    }
}));


export const sendMailDialogUseStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(3)
    },
    cancelBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    sendMailBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: theme.palette.primary.main
        }
    }
}));

export const salesByUseStyles = makeStyles((theme) => ({

    topFiveItemAvatar: {
        backgroundColor: '#2c2c2c'
    },
    topFiveItemIcon: {
        color: yellow[500]
    },
    topFiveItemListContainer: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            height: '28rem'
        }
    },
    formControl: {
        width: '100%'
    },
    dataGrid: {
        backgroundColor: '#FFF'
    },
    resetDateBtn: {
        color: '#FFF',
        backgroundColor: green[400],
        '&:hover': {
            backgroundColor: green[300],
        }
    }
}));

/**
 * End of Global Styling
 */



/**
 * Component Styling
 */
const drawerWidth = 320;

export const AdminLayoutUseStyles = makeStyles((theme) => ({
        
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    dropDownItem: {
        padding: theme.spacing(0, 0, 0, 7),
        color: '#3a3a3a'
    },  
    dropdownTitle: {
        fontSize: '.95rem',
        fontWeight: '600',
        color: '#3a3a3a'
    },
    navLinks: {
        textDecoration: 'none'
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 1.5),
    },
    container: {
        padding: 0,
    },
    dashboard: {
        color: theme.palette.primary.main
    },
    reports: {
        color: '#00c853'
    },
    pos: {

    },
    product: {
        color: '#f06292'
    },
    inventoryMngmt: {
        color: '#42a5f5'
    },
    customers: {
        color: '#a1887f'
    },
    employees: {
        color: green[500]
    },
    transactions: {

    },
    salesReturnsIcon: {
        color: red[500]
    },
    settings: {
        color: '#78909c'
    },
    active: {
        backgroundColor: '#2c2c2c'
    }
}));

export const dashboardUseStyles = makeStyles( theme => ({
    root: {
        width: '100%'
    },
    cardHeaderIcon: {
        position: 'absolute',
        marginTop: '-60px',
        marginRight: '15px',
        height: theme.spacing(11),
        width: theme.spacing(11),
        boxShadow: theme.shadows[3]
    },
    additionalInfo: {
        color: '#999999'
    },
    salesReportIcons: {
        height: theme.spacing(6),
        width: theme.spacing(6),
    },
    title: {
        marginLeft: '5rem',
        fontWeight: '400',
        wordWrap: 'break-word'
    },
    subheader: {
        marginLeft: '5rem',
        fontWeight: '400'
    },
    revenueContainer: {
        backgroundColor: green[400]
    },
    salesReturnContainer: {
        backgroundColor: red[500]
    },
    marginSalesContainer: {
        backgroundColor: orange[300]
    },
    purchaseReturnContainer: {
        color: '#2c2c2c',
        backgroundColor: '#DDD'
    },
    grossProfitContainer: {
        backgroundColor: indigo[500]
    },
    netSalesContainer: {
        backgroundColor: yellow[600]
    },
    pendingInvoicesContainer: {
        backgroundColor: green[600]
    },
    totalCustomersContainer: {
        backgroundColor: blue[400]
    },
    pendingPurchaseOrdersContainer: {
        backgroundColor: green[600]
    },
    chartContainer: {
        width: '100%',
        margin: '0 auto'
    },
    pendingOrdersIcon: {
        backgroundColor: green[600]
    },
    noDataImg: {
        width: '100%'
    }
}));


export const loginFormUseStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${visualData})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    links: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    mismatchErrorMessage: {
        width: '100%'
    }
}));

export const registrationFormUseStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${visualData})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        height: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loginLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));

export const dataGridUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFF',
        '& .super-app.negative' : {
            color: red[400]
        },
        '& .super-app.grey' : {
            color: '#DDDDDD'
        }
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    deleteBtn: {
        margin: theme.spacing(1),
        '&:hover':{
            color: red[400]
        }
    },
    updateBtn: {
        '&:hover':{
            color: green[400]
        }
    },
    btn: {
        margin: theme.spacing(1),
    },
    links: {
        textDecoration: 'none',
        color: '#FFF'
    },
    card: {
        marginBottom: theme.spacing(2)
    },
    dataGrid: {
        backgroundColor: '#FFF'
    },
    productImgContainer: {
        width: '100%',
        height: '4rem'
    }

}));

export const posUseStyles = makeStyles((theme) => ({
    itemListContainer: {
        height: '64vh',
        overflow: 'auto',
    },
    itemListOptionsContainer: {
        width: '100%'
    },
    itemListOptionsBtn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: '600'
    },
    itemClickableContainer: {
        '&:hover': {
            boxShadow: theme.shadows[4],
            cursor: 'pointer'
        }
    },
    cardImg: {
        width: '100%',
        height: '12rem',
        padding: '.5rem'
    },
    itemActionArea: {
        color: '#FFF',
        padding: theme.spacing(0, 1),
        backgroundColor: fade('#2c2c2c', .5)
    },
    discountIcon: {
        color: red[500]
    },
    cancelOrderIcon: {
        color: theme.palette.warning.main,
    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(1)
    },
    selectLabel: {
        padding: theme.spacing(0, 1)
    },
    orderDetailsContainer: {
        padding: theme.spacing(0, .5)
    },
    orderOptionsCardCOntainer: {
        marginTop: '.1px'
    },
    dataGrid: {
        backgroundColor: '#FFF',
    },
    dataGridContainer: {
        width: '100%',
        height: '43vh'
    },
    items: {
        backgroundColor: '#dddddd'
    },
    chargeBtn: {
        margin: theme.spacing(.43, 0, .3),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        },
        width: '100%'
    },
    deleteBtnContainer: {
        padding: theme.spacing(0, 1, .5, 1),
        margin: theme.spacing(0, .5, .5)
    },
    deleteBtn: {
        margin: theme.spacing(.3, 0),
        backgroundColor: '#FFF',
        color: '#2c2c2c',
        '&:hover': {
            color: red[400],
            backgroundColor: '#FFF'
        },
        width: '100%'
    },

    productDetailDialog: {
        minWidth: '70%',
        height: '100vh',
        padding: theme.spacing(2)
    },
    modifyOrderContainerDialog: {
        marginTop: '1.5rem'
    },
    productDetailDialogActions: {
        borderTop: '.5px solid #999999'
    },
    decrementBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: red[400]
        }
    },
    incrementBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: green[400]
        }
    },
    saveBtn: {
        color: '#FFF',
        backgroundColor: green[400],
        '&:hover': {
            color: '#FFF',
            backgroundColor: green[300]
        }
    },
    selectEmpty: {
        textAlign: 'center'
    },
    closeBtn: {
        color: '#2c2c2c',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#FFF',
            backgroundColor: red[400]
        }
    }

}));

export const processPaymentUseStyles = makeStyles((theme) => ({

    dataGridContainer: {
        width: '100%',
        height: '66vh'
    },
    dataGrid: {
        backgroundColor: '#FFF',
    },
    chargeTxtField: {
        textAlign: 'center'
    },
    paymentTypeBtns: {
        width: '100%'
    },
    chargeBtn: {
        fontWeight: '600',
        color: '#FFF',
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[400],
        }
    },
    chargeDefAmount: {
        width: '100%',
        height: '10vh',
    },
    clearAmountBtn: {
        '&:hover': {
            backgroundColor: '#FFF'
        }
    },
    clearAmountIcon: {
        '&:hover': {
            color: red[500],
            backgroundColor: '#FFF'
        }
    },
    cardBtn: {
        fontWeight: '600',
    },
    invoiceBtn: {
        fontWeight: '600',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#FFF',
            backgroundColor: orange[400],
        },
    },
}));

  
export const purchaseOrderDetailsUseStyles = makeStyles((theme) => ({
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        fontWeight: '600'
    },
    btn: {
        margin: theme.spacing(1, 1, 1, 0),
        width: '100%'
    },
    purchaseOrderDetails: {
        padding: theme.spacing(2)
    },
    options: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    optionsOnMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    links: {
        textDecoration: 'none',
        color: '#3a3a3a'
    },
    dataGrid: {
        backgroundColor: '#FFF'
    },
    purchaseOrderCard: {
        marginBottom: theme.spacing(1)
    },
}));

export const purchaseOrderUseStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: '20rem'
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    deleteAction: {
        '&:hover': {
            color: '#dc3545'
    }
    },
    purchaseOrderCard: {
        marginBottom: theme.spacing(1)
    },
    dataGrid: {
        backgroundColor: '#FFF'
    }
}))

export const createBadOrdersSalesReturnUseStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginTop: '.35rem'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: '20rem'
    },
    selectPOContainer: {
        marginBottom: theme.spacing(2)
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    emptyPurchaseOrdersMessage: {
        textAlign: 'center'
    },
    dataGrid:{
        backgroundColor: '#FFF'
    }
}));

export const createSalesReturnsUseStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: '20rem'
    },
    selectPOContainer: {
        marginBottom: theme.spacing(2)
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
}));

export const createProductUseStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    deleteAction: {
        '&:hover': {
            color: '#dc3545'
        }
    },
    createProductCard: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: '70%',
            padding: '1rem'
        }
    },
    btnContainer: {
        [theme.breakpoints.up('sm')]: {
            width: '70%'
        }
    },
    productImagePreview: {
        width: '100%',
        height: '20rem'
    },
    cardHeaderIcons: {
        color: '#3a3a3a'
    }
}))

export const categoryUseStyles = makeStyles((theme) => ({
    categoryCard: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '70%',
            padding: '1rem'
        }
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
}))

export const discountUseStyles = makeStyles((theme) => ({
    createDiscountCard: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: '35%',
            padding: '1rem'
        }
    },
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        }
    },
    cancelBtn: {
        margin: theme.spacing(1),
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#dc3545'
        }
    },
    discountIcon: {
        fontSize: '4rem',
        color: theme.palette.secondary.main,
        textAlign: 'center'
    }
}))

export const receivePOTextFieldUseStyles = makeStyles((theme) => ({
    addBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        fontWeight: '600'
    },
    cancelDeleteBtn: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: '#FFF',
        fontWeight: '600'
    },
    toReceiveTextField: {
        textAlign: 'center'
    },
    title: {
        textDecoration: 'none',
        color: '#3a3a3a',
        fontSize: '1rem'
    },
    dataGrid: {
        marginTop: '.5rem',
        backgroundColor: '#FFF'
    },
}));

export const forgotResetPasswordUseStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    icon: {
        fontSize: '4.5rem'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
        fontSize: '2.5rem'
    },
    links: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));


/**
 * Component Styling
 */
