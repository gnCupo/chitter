window.onload = function() {
    document.getElementById('new_message')
        .addEventListener('ajax:success', function() {
            console.log(arguments);
        });
};