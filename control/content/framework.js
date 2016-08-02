
var circleLauncherShared = circleLauncherShared || {};

circleLauncherShared.getPluginDetails = function (pluginsInfo, pluginIds) {
    var returnPlugins = [];
    var tempPlugin = null;
    for (var id = 0; id < pluginIds.length; id++) {
        for (var i = 0; i < pluginsInfo.length; i++) {
            tempPlugin = {};
            if (pluginIds[id] == pluginsInfo[i].data.instanceId) {
                tempPlugin.instanceId = pluginsInfo[i].data.instanceId;
                if (pluginsInfo[i].data) {
                    tempPlugin.iconUrl = pluginsInfo[i].data.iconUrl;
                    tempPlugin.iconClassName = pluginsInfo[i].data.iconClassName;
                    tempPlugin.title = pluginsInfo[i].data.title;
                    tempPlugin.pluginTypeId = pluginsInfo[i].data.pluginType.token;
                    tempPlugin.folderName = pluginsInfo[i].data.pluginType.folderName;
                } else {
                    tempPlugin.iconUrl = "";
                    tempPlugin.title = "[No title]";
                }
                returnPlugins.push(tempPlugin);
            }
            tempPlugin = null;
        }
    }
    return returnPlugins;
};

circleLauncherShared.getDefaultScopeData = function () {
    return {
        _buildfire: {
            plugins: {
                dataType: "pluginInstance",
                data: []
            }
        },
        content: {
            carouselImages: [],
            text: "",
            loadAllPlugins: false
        },
        design: {
            backgroundImage: null,
            logoImage: null,
            selectedLayout: 1,
            backgroundblur: 0
        }
    };
};

circleLauncherShared.getLayouts = function () {
    return [
        "./layouts/layout1.png",
        "./layouts/layout2.png",
        "./layouts/layout3.png",
        "./layouts/layout4.png",
        "./layouts/layout5.png",
        "./layouts/layout6.png",
        "./layouts/layout7.png"
    ];
};

circleLauncherShared.save = function (newObj) {
    buildfire.datastore.save(newObj, function (err, result) {
        if (err || !result) {
            console.error('Error saving the widget details: ', err);
        }
        else {
            console.info('Widget details saved');
        }
    });
};

circleLauncherShared.digest = function ($scope) {
    if (!$scope.$$phase && !$scope.$root.$$phase) {
        $scope.$apply();
    }
};