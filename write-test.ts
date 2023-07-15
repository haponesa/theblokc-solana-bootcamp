import 'dotenv/config'
import base58 from 'bs58'
import * as Web3 from '@solana/web3.js'
import { sendAndConfirmTransaction } from '@solana/web3.js'

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const publicKey = new Web3.PublicKey('BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U')

    const base58DecodePK = base58.decode(process.env.SOL_PRIVATE_KEY || '')
    const signer = Web3.Keypair.fromSecretKey(base58DecodePK)

    const transaction = new Web3.Transaction()

    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: new Web3.PublicKey("4HeQHtbPWwgAXkUD3EGtTdaJA7Px2yFoVJFr3a6Qf8zE")
    })
    transaction.add(instruction)
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [signer]
    )
    

    console.log('SIGNATURE', signature)
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
    })