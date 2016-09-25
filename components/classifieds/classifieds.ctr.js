(function () {

    "use strict";
    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', classifiedsCtrlFn)

    classifiedsCtrlFn.$inject = [
        '$scope',
        '$mdSidenav',
        '$mdToast',
        '$mdDialog',
        '$state',
        '$firebaseArray'
    ]
    
    function classifiedsCtrlFn($scope, $mdSidenav, $mdToast, $mdDialog, $state, $firebaseArray){

        var vm = this;

        vm.categories;
        vm.classified;
        vm.classifieds;
        vm.closeSidebar = closeSidebar;
        vm.openSidebar = openSidebar;
        vm.saveClassified = saveClassified;
        vm.saveEdit = saveEdit;

        var ref = firebase.database().ref();
        vm.classifieds = $firebaseArray(ref);
        vm.classifieds
                    .$loaded()
                    .then(function (classifieds){
                        vm.categories = getCategories(classifieds);
                    });

        $scope.$on('newClassified',function (event, classified){
            vm.classifieds.$add(classified);
            showToast('classified saved');
        })

        $scope.$on('editSaved',function (event, message){
            showToast(message);
        })

        var contact = {
            name: 'Davyd WIlb',
            phone: '(654) 346-3466',
            email: 'fjfksldkj@gmail.com'
        }

        function closeSidebar(){
            $mdSidenav('left').close();
        }

        function openSidebar(){
            $state.go('classifieds.new');
        }





        function getCategories(classifieds){
            var categories = [];
            angular
                .forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    })
                })
            return _.uniq(categories);
        }

        function saveClassified(classified){
            vm.classifieds.push(classified);
            vm.classified = {};
            closeSidebar();
            showToast('Classified Saved');
        }
        function saveEdit(){
            vm.editing = false;
            vm.classified ={};
            closeSidebar();
            showToast('Edit Saved');
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

})();
