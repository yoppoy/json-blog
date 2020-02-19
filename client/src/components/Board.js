import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {CircularProgress, makeStyles, Typography} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import ArticleCard from "./ArticleCard";
import ArticleDialog from "./ArticleDialog";
import variables from '../config/Variables';
import Button from "@material-ui/core/Button";

export default withRouter(function Board({editorMode = false}) {
    const classes = useStyles();
    const [articles, setArticles] = useState([]);
    const [state, setState] = useState({
        allArticlesLoaded: false,
        articleSelectedIndex: undefined,
        dialogOpened: false,
        loading: false,
        error: null,
    });
    useEffect(() => {
        fetchArticles();
    }, []);
    let delay = 0;

    function fetchArticles(count = 24) {
        console.log(`${variables.host}/api/article/list?limit=${count}&skip=${articles.length}`);
        if (!state.loading) {
            setState({...state, loading: true});
            fetch(`${variables.host}/api/article/list?limit=${count}&skip=${articles.length}`, {method: "GET"})
                .then(res => res.json())
                .then(response => {
                    setState({
                        ...state,
                        loading: false,
                        allArticlesLoaded: response.length < 20,
                    });
                    setArticles(articles.concat(response));
                })
                .catch(error => {
                    setState({...state, error: error, loading: false});
                });
        }
    }

    return (
        <div className={classes.mainContainer}>
            <Grid id={"board"}
                  container
                  direction="row"
                  justify="center">
                {articles.map((article, index) => {
                    delay += 30;
                    return (
                        <div key={index}>
                            <ArticleCard
                                article={article}
                                editorMode={editorMode}
                                delay={delay}
                                onClick={() => setState({...state, articleSelectedIndex: index, dialogOpened: true})}
                            />
                        </div>
                    );
                })}
            </Grid>
            <div className={classes.statusContainer}>
                {(!state.loading && articles.length === 0) && (
                    <Typography className={classes.textEmpty} variant="h5">
                        Aucuns articles...
                    </Typography>
                )}
                {(!state.loading && state.error) && (
                    <Typography variant="h6">
                        {state.error}
                    </Typography>
                )}
                {(!state.loading && !state.allArticlesLoaded) && (
                    <Button variant="outlined" color="primary" onClick={fetchArticles}>
                        Load more
                    </Button>)}
                {state.loading && <CircularProgress disableShrink className={classes.progress}/>}
                <ArticleDialog
                    article={state.articleSelectedIndex !== undefined ? articles[state.articleSelectedIndex] : null}
                    onClose={() => setState({...state, dialogOpened: false})}
                    open={state.dialogOpened}/>
            </div>
        </div>
    );
});

const useStyles = makeStyles(theme => ({
    mainContainer: {
        padding: 20,
    },
    cardContainer: {
        padding: 10,
    },
    statusContainer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 30,
    },
    textEmpty: {
        color: theme.palette.primary.main
    },
    progress: {
        margin: theme.spacing(2),
    }
}));
