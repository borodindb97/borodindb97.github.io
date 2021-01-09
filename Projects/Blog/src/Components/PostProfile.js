import React from 'react'
import {Link} from "react-router";

export default class PostProfile extends React.Component{

    render(){

        return (
            <div className="card border-secondart mb-3">
                <div className="card-header"><Link to={`/users/${this.props.userId}`}>{this.props.title}</Link></div>
                <div className="card-body text-secondary">
                    {this.props.body}
                </div>
            </div>
        )
    };

}