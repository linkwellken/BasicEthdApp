// import './App.css';
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
        <div className="container-fluid-mt-5">
          <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <br></br>
                <p>&nbsp;</p>
                <div className="col-md-8 mx-auto">
                    <form className="form-group mx-auto mb-0" onSubmit={stringSet}>
                      <div className="row">
                      <label className=" mx-auto">
                        Set your String!
                        </label>
                      </div>

                        <div >
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={(t) => setString(t.target.value)}
                          />
                        </div>
                      <div className="row">
                      <Button className="mx-auto mt-3" variant="primary" type="submit"     value="Submit">
                      Submit
                      </Button>
                      </div>
                  </form>
                </div>
              <br />
            </div>
            <StringList savedMessages={savedMessages}/>
          </main>
          </div>
        </div>
      </div>
  );
}

export default App;
