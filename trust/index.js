class UtilsForms {

    /**
     * Set element(s) to Required
     *
     * @params string element is the Dom Element
     * @params string type of element
     * @params boolean value true | false
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
     * @params string element is the Dom Element
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

}

$(document).ready(function() {
    const parentSection = $('.container-property-group');
    const utils = new UtilsForms();
    const elementsShow = [
        '.code_communityManager',
        '.code_managerId',
        '.code_associationName',
        '.code_dateOfService',
        '.code_serviceProvidedS', 
        '.code_hours',
        '.code_override',
        '.code_notes'
    ];
    const optionSelected = {
        'ARC Meeting Attendance': (sectionRow) => {
            sectionRow.find('.code_ifArcMeetingIsSe').show();
            sectionRow.find('input[id^="p_94_"]').parent().parent().show();
        },
        'Annual Meeting Preparation':(sectionRow) => {
            sectionRow.find('.code_ifAnnualMeetingA').show();
            sectionRow.find('input[id^="p_92_"]').parent().parent().show();
        },
        'Annual Meeting Attendance': (sectionRow) => {
            sectionRow.find('.code_ifAnnualMeetingA').show();
            sectionRow.find('input[id^="p_92_"]').parent().parent().show();
        },
        'After Hours - phone calls': (sectionRow) => {
            sectionRow.find('.code_ifAfterHoursIsS, .code_afterHoursTravel').show();
        },
        'After Hours – Travel Time': (sectionRow) => {
            sectionRow.find('.code_ifAfterHoursOnsi').show();
            sectionRow.find('.code_ifAfterHoursOnsi').next().show();
            utils.setRequired(
                sectionRow.find('.code_ifAfterHoursOnsi').next().find('[data-prop="36"]')
            , 'text', true);
        },
        'Boarding Meeting Attendance':(sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_76_"]'), 'text', true);
            sectionRow.find('.code_ifBoardMtgAttend, .code_boardMeetingAct').show();
            sectionRow.find('input[id^="p_77_"]').parent().parent().show();
        },
        'Committee Meeting Attendance':(sectionRow) => {
            sectionRow.find('.code_ifCommunityMeeti').show();
            sectionRow.find('input[id^="p_96_"]').parent().parent().show();
        },
        'Email': (sectionRow) => {
            sectionRow.find('.code_ifEmailSelected, .code_emailTotalCalcul').show();
            sectionRow.find('input[id^="p_90_"]').parent().parent().show();
            utils.setRequired(sectionRow.find('input[id^="p_90_"]'), 'checkbox', true);
        },
        'Meeting Attendance': (sectionRow) => {},
        'Other': (sectionRow) => {
            utils.setRequired(sectionRow.find('.notes'), 'radio', true);
        },
        'Property Inspection': (sectionRow) => {
            sectionRow.find('.code_IfPropertyInspec').show();
            sectionRow.find('input[id^="p_136_"]').parent().parent().show();
        },
        'Special Services - Litigation support': (sectionRow) => {
            sectionRow.find('.code_ifSpecialService, .code_specialServicest').show();
        },
        'Special Services - Insurance Claim': (sectionRow) => {
            sectionRow.find('.code_specialServicesi, .code_totalClaimAmount').show();
            utils.setRequired(sectionRow.find('.specialServicesi'), 'text', true);
            utils.setRequired(sectionRow.find('.totalClaimAmount'), 'text', true);
        },
        'Special Services - Construction Defect': (sectionRow) => {
            sectionRow.find('.code_2ifSpecialServic').show();
            sectionRow.find('input[id^="p_87_"]').parent().parent().show();
        },
        'Special Services - Capital Improvement Project': (sectionRow) => {
            sectionRow.find('.code_specialServicesc, .code_totalProjectAmou').show();
            utils.setRequired(sectionRow.find('.specialServicesc'), 'text', true);
            utils.setRequired(sectionRow.find('.totalProjectAmou'), 'text', true);
        },
        'Special Projects': (sectionRow) => {
            Swal.fire({
                title: 'Please Notes!',
                html:`
                <b>Workflow – Require Supervisor to determine if billable or included in retainer hours upon invoice approval</b>
                `,
                type:  'info',
                showConfirmButton: true
            });
        }
    }
    const radioSelected = {
        'ifBoardMtgAttend-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_77_"]'), 'radio', true);
            utils.setRequired(sectionRow.find('select[id^="p_77_"]'), 'select', true);
        },
        'ifBoardMtgAttend-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_77_"]'), 'radio', false);
            utils.setRequired(sectionRow.find('select[id^="p_77_"]'), 'select', false);
        },
        'ifAfterHoursIsS-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_79_"]'), 'radio', true);
        },
        'ifAfterHoursIsS-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_79_"]'), 'radio', false);
        },
        'ifAfterHoursOnsi-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_81_"]'), 'select', true);
        },
        'ifAfterHoursOnsi-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_81_"]'), 'select', false);
        },
        'ifSpecialService-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_83_"]'), 'radio', true);
        },
        'ifSpecialService-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_83_"]'), 'radio', false);
        },
        'ifCommunityMeeti-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_96_"]'), 'select', true);
        },
        'ifCommunityMeeti-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_96_"]'), 'select', false);
        },
        '2ifSpecialServic-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_87_"]'), 'radio', true);
        },
        '2ifSpecialServic-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_87_"]'), 'radio', false);
        },
        'ifAnnualMeetingA-In-Person':(sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_91_"]'), 'text', true);
            utils.setRequired(sectionRow.find('select[id^="p_92_"]'), 'select', true);
        },
        'ifAnnualMeetingA-Remotely':(sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_91_"]'), 'text', false);
            utils.setRequired(sectionRow.find('select[id^="p_92_"]'), 'select', false);
        },
        'ifArcMeetingIsSe-In-Person ': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_94_"]'), 'radio', true);
            utils.setRequired(sectionRow.find('select[id^="p_94_"]'), 'select', true);
        },
        'ifArcMeetingIsSe-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('input[id^="p_94_"]'), 'radio', false);
            utils.setRequired(sectionRow.find('select[id^="p_94_"]'), 'select', false);
        },
        'IfPropertyInspec-In-Person': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_136_"]'), 'select', true);
        },
        'IfPropertyInspec-Remotely': (sectionRow) => {
            utils.setRequired(sectionRow.find('select[id^="p_136_"]'), 'select', false);
        }
    };
    const $EmailInput = $("#p_134_0");
    const $ManagerIDInput = $("#p_5_0");
    let isValid = false;
    
    //Disabling date forward to current date
    Utils.datePickerDisableDateByDirection('[data-code="dateOfService"]', 'forward');

    $(".dateSubmitted").prop("readonly", true);
    
    $('[data-object-type="property"]').addClass('hide-property').hide();

    $('.ifEmailSelected').attr('type','number');

    $.each( elementsShow, function( key, value ) {
        $(value).removeClass('hide-property').show();
    });
    
    parentSection.on("select2:selecting", '.selectServiceProvided', (event) => {
        const optionSelect = event.params.args.data.id;
        const rowId = utils.getParentRow(event.currentTarget);
        const sectionRow = $(`[data-row="${rowId}"]`);
        sectionRow.find('.hide-property').each(function() {
            $(this).hide();
            $(this).find('input').removeAttr("required");
            setInputsOverride(sectionRow, $('input[id^="p_9_"]').is(':checked'));
        });
        if (optionSelected[optionSelect])
            optionSelected[optionSelect](sectionRow);
        if (optionSelect === 'Boarding Meeting Attendance') {
            Swal.fire({
                title: 'Please Notes!',
                html:`
                <b>It is required to entered meeting preparation!</b></br>
                <p>Please click in add new and selected in service provided Meeting preparation</p>
                `,
                type:  'info',
                showConfirmButton: true
            });
        }
    });
    parentSection.on("select2:selecting", '.hoursCredited', (event) => {
        const rowId = utils.getParentRow(event.currentTarget);
        const sectionRow = $(`[data-row="${rowId}"]`);
        const hoursReport = sectionRow.find('.hours').val();
        if (event.params.args.data.id > hoursReport) {
            Swal.fire({
                title: 'Hours Credited!',
                html:`
                <b>Hours credited cannot be larger than Hours reported by manager.</b>
                `,
                type:  'info',
                showConfirmButton: true
            });
            sectionRow.find("select.hoursCredited").select2('val', hoursReport);
        }
    });
    
    parentSection.on('click', '[type="radio"]', function() {
        const rowId = utils.getParentRow(this);
        const radioButton = $(this).data('radiobutton');
        const sectionRow = $(`[data-row="${rowId}"]`);
        if ($(`[data-radiobutton="${radioButton}"]`).is(':checked')) {
            if (radioSelected[radioButton])
                radioSelected[radioButton](sectionRow);
        }
    });
    parentSection.on('click', 'input[id^="p_9_"]', function() {
        const rowId = utils.getParentRow(this);
        const sectionRow = $(`[data-row="${rowId}"]`);
        const visible = $(this).is(':checked');
        setInputsOverride(sectionRow, visible);
    });

    parentSection.on('keyup', '.ifEmailSelected', function() {
        const inputValue = parseInt($(this).val(), 10);
        if (inputValue >= 0) {
            const rowId = utils.getParentRow(this);
            const sectionRow = $(`[data-row="${rowId}"]`);
            const minPerMail = 4;
            sectionRow.find('.emailTotalCalcul').val(inputValue * minPerMail);
        }
    });
    
    // Community manager and ID validations
    setWorkflowSubmitButtonEvents();
    $EmailInput.focusout(function() { validate(); });
    $ManagerIDInput.focusout(function() { validate(); });
    $('#form-instance-save').submit(function( event) {
        // This is needed because even when the form doesn't submit, the loading animation is shown for a long time.
        window.formedai.ui.loader.hideAnimation();
        if (isValid) {
            return true;
        }
        validate(true);
        return false;
    });
    
    initEachServicesProvided(optionSelected);

    $('[data-object-type="section"]').on('click', '.add-new-item', function(e) {
        initEachServicesProvided(optionSelected, true);
    });

    function setInputsOverride(sectionRow, visible) {
        const noCharge = sectionRow.find('.code_noCharge');
        const hoursCredited = sectionRow.find('.code_hoursCredited')
        const adjustmentReason = sectionRow.find('.code_adjustmentReason');
        noCharge.toggle(visible);
        hoursCredited.toggle(visible);
        adjustmentReason.toggle(visible);
        utils.setRequired($('.adjustmentReason'),'text', visible);
    }

    function setWorkflowSubmitButtonEvents() {
        $('#botton-btnContinueWorkflow').unbind();
        $('#botton-btnContinueWorkflow').on('click', function() { validate(true); });
        $('#top-btnContinueWorkflow').unbind();
        $('#top-btnContinueWorkflow').on('click', function() { validate(true); });
    }

    function initEachServicesProvided(optionSelected, reset = false) {
        $('.code_serviceProvidedS').each(function(){
            const Select = $(this).find('.form-select2');
            const rowId = utils.getParentRow(Select);
            const sectionRow = $(`[data-row="${rowId}"]`);
            Select.addClass('selectServiceProvided');
            DropdownRemote.setElements({
                selector: Select,
                textColumn: 'name',
                valueColumn: 'name',
                url: formedai.app.api_url + '/entity/getByFilterForDropDown',
                formData: {
                    name: "Services Provided",
                },
                headers: {
                    'Authorization': `Bearer ${formedai.utilities.getCookie('auth')}`
                }
            });
            if (Select.val() && !reset && optionSelected[Select.val()])
                optionSelected[Select.val()](sectionRow);
            if($('[data-object-type="row"]').last().data('row') === rowId 
            && reset) {
                sectionRow.find('.hide-property').each(function() {
                    $(this).hide();
                    $(this).find('input').removeAttr("required");
                });
            }
        });
    }

    function validate(isSaving) {
        const emailValue = $EmailInput.val().trim().toUpperCase();
        const managerIDValue = $ManagerIDInput.val().trim().toUpperCase();
        validateManager(emailValue, managerIDValue, isSaving);
    }
    
    function validateManager(emailValue, managerIDValue, isSaving) {
        formedai.utilities.makeApiRequest('executeTask?project=Trust&task=isValidEmployee', 'POST', {
            'email': emailValue,
            'managerID': managerIDValue
        }, function(response) {
            const isValidUser = response.responseData;
            if (isValidUser) {
                isValid = true;
                if (isSaving) {
                    $('#top-btn-save-form-instance').click();
                }
                $EmailInput.css('border', '1px solid #ccc');
                $ManagerIDInput.css('border', '1px solid #ccc');
            } else {
                const isManagerEntered = emailValue != "" && managerIDValue != "";
                if (isSaving || isManagerEntered) {
                    $('#modal_generic').modal('show');
                    utils.showModal('Error', "Invalid manager email or id", () => {});
                    $EmailInput.css('border', '1px solid red');
                    $ManagerIDInput.css('border', '1px solid red');
                }
            }
            // This is needed because even when the form doesn't submit, the loading animation is shown for a long time.
            window.formedai.ui.loader.hideAnimation();
        },
        true,
        {showLoadingAnimation: false});
    }

});