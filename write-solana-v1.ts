import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import base58 from 'bs58'
import { SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js'

async function main() {
    const transaction = new Web3.Transaction();
    
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: new Web3.PublicKey('BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U'),
        toPubkey: new Web3.PublicKey('FemGKc5MWGFEDiYv12xDC24X6DTVLU7ZjX4gcvExmNid'),
        lamports: 0.1 * LAMPORTS_PER_SOL
    })
    transaction.add(sendSolInstruction)

    const base58DecodePK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const keyPairFromSecret = Web3.Keypair.fromSecretKey(base58DecodePK)

    const connection = new Web3.Connection(Web3.clusterApiUrl('testnet'))

    const txHash = await sendAndConfirmTransaction(connection, transaction, [keyPairFromSecret])
    console.log('txtHash ', txHash)
}

main()