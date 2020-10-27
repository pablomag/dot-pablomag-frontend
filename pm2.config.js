module.exports = {
  apps: [
    {
      name: ".pablomag server",
      script: "server.js",
      node_args: "-r dotenv/config",
    },
  ],
};
