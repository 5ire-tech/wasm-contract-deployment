# WASM Contract Deployment
### Steps
1. Clone the repo 
    ```
    git clone https://github.com/5ire-tech/wasm-contract-deployment.git
2. Go inside the folder
    ``` 
    cd wasm-contract-deployment
3. Insatll the required dependencies
    ```
    npm i
4.  In `deploy.js:ln15` change the input parameter in wsProvider (input the endpoint for the chain you want to connect)
5. In `deploy.js:ln38` change the PHRASE variable (input the mnemonic phrase of the wallet having some 5ire coins to pay the transaction fee)
6. Run code using   
    ```
    npm run
