import { useInitialTheme } from "hooks/useInitialTheme";
import { Main } from "pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, Chain } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const zksyncEraTestnetChain: Chain = {
  id: 280,
  name: "zkSync Era Testnet",
  network: "zkSync Era Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.era.zksync.dev"],
    },
    public: {
      http: ["https://testnet.era.zksync.dev"],
    },
  },
  blockExplorers: {
    default: { name: "zksync", url: "https://zksync2-testnet.zkscan.io/" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [zksyncEraTestnetChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ITU Blockchain Zksync Era Testnet Faucet",
  projectId: "0",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  useInitialTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode={true}>
          <Main />
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;
