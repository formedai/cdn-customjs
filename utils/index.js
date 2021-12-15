/**
 * Utils lib
 * This class provide shared method by custom js
 */
class UtilsForms {

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
        const isDifferentInput = type === 'checkbox' || type === 'radio' || type === 'text' || type === 'select';
        const inputElement = isDifferentInput ? $(element) : $(element).parent();
        
        if($(element).attr('data-object-type') === 'section') return;

        if (value) {
            inputElement.attr("required", value);    
        } else {
            inputElement.removeAttr("required");
        }
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
}