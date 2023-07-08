import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'
import base58 from 'bs58'
import { SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js'

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    const publicKey = new Web3.PublicKey('BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U')

    const base58DecodePK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodePK)

    const tokenMint = await token.createMint(connection, signer, publicKey, publicKey, 9,)

    console.log('tokenMint ', tokenMint.toBase58())
    // mint = f1GSBPodMHFwd6CyFQrmDHvGLFX7c5DZHARw6hmuHfd
}

main()