#!/bin/bash
cd /Users/tylerpriest/Build/Active/arcology
npm run typecheck 2>&1
echo "---"
npm run lint 2>&1
echo "---"
npm test 2>&1
