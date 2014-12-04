jQuery SlugBug
==================

A jQuery plugin that makes it easy to create a URL friendly slug based on an input field.

Basic usage
-----------

SlugBug uses HTML data attributes to define behavior. Simply initialize SlugBug
and add the `data-slugbug-target` data attribute to the input that you want to
act as the source for the slug. This will create a slug in the element matched
by the selector in the data attribute value.

```javascript
$(document).ready(function() {
  $(document).slugbug();
});
```
```html
<label>
  Title
  <input type="text" name="title" value="" data-slugbug-target='[name="slug"]' />
</label>

<label>
  Slug
  <input type="text" name="slug" value="" data-slugbug-target='.url-slug' />
</label>

<div>
  http://yourdomain.com/<span class='url-slug'></span>
</div>
```

In the previous example, typing in the Title field will create a corresponding
slug in the Slug field. Any manual changes to the slug field will be converted
to the proper format, and the field will be locked against updates from the
Title field. The value will also be mirrorred to the span below.

Note that if you want to mirror a slug to an element that is not an input, you
should setup a second `data-slugbug-target` to mirror it directly from the slug
field, not the original source field.

You can try out this demo on your machine by opening demo/index.html

You can also lock an input when the page is loaded by adding
`data-slug-locked='true'` to the element.

Options
-------

You can also use the SlugBug parameterize function inside your app. After
having initialized the plugin, you can use `$.slugbug.parameterize('Some String')`.

There are some currently undocumented configuration options.

See [the code](https://github.com/zef/jquery-slugbug/blob/master/coffeescript/jquery.slugbug.coffee) for details.

To Do
-----

* Implement option to turn off locking slug field after editing it
* Document (and test) option to provide your own parameterize function
* Possibly maintain cursor position when making changes in the interior
  of a string in the slug field.

```
     _..-----.._
    /_.-¯¯˘¯¯-._\
   ||           ||
   ||___________||
  _|\     |     /|_
 / _ \    |    / _ \
 |(_) '.__!__.' (_)|
 '----|SLUGBUG|----'
  !_!           !_!
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
```

