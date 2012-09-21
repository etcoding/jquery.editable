//When applied to a non-input field (e.g. span/div etc), makes it editable.

(function ($) {
    $.fn.editable = function (options) {
        var defaultOptions = {
            "type":"text",
            "class":"editableX",
            "idNameModifier":"_editable",
            "event":"dblclick"
        };

        options = $.extend(defaultOptions, options);

        return this.each(function () {
            $(this)[options.event](function () {
                // check if this is an input field, in which case do nothing
                if ($(this).is("input") || $(this).is("textarea")) {
                    return;
                }
                // replace with input field
                var val = $(this).text();
                $(this).hide();

                var input = null;
                if ($(this).attr("data-editable-refid") === undefined) { // create new input

                    // generate an id for a new element, which we'll use to reference the original id with new input field
                    var refId = Math.random().toString();

                    var id = $(this).attr("id");
                    var name = $(this).attr("name");

                    //create element based on params
                    if (options.type == "textarea")
                        input = $("<textarea data-editable-refid='" + refId + "' class='" + options.class + "'></textarea>");
                    else
                        input = $("<input data-editable-refid='" + refId + "' class='" + options.class + "' type='" + options.type + "' />");

                    // add source element's id and name to data attribute of new input field
                    var sourceId = $(this).attr("id");
                    if (!(sourceId === undefined)) {
                        input
                            .attr("data-editable-source-id", sourceId)
                            .attr("id", sourceId + options.idNameModifier);
                    }
                    var sourceName = $(this).attr("name");
                    if (!(sourceName === undefined)) {
                        input
                            .attr("data-editable-source-name", sourceName)
                            .attr("name", sourceName + options.idNameModifier);
                    }
                    // restore the element on restore
                    input.blur(function () {
                        restore(input);
                    });

                    // process enter and esc key presses
                    input.keyup(function (e) {
                        if (e.keyCode == 13) {
                            restore(input);
                        }
                        if (e.keyCode == 27) {
                            restore(input, true);
                        }
                    });

                    $(this).attr("data-editable-refid", refId);
                    input.insertAfter($(this));
                }
                else {
                    // input already exists
                    var id = $(this).attr("data-editable-refid");
                    if (options.type == "textarea")
                        input = $("textarea[data-editable-refid='" + id + "']");
                    else
                        input = $("input[data-editable-refid='" + id + "']");
                    input.show();
                }
                input.val(val);
                input.focus();
            });
        });

        function restore(inputElement, cancelChanges) {
            // unhide original field
            var val = inputElement.val();
            inputElement.hide();

            var refId = inputElement.attr("data-editable-refid");
            var original = $("[data-editable-refid='" + refId + "']:not(input):not(textarea)");
            if (cancelChanges === true) {
                inputElement.val(original.text());
            }
            else {
                original.text(val);
            }
            original.show();

            // fire change event on original element, if text was changed
            var changed = original.text() != inputElement.val();
            if (changed)
                original.trigger("change");
        }


        function generateRefId() {
            if (generateRefId.generatedIds === undefined)
                generateRefId.generatedIds = [];
            var refId = null;
            do {
                refId = Math.random().toString().substr(2);
            }
            while (generateRefId.generatedIds.indexOf(refId) >= 0);

            generateRefId.generatedIds.push(refId);

            return refId;
        }
    };
})(jQuery);