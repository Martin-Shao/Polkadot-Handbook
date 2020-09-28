const Web3 = require('web3');
const fs = require("fs");
const solc = require('solc');
let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.info(web3)

//编译合约
let source = fs.readFileSync('Calc.sol', 'UTF-8').toString();
let calcCompiled = web3.eth.compile.solidity(source);

console.log(calcCompiled);
console.log("ABI definition:");
console.log(calcCompiled["info"]["abiDefinition"]);
//得到合约对象
let jsonInterface = calcCompiled['contracts'][':Calc']['interface'];
//获得abi
let abi = JSON.parse(jsonInterface);
//获取合约的代码
let bytecode = calcCompiled['contracts'][':Calc']['bytecode']
//得到合约对象
const calcContract = new web3.eth.Contract(abi, null, {
  data: '0x' + bytecode,
  defaultGas: '4700000'
});
//部署者的地址，当前取默认账户的第一个地址
let deployeAddr = web3.eth.accounts[0];
//部署合约
calcContract.deploy().send({
    from: deployeAddr
  })
  .on('error', (error) => {
    console.error(error)
  })
  .on('transactionHash', (transactionHash) => {
    console.log("transactionHash :" + transactionHash)
  })
  .on('receipt', (receipt) => {
    console.log("receipt:")
    console.log(receipt)
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log("confirmationNumber:" + confirmationNumber)
  }).then((newContractInstance) => {
    console.log(newContractInstance)
    console.log(newContractInstance.options.address) // instance with the new contract address
  });