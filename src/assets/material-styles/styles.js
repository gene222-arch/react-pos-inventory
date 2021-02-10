import { makeStyles } from '@material-ui/core'
import { green, blue } from '@material-ui/core/colors';
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
        }
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
        padding: theme.spacing(3),
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
    settings: {
        color: '#78909c'
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
    registrationLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
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
    btn: {
        margin: theme.spacing(1),
    },
    links: {
        textDecoration: 'none',
        color: '#FFF'
    }
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
    }
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
    }
}))

export const createProductUseStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
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
    createProductCard: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
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
        width: '100%'
    },
    cardHeaderIcons: {
        color: '#3a3a3a'
    }
}))

export const createCategoryUseStyles = makeStyles((theme) => ({
    createCategoryCard: {
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

export const createDiscountUseStyles = makeStyles((theme) => ({
    createDiscountCard: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            width: '40%',
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
        textAlign: 'center',
        width: '100%'
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
}));


/**
 * Component Styling
 */
