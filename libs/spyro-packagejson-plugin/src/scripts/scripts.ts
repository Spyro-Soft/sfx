export const packageJsonScripts = (appName: string) => {
  return {
    start: `nx serve ${appName}`,
    'build:dev': `nx build ${appName} --configuration=development`,
    'build:prod': `nx build ${appName} --configuration=production`,
    test: 'npm run test:unit && npm run test:e2e',
    'test:e2e': `nx run ${appName}-e2e:e2e`,
    'test:unit': 'nx run-many --target=test --all --parallel --skip-nx-cache',
    'lint:check': 'nx run-many --all --target=lint --parallel',
    'lint:fix': 'nx run-many --all --target=lint --fix --parallel',
    'format:fix': 'nx format:write --configuration ./.prettierrc',
    'format:check': 'nx format:check --configuration ./.prettierrc',
    'code:check': 'npm run format:check && npm run lint:check',
    'code:fix': 'npm run format:fix && npm run lint:fix',
  };
};
