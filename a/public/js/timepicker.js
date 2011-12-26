$(function(){
$('#example16_start').datetimepicker({
    onClose: function(dateText, inst) {
        var endDateTextBox = $('#example16_end');
        if (endDateTextBox.val() != '') {
            var testStartDate = new Date(dateText);
            var testEndDate = new Date(endDateTextBox.val());
            if (testStartDate > testEndDate)
                endDateTextBox.val(dateText);
        }
        else {
            endDateTextBox.val(dateText);
        }
    },
    onSelect: function (selectedDateTime){
        var start = $(this).datetimepicker('getDate');
        $('#example16_end').datetimepicker('option', 'minDate', new Date(start.getTime()));
    }
});
$('#example16_end').datetimepicker({
    onClose: function(dateText, inst) {
        var startDateTextBox = $('#example16_start');
        if (startDateTextBox.val() != '') {
            var testStartDate = new Date(startDateTextBox.val());
            var testEndDate = new Date(dateText);
            if (testStartDate > testEndDate)
                startDateTextBox.val(dateText);
        }
        else {
            startDateTextBox.val(dateText);
        }
    },
    onSelect: function (selectedDateTime){
        var end = $(this).datetimepicker('getDate');
        $('#example16_start').datetimepicker('option', 'maxDate', new Date(end.getTime()) );
    }
});
			});
