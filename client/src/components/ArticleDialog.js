import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    dialog: {
        minWidth: 200,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    title: {
        marginRight: 35,
    },
});

const DialogTitle = withStyles(styles)(props => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ArticleDialog({article, open, onClose}) {
    return (
        <div>
            <Dialog onClose={onClose} className={styles.dialog} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={onClose} style={{marginRight: 20}}>
                    {(article && article.title) ? article.title : 'ERROR'}
                </DialogTitle>
                <DialogContent dividers>
                    {(article && article.summary) ?
                        (<div dangerouslySetInnerHTML={{__html: `<div class='summary'>${article.summary}</div>`}}/>) :
                        (<Typography gutterBottom>No summary available.</Typography>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => window.open(article.link, "_blank")} variant={"contained"} color="primary">
                        Open the article
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
