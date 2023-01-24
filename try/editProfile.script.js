
//footer
$(document).ready(function() {
    checkScreenSize();
    $(window).resize(checkScreenSize);
});

function checkScreenSize() {
    if ($(window).width() < 992) {
        $('.Community').hide();
        $('.Hey').hide();
        $('.breadcrumb').hide();
        $('.footer-icons').show();
    } else {
        $('.Community').show();
        $('.Hey').show();
        $('.breadcrumb').show();
        $('.footer-icons').hide();
    }
};



