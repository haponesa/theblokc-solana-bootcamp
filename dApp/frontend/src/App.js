import '../src/css/bootstrap.css'
// import fs from "fs";
import idl from "./idl.json";

import * as anchor from '@project-serum/anchor';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletWalletAdapter } from '@solana/wallet-adapter-wallets';

import { clusterApiUrl, SystemProgram, Keypair, Connection } from '@solana/web3.js';
import { useMemo, useState } from 'react';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const postArr = [];


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
    //const postArr = [];

    const getProvider = () => {
        if (!wallet) {
            return null;
        }
        const network = clusterApiUrl('devnet');
        const connection = new Connection(network, "processed");
        const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())

        return provider;
    }

    // get value from input
    const [inputValue, setInputValue] = useState();
    const onInputChange = (event) => {
        const { value } = event.target
        setInputValue(value)
    }

    const createPost = async () => {
        const provider = getProvider(); //Call important function to get provider
        const data = inputValue.toString()

        console.log('DATA: ', data);

        if (!provider) {
            console.log("PROVIDER ERROR")
        }

        const a = JSON.stringify(idl); //Import to parse idl, otherwise error will show
        const b = JSON.parse(a);
        const program = new anchor.Program(b, idl.metadata.address, provider)
        //console.log("PROGRAM: ", program);

        try {
            await program.rpc.createPost(data, {
                accounts: {
                    baseAccount: bAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                },
                signers: [bAccount],
            })

            const account = await program.account.init.fetch(bAccount.publicKey);
            console.log("ACCOUNT: ", account);
            
            postArr.unshift(account.value.toString());
            console.log("POSTS ARRAY FROM ACCOUNTS: ", postArr);

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

            { !wallet ? 
                <h4 className="btn-center">Please connect your wallet to start posting</h4> 
                
                :
                
                <div className='btn-center'>
                    <input placeholder="Enter text to post" type="text" onChange={onInputChange}></input>
                    <button className='btn' onClick={createPost}>Post</button>
                </div>
            }
            <hr />

            {/* post feed area */}
            <div className="container">
                <div className="row">

                    {/* Post items */}
                    {
                        !postArr.length ? 
                            <h4 className="btn-center">Create your first post above</h4> 
                        : 
                        postArr.map((post, i) => 
                            <div className="col-sm-1" key={i}>
                                <div className="card">
                                    <div className="card-header"><small><strong>lvnkgw</strong></small></div><br />
                                    <div className="card-body">
                                        <p className="card-text">{post}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    );
};
