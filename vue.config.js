module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: "app-name",
          appId: "com.sample.appname",
          win: {
            icon: 'src/assets/app.ico',
            target: [
              {
                target: 'zip', // 'zip', 'nsis', 'portable'
                arch: ['x64'] // 'x64', 'ia32'
              }
            ]
          }
        }
      }
    }
  }
