document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    var form = document.querySelector('form');

    // Add event listener to form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input values
        var username = document.querySelector('input[name="user"]').value;
        var password = document.querySelector('input[name="User_Pass"]').value;

        if (username === 'a' && password === 'a') {
            // Redirect to a new HTML page
            window.location.href = 'menu.html';
        }else{
            // Log the values to the console
            console.log('Username:', username);
            console.log('Password:', password);
        }

        // You can perform further operations with the data here

        // Clear the form fields
        form.reset();
    });
});