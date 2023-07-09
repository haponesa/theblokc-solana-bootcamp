import { createMetaplexInstance } from "./metaplex"

async function main() {
    const metaplex = createMetaplexInstance()
    const metadataUri = 'https://arweave.net/EGAFBkhInR6ciHOmQSXs3Nqn1JwZ8_FLHcAx8GWeeuI' //metadata link
    const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: 'SolDevBootcamp',
        sellerFeeBasisPoints: 0,
    })
    console.log('nft ', nft);

    /******************
        {
            model: 'nft',
            updateAuthorityAddress: PublicKey [PublicKey(BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U)] {
                _bn: <BN: 9b7eb3d78978025d94f800dee89bb9270542040f0c5a2bc15171a8d454228ecb>
            },
            json: {
                name: 'lvnkgw.sol.NFT',
                description: "Love's first Solana NFT using Metaplex Token Standard. Wabi-sabi Airbnb unit at Air Residences, Makati City",
                image: 'https://arweave.net/rIAczBF0CtQGX72G-H66NceKJnMkXCT81saJegsq6vw',
                attributes: [ [Object] ]
            },
            jsonLoaded: true,
            name: 'SolDevBootcamp',
            symbol: '',
            uri: 'https://arweave.net/EGAFBkhInR6ciHOmQSXs3Nqn1JwZ8_FLHcAx8GWeeuI',
            isMutable: true,
            primarySaleHappened: false,
            sellerFeeBasisPoints: 0,
            editionNonce: 254,
            creators: [
                {
                address: [PublicKey [PublicKey(BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U)]],
                verified: true,
                share: 100
                }
            ],
            tokenStandard: 0,
            collection: null,
            collectionDetails: null,
            uses: null,
            programmableConfig: null,
            address: PublicKey [PublicKey(9jtjkK88sTz9PkHezvwyWLUxgU91wYkr87uihw1QwT5x)] {
                _bn: <BN: 81da637c8e31183b09b9543234af410c94c55b8cc061f55a8bae587c5ddd8e27>
            },
            metadataAddress: Pda [PublicKey(GURBkkRg68yFoQQW9ZyfxAx7P47XSadiYJxh4KVZyxLz)] {
                _bn: <BN: e5e555105583af476a36845ab865ff7db75c1123f82be4951984c08dd4dfa983>,
                bump: 253
            },
            mint: {
                model: 'mint',
                address: PublicKey [PublicKey(9jtjkK88sTz9PkHezvwyWLUxgU91wYkr87uihw1QwT5x)] {
                _bn: <BN: 81da637c8e31183b09b9543234af410c94c55b8cc061f55a8bae587c5ddd8e27>
                },
                mintAuthorityAddress: PublicKey [PublicKey(DVhjSdQbaq2WPm2fDtVdJbtFbKdArkuLD6C3H8zeEXGo)] {
                _bn: <BN: b9a68fb2438e6263d8db69d344f8bdf3b7b2e8207c789d0187b65df923676d84>
                },
                freezeAuthorityAddress: PublicKey [PublicKey(DVhjSdQbaq2WPm2fDtVdJbtFbKdArkuLD6C3H8zeEXGo)] {
                _bn: <BN: b9a68fb2438e6263d8db69d344f8bdf3b7b2e8207c789d0187b65df923676d84>
                },
                decimals: 0,
                supply: { basisPoints: <BN: 1>, currency: [Object] },
                isWrappedSol: false,
                currency: { symbol: 'Token', decimals: 0, namespace: 'spl-token' }
            },
            token: {
                model: 'token',
                address: Pda [PublicKey(EwAHmBYW29vLk5i7mxxcWuiRnbhpMQRSNXShELAayJ4P)] {
                _bn: <BN: cf07cbfd4a0c0cead4631bee17e3e89a3fdb216c1b0366e2c59db37da4a52bd8>,
                bump: 255
                },
                isAssociatedToken: true,
                mintAddress: PublicKey [PublicKey(9jtjkK88sTz9PkHezvwyWLUxgU91wYkr87uihw1QwT5x)] {
                _bn: <BN: 81da637c8e31183b09b9543234af410c94c55b8cc061f55a8bae587c5ddd8e27>
                },
                ownerAddress: PublicKey [PublicKey(BTzFUJ5aMM6n1Uq5Aiy6jCSn8e9fNx6Vn3tkYNwLBh9U)] {
                _bn: <BN: 9b7eb3d78978025d94f800dee89bb9270542040f0c5a2bc15171a8d454228ecb>
                },
                amount: { basisPoints: <BN: 1>, currency: [Object] },
                closeAuthorityAddress: null,
                delegateAddress: null,
                delegateAmount: { basisPoints: <BN: 0>, currency: [Object] },
                state: 1
            },
            edition: {
                model: 'nftEdition',
                isOriginal: true,
                address: Pda [PublicKey(DVhjSdQbaq2WPm2fDtVdJbtFbKdArkuLD6C3H8zeEXGo)] {
                _bn: <BN: b9a68fb2438e6263d8db69d344f8bdf3b7b2e8207c789d0187b65df923676d84>,
                bump: 254
                },
                supply: <BN: 0>,
                maxSupply: <BN: 0>
            }
        }
    
    ***************/
}

main()