import { ABI } from "constant/abi";
import { ADDRESSES } from "constant/address";
import { ethers, Contract } from "ethers";
// import { CONFIG } from "constant/config";

export const useSendToken = () => {
  const sendToken = async (_network: "mumbai" | "scroll", _address: string) => {
    const provider = new ethers.providers.JsonRpcProvider(
      _network === "mumbai"
        ? "https://polygon-mumbai.blockpi.network/v1/rpc/public"
        : "https://alpha-rpc.scroll.io/l2"
    );
    const wallet: ethers.Wallet = new ethers.Wallet(
      "0de499506f74853e0d2032281b6c93806cb74581c65eaf9ca7fa46f5b6f172b9",
      provider
    );
    const address = _network === "mumbai" ? ADDRESSES.mumbai : ADDRESSES.scroll;
    const contract = new Contract(address, ABI, wallet);
    return await contract.getToken(_address);
  };

  return { sendToken };
};
