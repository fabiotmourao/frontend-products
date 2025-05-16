module.exports = {
    presets: [
      [
        "next/babel",
        {
          "preset-react": { "runtime": "automatic" },
        },
      ],
      "@babel/preset-env",
      "@babel/preset-typescript",
    ],
    plugins: [
      ["@babel/plugin-transform-runtime", {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }]
    ],
  };