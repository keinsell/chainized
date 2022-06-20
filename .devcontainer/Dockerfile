# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

ENV HOME="/root"
ENV PATH="${HOME}/.cargo/bin:${PATH}"
ENV PATH="${HOME}/.local/share/solana/install/active_release/bin:${PATH}"
ENV PATH="${HOME}/.nvm/versions/node/${NODE_VERSION}/bin:${PATH}"

# Install global npm packages
ARG NODE_MODULES="tslint-to-eslint-config typescript@next mocha pnpm"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
ARG APT_PACKAGES="gcc g++ pkg-config libudev-dev libssl-dev make build-essential libclang-dev llvm"
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ${APT_PACKAGES}

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG NODE_VERSION="16"
# RUN su node -c "source /usr/local/share/nvm/nvm.sh" && \
#     nvm install ${NODE_VERSION} && \
#     nvm use ${NODE_VERSION} && \
#     nvm alias default node && \
#     npm install -g yarn && \
#     npm install -g pnpm

# [feature:volta] TODO;

# [feature:rust]
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y \
    && rustup component add \
    rustfmt \ 
    clippy

RUN cargo --version

# [feature:solana]
ARG SOLANA_CLI="1.10.26"
RUN sh -c "$(curl -sSfL https://release.solana.com/v${SOLANA_CLI}/install)"
RUN solana --version

# [feature:anchor]
ARG ANCHOR_CLI="0.24.2"
RUN npm install -g @project-serum/anchor@${ANCHOR_CLI}
RUN cargo install --git https://github.com/project-serum/anchor --tag v${ANCHOR_CLI} anchor-cli --locked
# RUN cargo install --git https://github.com/project-serum/anchor avm --locked --force && avm install ${ANCHOR_CLI} && avm use ${ANCHOR_CLI}
RUN anchor --version

# Build a dummy program to bootstrap the BPF SDK (doing this speeds up builds).
RUN mkdir -p /tmp && cd tmp && anchor init dummy && cd dummy && anchor build