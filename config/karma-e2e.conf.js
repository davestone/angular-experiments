basePath = '../',

frameworks = ['jasmine'],

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/angular/angular.js',
  'test/lib/angular/angular-scenario.js',
  'test/lib/angular/angular-*.js',
  'src/**/*.js',
  'test/unit/**/*.js'
];

exclude = [
  'test/lib/angular/angular-mocks.js'
],

reporters = ['progress', 'junit'],

junitReporter = {
  outputFile: 'logs/e2e-results.xml'
};

autoWatch = true,

browsers = ['Chrome'];