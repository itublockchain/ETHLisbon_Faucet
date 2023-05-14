import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Faucet = await ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy();
  console.log("Deployer Balance: ", await deployer.getBalance().toString());
  await faucet.deployed();
  const tx = {
    to: faucet.address,
    value: ethers.utils.parseEther("0.03"),
  };
  await deployer.sendTransaction(tx);
  console.log(` deployed to ${faucet.address}`);
  console.log("Deployer Balance: ", await deployer.getBalance().toString());

  console.log(
    `Block explorer URL: https://blockscout.scroll.io/address/${faucet.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
