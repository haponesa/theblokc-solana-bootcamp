import { createAccount } from '@solana/spl-token';
import '../src/css/bootstrap.css'
// import fs from "fs";
import idl from "./idl.json";

import * as anchor from '@project-serum/anchor';
import { BN} from '@project-serum/anchor';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletWalletAdapter } from '@solana/wallet-adapter-wallets';

import { clusterApiUrl, Transaction, SystemProgram, Keypair, PublicKey, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');


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
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
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

const Content = () => {
    const wallet = useAnchorWallet();
    const bAccount = Keypair.generate();

    const getProvider = () => {
        if (!wallet) {
            return null;
        }
        const network = clusterApiUrl('devnet');
        const connection = new Connection(network, "processed");
        const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())

        return provider;
    }

    const [hasInitialize, setInit] = useState();
    const createAccount = async () => {
        const provider = getProvider(); //Call important function to get provider

        if (!provider) {
            throw("Provider NULL")
        }

        const a = JSON.stringify(idl); //Import to parse idl, otherwise error will show
        const b = JSON.parse(a);
        const program = new anchor.Program(b, idl.metadata.address, provider)
        console.log("PROGRAM: ", program);

        try {
            await program.rpc.initialize({
                accounts: {
                    baseAccount: bAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                },
                signers: [bAccount],
            })

            setInit(1);
            const account = await program.account.init.fetch(bAccount.publicKey);
            console.log("ACCOUNT: ", account);

        } catch (err) {
            console.log("ERR: ", err);
        }
    }

    const [inputValue, setInputValue] = useState();
    const onInputChange = (event) => {
        const { value } = event.target
        setInputValue(value)
    }

    
    const getValue = async () => {
        const provider = getProvider(); //Call important function to get provider

        if (!provider && !inputValue) {
            throw("Provider NULL")
        }

        const a = JSON.stringify(idl); //Import to parse idl, otherwise error will show
        const b = JSON.parse(a);
        const program = new anchor.Program(b, idl.metadata.address, provider)
        console.log("INPUT_VAL: ", inputValue);

        try {
            await program.rpc.updateValue(inputValue, {
                accounts: {
                    baseAccount: bAccount.publicKey,
                },
            })

            const account = await program.account.init.fetch(bAccount.publicKey);
            console.log("ACCOUNT_UPDATEVALUE: ", account.value.toString());

        } catch (err) {
            console.log("ERR: ", err);
        }
    }


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

            { !hasInitialize ?
                <div className='btn-center'>
                    <button className='btn' onClick={createAccount}>Start Posting</button>
                </div>

                :

                <div className='btn-center'>
                    <input placeholder="Enter text to post" type="text" onChange={onInputChange}></input>
                    <button className='btn' onClick={getValue}>Post</button>
                </div>

            }

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
