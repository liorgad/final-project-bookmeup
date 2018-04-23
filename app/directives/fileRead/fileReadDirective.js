app.directive("fileread", [function () {
    return { 
        transclude: true,
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;                        
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);

// app.directive('appFilereader', function ($q, $log) {
//     var slice = Array.prototype.slice;

//     return {
//         restrict: 'A',
//         require: '?ngModel',
//         scope : {
//            fileread :'=appFilereader'
//         },
//         link: function (scope, element, attrs, ngModel) {
//             if (!ngModel) {
//                 return;
//             }

//             ngModel.$render = function () {};

//             element.bind('change', function (e) {
//                 var element = e.target;

//                 $q.all(slice.call(element.files, 0).map(readFile))
//                     .then(function (values) {
//                         if (element.multiple) ngModel.$setViewValue(values);
//                         else {

//                             ngModel.$setViewValue(values.length ? values[0] : null);

//                         }
//                     });

//                 function readFile(file) {
//                     console.log('loading file');
//                     var deferred = $q.defer();

//                     var reader = new FileReader();
//                     reader.onload = function (e) {
//                         scope.$apply(function () {
//                             scope.fileread = loadEvent.target.result;
//                         });
//                         deferred.resolve(e.target.result);
//                     };
//                     reader.onerror = function (e) {
//                         deferred.reject(e);
//                     };
//                     reader.readAsDataURL(file);

//                     return deferred.promise;
//                 }

//             }); //change

//         } //link
//     }; //return
// });


