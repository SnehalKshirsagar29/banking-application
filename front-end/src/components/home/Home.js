import logo from '../../images/sbm.png';
import "./home.css";
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';

const Home = () => {
    return (
        
        <div className='home'>

            <div id = "header">
               <table class ="table-class" > 
                   <tr >
                        <th style = { {height: '-5px'}}><img src={logo} alt="Not Found" className="rounded" /></th>
                        <th  style = { {height: '-5px'}}><h1 class ="header-welcome">Welcome to State Bank of Mysore!</h1>
                             <span class="footnote">Building on a Century of Trust!</span></th>
                    </tr>                          
                    <tr>
                        <td class="td-container" style={ {paddingBottom: '0px' } }>
                        <div class="modal-content">
                          <div  class="modal-header" >
                              <h2 >Dear Customers,</h2>
                          </div>
                        <div class="modal-body"> 
                            <p> Welcome to the State Bank of Mysore NetBanking.</p>
                            <p>Its lighter look and feel is designed to give you the best possible user experience.</p>
                           <p>Please continue to login using your customer ID and password.</p>
                        </div>
                    </div>
         </td>
        
        <td  class="td-container"  style={ {paddingBottom: '0px' } } >     <div class="modal-content">
                <div class="modal-header" >
                <h2> Services We Provide</h2>
                </div>
                <div class="modal-body">
                    <p ><MdIcons.MdOutlineSummarize  style={{color: 'purple', fontSize: '50px'}}/>&nbsp;&nbsp;Transaction Summary</p>
                    <p><AiIcons.AiOutlineForm style={{color: 'purple', fontSize: '50px'}} />&nbsp;&nbsp;Online Loan Application</p>
                    <p><FcIcons.FcCustomerSupport style={{color: 'purple', fontSize: '50px'}} />&nbsp;&nbsp;Customer Care</p>
                    {/* <p> <IoIcons.IoIosNotificationsOutline/>Online Loan Application</p> */}
                 </div>
                </div></td>
                   </tr>   
                      
                </table>
                <div> 
                   <marquee class="wpanel_marquee" id="message">  
                   <p class= "message">SBM never asks for your Card/PIN/OTP/CVV details on phone, message or email. Please do not click on links received on your email or mobile asking your Bank/Card details</p>
                   </marquee>
                </div>
                <div> <footer className ="footer"> <AiIcons.AiOutlineCopyright/> &nbsp; State Bank of Mysore</footer></div>
            </div>
        </div>
    );
}
export default Home;