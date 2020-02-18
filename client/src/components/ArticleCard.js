import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/OpenInNew';
import {Grow, Fade} from '@material-ui/core';

function formatDate(date, separator = '-') {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${day}`
}

export default function ArticleCard({article, editorMode = false, delay = 0}) {
    const classes = useStyles();
    const [appear, setAppear] = useState(true);
    const [visible, setVisible] = useState(true);

    function deleteArticle() {
        setAppear(false);
        fetch(`http://localhost:5005/api/article/${article._id}`, {method: 'DELETE'})
            .then(() => setTimeout(() => setVisible(false), 400))
            .catch(() => {
                setAppear(false);
            });
    }

    if (!visible)
        return (<React.Fragment/>);
    return (
        <Grow in={appear} timeout={{enter: delay, exit: 300}}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {article.author ? article.author.substring(0, 1) : '?'}
                        </Avatar>
                    }
                    title={article.author ? article.author : 'Unknown author'}
                    subheader={formatDate(article.publishDate)}
                    action={
                        <Fade in={editorMode}>
                            <React.Fragment>
                                <IconButton aria-label='delete' onClick={deleteArticle}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton aria-label='open article' onClick={() => {
                                    if (article.link)
                                        window.open(article.link, "_blank");
                                }}>
                                    <LinkIcon/>
                                </IconButton>
                            </React.Fragment>
                        </Fade>
                    }
                    className={classes.header}
                />
                <CardActionArea className={classes.content} href={article.url}
                                target={'_blank'}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h1" style={{color: 'white', opacity: 1}}>
                            {article.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}

const useStyles = makeStyles(theme => {
    console.log(theme);
    return ({
        card: {
            maxWidth: 345,
            minHeight: 250,
            display: 'flex',
            flexDirection: 'column',
            margin: 10,
        },
        avatar: {
            backgroundColor: theme.palette.primary.A400,
        },
        header: {
            width: 313
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
            flex: 1, justifyContent: 'start',
            width: 345
        },
        media: {
            width: '100%',
            flex: '1 1 auto',
            height: '100%'
        },
        link: {
            color: 'inherit',
            textDecoration: 'none'
        },
        disabled: {
            opacity: 0.2
        }
    })
});
