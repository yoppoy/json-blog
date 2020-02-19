import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";

const HeaderBar = ({location, history}) => {
    const classes = useStyles();
    const classesLabel = useStylesCustomLabel();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={location.pathname === "/editor-mode"}
                                             color="secondary"
                                             onChange={() => history.push(location.pathname === '/editor-mode' ? '/' : '/editor-mode')}
                                             aria-label="Editor mode"/>}
                            label={'Editor mode'}
                            classes={classesLabel}
                        />
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

const useStylesCustomLabel = makeStyles(theme => ({
    label: {
        color: 'white',
        fontWeight: 'bold'
    }
}));

export default withRouter(HeaderBar);
