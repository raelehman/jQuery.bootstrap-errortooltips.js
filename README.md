# jQuery.bootstrap-errortooltips.js
A jquery plugin to render jQuery.validate validation errors as Bootstrap tooltips.

##Requires

- Bootstrap
- jQuery.validate plugin
- jQuery
 
##Usage

Override the showErrors method of the jQuery Validate plugin:

```javascript
showErrors: function (errorMap, errorList) {
  $.fn.bootstrapErrorTooltips({
      validElements : this.validElements(),
      errorMap : errorMap,
      errorList : errorList
});
```

##Options

```javascript
{
  errorClass: 'error'
  validClass: 'valid',
  tooltipPlacement : 'right',
  // These default properties are provided by the Validate plugin and must be passed in
  errorMap : {},
  errorList : [],
  validElements : {}
}
```

####errorClass
The CSS class applied to error elements

####validClass
The CSS class applied to valid elements

####tooltipPlacement
The position of the tooltip relative to the field it's validating

####errorMap,errorList,validElements
You do not need to pass these to the plugin, the Validate plugin takes care of that.
