function aoClicarOb() {
    $('#obs').attr('rows', '3');
}

function aoSairOb() {
    $('#obs').attr('rows', '1');
}
$(document).on("focus", "#cep", function() {
    $('#cep').mask('00000-000');
});
$(document).on("focus", "#data", function() {
    $('#data').mask('00/00/0000');
});
$(document).on("focus", "#data4", function() {
    $('#data4').mask('00/00/0000');
});
$(document).on("focus", "#cpf", function() {
    $('#cpf').mask('000.000.000-00');
});
$(document).on("focus", "#tel", function() {
    $("#tel").keydown(function() {
        try {
            $("#tel").unmask();
        } catch (e) {}

        var tamanho = $("#tel").val().length;

        if (tamanho < 10) {
            $("#tel").mask("(99) 9999-9999");
        } else {
            $("#tel").mask("(99) 99999-9999");
        }

        // ajustando foco
        var elem = this;
        setTimeout(function() {
            // mudo a posição do seletor
            elem.selectionStart = elem.selectionEnd = 10000;
        }, 0);
        // reaplico o valor para mudar o foco
        var currentValue = $(this).val();
        $(this).val('');
        $(this).val(currentValue);
    });
});

$(document).on("focus", "#sexo", function() {
    //apenas 2 caracteres somente M ou F
    $('#sexo').mask('S', {
        translation: {
            'S': {
                pattern: /[mf]/,
                recursive: true
            }
        }
    });

});
$(document).ready(function() {
    handleDOBChanged();
    handleDOBChanged3();
    handleDOBChanged4();
    //listener on date of birth field
    function handleDOBChanged() {
        $('#data').on('change', function() {
            if (isDate($('#data').val())) {
                var age = calculateAge(parseDate($('#data').val()), new Date());
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
                $("#age").val('Data Inválida');
                $("#age").css('color', 'white');
                $("#age").css('background-color', 'red');
                $('#desabilita').attr('disabled', true);
            }
        });
    }

    //listener on date of birth field
    function handleDOBChanged2() {
        $('#data2').on('change', function() {
            if (isDate($('#data2').val())) {
                var age = calculateAge(parseDate($('#data2').val()), new Date());
                $("#age").val(age + ' Anos');
            } else {
                $("#age").val('');
            }
        });
    }

    function handleDOBChanged3() {
        if (isDate($('#data3').val())) {
            var age = calculateAge(parseDate($('#data3').val()), new Date());
            if (age >= 60) {
                $("#age").val(age + " Anos");
                $("#age").css('color', 'green');
            } else {
                $("#age").css('color', 'green');
                $("#age").val(age + " Anos");
            }
        } else {
            $("#age").val('');
        }
    }

    function handleDOBChanged4() {
        $('#data4').on('change', function() {
            if (isDate($('#data4').val())) {
                var age = calculateAge(parseDate($('#data4').val()), new Date());
                $("#age").val(age + ' Anos');
                $("#age").css('background-color', 'green');
                $("#age").css('color', 'white');
            } else {
                $("#age").val('Data Inválida');
                $("#age").css('color', 'white');
                $("#age").css('background-color', 'red');
                $('#desabilita').attr('disabled', true);
            }
        });
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
        console.log(txtDate);
        if(txtDate == undefined){
            txtDate = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();
        }
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