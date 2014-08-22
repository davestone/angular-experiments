basePath = '../',

frameworks = ['jasmine'],

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/angular/angular.js',
  'test/lib/angular/angular-mocks.js',
  'test/lib/angular/angular-*.js',
  'src/**/*.js',
  'test/unit/**/*.js'
];

exclude = [
  'test/lib/angular/angular-scenario.js'
],

reporters = ['progress', 'junit'],

junitReporter = {
  outputFile: 'logs/unit-results.xml'
};

autoWatch = true,

browsers = ['PhantomJS'];