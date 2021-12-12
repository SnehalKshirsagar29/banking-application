import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
{
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />
},
{
    title: 'Accounts',
    path: '/home',
    icon: <AiIcons.AiFillAccountBook />,
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: 'Transactions',
            path: '/account/transaction',
            icon: <AiIcons.AiOutlineTransaction />
        },
        {
            title: 'Show Balance',
            path: '/account/balance',
            icon: <AiIcons.AiFillEye />
        },
        {
            title: 'Transaction Summary',
            path: '/account/summary',
            icon: <IoIcons.IoIosPaper />
        }
    ]
},
{
    title: 'Customer',
    path: '/home',
    icon: <FaIcons.FaUser />,
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: 'Generate Ticket',
            path: '/customer/ticket',
            icon: <AiIcons.AiOutlineTransaction />
        },
        {
            title: 'Show Customer Details',
            path: '/customer/details',
            icon: <IoIcons.IoIosPaper />
        },
        {
            title: 'Show Ticket Details',
            path: '/customer/ticketdetails',
            icon: <IoIcons.IoIosPaper />
        }
    ]
},
{
    title: 'Loans',
    path: '/home',
    icon: <FaIcons.FaUserClock />,
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: 'Apply Loan',
            path: '/loans/apply',
            icon: <AiIcons.AiOutlineTransaction />
        },
        {
            title: 'Show Loan Details',
            path: '/loans/details',
            icon: <IoIcons.IoIosPaper />
        },
        {
            title: 'Loan Applications',
            path: '/loans/applications',
            icon: <IoIcons.IoIosPaper />
        }
    ]
},
{
    title: 'Notifications',
    path: '/home',
    icon: <FaIcons.FaCartPlus />
}
]