(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .directive('classifiedCard', function () {
            return {
                templateUrl: 'components/classifieds/card/classified-card.tpl.html',
                scope: {
                    classifieds: '=classifieds',
                    classifiedsFilter: '=classifiedsFilter',
                    category: '=category'
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            }

            function classifiedCardController($state, $scope, $mdDialog){

                var vm = this;

                vm.deleteClassified = deleteClassified;
                vm.editClassified = editClassified;

                function deleteClassified(event, classifiedToDelete){
                    var confirm = $mdDialog
                        .confirm()
                        .title('Are you sure you want to delete ' + classifiedToDelete.title + '?')
                        .ok('Yes').cancel('No')
                        .targetEvent(event)

                    $mdDialog
                        .show(confirm)
                        .then(
                            function () {
                                vm.classifieds.$remove(classifiedToDelete);
                                showToast('Classified Deleted');
                            },
                            function () {}
                        )

                }

                function editClassified(classifiedToEdit){
                    $state.go('classifieds.edit', {
                        id: classifiedToEdit.$id,
                    })
                }

                function showToast(msg){
                    $mdToast.show(
                        $mdToast
                            .simple()
                            .content(msg)
                            .position('top right')
                            .hideDelay(3000)
                    );
                }

            }

        })



})();

