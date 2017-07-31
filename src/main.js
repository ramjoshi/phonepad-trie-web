var auto = {
    api: 'http://ramjoshi.org:8080/suggestion/',
    module: function() {
        var modules = {};
        return function(name) {
            if(modules[name]) {
                return modules[name];
            }
            return modules[name] = {Views: {}};
        };
    }()
}

jQuery(function($) {

    var suggestion = auto.module('suggestion');
    var suggestionList = new suggestion.List();

    var suggestionView = suggestion.Views.SuggestionView;
    var suggestionApp = new suggestionView({ collection: suggestionList });

    $('#numberin').bind('keypress', function(event) {
        var key;
        var keychar;

        if(event)
            key = event.which;
        else
            return true;
        keychar = String.fromCharCode(key);

        // control keys
        if ((key==null) || (key==0) || (key==8) || 
            (key==9) || (key==13) || (key==27) )
            return true;

        // numbers
        else if ((("23456789").indexOf(keychar) > -1)) {
            var oldnum = $(this).val();
            console.log(oldnum);
            if(oldnum.length == 2) {
                fetch(oldnum + keychar);
            }
            return true;
        }

        else
            return false;
    });

    function fetch(seq) {
        var params = { seq: seq }
        suggestionList.fetch({ data: params });
    }
});
