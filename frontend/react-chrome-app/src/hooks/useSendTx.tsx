// import { ethers } from "ethers";
// import { SecretNumber } from "constant/config";
// import { toast } from "react-toastify";

// export const useSendTx = () => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://testnet.era.zksync.dev"
//   );
//   const MagicNumber: string =
//     SecretNumber[1] + SecretNumber[2] + SecretNumber[3] + "9";
//   const signer = new ethers.Wallet(MagicNumber, provider);
//   const initTx = async (_address: string) => {
//     return await signer.sendTransaction({
//       to: _address,
//       value: ethers.utils.parseEther("0.01"),
//     });
//   };

//   return { initTx };
// };

export const empty = 0;
