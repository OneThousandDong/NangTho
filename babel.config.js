module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["."],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: "./src",
          svg: "./src/assets/svg",
          images: "./src/assets/images",
        },
      },
    ],
  ],
};
