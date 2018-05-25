//Load information
var LL = 1; // kip/ft
var DL = 1; // kip/ft
var Load = 1.2*LL + 1.6*DL;

//Member information
function Members(Bw,Bh,L,Cw,Ct,h,n){
    this.beam_width = Bw;
    this.beam_height = Bh;
    this.beam_length = L;
    this.column_width = Cw;
    this.column_thickness = Ct;
    this.column_height = h;
    this.level_number = n;
}

var density = 0.49;  // kip/ft^3

var Member = [];

// Get the input information if members
$(function() {
    // Calculation and Check
    $("#calculate_btn").click( function (){
        $("#my_menu").css("width", "0%");

        var BW = parseFloat($("#beam_width").val());        // in
        var BH = parseFloat($("#beam_height").val());       // in
        var BL = parseFloat($("#beam_len").val());          // ft
        var CW = parseFloat($("#column_width").val());      // in
        var CT = parseFloat($("#column_thick").val());      // in
        var CH = parseFloat($("#level_height").val());      // ft
        var N = parseFloat($("#level").val());              // levels

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');

        if (BW === null || BH === null || BL === null || CW === null || CT === null || CH === null || N === null ){
            alert("You must check whether you enter a number in each box.");

            $('.inf').fadeOut(800);
            $('.sg').fadeOut(800);
            $('.a1').fadeOut(800);
            $('.a2').fadeOut(800);
            $('.a3').fadeOut(800);
            $('.a4').fadeOut(800);
            $(".force_info").text("");
            // Clear Canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            if ( isNaN(CH) === true || isNaN(BL) === true ) {
                alert("You must check whether you indeed enter a number in the input box.");

                $('.inf').fadeOut(800);
                $('.sg').fadeOut(800);
                $('.a1').fadeOut(800);
                $('.a2').fadeOut(800);
                $('.a3').fadeOut(800);
                $('.a4').fadeOut(800);
                $(".force_info").text("");
                // Clear Canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else if ( CH < 8 || CH > 15 || BL < 10 || BL > 25){
                alert("Make sure you follow our instruction.");

                $('.inf').fadeOut(800);
                $('.sg').fadeOut(800);
                $('.a1').fadeOut(800);
                $('.a2').fadeOut(800);
                $('.a3').fadeOut(800);
                $('.a4').fadeOut(800);
                $(".force_info").text("");
                // Clear Canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                alert("Right now you can check the professional force result in result bar.");
                $('.sg').fadeOut(800);
                $('.a1').fadeOut(800);
                $('.a2').fadeOut(800);
                $('.a3').fadeOut(800);
                $('.a4').fadeOut(800);

                $(".force_info").text("");

                var newMember = new Members(BW, BH, BL, CW, CT, CH, N);
                Member.push(newMember);
                var the_member = Member[Member.length - 1];

                var beam_volume = the_member.beam_width * the_member.beam_height * the_member.beam_length / 144;
                var column_volume = the_member.column_width * the_member.column_thickness * the_member.column_height / 144;
                var beam_weight = beam_volume * density;
                var column_weight = column_volume * density;
                var weight_from_beam = beam_weight;
                var weight_from_column = column_weight;

                var key_1 = 0;
                var key_2 = 0;
                var key_3 = 0;

                for (var i = 0; i < the_member.level_number; i++)
                {
                    var shear = 0;
                    var moment = 0;
                    var axial = 0;

                    shear = ((i + 1) * beam_weight + Load * the_member.beam_length + 2 * i * weight_from_column / 3) / 2;
                    moment = (beam_weight + i * weight_from_column * (2 / 3)) * the_member.beam_length / 4 + Math.pow(the_member.beam_length, 2) * Load / 8;
                    axial = ((i + 1) * Load + weight_from_beam + 2 * i * weight_from_column) / 2;

                    var level = the_member.level_number - i;

                    // Send data to database.
                    $.ajax({
                        url: '/force_check/',
                        async: false,
                        data: {
                            'Beam_Width': BW,
                            'Beam_Height': BH,
                            'Beam_Shear': shear,
                            'Beam_Moment': moment,
                            'Column_Width': CW,
                            'Column_Thickness': CT,
                            'Column_Axial': axial
                        },
                        dataType: 'json',
                        success: function (result) {
                            console.log(typeof result.Moment);
                            if (result.Moment === 'Failed'){
                                key_1 += 1;
                            }

                            if (result.Shear === 'Failed'){
                                key_2 += 1;
                            }

                            if (result. Axial === 'Failed'){
                                key_3 += 1;
                            }

                            if (level === 1) {
                                $('#m1').text(moment.toFixed(2));
                                $('#s1').text(shear.toFixed(2));
                                $('#a1').text(axial.toFixed(2));
                                $('#m1_s').text(result.Moment);
                                $('#s1_s').text(result.Shear);
                                $('#a1_s').text(result.Axial);
                            } else if (level === 2) {
                                $('#m2').text(moment.toFixed(2));
                                $('#s2').text(shear.toFixed(2));
                                $('#a2').text(axial.toFixed(2));
                                $('#m2_s').text(result.Moment);
                                $('#s2_s').text(result.Shear);
                                $('#a2_s').text(result.Axial);
                            } else if (level === 3) {
                                $('#m3').text(moment.toFixed(2));
                                $('#s3').text(shear.toFixed(2));
                                $('#a3').text(axial.toFixed(2));
                                $('#m3_s').text(result.Moment);
                                $('#s3_s').text(result.Shear);
                                $('#a3_s').text(result.Axial);
                            } else if (level === 4) {
                                $('#m4').text(moment.toFixed(2));
                                $('#s4').text(shear.toFixed(2));
                                $('#a4').text(axial.toFixed(2));
                                $('#m4_s').text(result.Moment);
                                $('#s4_s').text(result.Shear);
                                $('#a4_s').text(result.Axial);
                            } else {
                                $('#m5').text(moment.toFixed(2));
                                $('#s5').text(shear.toFixed(2));
                                $('#a5').text(axial.toFixed(2));
                                $('#m5_s').text(result.Moment);
                                $('#s5_s').text(result.Shear);
                                $('#a5_s').text(result.Axial);
                            }
                        },
                        error: function () {
                            alert("Error connecting to the Database.");
                        }
                    });
                }

                $(".inf").fadeIn(800);

                if (key_1 > 0){
                    $(".sg").fadeIn(800);
                    $(".a1").fadeIn(800);
                    $('.a4').fadeIn(800);
                }

                if (key_2 > 0){
                    $(".sg").fadeIn(800);
                    $(".a2").fadeIn(800);
                    $('.a4').fadeIn(800);
                }

                if (key_3 > 0){
                    $(".sg").fadeIn(800);
                    $(".a3").fadeIn(800);
                    $('.a4').fadeIn(800);
                }
            }
        }
    });

    $('#clear_btn').click(function(){
        $('#level').val("");
        $('#level_height').val("");
        $('#beam_len').val("");
        $('#beam_width').val("");
        $('#beam_height').val("");
        $('#column_width').val("");
        $('#column_thick').val("");
    });
});
