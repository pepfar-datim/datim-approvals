describe('Dataview Controller', function () {
    var controller;
    var scope;
    var approvalServiceMock;

    var promiseMock;

    beforeEach(module('d2-translate'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.details = {};

        promiseMock = sinon.stub();
        promiseMock.returns({ then: sinon.spy() });

        approvalServiceMock = {
            approve: promiseMock
        };

        controller = $controller('dataViewController', {
            $scope: scope,
            approvalsService: approvalServiceMock
        });
    }));

    it('should be an object', function () {
        expect(controller).to.be.a('object');
    });

    describe('getMechanismsByIds', function () {
        it('should be a method', function () {
            expect(controller.getMechanismsByIds).to.be.a('function');
        });

        it('should return an array for all the mechanisms in the current selection', function () {
            var expectedMechanisms = [
                { id: "a", name: "Mechanism1" },
                { id: "2", name: "Mechanism1" }
            ];

            scope.details.currentSelection = [
                { id: "a", name: "Mechanism1" },
                { id: "2", name: "Mechanism1" },
                { id: "myId", name: "Mechanism1"}
            ];

            expect(controller.getMechanismsByIds(['a', '2'])).to.deep.equal(expectedMechanisms);
        });

        it('should return an empty array when there are no mechanisms', function () {
            expect(controller.getMechanismsByIds(['a'])).to.deep.equal([]);
        });

        it('should return an empty array when there are no ids passed to the method', function () {
            expect(controller.getMechanismsByIds([])).to.deep.equal([]);
        });

        it('should return an empty array when undefined is passed to the method', function () {
            expect(controller.getMechanismsByIds()).to.deep.equal([]);
        });
    });

    describe('getPeriod', function () {
        it('should be a method', function () {
            expect(controller.getPeriod).to.be.a('function');
        });

        it('should return the period from the details', function () {
            scope.details.period = '2014';

            expect(controller.getPeriod()).to.equal('2014');
        });
    });

    describe('getDataSetIds', function () {
        it('should be a method', function () {
            expect(controller.getDataSetIds).to.be.a('function');
        });

        it('should get the data sets from the details', function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];

            expect(controller.getDataSetIds()).to.deep.equal(['1', '2']);
        });
    });

    describe('getApprovalLevelId', function () {
        it('should be a method', function () {
            expect(controller.getApprovalLevelId).to.be.a('function');
        });

        it('should return the current appoval level id', function () {
            scope.details.approvalLevel = { id: 'd2dsf222' };

            expect(controller.getApprovalLevelId()).to.equal('d2dsf222');
        });
    });

    describe('isParamsComplete', function () {
        beforeEach(function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];
            scope.details.period = '2014';
            scope.details.approvalLevel = {
                id: 'd2fd34eee'
            };
        });

        it('should be a method', function () {
            expect(controller.isParamsComplete).to.be.a('function');
        });

        it('should return true when all parameters are present', function () {
            expect(controller.isParamsComplete()).to.equal(true);
        });

        it('should return false when pe is an empty string', function () {
            sinon.stub(controller, 'getPeriod').returns('');

            expect(controller.isParamsComplete()).to.equal(false);
        });

        it('should return false when all datasets is an empty array', function () {
            scope.details.dataSets = [];

            expect(controller.isParamsComplete()).to.equal(false);
        });

        it('should return false when period is not a string', function () {
            scope.details.period = [ {}, {} ];

            expect(controller.isParamsComplete()).to.equal(false);
        });

        it('should return false when datasets is not an array', function () {
            scope.details.dataSets = 'dataSets';

            expect(controller.isParamsComplete()).to.equal(false);
        });
    });

    describe('getParamsForMechanism', function () {
        it('should return an object', function () {
            expect(controller.getParamsForMechanism()).to.deep.equal({});
        });

        it('should add the period if it is available', function () {
            scope.details.period = '2014';

            expect(controller.getParamsForMechanism()).to.deep.equal({ pe: '2014' });
        });

        it('should add the datasets when they are available', function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];

            expect(controller.getParamsForMechanism()).to.deep.equal({ ds: [ '1', '2'] });
        });
    });

    describe('submit', function () {
        beforeEach(function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];
        });

        it('should be a method', function () {
            expect(controller.submit).to.be.a('function');
        });

        it('should call getMechanismsByIds with the passed ids', function () {
            sinon.spy(controller, 'getMechanismsByIds');

            controller.submit(['a', 'b']);

            expect(controller.getMechanismsByIds).to.be.calledWith(['a', 'b']);
        });

        it('should call getPeriod', function () {
            sinon.spy(controller, 'getPeriod');

            controller.submit(['a', 'b']);

            expect(controller.getPeriod).to.be.called;
        });

        it('should call getDataSetIds', function () {
            sinon.stub(controller, 'getDataSetIds').returns({
                getIds: function () {}
            });

            controller.submit([]);

            expect(controller.getDataSetIds).to.be.called;
        });

        it('should ask to check the data', function () {
            sinon.spy(controller, 'isParamsComplete');

            controller.submit();

            expect(controller.isParamsComplete).to.be.called;
        });

        describe('when parameters are correct', function () {
            beforeEach(function () {
                scope.details.dataSets = [
                    { id: '1' },
                    { id: '2' }
                ];
                scope.details.period = '2014';
                scope.details.approvalLevel = {
                    id: 'd2fd34eee'
                };
                scope.details.currentSelection = [
                    { id: "aa", catComboId: "a", name: "Mechanism1", organisationUnit: 'ou1' },
                    { id: "22", catComboId: "2", name: "Mechanism1",  organisationUnit: 'ou1' },
                    { id: "myIdmyId", catComboId: "myId", name: "Mechanism1",  organisationUnit: 'ou2'}
                ];
            });

            it('should ask the approvalsService to approve', function () {
                var expectedArguments = {
                    ds: ['1', '2'],
                    pe: ['2014'],
                    approvals: [{aoc: 'a', ou: 'ou1'}]
                };

                controller.submit(['aa']);

                expect(approvalServiceMock.approve).to.be.calledWith(expectedArguments);
            });

            it('should not ask approvalService to approve when passed mechanism id does not exist', function () {
                controller.submit(['c']);

                expect(approvalServiceMock.approve).not.to.be.called;
            });

            it('should not call the approvalService to approve twice when multiple mechanisms exist', function () {
                var expectedArgumentsMechanismA = {
                    ds: ['1', '2'],
                    pe: ['2014'],
                    approvals: [{aoc: 'a', ou: 'ou1'}, {aoc: '2', ou: 'ou1'}]
                };

                controller.submit(['aa', '22']);

                expect(approvalServiceMock.approve).to.have.callCount(1);
                expect(approvalServiceMock.approve).to.be.calledWith(expectedArgumentsMechanismA);
            });
        });
    });
});
