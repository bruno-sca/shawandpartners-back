module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '19.5.0' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@shared': './src/shared',
          '@errors': './src/shared/errors',
          '@utils': './src/utils',
          '@middlewares': './src/shared/middlewares',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
