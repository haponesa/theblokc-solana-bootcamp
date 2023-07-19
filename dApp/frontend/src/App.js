import * as anchor from '@project-serum/anchor';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../src/css/bootstrap.css'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,

} from '@solana/wallet-adapter-wallets';
// import fs from "fs";
import { clusterApiUrl, Transaction, SystemProgram, Keypair, PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';
import { Connection} from '@metaplex/js'; 
import idl from "./idl.json";

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const PROGRAM_KEY = new PublicKey(idl.metadata.address);


const App = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]); // You can also provide a custom RPC endpoint.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );

    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    //const { publicKey } = useWallet();

    const program = useMemo(() => {
        if (anchorWallet) {
        const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
        return new anchor.Program(idl, PROGRAM_KEY, provider)
        }
    }, [connection, anchorWallet])

    console.log(program,  "PROGRAM");

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content = () => {
    // const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl("devnet"))
    const { publicKey, sendTransaction } = useWallet();


    // post text
    const onClick = useCallback( async () => {

        // if (!publicKey) throw new WalletNotConnectedError();
        // connection.getBalance(publicKey).then((bal) => {
        //     console.log(bal/LAMPORTS_PER_SOL);

        // });

        // let lamportsI = LAMPORTS_PER_SOL*lamports;
        // console.log(publicKey.toBase58());
        // console.log("lamports sending: {}", thelamports)
        // const transaction = new Transaction().add(
        //     SystemProgram.transfer({
        //         fromPubkey: publicKey,
        //         toPubkey: new PublicKey(theWallet),
        //         lamports: lamportsI,
        //     })
        // );

        // const signature = await sendTransaction(transaction, connection);

        // await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

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
                        <hr />
                    </div>

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
