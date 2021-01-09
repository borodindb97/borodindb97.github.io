import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Menu from '../Components/Menu'
import MenuItem from '../Components/MenuItem'

import Main from '../Pages/Main'
import Users from '../Pages/Users'
import User from '../Pages/User'
import Comments from '../Pages/Comments'
import Posts from '../Pages/Posts'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.brand = 'React blog'
    }

    isActive(href){
        return window.location.pathname === href;
    }

    render(){

        return (
            <div>
                <Menu brand = {this.brand} >
                    <MenuItem active={this.isActive('/')} href={'/'}> Главная </MenuItem>
                    <MenuItem active={this.isActive('/users')} href={'/users'}> Пользователи </MenuItem>
                    <MenuItem active={this.isActive('/posts')} href={'/posts'}> Посты </MenuItem>
                    <MenuItem active={this.isActive('/comments')} href={'/comments'}> Коментарии </MenuItem>
                </Menu>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Switch>
                                <Route exact path='/' component={Main}/>
                                <Route exact path='/users' component={Users}/>
                                <Route path='/users/:number' component={User}/>
                                <Route path='/comments' component={Comments}/>
                                <Route path='/posts' component={Posts}/>
                            </Switch>
                        </div>
                    </div>
                    <div className="footer">
                        &copy; 2019
                    </div>
                </div>
            </div>
        )

    }
}
