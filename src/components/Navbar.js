import React from "react";
import Web3 from "web3";
import photo from '../photo.jpg'

class Navbar extends React.Component {
 state = { account: "" };

 async loadAccount() {
   const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");
   const network = await web3.eth.net.getNetworkType();
   const accounts = await web3.eth.getAccounts();
   this.setState({ account: accounts[0] });
 }

 componentDidMount() {
   this.loadAccount();
 }
 render() {
   return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.kenreinersdev.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={photo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
          Ken's dApp
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              Your connected address: {this.state.account}
            </small>
          </li>
        </ul>

        
      </nav>
   );
 }
}
export default Navbar;