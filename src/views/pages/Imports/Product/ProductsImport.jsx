import React, {useState, lazy} from 'react';
import {useHistory} from 'react-router-dom'
import * as ExcelExport from '../../../../services/exports/excel/products'
import * as ExcelImport from '../../../../services/imports/excel-csv/products'
import { Card, CardContent, Button, Grid, Typography, Link, Avatar, CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const productImportUseStyles = makeStyles((theme) => ({
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
    uploadBtnContainer: {
        backgroundColor: '#FFF',
        boxShadow: theme.shadows[3]
    },
    uploadBtn: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    errorTable: {
        backgroundColor: '#FFF',
        width: '100%',
        marginTop: '2rem'
    },
    errorHeader: {
        color: theme.palette.error.main
    }
}));

const columns = [
    { field: 'id', hide: true },
    { field: 'row', headerName: 'Row', width: 100 },
    { field: 'attribute', headerName: 'Attribute', width: 175 },
    { field: 'errors', headerName: 'Error', width: 920 },
];


const ProductsImport = () => 
{
    const classes = productImportUseStyles();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [files, setFiles] = useState([]);    
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [hideDuration, setHideDuration] = useState(3000);
    const [errors, setErrors] = useState([]);

    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => () => 
    {
        const currentIndex = files.indexOf(value);
        const newChecked = [...checked];

        if (!newChecked.includes(currentIndex)) 
        {
            newChecked.push(currentIndex);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        console.log(newChecked)
        setChecked(newChecked);
    };

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const handleFileOnChange = (e) => 
    {
        console.log(e.target.files);
        setFiles(Array.from(e.target.files));
    };

    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Products exporting.');
        setOpenAlert(true);

    }

    const handleExcelImport = async (e) => 
    {
        const importFiles = files.filter((file, index) => checked.includes(index)) ;
       
        if (!importFiles.length)
        {
            setAlertSeverity('error');
            setAlertMessage('Please select a file.');
        }
        else 
        {
            setLoading(true);
            setAlertSeverity('info');
            setAlertMessage('Products importing.');


            const result = await ExcelImport.importProductsAsync({
                files: importFiles
            });


            handleCloseAlert();

            if (result.status === 'Error')
            {
                setHideDuration(10000);
                setAlertSeverity('error');
                setAlertMessage(result.message.errorHeader);
                
                const errors_ = result.message.errors.map((error, index) => ({...error, id: index}));
                setErrors(errors_);
                setFiles([]);
                setChecked([]);
            }
            else 
            {
                setHideDuration(10000);
                setAlertSeverity('error');
                setAlertMessage(result.message.errorHeader);
                setFiles([]);
                setChecked([]);
            }

            if (result.status === 'Success') 
            {
                setAlertSeverity('success');
                setAlertMessage(result.message);
                setTimeout(() => {
                    history.push('/products');
                }, 2000)
            }

            setTimeout(() => setLoading(false), 2000)
        }

        setOpenAlert(true);
    }


    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
                hideDuration={hideDuration}
            />
            <Card>
                <CardContent>
                    <Typography variant="h4" color="initial" gutterBottom={true}>Import products</Typography>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography 
                                variant="subtitle1" 
                                color="initial" 
                                gutterBottom={true}
                            >
                                To fill in additional information, download the 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link
                                variant='subtitle1'
                                component='button'
                                onClick={handleExcelExport}>template file
                            </Link> 
                        </Grid>

                    </Grid>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar 
                                    aria-label="" 
                                    color='primary'
                                    className={classes.uploadBtnContainer}
                                >
                                    <Grid 
                                        container 
                                        spacing={1} 
                                        justify='center'
                                    >
                                        <Grid item>
                                            <input
                                                accept=".xlsx, .xls, .csv"
                                                className={classes.input}
                                                style={{ display: 'none' }}
                                                id="excel-file"
                                                type="file"
                                                name='files[]'
                                                multiple
                                                onChange={handleFileOnChange}
                                            />
                                            <label htmlFor="excel-file">
                                                <AttachFileIcon color='primary' className={classes.uploadBtn}/>
                                            </label> 
                                        </Grid>
                                </Grid>
                            
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="">
                                <MoreVertIcon />
                                </IconButton>
                            }
                            title="File"
                            subheader="Select file here."
                          
                        />
                        <CardContent>
                            <Typography variant="subtitle1" color="initial">
                                {files.length > 0 ? 'Select the file to upload.' : 'No files.'}
                            </Typography>
                            <List className={classes.root}>
                                {files.map((file, index) => {
                                    const labelId = `checkbox-list-label-${file.name}`;

                                    return (
                                    <ListItem 
                                        key={index} 
                                        role={undefined} 
                                        dense 
                                        button 
                                        onClick={handleToggle(file)}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.includes(files.indexOf(file))}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                            <ListItemText 
                                                id={labelId} 
                                                primary={`${file.name}`} 
                                            />
                                        <ListItemSecondaryAction>
                                        {
                                            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                                ? 'EXCEL'
                                                : 'CSV'
                                        }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    );
                                })}
                                </List>
                        </CardContent>
                    </Card>
                </CardContent>
                    <Grid container justify='flex-end' className={classes.btnContainer}>
                        <Grid item>
                            <Button 
                                variant='contained' 
                                color="default" 
                                className={classes.cancelBtn}
                                disabled={loading}
                                onClick={() => history.push('/products')}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant='contained' 
                                color="default" 
                                className={classes.addBtn}
                                onClick={handleExcelImport}
                                disabled={loading}
                            >
                                UPLOAD
                            </Button>
                        </Grid>
                    </Grid>
            </Card>
            <div className={classes.errorTable}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" color="initial">
                            Errors found:  <strong className={classes.errorHeader}>{errors.length}</strong>
                        </Typography>
                    </CardContent>
                </Card>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={errors} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default ProductsImport
