// ! Wait until the document is fully loaded before starting logic

$(function() {
    // ! Create burger function on click
    $('.btn-add').on('click', function(e) {
        // ! Prevent submit event
        e.preventDefault();

        // ! Store new burger data in an object
        let newBurger = {
            name: $('#bn')
                .val()
                .trim(),
            devoured: $('input:checked').val()
        };

        $('#bn').val('');

        // ! Create an ajax post call and pass in the newBurger object
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log('Created a delicious new burger!');
            // ! Reload the page to get the updated list
            location.reload();
        });
    });

    // ! Devour function on click
    $('.btn-devour').on('click', function(e) {
        // ! Prevent submit event
        e.preventDefault();
        // ! Extract data-id from the button and bind to a variable
        // ! Create an object that sets devoured to true
        let id = $(this).data('id');
        let devoured = { devoured: true };

        // ! Create an AJAX call that passes the id and devoured object
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: devoured
        }).then(() => {
            console.log('This burger has been devoured!');
            // ! Reload the page to get the updated list
            location.reload();
        });
    });
});
