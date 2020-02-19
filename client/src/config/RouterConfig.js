import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import CustomTheme from "../style/theme";
import HeaderBar from "../components/HeaderBar";
import {ThemeProvider} from "@material-ui/styles";

const RouterConfig = () => (
    <BrowserRouter>
        <ThemeProvider theme={CustomTheme}>
            <HeaderBar/>
            <div className="content">
                {Routes}
            </div>
        </ThemeProvider>
    </BrowserRouter>
);

export default RouterConfig;
