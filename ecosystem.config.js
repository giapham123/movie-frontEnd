module.exports = {
    apps : [{
      name: "app",
      script: "serve -s dist",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }