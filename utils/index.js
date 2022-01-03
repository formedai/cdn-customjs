/**
 * Utils lib
 * This class provide shared method by custom js
 */
class UtilsForms {

    /**
     * lastname initAutoNumerics
    * Set element(s) to auto numeric
    * 
    * @param string elements is the Dom Element
    * @param boolean multiple false|true 
    */
    setElementsNumeric(elements, multiple = false) {
        
        if ($.isArray(elements)) {
            $.each(elements, function( index, element ) {
                if (multiple) {
                    AutoNumeric.multiple(element);
                    return;
                }
                new AutoNumeric(element);
            });
            return;
        }
    
        if (multiple) {
            AutoNumeric.multiple(elements);
            return;
        }
        new AutoNumeric(elements);
    }

    /**
    *
    * Set value of element
    * 
    * @param string element is id|class|DomElement
    * @param value string|number
    */
    setValue(element, value, type = '') {

        if (type === 'autonumeric') {
            const inputNumeric = this.getElement(element);
            inputNumeric.set(value);
            return;
        }

        $(element).val(value);
    }

    /**
    * Set element(s) to readonly
    * 
    * @param string element is the Dom Element
    */
    setReadonly(element) {
        const inputElement = $(element);
        if (!inputElement.attr('readonly'))
            $(element).attr('readonly', 'readonly');
    }

    /**
     * Set element(s) to Required
     *
     * @param string element is the Dom Element
     * @param string type of element
     * @param boolean value true | false
     */
    setRequired(element, type, value) {
        const isDifferentInput = [
            'checkbox',
            'radio',
            'text',
            'select'
        ];
        const inputElement = isDifferentInput[type]
        ? $(element)
        : $(element).parent();
        
        if($(element).attr('data-object-type') === 'section') return;

        if (value) {
            inputElement.attr("required", value);    
        } else {
            inputElement.removeAttr("required");
        }
    }
    /**
     * Get element 
     *
     * @param string type is autonumeric | ''
     * @return element instance
     */
    getElement(element, type = '') {
        if (type === 'autonumeric')
            return AutoNumeric.getAutoNumericElement(element);

        return $(element);
    }

    /**
     * Get Parent Row of element
     *
     * @param string element is the Dom Element
     * @return int
     */
    getParentRow(element) {
        let parentId;
        $( element ).parents().map((index, parent) => {
            if ($(parent).data('object-type') === 'row')
                parentId = $(parent).data('row');
        });

        return parentId;
    }

    showModal(title, message, handleClick) {
        $('#modal_generic_title').html(title);
        $('#modal_generic_text').html(message);
        $('#modal_generic_button').unbind();
        $('#modal_generic_button').on('click', handleClick);
        $('#modal_generic').modal('show');
    }

    /**
     * Function to generate an unique identifier.
     *
     * @param string suffix A custom unique id suffix, by default: null
     * @return int|string
     */
    generate_unique_id(suffix) {
        var rndNumber = Math.round(new Date().getTime() + (Math.random() * 100));
        if (suffix) {
            return `${rndNumber}_${suffix}`;
        }
        return rndNumber;
    }

    /**
     * Function to generate an unique identifier.
     *
     * @param callback suffix A custom unique id suffix, by default: null
     * @void
     */
    checkAmount(event, callback) {
        const $itemSection = $(event.currentTarget).parents('.items');
        const $quantity = $itemSection.find('[data-code="quantity"]') || $itemSection.find('[data-code="qty"]');
        const $priceElement = $itemSection.find('[data-code="price"]') 
        || $itemSection.find('[data-code="rate"]') || $itemSection.find('[data-code="unitPrice"]');
        const $amountElement = $itemSection.find('[data-code="amount"]') || $itemSection.find('[data-code="itemAmount"]');
        
        const priceAutoNumeric = this.getElement($priceElement.get(0));
        // AutoNumeric.getAutoNumericElement($priceElement.get(0));
        // const amountAutoNumeric = AutoNumeric.getAutoNumericElement($amountElement.get(0));
        
        const quantityNumber = Number.isNaN(Number($quantity.val())) ? 0 : Number($quantity.val());
        
        this.setValue($amountElement.get(0), priceAutoNumeric.getNumber() * quantityNumber, 'autonumeric');
        // amountAutoNumeric.set(priceAutoNumeric.getNumber() * quantityNumber);
        
        // calculateSubTotal(event);
        // calculateTotal();
        callback(event);
    }

}