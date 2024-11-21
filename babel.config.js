module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxRuntime: 'automatic', // Enable the new JSX Transform
        },
      ],
    ],
    plugins: [
      'nativewind/babel',
      '@babel/plugin-transform-runtime',
    ],
  };
};
