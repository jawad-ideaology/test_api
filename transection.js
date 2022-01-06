const crypto = require("crypto");
const Common = require("ethereumjs-common");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

require("dotenv").config();
const { contractABI } = require("./ABI.json");

const tokenAddress = process.env.TOKEN_ADDRESS;
const web3 = new Web3(process.env.NETWORK);
const privateKey = process.env.PRIVATE_KEY;
const fromAddress = process.env.FROM_ADDRESS;

const common = Common.default.forCustomChain(
  "ropsten",
  {
    name: "eth",
    networkId: 3,
    chainId: 3,
  },
  "petersburg"
);

exports.transection = (toAddress, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      let private = await Buffer.from(privateKey, "hex");
      let contract = await new web3.eth.Contract(contractABI, tokenAddress, {
        from: fromAddress,
      });
      amount1 = await web3.utils.toWei(amount.toString(), "ether");
      count = await web3.eth.getTransactionCount(fromAddress);
      let rawTransaction = {
        from: await fromAddress,
        gasPrice: await web3.utils.toHex(web3.utils.toWei("5", "gwei")),
        gasLimit: await web3.utils.toHex(90000),
        to: await tokenAddress,
        value: 0x0,
        data: await contract.methods.transfer(toAddress, amount1).encodeABI(),
        nonce: await web3.utils.toHex(count),
      };
      let transaction = new Tx(rawTransaction, {
        common,
      });
      trx = await transaction.sign(private);
      hash = await web3.eth.sendSignedTransaction(
        "0x" + transaction.serialize().toString("hex")
      );
      return resolve({ status: 200, hash: { trx, hash } });
    } catch (error) {
      console.log(error);
      return resolve({ status: 401, hash: {} });
    }
  });
};
