module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/pages': './src/pages',
          '@/navigator': './src/navigator',
          '@/models': './src/models',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/assets': './src/assets'
        }
      }
    ]
  ]
};
