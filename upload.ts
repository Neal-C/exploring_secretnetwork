import { SecretNetworkClient, Wallet } from "secretjs";
import * as fs from "fs";

const wallet = new Wallet(process.env.MNEMONIC);

const contract_wasm = fs.readFileSync("../contract.wasm.gz");

const secretjs = new SecretNetworkClient({
    chainId: "pulsar-3",
    url: "https://pulsar.lcd.secretnodes.com",
    wallet: wallet,
    walletAddress: wallet.address,
  });

let tx = await secretjs.tx.compute.storeCode({
    sender: wallet.address,
    wasm_byte_code: contract_wasm,
    source: "",
    builder: "",
  },{ gasLimit: 4_000_000, });

if (!tx.arrayLog) throw new Error("tx.arrayLog not found");

const log = tx.arrayLog.find((log) =>  log.type === "message" && log.key === "code_id")

if (!log) throw new Error("log not found");

const codeId = log.value;

console.log("codeId: ", codeId);

const contractCodeHash = (
  await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
).code_hash;

console.log(`Contract hash: ${contractCodeHash}`);