import * as React from 'react';
import {Avatar, Card, Icon} from "antd";
import './DockerContainerAvatar.css'
const {Meta} = Card;

class DockerContainerAvatar extends React.Component<any,any> {
    render() {
        return (
            <div className={"container-avatar"}>
                <Avatar size={100} shape={"circle"} src={this.props.containerIcon}/>
            </div>
        );
    }
}

export default DockerContainerAvatar;