import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useSendTx } from "hooks/useSendTx";
import LOGO from "assets/logo.png";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import LoadingSpin from "react-loading-spin";
import { ethers } from "ethers";

const Faucet = () => {
  const { address } = useAccount();
  const { initTx } = useSendTx();
  const [spin, setSpin] = useState<boolean>(false);
  const [inputAddress, setInputAddress] = useState<string>("");

  const sendTxMutation = useMutation({
    mutationFn: () => initTx(inputAddress),
    onError: (err: AxiosError<any>) => {
      toast.error(err.response?.data.message);
      setSpin(false);
    },
    onSuccess: () => {
      localStorage.setItem(
        "zksyncEraBasicControl",
        "https://www.youtube.com/shorts/w-L2H8jVa44"
      );
      toast.success("0.01 ETH sent to your wallet!");
      setSpin(false);
    },
  });

  const handleButton = () => {
    if (!ethers.utils.isAddress(inputAddress)) {
      toast.error("It is not valid address!");
      return;
    }
    const sentBefore: string | null = localStorage.getItem(
      "zksyncEraBasicControl"
    );
    if (sentBefore === "https://www.youtube.com/shorts/w-L2H8jVa44") {
      toast.warn("You have already minted!");
      return;
    }
    setSpin(true);
    sendTxMutation.mutate();
  };

  // useEffect(() => {}, [address]);
  return (
    <div className="flex justify-center mt-2.5 flex-col items-center ">
      <img className="w-60 mb-5" src={LOGO}></img>
      <div className="mb-10 text-white text-center">
        zkSync Era Testnet Faucet
      </div>
      {/* <ConnectButton showBalance={true} />
      {address && (
        <button
          type="button"
          onClick={() => {
            if (address) {
              handleButton();
            }
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
        >
          {spin ? <LoadingSpin size={"24px"} /> : "Give me some ETH!"}
        </button>
      )} */}
      <input
        className="w-72 h-10 rounded-md p-2 focus:border-transparent border-indigo-600 border-2 focus:border-4"
        type="text"
        value={inputAddress}
        placeholder="Your Address"
        onChange={(e) => {
          setInputAddress(e.target.value.toString());
        }}
      ></input>
      <button
        type="button"
        onClick={() => {
          handleButton();
        }}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
      >
        {spin ? <LoadingSpin size={"24px"} /> : "Give me some ETH!"}
      </button>
    </div>
  );
};
export { Faucet };
