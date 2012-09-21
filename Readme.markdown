jQuery.editable
==============


This plugin allows to turn a non-input element (e.g. span, div, etc) into an input field when user clicks on it.

Usage:
------

Easy.

```
<span id="myText">This is my text</span>

<script type="text/javascript">
    $(function () {
        $("#myText").editable({"type":"text", "class":"editableX", "idNameModifier":"_editable", "event":"dblclick"});
    });

```
Upon double-clicking on span text it will turn into an input field with a value of whatever text the span has.
Blur or hit enter to return back to span and save changes, or hit esc to cancel changes. A "change" event can also be attached 
to the original element.

All parameters are optional. Shown are default values.  
	type: textarea, or one of the types that can be applied to the input field (text, tel, number, etc).  
	class: a class name applied to created input element.  
	idNameModifier: created input will have id and name set to source element's id name with this value appended.  
	event: one of the jQuery's event names that will trigger the swap. dblclick and click make most sense.  



To see it in action go to the demo page: http://www.etcoding.com/page/jQueryeditable-and-jQuerylabelize-plugins.aspx