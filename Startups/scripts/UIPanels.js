/**
 * Created by Adrien on 30/06/2014.
 */
var UIPanels = {};

(function(){;
    UIPanels.changeStartup = function(startup){
        $('.su_panel.left h2').text(startup.name);
        $('.su_panel.left h3').text(startup.url);
        $('.description').text(startup.description);

    };
})();