import React from 'react'

export default class CommentProfile extends React.Component{

    render(){

        return (
            <div className="card border-secondart mb-3">
                <div className="card-header">{this.props.name}</div>
                <div className="card-body text-secondary">
                    <p>{this.props.email}</p>
                    <p>{this.props.body}</p>
                </div>
            </div>
        )
    };

}