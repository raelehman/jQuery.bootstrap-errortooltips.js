/*
    Use Bootstrap Tooltips to display jQuery validate plugin errors
*/

/*global jQuery , $ */
(function ($) {
    'use strict';
    
    $.fn.bootstrapErrorTooltips = function (options) {
        var opt = $.extend($.fn.bootstrapErrorTooltips.defaults, options),
            getLabel;
        
        getLabel = function ($element) {
            //look for a label wrapping the input
            var $label = $element.parent('label');
            
            // If label is not wrapping, look for a label "for" the element
            if (!$label.length) {
                $label = $('label[for=' + $element.attr('id') + ']');
            }
            
            return $label;
        };
        
        // Clean up any tooltips for valid elements
        $.each(opt.validElements, function (index, element) {
            var $element = $(element);

            // Highlight add-on icon as valid, remove error styles
            $element.siblings('.add-on').removeClass(opt.errorClass).addClass(opt.validClass);
            
            // if input is a checkbox or a radio, perform cleanup actions on its label
            if ($element.is(':checkbox') || $element.is(':radio')) {
                // Remove the error class from all inputs/labels of same name
                $('[name=' + $element.attr('name') + ']').each(
                    function () {
                        var $thisLabel = getLabel($(this));
                        $thisLabel.removeClass(opt.errorClass).addClass(opt.validClass);
                        // Set the error element to its label for tooltip removal
                        $element = $thisLabel;
                    }
                );
                
            } else {
                // For other elements just remove the error class and add the valid class
                $element.removeClass(opt.errorClass).addClass(opt.validClass);
            }

            // Destroy the tooltip
            $element.data('title', '') // Clear the title - there is no error associated anymore
                .removeClass(opt.errorClass)
                .tooltip('destroy');
        });

        // Create new tooltips for invalid elements
        $.each(opt.errorList, function (index, error) {
            var $element = $(error.element),
                thisTooltipPlacement = opt.tooltipPlacement;
            
            // Highlight icon as invalid, remove valid styles
            $element.siblings('.add-on').addClass(opt.errorClass).removeClass(opt.validClass);
            
            // if input has an add-on set placement to "bottom"
            if ($element.siblings('.add-on').length > 0) {
                thisTooltipPlacement = 'bottom';
            }
            // if input is a checkbox or a radio, attach the tooltip to its label
            if ($element.is(':checkbox') || $element.is(':radio')) {
                // Get all inputs of same name and apply error indicators to their label
                $('[name=' + $element.attr('name') + ']').each(
                    function () {
                        var $thisLabel = getLabel($(this));
                        $thisLabel.addClass(opt.errorClass).removeClass(opt.validClass);
                        // Set the error element to its label
                        $element = $thisLabel;
                    }
                );
                
            } else {
                // Remove error class and add valid class to all other inputs
                $element.removeClass(opt.errorClass).removeClass(opt.validClass);
            }

            // Create tooltip
            $element.tooltip('destroy') // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data('title', error.message) // Apply the title/message
                    .addClass(opt.errorClass) // Add the error style
                    .tooltip({
                    placement: thisTooltipPlacement
                }).tooltip('show'); // Create a new tooltip based on the error messsage we just set in the title and show it
        });
 
        return this;
 
    };
 
}(jQuery));

// Plugin defaults
$.fn.bootstrapErrorTooltips.defaults = {
    errorClass: 'error',
    validClass: 'valid',
    tooltipPlacement : 'right',
    // These properties are provided by the Validate plugin and must be passed in
    errorMap : {},
    errorList : [],
    validElements : {}
};
