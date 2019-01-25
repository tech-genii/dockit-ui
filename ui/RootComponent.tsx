import {
    Layout, Menu, Breadcrumb, Icon, Avatar,
} from 'antd';
import * as React from "react";

import "antd/dist/antd.css"
import SideNavigation from "./SideNavigation";
import DockerContainerAvatar from "./DockerContainerAvatar";
import CreateMicroserviceComponent from "./create_microservice/CreateMicroserviceComponent";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./home/Home";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;



export default class RootComponent extends React.Component {

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <SideNavigation/>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>

                                <Route exact path="/" component={Home}/>
                                <Route exact path="/microservice" component={CreateMicroserviceComponent}/>


                                {/*<CreateMicroserviceComponent/>*/}
                                {/*<DockerContainerCard/>*/}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            DockIt ©2018
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
