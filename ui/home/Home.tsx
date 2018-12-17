import * as React from "react";
import {Tabs, Button, Avatar,Table, Divider, Tag} from 'antd';
import DockerContainerAvatar from "../DockerContainerAvatar";

const bootIcon = require('../icons/boot.png');
const nodeIcon = require('../icons/node.png');
const mysqlIcon = require('../icons/mysql.png');
const mongodbIcon = require('../icons/mongodb.png');
const elasticsearchIcon = require('../icons/elasticsearch.png');
const cassandraIcon = require('../icons/cassandra.png');
const rabbitmqIcon = require('../icons/rabbitmq.png');
const activemqIcon = require('../icons/activemq.png');
const gradleIcon = require('../icons/gradle.png');
const nginxIcon = require('../icons/nginx.png');

class Home extends React.Component<any,any> {
    render() {
        return (
            <div>
                <DockerContainerAvatar containerIcon={bootIcon}/>
                <DockerContainerAvatar containerIcon={nodeIcon}/>
                <DockerContainerAvatar containerIcon={mysqlIcon}/>
                <DockerContainerAvatar containerIcon={mongodbIcon}/>
                <DockerContainerAvatar containerIcon={elasticsearchIcon}/>
                <DockerContainerAvatar containerIcon={cassandraIcon}/>
                <DockerContainerAvatar containerIcon={rabbitmqIcon}/>
                <DockerContainerAvatar containerIcon={activemqIcon}/>
                <DockerContainerAvatar containerIcon={gradleIcon}/>
                <DockerContainerAvatar containerIcon={nginxIcon}/>
            </div>
        );
    }
}

export default Home;
