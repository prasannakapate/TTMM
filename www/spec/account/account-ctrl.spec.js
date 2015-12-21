describe('AccountCtrl', function(){
    var scope;

    // load the controller's module
    beforeEach(module('ttmmApp'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('AccountCtrl', {$scope: scope});
    }));

    // tests start here

});