$(document).on("mousemove", "#move", function() {
    handleDOBChanged();
    //listener on date of birth field
    function handleDOBChanged() {
        if (isDate($('#data2').val())) {
            var age = calculateAge(parseDate($('#data2').val()), new Date());
            if (age >= 60) {
                $("#age").val(age + " Anos");
                $("#age").css('color', 'green');
                $('#desabilita').attr('disabled', false);
            } else {
                alert("O Usuário Tem: " + age + " Anos!\nPortanto, Data Inferior a 60 Anos!");
                $("#age").css('color', 'red');
                $('#desabilita').attr('disabled', true);
                $("#age").val(age + " Anos");
            }
        } else {
            $("#age").val('');
        }
    }

    //convert the date string in the format of dd/mm/yyyy into a JS date object
    function parseDate(dateStr) {
        var dateParts = dateStr.split("/");
        return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
    }
    //is valid date format
    function calculateAge(dateOfBirth, dateToCalculate) {
        var calculateYear = dateToCalculate.getFullYear();
        var calculateMonth = dateToCalculate.getMonth();
        var calculateDay = dateToCalculate.getDate();
        var birthYear = dateOfBirth.getFullYear();
        var birthMonth = dateOfBirth.getMonth();
        var birthDay = dateOfBirth.getDate();
        var age = calculateYear - birthYear;
        var ageMonth = calculateMonth - birthMonth;
        var ageDay = calculateDay - birthDay;

        if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
            age = parseInt(age) - 1;
        }
        return age;
    }

    function isDate(txtDate) {
        var currVal = txtDate;
        if (currVal == '')
            return true;
        //Declare Regex
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var dtArray = currVal.match(rxDatePattern); // is format OK?
        if (dtArray == null)
            return false;
        //Checks for dd/mm/yyyy format.
        var dtDay = dtArray[1];
        var dtMonth = dtArray[3];
        var dtYear = dtArray[5];
        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    }
});