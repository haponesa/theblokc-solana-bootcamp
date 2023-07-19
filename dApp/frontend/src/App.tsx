import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { Button } from '@solana/wallet-adapter-react-ui/lib/types/Button';

import '../src/css/bootstrap.css'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,

} from '@solana/wallet-adapter-wallets';
import fs from "fs";

import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';

import { Connection} from '@metaplex/js'; 



require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');
let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"
function getWallet(){

    
}
const App: FC = () => {


    return (
        <Context>
            <Content />
        </Context>
    );
};


export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );

   

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    let [lamports, setLamports] = useState(.1);
    let [wallet, setWallet] = useState("9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9");

  
    

    // const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl("devnet"))
    const { publicKey, sendTransaction } = useWallet();


 

    const onClick = useCallback( async () => {

        if (!publicKey) throw new WalletNotConnectedError();
        connection.getBalance(publicKey).then((bal) => {
            console.log(bal/LAMPORTS_PER_SOL);

        });

        let lamportsI = LAMPORTS_PER_SOL*lamports;
        console.log(publicKey.toBase58());
        console.log("lamports sending: {}", thelamports)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(theWallet),
                lamports: lamportsI,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    
    // function setTheLamports(e: any)
    // {
    //     console.log(Number(e.target.value));
    //     setLamports(Number(e.target.value));
    //     lamports = e.target.value;
    //     thelamports = lamports;
    // }
    // function setTheWallet(e: any){
    //     setWallet(e.target.value)
    //     theWallet = e.target.value;
    // }

    return (
        <div className="App">
            <div className="navbar">
                <div className="navbar-inner ">
                    <h2 className="pull-left">Solana Developer Bootcamp dApp</h2>
                    <div className="nav pull-right">
                        <WalletMultiButton />
                    </div>
                </div>
            </div>

            <input placeholder="Enter text to post" type="text" onChange={(e) => e.target.value}></input>
            <button className='btn' onClick={onClick}>Post</button>

            <hr />

            {/* post feed area */}
            <div className="container">
                <div className="row">

                    <div className="col-sm-1">
                        <div className="card">
                            <div className="card-header"><small><strong>lvnkgw</strong></small></div><br />
                            <div className="card-body">
                                {/* post content */}
                                <p className="card-text">Sample text post lorem ipsum dolor amit</p>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="col-sm-1">
                        <div className="card">
                            <div className="card-header"><small><strong>lvnkgw</strong></small></div><br />
                            <div className="card-body">
                                {/* post content */}
                                <p className="card-text">Another sample text post lorem ipsum dolor amit</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
