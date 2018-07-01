document.addEventListener('DOMContentLoaded', init2sxcCustomForm, false);

function init2sxcCustomForm() {
  var customForms = document.getElementsByTagName('custom-form');
  if (!customForms) return 0;

  Array.prototype.forEach.call(customForms, function (element) {
    if (!element.dataset.webservice) {
      throw 'custom-form must have data-webservice';
      return;
    }

    // <div class="app-jqfs-wrapper" data-webservice="element.dataset.webservice">
    //   <div class="app-jqfs-form">
    //       element.innerHTML
    //   </div>
    // </div>

    var formWrapperDiv = document.createElement('div');
    var formDiv = document.createElement('div');

    formWrapperDiv.className = 'app-jqfs-wrapper';
    formDiv.className = 'app-jqfs-form';
    formDiv.innerHTML = element.innerHTML;
    element.innerHTML = '';

    element.appendChild(formWrapperDiv);
    formWrapperDiv.appendChild(formDiv);
  });

	var customFormElements = document.getElementsByTagName('custom-form-element');
  
  if (customFormElements) {
    Array.prototype.forEach.call(customFormElements, function (element) {
      if (!element.dataset.type) {
        throw 'custom-form-element must have data-type';
        return;
      }

      if (!element.dataset.name) {
        throw 'custom-form-element must have data-name';
        return;
      }

      switch(element.dataset.type) {
      case 'text':
        // <div class="element.dataset.wrapperclass">
        //   <label for="element.dataset.name" class="element.dataset.labelclass">element.dataset.labeltext</label>
        //   <input type="element.dataset.inputtype" class="element.dataset.inputclass" id="element.dataset.name" element.dataset.disabled>
        // </div>

        var wrapperDiv = document.createElement('div');
        var label = document.createElement('label');
        var labelText = element.dataset.labeltext ? element.dataset.labeltext : element.dataset.name;
        var input = document.createElement('input');
        element.innerHTML = '';

        wrapperDiv.className = element.dataset.wrapperclass ? element.dataset.wrapperclass : 'form-group';
        label.htmlFor = element.dataset.name;
        label.className = element.dataset.labelclass ? element.dataset.labelclass : '';
        input.type = element.dataset.inputtype ? element.dataset.inputtype : 'text';
        input.className = element.dataset.inputclass ? element.dataset.inputclass : 'form-control';
        input.id = element.dataset.name;
        input.disabled = (element.dataset.disabled == 'disabled') ? true : false;

        element.appendChild(wrapperDiv);
        wrapperDiv.appendChild(label);
        label.appendChild(document.createTextNode(labelText));
        wrapperDiv.appendChild(input);
        break;
      default:
        element.innerHTML = 'Unsupported custom-form-element type.';
      }
    });
  }

}