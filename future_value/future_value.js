var calculateClick = function () {
    var investment = parseFloat($("#investment").val());
    var rate = parseFloat($("#rate").val());
    var years = parseInt($("#years").val());

    // Validation
    if (isNaN(investment) || investment <= 0) {
        alert("Investment must be a number greater than zero.");
        $("#investment").focus();
    } else if (isNaN(rate) || rate <= 0) {
        alert("Rate must be a number greater than zero.");
        $("#rate").focus();
    } else if (isNaN(years) || years <= 0) {
        alert("Years must be a number greater than zero.");
        $("#years").focus();
    } else {
        // Calculation: accumulate the value one year at a time
        var futureValue = investment;
        for (var i = 1; i <= years; i++) {
            futureValue += futureValue * rate / 100;
        }

        // Output
        $("#future_value").val(futureValue.toFixed(2));
    }
}


$(document).ready(function() {
    $("#calculate").click(calculateClick);
    $("#investment").focus();
});