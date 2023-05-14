import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import { useSendTx } from "hooks/useSendTx";
import LOGO from "assets/logo2.png";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import LoadingSpin from "react-loading-spin";
import { ethers } from "ethers";
import { useSendToken } from "hooks/useSendToken";

const Faucet = () => {
  const { address } = useAccount();
  // const { initTx } = useSendTx();
  const { sendToken } = useSendToken();
  const [spin, setSpin] = useState<boolean>(false);
  const [network, setNetwork] = useState<"mumbai" | "scroll">("scroll");
  const [inputAddress, setInputAddress] = useState<string>("");

  const sendTxMutation = useMutation({
    mutationFn: () => sendToken(network, inputAddress),
    onError: (err: AxiosError<any>) => {
      console.log("ehrehher");
      toast.error("You already got ETH or Faucet contract is empty");
      setSpin(false);
    },
    onSuccess: () => {
      toast.success(`0.01 ETH sent to your wallet on ${network}!`);
      setSpin(false);
    },
  });

  const handleButton = () => {
    if (!ethers.utils.isAddress(inputAddress)) {
      toast.error("It is not valid address!");
      return;
    }
    setSpin(true);
    sendTxMutation.mutate();
  };

  // useEffect(() => {}, [address]);
  return (
    <div className="flex justify-center  flex-col items-center ">
      <div className="flex justify-between items-center  w-72 mb-5">
        <button
          type="button"
          onClick={() => {
            setNetwork("scroll");
          }}
          className="w-16 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
          style={{ backgroundColor: network !== "scroll" ? "" : "#4B5563" }}
        >
          Scroll
        </button>
        <button
          type="button"
          onClick={() => {
            setNetwork("mumbai");
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
          style={{ backgroundColor: network !== "mumbai" ? "" : "#4B5563" }}
        >
          Mumbai
        </button>
      </div>
      <div className="mb-5 text-white text-center text-3xl font-bold">
        Piggy Faucet
      </div>
      <img className="w-60 mb-5" src={LOGO} alt=""></img>
      <div className="mb-10 text-white text-center">{network} faucet</div>
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
