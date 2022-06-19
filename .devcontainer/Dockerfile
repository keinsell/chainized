# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install global npm packages
ARG NODE_MODULES="tslint-to-eslint-config typescript@next mocha pnpm"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
ARG APT_PACKAGES="gcc g++ pkg-config libudev-dev libssl-dev make build-essential libclang-dev"
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ${APT_PACKAGES}

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION="16"
# RUN su node -c "source /usr/local/share/nvm/nvm.sh" && nvm install ${EXTRA_NODE_VERSION}

# [project-specific:rust] Setup rust, rustup and cargo
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -y
# RUN rustup toolchain install stable
# RUN rustup component add rustfmt
# RUN rustup component add clippy

# [project-specific:solana] Install Solana CLI & Anchor
ARG SOLANA_VERSION="1.10.26"
ARG ANCHOR_VERSION="0.24.2"
RUN sh -c "$(curl -sSfL https://release.solana.com/v${SOLANA_VERSION}/install)"
RUN export PATH="/home/node/.local/share/solana/install/active_release/bin:$PATH"
RUN pnpm install -g @project-serum/anchor@${ANCHOR_VERSION}
RUN cargo install --git https://github.com/project-serum/anchor --tag v${ANCHOR_VERSION} anchor-cli --locked

