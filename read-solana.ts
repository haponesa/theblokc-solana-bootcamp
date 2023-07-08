import * as Web3 from '@solana/web3.js'

const publicKey = new Web3.PublicKey('BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U');

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    
    const balance = await connection.getBalance(publicKey)
    console.log('balance ', balance);

    const accountInfo = await connection.getAccountInfo(publicKey)
    console.log('accountInfo ', accountInfo?.data.toString());
}

main()