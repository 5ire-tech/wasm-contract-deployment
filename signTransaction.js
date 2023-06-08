import { CodePromise, Abi, ContractPromise } from '@polkadot/api-contract';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { BN, BN_ONE } from '@polkadot/util';
// import .contract file as json string
import { json } from "./abi.js"

const MAX_CALL_WEIGHT = new BN(500_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);

try {

    // API creation for connection to the chain
    const wsProvider = new WsProvider('wss://wss-testnet.5ire.network/');
    const api = await ApiPromise.create({ provider: wsProvider });


    // gas limit for deployment
    //const gasLimit = 100000n * 1000000n
    const gasLimit = api.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
    });


    // adding fire account for paying the gas fee
    const PHRASE = 'negative cheap cherry uncover absurd angle swarm armor tuna lounge hurdle lawsuit';
    const keyring = new Keyring({ type: "ed25519" });
    const userKeyring = keyring.addFromMnemonic(PHRASE);
    // parameters for constructor function inside the contract

    // Put your contract address that you already deployed
    const contract = new ContractPromise(api, json, '5DtUeGKHRjSpk79R5GuD6iuH67bZwkXXxRbtsWXgih2BvGG6');

    
    let tokenId = 2;
    // Mint tokenId from contract
    const tx = contract.tx.mint({
        gasLimit: gasLimit,
        storageDepositLimit: null,
    }, tokenId);

    const unsub = await tx.signAndSend(
        userKeyring,
        (result) => {
            if (result.status.isInBlock || result.status.isFinalized) {
                console.log("Block finalized");
                unsub();
            }
        }
    );


    
}
catch (err) {
    console.log("error", err.toString())
}
