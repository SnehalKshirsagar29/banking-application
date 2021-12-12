import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons/lib'
import SubMenus from './SubMenus';
import { IoMdLogOut } from 'react-icons/io'
import { LogoutData, LogoutMenus } from './LogoutData'

const Nav = styled.div`
background:#414757;//#15171c;
height:80px;
display:flex;
justify-content:flex-start;
align-items:center;
`;

const NavIcon = styled(Link)`
margin-left:2rem;
font-size:2rem;
height:80px;
display:flex;
justify-content:flex-start;
align-items:center;
`;

const LogOutIcon = styled(Link)`
margin-left:32cm;
font-size:2rem;
height:35px;
display:flex;
`;

const Sidebarnav = styled.div`
    background:#414757;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transform: 350ms;
    z-index: 10;
`;


const Sidebarwrap = styled.div`
    width: 100%;
`;

const Logoutbarnav = styled.div`
    background:#414757;
    width: 140px;
    height: 30vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0px;
    right: ${({ logoutbar }) => (logoutbar ? '0' : '-100%')};
    transform: 350ms;
    z-index: 10;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    const [logoutbar, setLogoutbar] = useState(false)
    const showLogoutbar = () => setLogoutbar(!logoutbar)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <LogOutIcon to="#">
                        <IoMdLogOut onClick={showLogoutbar} />
                    </LogOutIcon>
                </Nav>
                <Sidebarnav sidebar={sidebar}>
                    <Sidebarwrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenus item={item} key={index} />;
                        })}
                    </Sidebarwrap>
                </Sidebarnav>
                <Logoutbarnav logoutbar={logoutbar}>
                     <Sidebarwrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showLogoutbar} />
                        </NavIcon>
                        {LogoutData.map((item, index) => {
                             return <LogoutMenus item={item} key={index} />;
                        })}
                    </Sidebarwrap> 
                </Logoutbarnav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar
