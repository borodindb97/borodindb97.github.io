import React from "react";

import UserProfile  from './UserProfile'

export default class UsersList extends React.Component{

    render(){
        console.log(this.props);
        let users = this.props.users.map((user, index) => {
            return <UserProfile key={index} {...user}/>
        });

        return (
            <div className="users">
                <h2>Пользователи</h2>
                <div className="usersList">
                    {users}
                </div>
            </div>
        )
    }


}