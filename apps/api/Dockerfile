FROM node:20-alpine

# Install build dependencies for native modules (like bcrypt)
# Alpine needs these to compile C++ modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy root package.json and lockfile
COPY package*.json ./

# Copy workspace package.json files
# This allows npm ci to see the workspace structure before installing
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/

# Install dependencies for the API and Database workspaces
# We ignore scripts to prevent prisma from trying to run before we have the schema
RUN npm ci --workspace=apps/api --workspace=@kaarplus/database --include-workspace-root

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema packages/database/prisma/schema.prisma

# Build the API (TypeScript compilation)
RUN npm run build --workspace=apps/api

# Set environment
ENV NODE_ENV=production
EXPOSE 4000

# Start the application
CMD ["node", "apps/api/dist/index.js"]
