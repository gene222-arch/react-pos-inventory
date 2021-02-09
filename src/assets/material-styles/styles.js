import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import visualData from '../storage/images/background-image/visual_data.svg'

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