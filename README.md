# WASM Contract Deployment

### Prerequisites
- Node >= 16.0
- yarn

### Steps
1. Clone the repo 
    ```
    git clone https://github.com/5ire-tech/wasm-contract-deployment.git
2. Go inside the folder
    ``` 
    cd wasm-contract-deployment
3. Install the required dependencies
    ```
    yarn install

4. In `deploy.js:ln30` change the PHRASE variable (input the mnemonic phrase of the wallet having some 5ire coins to pay the transaction fee)
5. Run code using   
    ```
    node deploy.js
