$(function(){
    $('#level').val("");
    $('#level_height').val("");
    $('#beam_len').val("");
    $('#beam_width').val("");
    $('#beam_height').val("");
    $('#column_width').val("");
    $('#column_thick').val("");

    //Show the Calculation Result
    $("#result").click(function(){
        $("#my_result").css("width", "100%");
        $("#result_content").fadeIn(800);
    });

    $("#close_result").click(function(){
        $("#my_result").css("width", "0%");
        $("#result_content").fadeOut();
    });

    // Confirm all the data to draw and calculate
    $('#confirm_btn').click(function(){
        $("#my_menu").css("width", "0%");
        $("#my_result").css("width", "0%");

        var l = $('#level').val();
        var lh = $('#level_height').val();
        var bl = $('#beam_len').val();
        var bw = $('#beam_width').val();
        var bh = $('#beam_height').val();
        var cw = $('#column_width').val();
        var ct = $('#column_thick').val();

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');

        if (l === null || lh === null || bl === null || bw === null || bh === null || cw === null || ct === null ){
            alert("You must check whether you enter a number in each box.");

            //Clear Canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            if ( isNaN(lh) === true || isNaN(bl) === true ) {
                alert("You must check whether you indeed enter a number in the input box.");

                //Clear Canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

            } else if ( lh < 8 || lh > 15 || bl < 10 || bl > 25){
                alert("Make sure you follow our instruction.");

                //Clear Canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

            } else {
                alert("Information of your structure has been checked.\n" +
                    "Now you can draw your structure on the left site");
                draw_structure(l, lh, bl, bh, ct);
            }
        }
    });

    // Back to Main Interface
    $("#exit_btn").click(function(){
        $("#my_menu").css("width", "0%");
        $("#my_result").css("width", "0%");

        $('#level').val("");
        $('#level_height').val("");
        $('#beam_len').val("");
        $('#beam_width').val("");
        $('#beam_height').val("");
        $('#column_width').val("");
        $('#column_thick').val("");

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        $('#GameInterface').fadeOut(800);
        $('.inf').fadeOut(800);
        $('.sg').fadeOut(800);
        $('.a1').fadeOut(800);
        $('.a2').fadeOut(800);
        $('.a3').fadeOut(800);
        $('.a4').fadeOut(800);
        $(".force_info").text("");

        $('body').animate({backgroundColor: "black"}, 1100);
        //$("body").css("background-image","");
        //$("body").css("background-size","cover");
        $('#background').fadeIn(1200);
        $('.game_name').fadeIn(1200);
    });

});

// Draw Structure
function draw_structure(l, lh, bl, bh, ct) {
    var cs = document.getElementById('Canvas');
    var ctx = cs.getContext('2d');

    cs.width = 800;
    cs.height = 600;

    var len = bl*100/15;
    var hei = lh*100/15;

    var b_h = (bh-10)*4/50 + 6;
    var c_t = (ct-10)*4/50 + 6;

    for (var i=0; i<l; i++) {
        var x = 400;
        var y = 560 - l*hei + i*hei;

        // Right Column
        ctx.beginPath();
        ctx.moveTo(x + (len / 2), y + (hei));
        ctx.lineTo(x + (len / 2), y);

        ctx.strokeStyle = 'sienna';
        ctx.lineWidth = c_t;
        ctx.shadowColor = 'dimgrey';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.stroke();

        // Beam
        ctx.beginPath();
        ctx.moveTo(x + (len / 2), y);
        ctx.lineTo(x - (len / 2), y);

        ctx.strokeStyle = 'sienna';
        ctx.lineWidth = b_h;
        ctx.shadowColor = 'dimgrey';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.stroke();

        // Right Column
        ctx.beginPath();
        ctx.moveTo(x - (len / 2), y);
        ctx.lineTo(x - (len / 2), y + (hei));

        ctx.strokeStyle = 'sienna';
        ctx.lineWidth = c_t;
        ctx.shadowColor = 'dimgrey';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.stroke();

        // Window on each level
        ctx.beginPath();
        ctx.moveTo(x + (len/4), y + (hei*2/7));
        ctx.lineTo(x + (len/4) + (len/12), y + (hei*2/7));
        ctx.lineTo(x + (len/4) + (len/12), y + (hei*4/7));
        ctx.lineTo(x + (len/4) - (len/12), y + (hei*4/7));
        ctx.lineTo(x + (len/4) - (len/12), y + (hei*2/7));
        ctx.lineTo(x + (len/4), y + (hei*2/7));

        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = lh/3;
        ctx.shadowColor = 'dimgrey';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.stroke();
    }
}
