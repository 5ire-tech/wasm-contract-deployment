import { CodePromise, Abi, ContractPromise } from '@polkadot/api-contract';
import { ApiPromise, WsProvider, Keyring} from '@polkadot/api';

// import .contract file as json string
import { json } from "./abi.js"

import {
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
} from "@polkadot/util-crypto";

try {
  let address; // variable for storing the address of the deployed contract 

  // API creation for connection to the chain
  const wsProvider = new WsProvider('Thunder: wss://wss-testnet.5ire.network/');
  const api = await ApiPromise.create({ provider: wsProvider });

  
  // convert json into usable contract ABI 
  let contractAbi = new Abi(json, api?.registry?.getChainProperties());

  // instantiating wasm blob on the blockchain
  const code = new CodePromise(api, json, json.source.wasm);
  
  // gas limit for deployment
  const gasLimit = 100000n * 1000000n
  
  // endoement
  const value = 100n * 1000n
  
  
  // adding fire account for paying the gas fee
  const PHRASE = 'negative cheap cherry uncover absurd angle swarm armor tuna lounge hurdle lawsuit';
  const seedUser = mnemonicToMiniSecret(PHRASE);
  const keyring = new Keyring({ type: "ed25519" });
  const userKeyring = keyring.addFromPair(naclKeypairFromSeed(seedUser));

  // parameters for constructor function inside the contract
  let params = [];
  params.push(userKeyring.publicKey);
  params.push(userKeyring.publicKey);

  let constructorIndex = 0;

  try {

    // upload wasm blob
    let transferMethod = code && contractAbi?.constructors[constructorIndex]?.method && value
      ? code.tx[contractAbi.constructors[constructorIndex].method]({
        gasLimit: gasLimit,
        storageDepositLimit: null,
        value: value
      }, ...params)
    : null;

    // code deploy
    const unsub = await transferMethod.signAndSend(userKeyring, async (response) => {
      if (response.status.isInBlock || response.status.isFinalized) {
        address = response.contract.address.toString();
        console.log("address ====== ", address);
        unsub();
      }
    });

} catch (e) {
    console.log("error catch", e);
}
}
catch(err){
  console.log("error",err.toString())
}
