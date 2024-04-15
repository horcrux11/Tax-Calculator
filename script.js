// script.js

$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
});

// Function to calculate tax based on user input
function calculateTax() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const ageGroup = document.getElementById('ageGroup').value;
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);

    // Validate input (check if grossIncome is a valid number)
    if (isNaN(grossIncome)) {
        showErrorIcon('errorIcon1', 'Please enter valid numbers for income.');
        return;
    } else {
        hideErrorIcon('errorIcon1');
    }
    if (isNaN(extraIncome)) {
        showErrorIcon('errorIcon3', 'Please enter valid numbers for extra income.');
        return;
    } else {
        hideErrorIcon('errorIcon3');
    }
    if (isNaN(deductions)) {
        showErrorIcon('errorIcon4', 'Please enter valid numbers for deductions.');
        return;
    } else {
        hideErrorIcon('errorIcon4');
    }

    // console.log(typeof(ageGroup));
    if (ageGroup.length == 0) {
        showErrorIcon('errorIcon2', 'Please select an age group.');
        return;
    } else {
        hideErrorIcon('errorIcon2');
    }

    const totalIncome = grossIncome + extraIncome - deductions;

    // tax or no tax?
   if (totalIncome <= 800000) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `Your total income: ₹${totalIncome.toFixed(2)}`;
        $('#taxModal').modal('show');
        return; // Exit the function early without calculating tax
    }


    // Calculate tax based on age group
    let tax = 0;
    if (totalIncome > 800000) {
        if (ageGroup == '<40') {
            tax = 0.3 * (totalIncome - 800000);
        } else if (ageGroup == '40-60') {
            tax = 0.4 * (totalIncome - 800000);
        } else if (ageGroup == '≥60') {
            tax = 0.1 * (totalIncome - 800000);
        }
    }

    // console.log(tax);

    // Display tax result in a modal
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `Your estimated tax: ₹${tax.toFixed(2)}`;
    $('#taxModal').modal('show');
}

// Function to show error icon
function showErrorIcon(iconId, errorMessage) {
    document.getElementById(iconId).style.display = 'inline';
    document.getElementById(iconId).title = errorMessage;
}

// Function to hide error icon
function hideErrorIcon(iconId) {
    document.getElementById(iconId).style.display = 'none';
}
