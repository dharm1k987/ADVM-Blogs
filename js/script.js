$(document).ready(function () {


    var navbar = $(".navbar");
    var btn_explore = $(".btn-explore");
    var image_text = $(".image-text");
    var gallery = $(".gallery img");
    var left_arrow = $(".ion-chevron-left");
    var right_arrow = $(".ion-chevron-right");
    var img_hide_nav = $(".img-hide-nav");
    var connect_4_modal = $(".connect-4-modal");
    var petly_modal = $(".petly-modal");
    var others_modal = $(".others-modal");
    var modal_title = $("h4.modal-title");
    var modal_body = $("div.modal-body p");
    var navbar_item = $(".navbar-item");

    var image_data = {
        "css/img/prom-photo.jpg": "background text",
        "css/img/bunnies-photo.jpg": "face text",
        "css/img/trampoline-photo.jpg": "fjord text"


    };





    if ($('body').is('.main-page')) {
        navbar.hide();
        $(".about").hide();
        $(".hobbies").hide();
        $(".projects").hide();
        $(".contact").hide();
        $(".footer").hide();
    };



    //SMOOTH SCROLL
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });


    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });
    img_hide_nav.click(function () {
        navbar.slideUp();
    });

    $(".btn-close-modal").click(function () {
        navbar.slideDown();
    })

    $(".ion-chevron-left").click(function () {
        plusDivs(-1)
    });
    $(".ion-chevron-right").click(function () {
        plusDivs(1)
    });
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function showDivs(n) {
        //console.log("in the func");
        var i;
        var x = $(".mySlides");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }




    //navbar.hide();

    btn_explore.click(function () {
        console.log(window.location.pathname);
        navbar.slideDown(500);
        $(".about").show();
        $(".hobbies").show();
        $(".projects").show();
        $(".contact").show();
        $(".footer").show();
    });

    connect_4_modal.click(function () {

        modal_title.text("Connect 4");
        modal_body.html("Connect 4 was a group project my friend Vinit and I did in grade 12, as part of our final assigment. It is a Java based, GUI application that is essentially connect 4 as you would play in real life. <br><hr> The neat aspect of our project is that it features single player mode as well as 2P, and in single player mode, our computer AI actually tied/won most of the matches it played against humans. It has a pretty smart system integration. <br> This project was really fun to make and really required all the aspect of computer science to program, such as: OOP, searching, sorting, algorithm, etc. <br><hr> Here is a link if you wish to download it: ");

    });

    petly_modal.click(function () {

        modal_title.text("Petly");
        modal_body.html("Petly was a immense project a group of grade 12 students did for the city of Toronto. It was an android application, and it's goal was to connect pet owners in Toronto. It offered many features, such as adding friends, posting updates, searching for parks, meeting new people, creating reminders, and many more. <br> <hr> This project was projected to the city of Toronto who praised it, and my team am I really learned alot from this project. In addition to Android programming, we had to use version control, graphic designing, and many external resources to deliver a finished project. <br><hr> Here is a link if you wish to download it: ");

    });

    others_modal.click(function () {

        modal_title.text("Others");
        modal_body.html("This website is one of my big projects. After I learned the basics of HTML, CSS, JS, I decided to implement them into something I can show to other people, this website. This website was fully created based on online teachings, and that really shows that you can just learn about anything, without having to pay for it. <br> <hr> I watched some basic videos, and starting creating my brand new website, and was always eager to learn more about web development. <br><hr> Please tell me how you thought of my website in the contact section below.");

    });

    $("input, textarea").focus(function () {

        $(this).css({
            "background-color": "#eaeaea"
        });
    });

    $("input, textarea").blur(function () {

        $(this).css({
            "background-color": "#ffffff"

        });

    });

    $('.btn-submit').attr('disabled', true);
    $('input, textarea').keyup(function () {
        var disable = false;
        $('input, textarea').each(function () {
            if ($(this).val() == "") {
                disable = true;
            }
        });
        $('.btn-submit').prop('disabled', disable);
    });


});
