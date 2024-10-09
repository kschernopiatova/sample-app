FROM --platform=linux/amd64 node:22.7.0-alpine3.20 as builder

WORKDIR /opt/src

COPY package.json .
COPY package-lock.json .
RUN npm install

FROM --platform=linux/amd64 node:22.7.0-alpine3.20 as runner

WORKDIR /opt/run

COPY --from=builder /opt/src/node_modules ./node_modules
COPY package.json .
COPY index.js .

CMD ["npm", "start"]