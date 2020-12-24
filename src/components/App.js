import './App.css';
import React, {useState, useEffect} from 'react'
import {getWeb3, getHelloWorld} from './utils'
import Navbar from './Navbar'
import StringList from './StringList';
import Web3 from 'web3'
import Button from 'react-bootstrap/Button'

function App() {
  const [string, setString] = useState(undefined)
  const [strings, getStrings] = useState([])
  const [accounts, setAccounts] = useState(undefined)
  const [HelloWorld, setHelloWorld] = useState(undefined)
  const [savedMessages, setSavedMessages] = useState([])
 



  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const HelloWorld = await getHelloWorld(web3)
      const savedMessages = await HelloWorld.methods.getMessage().call()
      setAccounts(accounts)
      setHelloWorld(HelloWorld)
      setSavedMessages(savedMessages)
    } 
    init();
  }, [])

  useEffect(() => {
    async function listenMMAccount() {
      const web3 = await getWeb3()
      window.ethereum.on("accountsChanged", async function() {
        window.location.reload()
        console.log(accounts);
      });
    }
    listenMMAccount();
  }, []);

  const stringSet = async (t) => {
    t.preventDefault();
    // const accounts = await window.ethereum.enable();
    // const account = accounts[0]
    const gas = await HelloWorld.methods.setMessage(string).estimateGas();
    const post = await HelloWorld.methods.setMessage(string).send({
      from: accounts[0],
      gas,
    }).on('transactionHash', (hash) => {
      window.location.reload()
    })
  }

  return (
    <div>
      <Navbar />
    <div className="main">

      <div className="card">

        <form className="form" onSubmit={stringSet}>
          <label>
            Set your String!
          <input
            className="input"
            type="text"
            name="name"
            onChange={(t) => setString(t.target.value)}
          />
          </label>
          <Button variant="primary" type="submit" value="Submit">
            Submit
          </Button>

        </form>
        <br />

        <StringList savedMessages={savedMessages}/>
      </div>
    </div>
    </div>
  );
}

export default App;
