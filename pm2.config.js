module.exports = {
  apps: [
    {
      name: ".pablomag web",
      script: "server.js",
      node_args: "-r dotenv/config",
    },
  ],
};
