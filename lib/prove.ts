import webProofProver from "./WebProofProver.json";
import webProofVerifier from "./WebProofVerifier.json";
import { Hex } from "viem";
import { anvil, sepolia } from "viem/chains";
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { webProofCached } from "./webProof";
import {
  createVlayerClient,
  type WebProof,
  type Proof,
} from "@vlayer/sdk";
import {
  createExtensionWebProofProvider,
  expectUrl,
  notarize,
  startPage,
} from "@vlayer/sdk/web_proof";


const CHAIN_ID = anvil.id;
const CHAIN = anvil;

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const PROVER_ADDRESS = process.env.NEXT_PUBLIC_PROVER_ADDRESS;
const VERIFIER_ADDRESS = process.env.NEXT_PUBLIC_VERIFIER_ADDRESS;
const PROVER_URL = process.env.NEXT_PUBLIC_PROVER_URL;


const walletClient = createWalletClient({
  chain: CHAIN,
  transport: http(RPC_URL),
  account: privateKeyToAccount(PRIVATE_KEY as Hex),
});

const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http(RPC_URL),
});


// TODO - remove this from solidity contract..
const twitterUserAddress = "0x0000000000000000000000000000000000000000"

export async function getWebProof() {
  const provider = createExtensionWebProofProvider({
    wsProxyUrl: "ws://localhost:55688",
  })

  const webProof = webProofCached;

  /*
  const webProof = await provider.getWebProof({
    proverCallCommitment: {
      address: PROVER_ADDRESS as `0x${string}`,
      proverAbi: webProofProver.abi,
      chainId: CHAIN_ID,
      functionName: "main",
      commitmentArgs: ["0x"],
    },
    logoUrl: "https://datawookie.dev/blog/2021/01/running-history-strava/card-strava.png",
    steps: [
      startPage("https://www.strava.com/login", "Go to strava login page"),
      expectUrl("https://www.strava.com/segments/25981978", "Log in"),
      notarize(
        "https://www.strava.com/athlete/segments/25981978/history",
        "GET",
        "Generate Proof of Strava activity",
      ),
    ],
  });
  */

  return webProof;
}

export async function callProver(tlsProof: WebProof): Promise<[Proof, string, Hex]> {
  const notaryPubKey =
    "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExpX/4R4z40gI6C/j9zAM39u58LJu\n3Cx5tXTuqhhu/tirnBi5GniMmspOTEsps4ANnPLpMmMSfhJ+IFHbc3qVOA==\n-----END PUBLIC KEY-----\n";

  const webProof = {
    tls_proof: tlsProof,
    notary_pub_key: notaryPubKey,
  };
  const vlayer = createVlayerClient({
    url: PROVER_URL,
  });

  console.log("Generating proof...");
  const hash = await vlayer.prove({
    address: PROVER_ADDRESS as `0x${string}`,
    functionName: "main",
    proverAbi: webProofProver.abi,
    args: [
      {
        webProofJson: JSON.stringify(webProof),
      },
      twitterUserAddress,
    ],
    chainId: CHAIN_ID,
  });
  const provingResult = await vlayer.waitForProvingResult(hash);
  console.log("Proof generated!", provingResult);
  return provingResult as [Proof, string, Hex];
};

export const getVerified = async (proof: Proof, proofId: string, proofHash: Hex) => {

  const txHash = await walletClient.writeContract({
    address: VERIFIER_ADDRESS as `0x${string}`,
    abi: webProofVerifier.abi,
    functionName: "verify",
    args: [proof, proofId, proofHash],
    chain: CHAIN,
    // account: walletClient.account,
  });
  console.log("Tx hash:", txHash)

  const verification = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    confirmations: 1,
    retryCount: 60,
    retryDelay: 1000,
  });
  console.log("Verified!", verification);
};
