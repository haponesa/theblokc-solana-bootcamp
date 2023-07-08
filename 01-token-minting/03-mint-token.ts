import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'
import base58 from 'bs58'

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    const ownerOfTokenAccount = new Web3.PublicKey('BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U')
    const tokenMint = new Web3.PublicKey('f1GSBPodMHFwd6CyFQrmDHvGLFX7c5DZHARw6hmuHfd')
    const tokenAccount = new Web3.PublicKey('8NUBvgHJuaPeMtQvGpP4DV56zUTx6z6nxcXgicvay3of')

    const base58DecodePK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodePK)

    const mintToken = await token.mintTo(connection, signer, tokenMint, tokenAccount, ownerOfTokenAccount, 9)

    console.log('mintToken  ', mintToken)
    // 1 mintToken = 3gBHPJrwMBse8svzb2LXGk5VeLnmwzY4GyAZV9Q2YvgRHrjTbTaVjMHrh6DH73MJyzEKiUrvgbYEuLXfZkqKJUav 
    // 2 mintToken = DLzeBWqYtDvFei845WQuir8SdjeuB4vRCyg1LRnFjnNUtZwSCjyuqSrnaYKBkQYsuJxxaC3MfPFomowWgdhEARD 
}

main()