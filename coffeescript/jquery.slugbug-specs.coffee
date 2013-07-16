jQuery ($) ->
  describe '$.slugbug.parameterize', ->
    it 'Creates URL friendly slugs', ->
      expect($.slugbug.parameterize('Hello there!')).toBe 'hello_there'
    it 'Properly handles beginning and trailing non-word characters', ->
      expect($.slugbug.parameterize('!!!Hello there!!!')).toBe 'hello_there'
    it 'Collapses multiple slug characters', ->
      expect($.slugbug.parameterize('-_-Hello__there_-_')).toBe 'hello_there'
      expect($.slugbug.parameterize('hello____there')).toBe 'hello_there'
    it 'Does not insert slug character for apostrophes', ->
      expect($.slugbug.parameterize("Don't")).toBe 'dont'

    it 'Takes an argument to prevent stripping trailing slug characters', ->
      expect($.slugbug.parameterize('_thing_')).toBe 'thing'
      expect($.slugbug.parameterize('_thing_', false)).toBe '_thing_'


  describe '$(document).slugbug()', ->
    title = 'Hello There!'
    slug = 'hello_there'

    source = $('[name="title"]')
    target_input = $('[name="slug"]')
    target_element = $('.url-slug')

    afterEach ->
      source.val('')
      target_input.val('')
      target_element.text('')
      target_input.removeData('slug-locked')
      target_input.removeData('value-on-focus')

    it 'Should create a slug in an alternate input when typing', ->
      source.val(title).keyup()
      expect(target_input.val()).toBe slug

    it 'Should handle multiple events properly', ->
      # had a bug having to do with locking the slug field
      source.keyup().val(title).keyup()
      expect(target_input.val()).toBe slug

    it 'Should mirror slug to a dom element', ->
      source.val(title).keyup()
      expect(target_element.text()).toBe slug

    describe 'Typing in a slug target', ->
      it 'creates a slug', ->
        target_input.focus().val('Hello There').keyup()
        expect(target_input.val()).toBe 'hello_there'

      it 'allows trailing characters while typing', ->
        target_input.focus().val('Hello There!').keyup()
        expect(target_input.val()).toBe 'hello_there_'

      it 'does not allow trailing characters on blur', ->
        target_input.focus().val('Hello There!').blur()
        expect(target_input.val()).toBe 'hello_there'

      it 'locks changes from source', ->
        target_input.focus().val('Hello').blur()
        source.val(title).keyup()
        expect(target_input.val()).toBe 'hello'

      it 'locks changes even when parameterize is needed', ->
        target_input.focus().val('hello').blur()
        source.val(title).keyup()
        expect(target_input.val()).toBe 'hello'

      it 'does not lock if changes are not made', ->
        source.val(title).keyup()
        target_input.focus().keyup().blur()
        expect(target_input.val()).toBe slug

        source.val('First Change').keyup()
        source.val('Something Else').keyup()
        expect(target_input.val()).toBe 'something_else'

    describe 'Turning off', ->

