$(function(){
    $('#background').fadeIn(1300);
    $('#game_name_1').fadeIn(1400);
    $('#game_name_2').fadeIn(1500);
    $('#game_name_3').fadeIn(1600);
    $('#head_1').fadeIn(1700);
    $('#head_2').fadeIn(1800);
    $('#open_menu').fadeIn(2100);

    $("#game_name_3").mouseenter(function(){
        $("#head_1").animate({
            top:'25%',
            position:'absolute'
        });
        $("#head_2").animate({
            top:'25%',
            position:'absolute'
        });
    });

    $('#game_name_3').mouseleave(function(){
        $("#head_1").animate({
            top:'6%',
            position:'absolute'
        });
        $("#head_2").animate({
            top:'44%',
            position:'absolute'
        });
    });

    $("#game_name_3").click(function(){
        $("#my_menu").css("width", "0%");

        $('#background').fadeOut(800);
        $('.game_name').fadeOut(800);
        $('body').animate({backgroundColor: "white"}, 1100);
        $("body").css("background-image","url(/static/img/game_interface.png)");
        $("body").css("background-size","cover");
        $('#GameInterface').fadeIn(1200);
    });

    //menu bar
    $("#open_menu").click(function(){
        $("#my_menu").css("width", "20%");
        $("#menu_content").fadeIn(800);
    });

    $("#close_menu").click(function(){
        $("#my_menu").css("width", "0%");
        $("#menu_content").fadeOut();
    });

    $("#open_about").click(function(){
        $("#my_menu").css("width", "0%");
        $("#open_about").fadeOut();
        $("#open_contact").fadeOut();
        $("#my_about").css("width", "20%");
        $("#about_content").fadeIn(1200);
    });

    $("#close_about").click(function(){
        $("#my_about").css("width", "0%");
        $("#about_content").fadeOut();
        $("#my_menu").css("width", "20%");
        $("#open_about").fadeIn();
        $("#open_contact").fadeIn();
    });

    $("#open_contact").click(function(){
        $("#my_menu").css("width", "0%");
        $("#open_about").fadeOut();
        $("#open_contact").fadeOut();
        $("#my_contact").css("width", "20%");
        $("#contact_content").fadeIn(1200);
    });

    $("#close_contact").click(function(){
        $("#my_contact").css("width", "0%");
        $("#contact_content").fadeOut();
        $("#my_menu").css("width", "20%");
        $("#open_about").fadeIn();
        $("#open_contact").fadeIn();
    });
});
