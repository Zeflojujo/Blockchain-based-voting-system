
module.exports = {

  contracts_build_directory: "./src/abi",

  networks: {

    development: {
     host: "127.0.0.1",     
     port: 7545,            
     network_id: "5777",       // Any network (default: none)
     gas: 6721975,
    },
  },
   // An additional network, but with some advanced options…
    // advanced: {cd 
    //   port: 7545,             // Custom port
    //   network_id: 5777,       // Custom network
    //   gas: 85000000,           // Gas sent with each transaction (default: ~6700000)
    //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //   // from: <address>,        // Account to send transactions from (default: accounts[0])
    //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
    // },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      //  settings: {         // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 20000
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
