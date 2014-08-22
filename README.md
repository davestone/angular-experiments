# angular-experiments (WIP)

Angular.js A/B.. split.. experiment helper.

## How to use it

While not a requirement, it works well with our [Google Analytics](http://google.com) module, here's how we set it up.

```javascript
angular.config(['ExperimentsProvider', 'GoogleAnalyticsProvider', function(ExperimentsProvider, GoogleAnalyticsProvider) {
    
  ExperimentsProvider.set('logImpression', function(experimentId, bucketId) {
    GoogleAnalyticsProvider.push(['_setCustomVar', 1, experimentId, bucketId, 1]);
  });
  
  ExperimentsProvider.set('logResult', function(experimentId, bucketId) {
    // when using Google Analytics custom vars, you don't need a result hook for A/B testing.
    console.log('log user result in experiment: ', experimentId, 'bucket: ', bucketId);
  });

}]);
```

```html
<experiment id="signup">
  <trial id="catchy">
    <h1>A wholelot of headeline</h1>
    <a class="btn" ng-click="postResult();">Sign Up</a>
  </trial>
  <trial id="formal">
    <h1>Dear reader, here's your headline. Sincerly code</h1>
    <a class="btn" ng-click="postResult();">Sign Up</a>
  </trial>
  <trial id="informal">
    <h1>Fancy this headline? mate</h1>
    <a class="btn" ng-click="postResult();">Sign Up</a>
  </trial>
</experiment>
```

### Continuous Integration

...

### Contribute

You can use grunt to both test and lint your code. First, make sure you have grunt-cli installed globally and project packages installed.

```
# Globally install a few things...
npm install -g grunt-cli

# Inside the project folder, install the dependencies
$ npm install

# Set the PHANTOMJS_BIN to project's binary
$ export PHANTOMJS_BIN=./node_modules/.bin/phantomjs 

# Run the tests
$ grunt
```

## Bug Reports

Github Issues are used for managing bug reports and feature requests. If you run into issues, please search the issues and submit new problems. The best way to get quick responses to your issues and swift fixes to your bugs is to submit detailed bug reports, include test cases

## License

Copyright (c) 2013 Dash Labs Consulting Ltd. MIT Licensed, see [LICENSE](LICENSE.md) for details.
