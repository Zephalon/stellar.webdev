import next from 'eslint-config-next';

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', '.baseline-cra/**'] },
  ...next,
];

export default config;
