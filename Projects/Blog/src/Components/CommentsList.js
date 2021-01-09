import React from 'react'
import {connect} from 'react-redux'

import CommentProfile from './CommentProfile'
import getComments from "../Actions/getComments";

class CommentsList extends React.Component{

    render(){

        if (!this.props.comments.length){
            return null
        } else {

            let comments = this.props.comments.map((comment, index) => {
                return <CommentProfile key={index} {...comment}/>
            });

            return(
                <div className="comments">
                    <h2>Комментарии</h2>
                    <div className="commentsList">
                        {comments}
                    </div>
                </div>
            )

        }

    }

    componentDidMount(){
        this.props.dispatch(getComments())
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(CommentsList)