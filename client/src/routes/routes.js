import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { LinksPage } from "../pages/Links.page";
import { CreatePage } from "../pages/Create.page";
import { DetailPage } from "../pages/Detail.page";
import { Redirect } from "react-router-dom";
import { AuthPage } from "../pages/Auth.page";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}