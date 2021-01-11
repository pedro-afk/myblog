import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Login from './pages/Login/index';
import New from './pages/New/index';
import Dashboard from './pages/Dashboard/index';
import NewPost from './pages/NewPost/index';
import Profile from './pages/Profile/index';

export default function Rotas(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/new" component={New}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/newpost" component={NewPost}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </BrowserRouter>
    );
}