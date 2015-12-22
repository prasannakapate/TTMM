/* jshint -W117, -W030 */
describe('ttmmApp.account', function() {
    var controller;
    var customers = mockData.getMockCustomers();
    var id = mockData.blackWidow.id;

    beforeEach(function() {
        bard.appModule('ttmmApp.account');
        bard.inject('$controller', '$log', '$q', '$rootScope', '$stateParams', 'dataservice');
    });
    bard.verifyNoOutstandingHttpRequests();

    describe('Account controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

    });
});