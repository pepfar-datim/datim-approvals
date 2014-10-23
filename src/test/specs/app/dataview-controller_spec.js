describe('Dataview Controller', function () {
    var controller;
    var scope;
    var approvalServiceMock;

    var promiseMock;

    beforeEach(module('d2-translate'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.details = {};

        promiseMock = jasmine.createSpy();
        promiseMock.andReturn({ then: jasmine.createSpy() });

        approvalServiceMock = {
            approve: promiseMock
        };

        controller = $controller('dataViewController', {
            $scope: scope,
            approvalsService: approvalServiceMock
        });
    }));

    it('should be an object', function () {
        expect(controller).toBeAnObject();
    });

    describe('getMechanismsByIds', function () {
        it('should be a method', function () {
            expect(controller.getMechanismsByIds).toBeAFunction();
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

            expect(controller.getMechanismsByIds(['a', '2'])).toEqual(expectedMechanisms);
        });

        it('should return an empty array when there are no mechanisms', function () {
            expect(controller.getMechanismsByIds(['a'])).toEqual([]);
        });

        it('should return an empty array when there are no ids passed to the method', function () {
            expect(controller.getMechanismsByIds([])).toEqual([]);
        });

        it('should return an empty array when undefined is passed to the method', function () {
            expect(controller.getMechanismsByIds()).toEqual([]);
        });
    });

    describe('getPeriod', function () {
        it('should be a method', function () {
            expect(controller.getPeriod).toBeAFunction();
        });

        it('should return the period from the details', function () {
            scope.details.period = '2014';

            expect(controller.getPeriod()).toBe('2014');
        });
    });

    describe('getDataSetIds', function () {
        it('should be a method', function () {
            expect(controller.getDataSetIds).toBeAFunction();
        });

        it('should get the data sets from the details', function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];

            expect(controller.getDataSetIds()).toEqual(['1', '2']);
        });
    });

    describe('getApprovalLevelId', function () {
        it('should be a method', function () {
            expect(controller.getApprovalLevelId).toBeAFunction();
        });

        it('should return the current appoval level id', function () {
            scope.details.approvalLevel = { id: 'd2dsf222' };

            expect(controller.getApprovalLevelId()).toEqual('d2dsf222');
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
            expect(controller.isParamsComplete).toBeAFunction();
        });

        it('should return true when all parameters are present', function () {
            expect(controller.isParamsComplete()).toBe(true);
        });

        it('should return false when pe is an empty string', function () {
            spyOn(controller, 'getPeriod').andReturn('');

            expect(controller.isParamsComplete()).toBe(false);
        });

        it('should return false when all datasets is an empty array', function () {
            scope.details.dataSets = [];

            expect(controller.isParamsComplete()).toBe(false);
        });

        it('should return false when period is not a string', function () {
            scope.details.period = [ {}, {} ];

            expect(controller.isParamsComplete()).toBe(false);
        });

        it('should return false when datasets is not an array', function () {
            scope.details.dataSets = 'dataSets';

            expect(controller.isParamsComplete()).toBe(false);
        });
    });

    describe('getParamsForMechanism', function () {
        it('should return an object', function () {
            expect(controller.getParamsForMechanism()).toEqual({});
        });

        it('should add the period if it is available', function () {
            scope.details.period = '2014';

            expect(controller.getParamsForMechanism()).toEqual({ pe: '2014' });
        });

        it('should add the datasets when they are available', function () {
            scope.details.dataSets = [
                { id: '1' },
                { id: '2' }
            ];

            expect(controller.getParamsForMechanism()).toEqual({ ds: [ '1', '2'] });
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
            expect(controller.submit).toBeAFunction();
        });

        it('should call getMechanismsByIds with the passed ids', function () {
            spyOn(controller, 'getMechanismsByIds');

            controller.submit(['a', 'b']);

            expect(controller.getMechanismsByIds).toHaveBeenCalledWith(['a', 'b']);
        });

        it('should call getPeriod', function () {
            spyOn(controller, 'getPeriod');

            controller.submit(['a', 'b']);

            expect(controller.getPeriod).toHaveBeenCalled();
        });

        it('should call getDataSetIds', function () {
            spyOn(controller, 'getDataSetIds').andReturn({
                getIds: function () {}
            });

            controller.submit([]);

            expect(controller.getDataSetIds).toHaveBeenCalled();
        });

        it('should ask to check the data', function () {
            spyOn(controller, 'isParamsComplete');

            controller.submit();

            expect(controller.isParamsComplete).toHaveBeenCalled();
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
                    { id: "aa", catComboId: "a", name: "Mechanism1" },
                    { id: "22", catComboId: "2", name: "Mechanism1" },
                    { id: "myIdmyId", catComboId: "myId", name: "Mechanism1"}
                ];
            });

            it('should ask the approvalsService to approve', function () {
                var expectedArguments = {
                    ds: ['1', '2'],
                    pe: ['2014'],
                    coc: ['a']
                };

                controller.submit(['aa']);

                expect(approvalServiceMock.approve).toHaveBeenCalledWith(expectedArguments);
            });

            it('should not ask approvalService to approve when passed mechanism id does not exist', function () {
                controller.submit(['c']);

                expect(approvalServiceMock.approve).not.toHaveBeenCalled();
            });

            it('should not call the approvalService to approve twice when multiple mechanisms exist', function () {
                var expectedArgumentsMechanismA = {
                    pe: ['2014'],
                    ds: ['1', '2'],
                    coc: ['a', '2']
                };

                controller.submit(['aa', '22']);

                expect(approvalServiceMock.approve).toHaveCallCount(1);
                expect(approvalServiceMock.approve).toHaveBeenCalledWith(expectedArgumentsMechanismA);
            });
        });
    });
});
