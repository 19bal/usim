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

$.datepicker.regional['tr'] = {
	closeText: 'Kapat',
	prevText: '<Önceki',
	nextText: 'Sonraki>',
	currentText: 'Bugün',
	monthNames: ['Ocak','Şubat', 'Mart', 'Nisan','Mayıs', 'Haziran', 'Temmuz',
			'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
	monthNamesShort: ['O', 'Ş', 'Mr', 'N', 'My', 'H', 'T', 'Ağ', 'Ey', 'Ek', 'K', 'Ar'],
	dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
	dayNamesShort: ['Pz', 'Pt', 'S', 'Ç', 'Pş', 'Cm', 'Ct'],
	dayNamesMin: ['Pz', 'Pt', 'S', 'Ç', 'Pş', 'Cm', 'Ct'],
	weekHeader: 'Ha',
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['tr']);

$.timepicker.regional['tr'] = {
	timeOnlyTitle: 'Zaman',
	timeText: 'Zaman',
	hourText: 'Saat',
	minuteText: 'Dakika',
	secondText: 'Saniye',
	millisecText: 'Milisaniye',
	currentText: 'Şu an',
	closeText: 'Kapat',
	ampm: false
};
$.timepicker.setDefaults($.timepicker.regional['tr']);
});
