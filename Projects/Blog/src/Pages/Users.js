import React from "react";
import {connect} from 'react-redux'

import getUsers from '../Actions/getUsers'

import UsersList from '../Components/UsersList'

 class Users extends React.Component{

    render(){
        console.log(this.props.users);
        if (!this.props.users.length) {
            console.log('2');
            return null
        } else {
            console.log('4');
            return(
                <UsersList users={this.props.users} />
            )
        }
    }

    componentDidMount(){
        console.log('3');
        this.props.dispatch(getUsers())
 }
}

function mapStateToProps(state){
    console.log('1');
    return {
        users: state.users.usersList
    }
}

export default connect(mapStateToProps)(Users)
