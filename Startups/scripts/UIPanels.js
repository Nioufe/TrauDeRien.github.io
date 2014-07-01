/**
 * Created by Adrien on 30/06/2014.
 */
var UIPanels = {};

(function(){;
    UIPanels.changeStartup = function(startup){
        $('.su_panel.left h2').text(startup.name);
        $('.su_panel.left h3').text(startup.url);
        $('.description').text(startup.description);
        $('.director').text(startup.Dirigeants);
        $('.twitter_name').text(startup.Name_Tw);
        $('.nb_tweets').text(startup.Nb_tweets);
        $('.nb_follow').text(startup.Nb_follow);
        $('.nb_followers').text(startup.Nb_followers);

        var keywords = _.pluck(startup.keywords, 'keyword');
        var string = "";

        keywords.forEach(function(word){
           string+=word + ", ";
        });

        $('.keywords').text(string);

    };
})();