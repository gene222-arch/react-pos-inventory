import React, { useState, useEffect, lazy } from 'react';
import Loading from '../../../../components/Loading'
import * as Permission_ from '../../../../services/roles-permissions/permissions'
import * as AccessRight_ from '../../../../services/employees/accessRights'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider, Avatar, FormHelperText } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import { makeStyles } from '@material-ui/core/styles';
import POSIcon from '@material-ui/icons/DevicesOther';
import BackOfficeIcon from '@material-ui/icons/Business';
import { green, blue } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const ACCESS_RIGHT_DEFAULT_PROPS = {
    access_right_id: 0,
    role: '',
    back_office: false,
    pos: false,
    permissions: []
};

const PERMISSIONS_DEFAULT_PROPS = {
    POS: [],
    backOffice: []
};

const ERROR_MESSAGE_DEFAULT_PROP = {
    role: ''
};


const accessRightUseStyles = makeStyles((theme) => ({
    backOfficeIconContainer: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: blue[400]
    },
    posIconContainer: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: green[400]
    },
    posIcon: {
        fontSize: '2.5rem'
    },
    backOfficeIcon: {
        fontSize: '2.5rem'
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


const EditAccessRight = ({match}) => 
{
    const classes = accessRightUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const {accessRightId} = match.params;

    const [accessRight, setAccessRight] = useState(ACCESS_RIGHT_DEFAULT_PROPS);
    const [permissions, setPermissions] = useState(PERMISSIONS_DEFAULT_PROPS);
    const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGE_DEFAULT_PROP);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    accessRight.access_right_id = accessRightId;

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };


    const handleOnChangeAccessRight = (e) =>
    {
        const {name, value, checked} = e.target;
        let newPermissions = [];

        switch (name) 
        {
            case 'role':
                setAccessRight({...accessRight, role: value});
                break;

            case 'pos':
                setAccessRight({
                    ...accessRight, 
                    pos: checked
                });
                break;

            case 'back_office':

                setAccessRight({
                    ...accessRight, 
                    back_office: checked
                });
                break;

            default:
                break;
        }
    }


    const handlePermissionsOnChange = (e) => 
    {
        const permission = e.target.value;
        let currentPermissions = accessRight.permissions;
        const currentIndex = currentPermissions.indexOf(permission);


        if (currentIndex === -1)
        {
            currentPermissions.push(permission);

            setAccessRight({
                ...accessRight, 
                permissions: currentPermissions
            });
        }
        else 
        {
            currentPermissions.splice(currentIndex, 1)

            setAccessRight({
                ...accessRight, 
                permissions: currentPermissions
            });
        }

    }


    const fetchAccessRight = async () => 
    {
        const result = await AccessRight_.fetchAsync({
            access_right_id: accessRightId
        });

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage('Access right not found');
        }
        else 
        {
            setAccessRight(result.data);
        }

    }

    const fetchPermissions = async () => 
    {
        const result = await Permission_.fetchAllAsync();

        if (result.status !== 'Success')
        {
            setPermissions(PERMISSIONS_DEFAULT_PROPS);
        }
        else 
        {
            setPermissions(result.data);
        }

        setLoadingData(false);
    }

    const updateAccessRight = async () => 
    {
        let newPermissions = accessRight.permissions;

        if (!accessRight.pos)
        {
            const posPermissions = permissions.POS.map(per => per.permission);

            newPermissions = accessRight
                .permissions
                .filter(permission => !posPermissions.includes(permission));
        }

        if (!accessRight.back_office)
        {
            const backOfficePermissions = permissions.backOffice.map(per => per.permission);

            newPermissions = accessRight
                .permissions
                .filter(permission => !backOfficePermissions.includes(permission));
        }

        
        setLoading(true);
        const result = await AccessRight_.updateAsync({
            ...accessRight,
            permissions: newPermissions
        });

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessage(prepareSetErrorMessages(result.message, errorMessage));
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => history.push('/employees/access-rights'), 2000);
        }

        setTimeout(() => setLoading(false), 2000);
        setOpenAlert(true);
    }

    const determineIsSuperAdmin = () => Boolean(parseInt(accessRightId) === 1);


    useEffect(() => {
        fetchAccessRight();
        fetchPermissions();

        return () => {
            setPermissions(PERMISSIONS_DEFAULT_PROPS);
            setAccessRight(ACCESS_RIGHT_DEFAULT_PROPS)
        }
    }, []);


    return loadingData ? <Loading /> 
     : (
        <>
             <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className={classes.accessRightsCardContainer}>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        error={Boolean(errorMessage.role)}
                                        helperText={errorMessage.role}
                                        name="role"
                                        label="Role"
                                        fullWidth
                                        margin='dense'
                                        value={accessRight.role}
                                        onChange={handleOnChangeAccessRight}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1} alignItems='center' justify='center'>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Avatar className={classes.posIconContainer}>
                                                <POSIcon className={classes.posIcon}/>
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                            <ListItemText primary='POS' secondary='Access right list to Point of Sale System'/>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Switch 
                                                checked={accessRight.pos} 
                                                onChange={handleOnChangeAccessRight} 
                                                name='pos'
                                                disabled={determineIsSuperAdmin()} 
                                            />                                  
                                        </Grid>
                                        <Grid item xs={12} sm={8} md={8} lg={8}>
                                            <FormControl component="fieldset">
                                                <FormGroup aria-label="position">
                                                    {
                                                        (accessRight.pos && permissions.POS.length) && (
                                                            
                                                        permissions.POS.map((pos, index) => (
                                                            <FormControlLabel
                                                                checked={accessRight.permissions.includes(pos.permission)}
                                                                key={index} 
                                                                
                                                                value={pos.permission}
                                                                control={<Checkbox color="primary" />}
                                                                label={pos.permission}
                                                                labelPlacement="end"
                                                                onChange={handlePermissionsOnChange}
                                                                disabled={determineIsSuperAdmin()}
                                                            />
                                                        ))
                                                        )
                                                    }
                                                </FormGroup>
                                                <FormHelperText>
                                                   {
                                                       accessRight.pos && (
                                                           'When View All Receipts is disabled, a user can view the last 5 receipts'
                                                       )
                                                   }
                                                </FormHelperText>
                                            </FormControl>  
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1} alignItems='center' justify='center'>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Avatar className={classes.backOfficeIconContainer}>
                                                <BackOfficeIcon className={classes.backOfficeIcon}/>
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                            <ListItemText primary='Back office' secondary=' Access right list to Back office.'/>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Switch 
                                                checked={accessRight.back_office} 
                                                onChange={handleOnChangeAccessRight} 
                                                name='back_office'
                                                disabled={determineIsSuperAdmin()} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8} md={8} lg={8}>
                                            <FormControl component="fieldset">
                                                <FormGroup aria-label="position">
                                                    {
                                                        (accessRight.back_office && permissions.backOffice.length) &&
                                                        permissions.backOffice.map((bo, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                checked={accessRight.permissions.includes(bo.permission)}
                                                                value={bo.permission}
                                                                control={<Checkbox color="primary" />}
                                                                label={bo.permission}
                                                                labelPlacement="end"
                                                                onChange={handlePermissionsOnChange}
                                                                disabled={determineIsSuperAdmin()}
                                                            />
                                                        ))
                                                    }
                                                </FormGroup>
                                            </FormControl>  
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        
                        <Divider className={classes.divider}/>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.cancelBtn}
                                    onClick={() => history.push('/employees/access-rights')}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={updateAccessRight}
                                    disabled={loading}
                                >
                                    UPDATE
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                            
                </Grid>
            </Grid>
        </>
    )
}

export default EditAccessRight
