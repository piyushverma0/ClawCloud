# Hardened OpenClaw Docker Image
# This image wraps the official OpenClaw image to enforce secure defaults

FROM ubuntu:22.04 AS builder

# Required for healthchecks and wrapping
RUN apt-get update && apt-get install -y curl jq

# In a real scenario, this would FROM the openclaw image, but since it's a simulated 
# environment building for a user, we stub the openclaw start command.
# For demonstration in Phase 1, we will mock the OpenClaw service using a simple Node app or python server 
# since we don't have access to the actual openclaw docker image.

FROM node:20-alpine

WORKDIR /app

# The "Hardened" proxy script
# 1. Enforces OPENCLAW_API_KEY is present
# 2. Binds to 127.0.0.1 (or restricts access via a simple auth wrapper)

COPY <<EOF /app/start.js
const http = require('http');

if (!process.env.OPENCLAW_API_KEY) {
  console.error("FATAL: OPENCLAW_API_KEY environment variable is missing.");
  console.error("Refusing to start OpenClaw in an insecure state.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const authLine = req.headers['authorization'];
  if (authLine !== \`Bearer \${process.env.OPENCLAW_API_KEY}\`) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  
  // Here we would proxy to the REAL OpenClaw instance binding on 127.0.0.1
  // For this demo, we just return a success representation
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'healthy', mock: 'OpenClaw Managed Instance' }));
});

// Ensure that we bind to 127.0.0.1 explicitly to demonstrate fixing the vulnerability
const BIND_IP = process.env.ENFORCE_BIND_IP || '127.0.0.1';

// If a user tries to override this to 0.0.0.0 maliciously or ignorantly, the wrapper will fail it.
if (BIND_IP === '0.0.0.0') {
  console.error("FATAL: Binding to 0.0.0.0 is strictly prohibited by ClawCloud Security Policy.");
  process.exit(1);
}

server.listen(3001, BIND_IP, () => {
    console.log(\`Hardened OpenClaw started securely on port 3001 bound to \${BIND_IP}\`);
});
EOF

CMD ["node", "start.js"]

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --header="Authorization: Bearer $OPENCLAW_API_KEY" --spider http://127.0.0.1:3001/ || exit 1
