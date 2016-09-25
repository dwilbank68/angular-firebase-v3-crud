(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', editClassifiedsCtrlFn)

    editClassifiedsCtrlFn.$inject = [
        '$scope',
        '$state',
        '$mdSidenav',
        '$timeout',
        '$mdDialog',
        '$firebaseArray'
    ]

    function editClassifiedsCtrlFn($scope, $state, $mdSidenav, $timeout, $mdDialog, $firebaseArray){

        var vm = this;
        var ref = firebase.database().ref();
        vm.classifieds = $firebaseArray(ref);
        vm.classifieds
                .$loaded()
                .then(function (){
                    vm.classified = vm.classifieds.$getRecord($state.params.id);
                });


        vm.closeSidebar = closeSidebar;
        vm.saveEdit = saveEdit;

        $timeout(function (){
            $mdSidenav('left').open();
        })

        $scope
            .$watch(
                'vm.sidenavOpen',
                function (sidenav){
                    if(sidenav === false){
                        $mdSidenav('left')
                            .close()
                            .then(function (){
                                $state.go('classifieds');
                            })
                    }
                }
            )

        function closeSidebar(){
            vm.sidenavOpen = false;
        }

        function saveEdit(classified){
            vm.classifieds
                    .$save(vm.classified)
                    .then(function (){
                        $scope.$emit('editSaved','Edit Saved')
                        closeSidebar();
                        //vm.sidenavOpen = false;
                    })

        }

    }

})();