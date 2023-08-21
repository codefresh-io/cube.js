#!/bin/bash
set -eo pipefail

# Debug log for test containers
export DEBUG=testcontainers

echo "::group::Postgres"
yarn lerna run --concurrency 1 --stream --no-prefix smoke:postgres
echo "::endgroup::"
