import logo from '../../images/sbm.png';
import homepageLoan from '../../images/homepageLoan.png';
import "./home.css";

import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';

const Home = () => {
    return (

        <div className='home'>
            <div id="header">
                <table class="table-class" >
                    <tr>
                        <th>
                            <div id="element1" style={{ float: 'left' }}>
                                <img src={logo} alt="Not Found" className="rounded" />

                                <div id="element2" style={{ float: 'right' }}>
                                    <h2 class="header-welcome">Welcome to State Bank of Mysore!</h2>
                                    <span class="footnote">Building on a Century of Trust!</span>
                                </div></div>
                        </th>

                        <th id="slideshow"> 
                        <div id="element1" style={{ float: 'right' }}>
                        <img src={homepageLoan} alt="Not Found" className="rounded" />
                        </div>
                         </th>
                    </tr>
                    <tr>
                        <td class="td-container" style={{ paddingTop: '-500px' }}>
                            <div class="modal-content">
                                <div class="modal-header" >
                                    <h2 >Dear Customers,</h2>
                                </div>
                                <div class="modal-body">
                                    <p>Welcome to the State Bank of Mysore NetBanking.</p>
                                    <p>Its lighter look and feel is designed to give you the best possible user experience.</p>
                                    <p>Please continue using our different services</p>
                                    <p>We will glad to serve you</p>

                                </div>
                            </div>
                        </td>

                        <td class="td-container" >
                            <div class="modal-content">
                                <div class="modal-header" >
                                    <h2> Services We Provide</h2>
                                </div>
                                <div class="modal-body">
                                    <p ><MdIcons.MdAccountBalance style={{ color: 'purple', fontSize: '37px' }} />&nbsp;&nbsp;Zero Balance Account</p>
                                    <p ><MdIcons.MdOutlineSummarize style={{ color: 'purple', fontSize: '37px' }} />&nbsp;&nbsp;Online Transactions And Account Summary</p>
                                    <p><AiIcons.AiOutlineForm style={{ color: 'purple', fontSize: '37px' }} />&nbsp;&nbsp;Online Loan Application</p>
                                    <p><FcIcons.FcCustomerSupport style={{ color: 'purple', fontSize: '37px' }} />&nbsp;&nbsp;Customer Support</p>
                                </div>
                            </div>
                        </td>
                    </tr>

                </table>
                <div>
                    <marquee class="wpanel_marquee" id="message">
                        <p class="message">&nbsp;&nbsp;SBM never asks for your Card/PIN/OTP/CVV details on phone,message or email. For safty please do not provide your confidential information to anyone. </p>
                    </marquee>
                </div>
                <div> <footer className="footer"> <AiIcons.AiOutlineCopyright /> &nbsp; State Bank of Mysore</footer></div>
            </div>






        </div>


    );
}
export default Home;