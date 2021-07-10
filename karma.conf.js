module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      //require('karma-coverage'),
      require('karma-sonarqube-unit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false,
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: true,
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70
        }
      },
      verbose: false
    },
    // coverageReporter: {
    //   dir: require('path').join(__dirname, './coverage'), 
    //   reporters: [
    //     { type: 'html', subdir: 'report-html' },
    //     { type: 'lcov', subdir: 'report-lcov' },
    //     { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
    //     { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
    //     { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
    //     { type: 'text', subdir: '.', file: 'text.txt' },
    //     { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
    //   ],
    //   verbose: false
    // },
    reporters: ['progress', 'kjhtml', 'sonarqubeUnit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'CustomChromeHeadless'],
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'coverage/ut_report.xml',
      testFilePattern: '.spec.ts',
      overrideTestDescription: true,
      useBrowserName: false
    },
    singleRun: true,
    restartOnFileChange: true,
    captureTimeout: 30000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 30000,
    browserNoActivityTimeout: 30000,
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--window-size=1920,1080', '--remote-debugging-port=9222']
      }
    }
  });
};
