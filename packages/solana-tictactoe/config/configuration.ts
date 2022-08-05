/** Configuration object used for automatic modyfing of `Anchor.toml` */
type ConfigurationObject = {
  /** Network where contract should be deployed. */
  network: "localnet" | "devnet" | "testnet" | "mainnet";
  idLocation: string;
  configLocation: string;
  features?: {
    seeds?: boolean;
  };
};

const defaultIdLocation = `${process.env["HOME"]}/.config/solana/id.json`;
const defaultConfigLocation = `${process.env["HOME"]}/.config/solana/cli/config.yml`;

const config: ConfigurationObject = {
  network: "devnet",
  idLocation: defaultIdLocation,
  configLocation: defaultConfigLocation,
};

export default config;
