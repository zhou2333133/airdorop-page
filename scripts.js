const airdropContractAddress = '0x86a3Eb671910D6a5c83119891b4D306a2639D89F';
const airdropContractABI = [
  {
    "inputs": [],
    "name": "claimAirdrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3;
let userAddress;

document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      document.getElementById('claim-airdrop').disabled = false;
      alert(`钱包连接成功：${userAddress}`);
    } catch (error) {
      alert('连接钱包失败，请重试。');
    }
  } else {
    alert('请安装 MetaMask 或其他兼容钱包插件。');
  }
});

document.getElementById('claim-airdrop').addEventListener('click', async () => {
  if (!web3 || !userAddress) {
    alert('请先连接钱包！');
    return;
  }

  const contract = new web3.eth.Contract(airdropContractABI, airdropContractAddress);

  try {
    await contract.methods.claimAirdrop().send({ from: userAddress });
    alert('空投领取成功！🎉');
  } catch (error) {
    console.error(error);
    alert('领取失败，请检查是否已领取或稍后再试。');
  }
});
