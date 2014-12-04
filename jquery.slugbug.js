(function() {

  jQuery(function($) {
    return $.fn.slugbug = function(options) {
      var settings, valueOnFocusAttribute;
      settings = $.extend({
        dataAttribute: 'slugbug-target',
        events: 'keyup change',
        lockSlugAttribute: 'slug-locked',
        parameterize: function(string, strip_trailing_slug_chars) {
          if (strip_trailing_slug_chars == null) {
            strip_trailing_slug_chars = true;
          }
          string = string.toLowerCase();
          string = string.replace(/'/g, '');
          string = string.replace(/[^\w-_]+/g, '_');
          string = string.replace(/_+/g, '_').replace(/-+/g, '-');
          if (strip_trailing_slug_chars) {
            string = string.replace(/^[_-]+|[_-]+$|/g, '');
          }
          return string;
        }
      }, options);
      valueOnFocusAttribute = 'value-on-focus';
      $.extend({
        slugbug: {
          parameterize: settings.parameterize
        }
      });
      $(document).on(settings.events, "[data-" + settings.dataAttribute + "]", function(event) {
        var source, targets, value;
        source = $(event.target);
        targets = $(source.data(settings.dataAttribute));
        value = $.slugbug.parameterize(source.val());
        targets.text(value);
        return targets.each(function(index, target) {
          target = $(target);
          if (!target.data(settings.lockSlugAttribute)) {
            return target.val(value).change();
          }
        });
      });
      return $("[data-" + settings.dataAttribute + "]").each(function(index, input) {
        var targets;
        targets = $($(input).data(settings.dataAttribute));
        targets.bind('focus', function(event) {
          var target;
          target = $(event.target);
          return target.data(valueOnFocusAttribute, target.val());
        });
        targets.bind('blur', function(event) {
          var target;
          target = $(event.target);
          if (target.val() === target.data(valueOnFocusAttribute)) {
            return target.removeData(valueOnFocusAttribute);
          }
        });
        return targets.bind("" + settings.events + " blur", function(event) {
          var focus_value, strip_trailing_slug_chars, target, value;
          target = $(event.target);
          strip_trailing_slug_chars = event.type === 'blur';
          value = $.slugbug.parameterize(target.val(), strip_trailing_slug_chars);
          if (target.val() !== value) {
            target.text(value);
            target.val(value);
          }
          focus_value = target.data(valueOnFocusAttribute);
          if ((focus_value != null) && target.val() !== focus_value) {
            return target.data(settings.lockSlugAttribute, 'true');
          }
        });
      });
    };
  });

}).call(this);
