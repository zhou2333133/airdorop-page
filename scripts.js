// scripts.js
const airdropContractAddress = '0xYourAirdropContractAddress'; // 这里填入你的空投合约地址
const airdropContractABI = [
  // 这里填入你的空投合约 ABI
  {
    "constant": true,
    "inputs": [],
    "name": "claimAirdrop",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      // 请求连接钱包
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('claim-airdrop').disabled = false;
      alert('钱包连接成功！');
    } catch (error) {
      alert('连接钱包失败，请重试。');
    }
  } else {
    alert('请安装 MetaMask 或其他支持的加密钱包。');
  }
});

document.getElementById('claim-airdrop').addEventListener('click', async () => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

  const contract = new web3.eth.Contract(airdropContractABI, airdropContractAddress);

  try {
    // 调用合约方法领取空投
    await contract.methods.claimAirdrop().send({ from: userAddress });
    alert('空投领取成功！');
  } catch (error) {
    alert('领取失败，请稍后再试。');
  }
});
