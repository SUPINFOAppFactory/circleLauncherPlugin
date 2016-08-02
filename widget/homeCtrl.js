var $home = angular.module('home',[]);
var counter=0;
$home.controller('homeCtrl', ['$scope'
    , function ($scope) {

        var viewer;

        buildfire.datastore.onUpdate(function(obj){bind(null,obj)});

        buildfire.datastore.getWithDynamicData(bind);
        function bind(err, result) {
            if (!err) {
                $scope.datastoreInitialized = true;
            } else {
                console.error("Error: ", err);
                return;
            }

            if (result && result.data && !angular.equals({}, result.data)) {

                $scope.data = result.data;
                $scope.id = result.id;

                if ($scope.data.content && $scope.data.content.carouselImages) {
                    if(!viewer)
                        viewer = new buildfire.components.carousel.view('#carousel', $scope.data.content.carouselImages);
                    else
                        viewer.loadItems($scope.data.content.carouselImages,false);
                }

                if ($scope.data._buildfire && $scope.data._buildfire.plugins && $scope.data._buildfire.plugins.result) {

                    var iconSize=50,circleRadious=30;
                    var plugins = result.data._buildfire.plugins.result;

                    var l = plugins.length;

                    for(var i = 0; i < l; i++) {
                        plugins[i].left = (iconSize - circleRadious*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
                        plugins[i].top = (iconSize + circleRadious*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
                    }

                    $scope.plugins = plugins;
                    $scope.cropImage = buildfire.imageLib.cropImage;
                    $scope.click= function(p){
                        buildfire.navigation.navigateTo({pluginId : p.id
                            ,instanceId : p.data.instanceId
                            ,folderName: p.data.pluginType.folderName
                            ,title: p.data.title
                        });
                    }
                }
                else if (!$scope.data._buildfire) {
                    $scope.data._buildfire = {
                        plugins: {
                            dataType: "pluginInstance",
                            data: []
                        }
                    };
                }

                if (!$scope.data.design) {
                    $scope.data.design = {
                        backgroundImage: null,
                        selectedLayout: 1,
                        backgroundblur: 0
                    };
                }

            }

            if(!$scope.$$phase)$scope.$apply();
        };

        $scope.start = function(e) {
            document.querySelector('.circle').classList.toggle('open');
        }

    }
]);