import React from 'react'
import {connect} from 'react-redux'

import UserProfile from "../Components/UserProfile";
import getUser from "../Actions/getUser";

class User extends React.Component{

    render(){

        if (!Object.keys(this.props.user).length){
            return null
        } else {
            return(
                <UserProfile {...this.props.user}  />
            )
        }

    }

    componentDidMount(){
        this.props.dispatch(getUser())
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.currentUser
    }
}

export default connect(mapStateToProps)(User)