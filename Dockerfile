FROM node:20 AS nodejs
FROM ollama/ollama

RUN mkdir -p /root/.ollama && \
    ollama serve & \
    sleep 10 && \
    ollama pull llama3:8b && \
    sleep 5 && \
    ollama list && \
    pkill ollama

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt
COPY ["app", "/opt/app"]
COPY ["run.sh", "/opt/run.sh"]
COPY --from=nodejs /usr/local/bin /usr/local/bin
COPY --from=nodejs /usr/local/lib/node_modules /usr/local/lib/node_modules

WORKDIR /opt/app
RUN npm install

RUN chmod +x /opt/run.sh
ENTRYPOINT ["/opt/run.sh"]