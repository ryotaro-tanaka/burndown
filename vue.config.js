module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: "burndown",
          appId: "com.burndown",
          win: {
            icon: 'src/assets/icon.ico',
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
