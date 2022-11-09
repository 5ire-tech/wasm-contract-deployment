Step1. Clone this repo <br>
Step2. cd to this repo and open it in VScode run 'npm i'<br>
Step3. paste the contents of the '.contract' file into abi.js and format the contents using the prettier extention of VScode (right click>format document with>prettier)<br>
Step4. in deploy.js:ln15 change the input parameter in wsProvider (input the endpoint for the chain you want to connect)<br>
Step5. in deploy.js:ln38 change the PHRASE variable (input the mnemonic phrase of an account holding some gas fees)<br>
Step6. run 'node deploy.js'<br>
Step7. look at the magic happening<br>
