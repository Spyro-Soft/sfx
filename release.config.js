const numberOfLibrariesToRunSimultaneously = 7;

module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: './CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: `VERSION=\${nextRelease.version} npx nx run-many -t publish --parallel=${numberOfLibrariesToRunSimultaneously}`,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['libs/**/package.json', 'package.json', 'CHANGELOG.md'],
        message: 'chore(release): -v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
