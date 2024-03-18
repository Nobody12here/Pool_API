const { Web3 } = require('web3');
const  contractABI  = require('./contractABI');
const express = require('express');
const app = express();
const contract_address = '0xA1f4D218eF854521C78c0C078d9ac79D8BCb6e8c'
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        `https://sepolia.infura.io/v3/bb27752d9dc94ef8bb759f8f4a4083d6`,
    ),
);
const contractInstance = new web3.eth.Contract(contractABI, contract_address);
app.get('/pool-value/:days', async (req, res) => {
    try {
        // Call the function from the smart contract
        const day = req.params.days;    
        let poolValue = await contractInstance.methods.pool(day).call();
        poolValue = web3.utils.fromWei(poolValue, 'ether');
        console.log(poolValue)
        res.json({ poolValue });
    } catch (error) {
        console.error('Error fetching pool value:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
