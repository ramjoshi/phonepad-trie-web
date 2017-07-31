/*
 * suggestion.js
 * suggestion module
 */

(function(Suggestion) {

    // model
    Suggestion.Model = Backbone.Model.extend({
        defaults: {
            count: 0,
            word: '-'
        }
    });
    Suggestion.List = Backbone.Collection.extend({
        model: Suggestion.Model,
        url: auto.api,
        parse: function(d) {
            return d.suggestions;
        }
    });

    // view
    SuggestionView = Backbone.View.extend({
        el: '#suggestions',
        template: function() {
            var tmpl = '<li><div class="word">${word}</div> \
            <div class="count">${count}</div></li>';
            return $.template(null, tmpl);
        }(),
        initialize: function() {
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
        },
        render: function() {
            $(this.el).empty();
            var that = this;
            _(this.collection.models).each(function(model) {
                $(that.el).append($.tmpl(that.template, model.toJSON()));
            });
        }
    });

    Suggestion.Views = {
        'SuggestionView': SuggestionView
    }

})(auto.module('suggestion'));
