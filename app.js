var gingerApp = angular.module('gingerApp', []);



//Custom Angular Filter to convert amount to cents

gingerApp.filter('CentsFilter', function() {
  return function(amount) {
    return (amount / 100).toFixed(2);
  }
});




gingerApp.controller ('dataController', ['$scope', '$http', function ($scope, $http){

$scope.getTwenty =  function () {

      $http.get('http://localhost:3000/payments?_sort=amount&_order=DESC&_limit=20')
      .then(function(data) {
            console.log("Success!");
            $scope.payments = data.data;
      });

    };

$scope.getGinger =  function () {

      $http.get('http://localhost:3000/payments?merchant=Ginger')
        .then(function(results) {
              console.log("Success!");
              $scope.payments = results.data;
          },
        function(error){
            console.log(error);
          }

      );

  };

$scope.makePayment = function () {

    var date = new Date();
    var data = {
      method: $scope.newpayment.method,
      amount: $scope.newpayment.amount*100,
      currency: $scope.newpayment.currency,
      created: date.toString(),
      status: "",
      merchant: $scope.newpayment.merchant,

   };

    $http.post ('http://localhost:3000/payments', data)
    };

}]);
