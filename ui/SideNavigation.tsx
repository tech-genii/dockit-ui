import * as React from "react";
import {Icon, Menu,Layout} from "antd";

import { Link } from "react-router-dom";

const {SubMenu} = Menu;
const { Sider } = Layout;

export interface _Menu {
    name : string;
}

export interface _SubMenu{
    name : string;
    menuList: [_SubMenu | _Menu];
}

export interface _Section{
    section:(_SubMenu | _Menu);
}

export interface SideNavigationProps {
    sections:[_Section];
}

export default class SideNavigation extends React.Component<any,any> {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
        >
            <div className="logo"></div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu
                    key="app-design"
                    title={<span><Icon type="setting"/><span><Link to='/' style={{ textDecoration: 'none',color:"inherit" }}>App Design </Link></span></span>}
                >
                    <Menu.Item key="ad-1">
                        <Icon type="solution"/>
                        <span><Link to='/microservice' style={{ textDecoration: 'none',color:"inherit" }}>Create Microservice</Link></span>
                    </Menu.Item>
                    <Menu.Item key="ad-2">
                        <Icon type="project"/>
                        <span>Full Application</span>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="2">
                    <Icon type="team"/>
                    <span>Projects</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="user"/><span>Docker Image</span></span>}
                >
                    <Menu.Item key="3">Dockerfile</Menu.Item>
                    <Menu.Item key="4">Running Container</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="team"/><span>Monitor</span></span>}
                >
                    <Menu.Item key="6">App</Menu.Item>
                    <Menu.Item key="8">Development</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                    <Icon type="file"/>
                    <span>Feature Grouping</span>
                </Menu.Item>
            </Menu>
        </Sider>
        );
    }
}