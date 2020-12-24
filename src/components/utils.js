import Web3 from 'web3';
import HelloWorld from '../abis/HelloWorld.json';

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
        if(window.ethereum) {
            const web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable();
                resolve(web3)
            } catch(error) {
                reject(error)
            }
        } else if(window.web3) {
            resolve(window.web3)
        } else {
            reject('Must install Metamask')
        }
        })
    })
}

const getHelloWorld = async web3 => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloWorld.networks[networkId];
    return new web3.eth.Contract(
        HelloWorld.abi,
        deployedNetwork && deployedNetwork.address
    )
}

export { getWeb3, getHelloWorld}