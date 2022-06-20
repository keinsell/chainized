# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.236.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT="18-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

# [configuration]
ARG ANCHOR_CLI="latest"
ARG SOLANA_CLI="1.10.26"
ARG NODE_VERSION=18

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [optional:core:nvm]
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

# [feature:solana]
RUN sh -c "$(curl -sSfL https://release.solana.com/v${SOLANA_CLI}/install)"
RUN solana --version

# [feature:anchor]
RUN npm install -g @project-serum/anchor@${ANCHOR_CLI}
RUN cargo install --git https://github.com/project-serum/anchor avm --locked --force && avm install ${ANCHOR_CLI} && avm use ${ANCHOR_CLI}

# [anchor:cache] 
# Build a dummy program to bootstrap the BPF SDK (doing this speeds up builds).
RUN mkdir -p /tmp && cd tmp && anchor init dummy && cd dummy && anchor build