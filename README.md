<div align="center">
  <h1>🦞 ClawCloud</h1>
  <p><strong>Managed OpenClaw on Rails. Secure, monitored, and painless.</strong></p>
  
  [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/custom?repo=github.com/clawcloud/clawcloud)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## What is ClawCloud?

OpenClaw is an incredible open-source project, but deploying it correctly is hard. Over 135,000 instances are currently exposed to the public internet because of default configurations binding to `0.0.0.0` with no authentication. Workspace files silently waste token budgets. 

ClawCloud is the layer that makes OpenClaw actually work for you. It solves the 5 biggest pain points:
1. **Setup Hell**: 1-click deploy instead of $300 and 3 days of trial and error.
2. **Token Bleeding**: Proactive monitoring and auto-pruning.
3. **Security Risks**: Hardened defaults, API keys, and auto-TLS out of the box.
4. **No UI**: A full dashboard to manage instances, channels, and crons.
5. **Skill Safety**: An audited marketplace sandbox (coming soon).

## Architecture
This is a monorepo containing:
- `apps/web`: Next.js 14 Dashboard
- `apps/api`: Fastify backend
- `packages/db`: Prisma schema & client
- `docker/`: Hardened OpenClaw and Nginx configurations needed for self-hosting.

## Quick Start (Self-hosted)

1. Clone the repo:
   \`\`\`bash
   git clone https://github.com/clawcloud/clawcloud.git
   cd clawcloud
   \`\`\`

2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Clerk & Database credentials.

3. Start the entire stack with Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`
   
4. Open `http://localhost:3000` to access your local dashboard.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on setting up your local development environment using Turborepo and `pnpm`.

## License
MIT