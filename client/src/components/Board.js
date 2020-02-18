import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, Typography} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

export default withRouter(function Board({editorMode = false, location}) {
    const classes = useStyles();
    let delay = 0;
    let error = null;
    const [state, setState] = useState({
        articles: [],
        loading: true,
        error: null,
    });
    useEffect(() => {
        fetch('http://localhost:5005/api/article/list', {method: "GET"})
            .then(res => res.json())
            .then(response => {
                console.log(response);
                setState({...state, articles: response, loading: false});
            })
            .catch(error => {
                setState({...state, error: error, loading: false});
            });
    }, []);

    if (state.loading) return <Loading/>;
    if (state.error) return <p>Error {JSON.stringify(error)}</p>;
    return (
        <Grid id={"board"}
              className={classes.grid}
              container
              direction="row"
              justify="center">
            {state.articles.map((article, index) => {
                delay += 30;
                return (
                    <div key={article.title}>
                        <ArticleCard article={article} editorMode={editorMode} delay={delay}/>
                    </div>
                );
            })}
            {state.articles.length === 0 && (
                <Typography className={classes.textEmpty} variant="h5">
                    Aucuns articles...
                </Typography>
            )}
        </Grid>
    );
});

const useStyles = makeStyles(theme => ({
    grid: {
        padding: 20,
    },
    cardContainer: {
        padding: 10,
    },
    textEmpty: {
        color: theme.palette.primary.A400
    }
}));
