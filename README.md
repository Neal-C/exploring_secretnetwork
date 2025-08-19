# Exploring Secret Network


## Resources

- https://scrt.network/
- https://docs.scrt.network/secret-network-documentation
- https://www.intel.com/content/www/us/en/developer/tools/software-guard-extensions/attestation-services.html
- https://www.nvidia.com/en-us/data-center/solutions/confidential-computing/

## Notes

- A private by default design

- Secret contracts are an altered version of the CosmWasm Rust based smart contract framework and share many resemblance. The version of Secret is altered in such a way that all executions are done inside the secure enclave requiring additional data verification and more.

- Secret Network is built with the Cosmos SDK and the Tendermint consensus engine

- Secret Network uses a combination of the Intel SGX (Software Guard Extension) Trusted Execution Environment technology, several encryption schemes, and key management to bring privacy by default to blockchain users.

- Secret Contracts are an implementation of the Rust-based smart contract compiling toolkit CosmWasm, adding private metadata possibilities.

- The decentralized network of computers that host Secret Network come to a consensus (delegated Proof-of-Stake — Byzantine Fault Tolerance) without ever obtaining access to the data they process. Users can use “viewing keys” to view their sensitive data or enable third parties to do the same.

- Secret Network uses Intel's Software Guard Extensions (SGX) implementation of TEE technology. TEE refers to a secure area of a processor where data is inaccessible to any other component in the system. A TEE acts as a blackbox for computation, input and output can be known, but the state inside the TEE is never revealed.

- Intel’s Software Guard Extensions (SGX) is a set of security-related instructions built into certain Intel CPUs enabling TEEs. By using SGX chips, the chip owners, system operators, and observers have strong cryptographic guarantees that no party can view what's happening inside of the Secret memory space.

- Secret Network leverages TEE technology to do computation with encrypted input, output, and state. The consensus and computation layer of the Secret Network is combined; every validator uses an Intel SGX CPU and processes every transaction.

- Private metadata used in Secret Contracts is encrypted before sent to validators for computation. Data is only decrypted inside the TEE of any specific validator, which is inaccessible to them. Computations following the smart contract are done over the decrypted data and the output is encrypted and written to state.

- Remote attestation, an advanced feature of Intel SGX, is the process of proving an enclave is established in a secure hardware environment. A remote party should be able to verify that the right application is running inside an enclave on an Intel SGX enabled platform.

- Remote attestation gives the relying party increased confidence that the software is running: Inside an Intel® Software Guard Extension (Intel® SGX) enclave, On a fully updated system at the latest security level (also referred to as the trusted computing base (TCB) version)

Attestation results provide: The identity of the software being attested, Details of an unmeasured state (such as the execution mode), An assessment of possible software tampering

- After an enclave successfully attests itself to a relying party, an encrypted communication channel can be established between the two. Secrets, such as credentials or other sensitive data, can be provisioned directly to the enclave.

- Enclaves generate and contain their private signing/attestation keys, preventing access from any entity outside of each enclave

- SGX is one of the most widely adopted technologies for TEEs, it is also battle-hardened. Attacks are often theoretical, executed in laboratory settings, and are rapidly addressed by Intel. Many high-value targets exist that have not been compromised. No privacy solution is 100% secure, but Secret Network believes the security guarantees provided by Intel SGX are adequate for a wide range of use cases.

- Secret AI uses NVIDIA Confidential Computing, with Trusted Execution Environment (TEE) capabilities to provide fully confidential AI interactions

- Secret AI aims to offer a secure, decentralized platform where users can engage with AI models without fear of data leakage or unauthorized access.

- SecretVM is the Confidential Virtual Machine framework of Secret Network, allowing developers to easily deploy and run secure workloads within Trusted Execution Environments (TEEs). With advancements in TEEs—such as Intel® Trust Domain Extensions (TDX) and AMD Secure Encrypted Virtualization (SEV)—arbitrary workloads can now be executed securely and verifiably in a decentralized setting.

## Bugs

- Their getting-started example is broken, the template does not work
- CI makes opinionated choices
- A few setup and Docker bugs, so I removed the Makefile

## Instructions

### With Docker

```bash
git clone https://github.com/Neal-C/exploring_secretnetwork.git
```

```bash
cd exploring_secretnetwork
```

```bash
docker build -t neal-c-scrtnetwork:latest .
```

```bash
docker run --name neal-c-scrtnetwork neal-c-scrtnetwork:latest
```

### With local installation

Requirements: Rust >= 1.89.0

```bash
git clone https://github.com/Neal-C/exploring_secretnetwork.git
```

```bash
cd exploring_secretnetwork
```

#### Build

```bash
RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown
```

```bash
cp ./target/wasm32-unknown-unknown/release/*.wasm ./contract.wasm
cat ./contract.wasm | gzip -9 > ./contract.wasm.gz
```

#### Test

```bash
cargo unit-test
```

#### Deploy

Requirements: Rust >= 1.89.0, Bun >= 1.2.20

needs : build step

```bash
cp .env.example .env
```

```bash
bun install
```

```bash
bun run upload.ts
```
