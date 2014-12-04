jQuery ($) ->
  $.fn.slugbug = (options) ->
    settings = $.extend
      dataAttribute: 'slugbug-target'
      events: 'keyup change'
      lockSlugAttribute: 'slug-locked'
      # TODO: implement this option
      # lockSlugOnEdit: true
      parameterize: (string, strip_trailing_slug_chars = true) ->
        string = string.toLowerCase()
        # remove apostrophes, so we get 'dont' instead of 'don_t'
        string = string.replace(/'/g, '')
        # only allow word characters, dash, and underscore
        string = string.replace(/[^\w-_]+/g, '_')
        # collapse duplicate underscores and dashes
        string = string.replace(/_+/g, '_').replace(/-+/g, '-')
        # remove beginning and trailing underscores and dashes
        string = string.replace(/^[_-]+|[_-]+$|/g, '') if strip_trailing_slug_chars
        string

    , options

    valueOnFocusAttribute = 'value-on-focus'

    $.extend
      slugbug:
        parameterize: settings.parameterize

    $(document).on settings.events, "[data-#{settings.dataAttribute}]", (event) ->
      source = $(event.target)
      targets = $(source.data(settings.dataAttribute))
      value = $.slugbug.parameterize(source.val())

      targets.text(value)

      targets.each (index, target)->
        target = $(target)
        unless target.data(settings.lockSlugAttribute)
          target.val(value).change()

    $("[data-#{settings.dataAttribute}]").each (index, input) ->
      targets = $($(input).data(settings.dataAttribute))

      targets.bind 'focus', (event) ->
        target = $(event.target)
        target.data(valueOnFocusAttribute, target.val())

      targets.bind 'blur', (event) ->
        target = $(event.target)
        if target.val() == target.data(valueOnFocusAttribute)
          target.removeData(valueOnFocusAttribute)

      targets.bind "#{settings.events} blur", (event) ->
        target = $(event.target)

        strip_trailing_slug_chars = (event.type == 'blur')

        value = $.slugbug.parameterize(target.val(), strip_trailing_slug_chars)

        if target.val() != value
          target.text(value)
          target.val(value)

        focus_value = target.data(valueOnFocusAttribute)
        if focus_value? && target.val() != focus_value
          target.data(settings.lockSlugAttribute, 'true')

