(function() {

  jQuery(function($) {
    describe('$.slugbug.parameterize', function() {
      it('Creates URL friendly slugs', function() {
        return expect($.slugbug.parameterize('Hello there!')).toBe('hello_there');
      });
      it('Properly handles beginning and trailing non-word characters', function() {
        return expect($.slugbug.parameterize('!!!Hello there!!!')).toBe('hello_there');
      });
      it('Collapses multiple slug characters', function() {
        expect($.slugbug.parameterize('-_-Hello__there_-_')).toBe('hello_there');
        return expect($.slugbug.parameterize('hello____there')).toBe('hello_there');
      });
      it('Does not insert slug character for apostrophes', function() {
        return expect($.slugbug.parameterize("Don't")).toBe('dont');
      });
      return it('Takes an argument to prevent stripping trailing slug characters', function() {
        expect($.slugbug.parameterize('_thing_')).toBe('thing');
        return expect($.slugbug.parameterize('_thing_', false)).toBe('_thing_');
      });
    });
    return describe('$(document).slugbug()', function() {
      var slug, source, target_element, target_input, title;
      title = 'Hello There!';
      slug = 'hello_there';
      source = $('[name="title"]');
      target_input = $('[name="slug"]');
      target_element = $('.url-slug');
      afterEach(function() {
        source.val('');
        target_input.val('');
        target_element.text('');
        target_input.removeData('slug-locked');
        return target_input.removeData('value-on-focus');
      });
      it('Should create a slug in an alternate input when typing', function() {
        source.val(title).keyup();
        return expect(target_input.val()).toBe(slug);
      });
      it('Should handle multiple events properly', function() {
        source.keyup().val(title).keyup();
        return expect(target_input.val()).toBe(slug);
      });
      it('Should mirror slug to a dom element', function() {
        source.val(title).keyup();
        return expect(target_element.text()).toBe(slug);
      });
      return describe('Typing in a slug target', function() {
        it('creates a slug', function() {
          target_input.focus().val('Hello There').keyup();
          return expect(target_input.val()).toBe('hello_there');
        });
        it('allows trailing characters while typing', function() {
          target_input.focus().val('Hello There!').keyup();
          return expect(target_input.val()).toBe('hello_there_');
        });
        it('does not allow trailing characters on blur', function() {
          target_input.focus().val('Hello There!').blur();
          return expect(target_input.val()).toBe('hello_there');
        });
        it('locks changes from source', function() {
          target_input.focus().val('Hello').blur();
          source.val(title).keyup();
          return expect(target_input.val()).toBe('hello');
        });
        it('locks changes even when parameterize is needed', function() {
          target_input.focus().val('hello').blur();
          source.val(title).keyup();
          return expect(target_input.val()).toBe('hello');
        });
        return it('does not lock if changes are not made', function() {
          source.val(title).keyup();
          target_input.focus().keyup().blur();
          expect(target_input.val()).toBe(slug);
          source.val('First Change').keyup();
          source.val('Something Else').keyup();
          return expect(target_input.val()).toBe('something_else');
        });
      });
    });
  });

}).call(this);
