import { createMetaplexInstance } from "./metaplex"


const metaplex = createMetaplexInstance()

const metadata = {
    name: "lvnkgw.sol.NFT",
    description: "Love's first Solana NFT using Metaplex Token Standard. Wabi-sabi Airbnb unit at Air Residences, Makati City",
    image: "https://arweave.net/rIAczBF0CtQGX72G-H66NceKJnMkXCT81saJegsq6vw", //file link
    attributes: [
        {
            trait_type: 'Event',
            value: 'Solana Developers Bootcamp'
        }
    ]
}

async function main() {
    const { uri } = await metaplex.nfts().uploadMetadata(metadata)
    console.log('metadata uri', uri);
}

main()