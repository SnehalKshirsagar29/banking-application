import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as AiIcons from 'react-icons/ai'

export const LogoutData = [
{
    title: 'Logout',
    path: '/login',
    icon: <AiIcons.AiOutlineLogout />
},
{
    title:'Setting',
    path: '/setting',
    icon: <AiIcons.AiFillSetting />
}
]


const SidebarLink = styled(Link)`
    display: flex;
    color:#e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 50px;
    text-decoration: none;
    font-size: 18px; 

    &:hover {
        background: #252831;
        border-left: 4px solid darkorange; //#632ce6
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;

`;
export const LogoutMenus = ({ item }) => {
    return (
        <>
            <SidebarLink to={item.path}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
            </SidebarLink>
        </>
    );
};