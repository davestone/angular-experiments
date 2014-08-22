(function () {
  "use strict";

// NOTES:
// service, with an interface for persisting, and load GA version
// GALoggerMod  logger { logImpression, logEnd} <- maybe provider on this too?
// XYZLoggerMod logger
// TestLoggerMod

  angular.module('ketch.experiments', [])
    .provider('Experiments', function() {
      // Configuration
      this.cookieName = 'angular-experiments';
      this.store = {};
      this.logImpression = function() {};
      this.logResult = function() {};

      // Universal setter
      this.set = function(key, val) {
        this[key] = val;
      };

      // Service
      this.$get = ['$cookieStore', function($cookieStore, $logger) {

        return {
          cookieName: this.cookieName,
          store: $cookieStore,
          logImpression: logger.logImpression,
          logResult: this.logResult,
          logWhitelist: []
        };

      }];
    })
    .directive('experiment', ['Experiments', function(Experiments) {
      return {
        restrict: 'E',
        replace: false,
        compile: function() {
          return function($scope, $element, $attr) {

            var experimentId = $attr.id,
                userStore = Experiments.store.get( Experiments.cookieName ) || {};

            // trials running
            var trials = $element.children();

            // get this user's trial bucket
            var bucketId = userStore[ experimentId ];

            // user's never seen this trial before
            if (bucketId === undefined) {
              // one at random please
              bucketId = trials[ Math.floor(Math.random()*trials.length) ].id;
              // remember it
              userStore[ experimentId ] = bucketId;
              Experiments.store.put( Experiments.cookieName, userStore );
              Experiments.logWhitelist.push(experimentId);
              Experiments.logImpression(experimentId, bucketId);
            }

            // remove unneeded buckets
            angular.forEach(trials, function(element, i) {
              if (element.id != bucketId) {
                element.remove();
              }
            });

          };
        }
      };
    }])
    .directive('experimentEnd', ['Experiments', function(Experiments) {
      return {
        restrict: 'A',
        replace: false,
        link: function(scope, element, attrs) {
          var experimentId = attrs.experimentEnd,
              whitelistKey = Experiments.logWhitelist.indexOf(experimentId);

          if (whitelistKey > -1) {
            delete Experiments.logWhitelist[whitelistKey];
            
            element.on('click', function() {
              var bucketId = Experiments.store.get( Experiments.cookieName )[attrs.experimentEnd];
              Experiments.logResult(experimentId, bucketId);
            });
          }
        }
      };
    }]);
      
}());