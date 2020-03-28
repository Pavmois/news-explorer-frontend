const presets = [
  [
    "@babel/env",
    {
      targets: {
        esmodules: true
      },
      useBuiltIns: "usage",
      corejs: "3.6.4"
    }
  ],
];

module.exports = { presets };