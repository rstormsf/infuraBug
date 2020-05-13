const Web3 = require('web3')
const web3Infura = new Web3(process.env.INFURA_RPC)
const web3ReliableRpc = new Web3(process.env.RELIABLE_RPC)

const contractAddress = '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF'

const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'commitment',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'leafIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'Deposit',
    type: 'event'
  }
]

const tornadoInfura = new web3Infura.eth.Contract(ABI, contractAddress)
const tornadoReliable = new web3ReliableRpc.eth.Contract(ABI, contractAddress)

async function main() {
  const infuraEvents = await tornadoInfura.getPastEvents('Deposit', {
    fromBlock: 9117720,
    toBlock: 'latest'
  })
  console.log('infura events length = ', infuraEvents.length)
  const reliableEvents = await tornadoReliable.getPastEvents('Deposit', {
    fromBlock: 9117720,
    toBlock: 'latest'
  })
  console.log('reliable rpc lenght = ', reliableEvents.length)
}
main()
