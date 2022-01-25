FROM node:alpine3.15
EXPOSE 3000
ENV PASSWORD EDwG9mgzxyJE9pko
ENV DB wargame 
ENV USER admin
ENV YARN_VERSION 3.1.1
RUN mkdir ~/app && chown -R node:node ~/app
WORKDIR app
COPY --chown=node:node .yarn/ ./.yarn/
COPY --chown=node:node .pnp.cjs .yarnrc.yml package.json yarn.lock ./
COPY --chown=node:node . ./
USER node
RUN ["yarn", "install"]
CMD ["yarn", "serve"]
