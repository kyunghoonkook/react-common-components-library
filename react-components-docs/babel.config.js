module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          browsers: ['last 2 versions', 'not dead', 'not < 2%', 'not ie 11'],
        },
      },
    ],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('@babel/plugin-transform-runtime'),
  ],
}; 