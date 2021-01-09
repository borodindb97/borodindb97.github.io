import React from 'react'
import {connect} from 'react-redux'

import PostsList from '../Components/PostsList'
import getPosts from "../Actions/getPosts";

class Posts extends React.Component{

    render(){

        if (!this.props.posts.length){
            return null
        } else {
            return <PostsList posts={this.props.posts}/>
        }

    }

    componentDidMount(){
        this.props.dispatch(getPosts())
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Posts)