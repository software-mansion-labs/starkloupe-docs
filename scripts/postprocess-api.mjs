import { rmSync, copyFileSync } from 'node:fs';

const ref = 'api-docs/reference';

// "API Reference" landing + Starknet category config; drop redundant per-API "Introduction".
copyFileSync('openapi/reference-category.json', `${ref}/_category_.json`);
copyFileSync('openapi/starknet-simulation-category.json', `${ref}/starknet-simulation/_category_.json`);
rmSync(`${ref}/starknet-simulation/starkloupe-starknet-simulation-api.info.mdx`, { force: true });
