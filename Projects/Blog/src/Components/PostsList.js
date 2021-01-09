import React from 'react'
import axios from 'axios'

import PostProfile from './PostProfile'

export default class PostsList extends React.Component{

    render(){

        let posts = this.props.posts.map((post, index) => {
           return <PostProfile {...post} key={index}/>
        });

        return (
            <div className="posts">
                <h2>Посты</h2>
                <div className="postsList">
                    {posts}
                </div>
            </div>
        )
    };



    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({posts: response.data})
            })
    }
}