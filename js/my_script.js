$(document).ready(function() {
    
    //------------------ MODALS
    
    /*// code currently displays user info modal on first visit to site
    TO DO: Display only if it doesn't have user info yet
    if ($.cookie('pop') == null) {
        $('#userInfoModal').modal('show');
        $.cookie('pop', '7');
    }*/ 
    
    // background on user info modal can't be clicked away, input must be given first
    $(".show-modal").click(function(){
        $("#userInfoModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    
    
    //------------------ BUTTONS
    
    $('.btn').click(function() {
        $(this).children('audio')[0].play();
    });
    
    
    // MUTE BUTTON
    
    // mute audio function, original code from: https://css-tricks.com/forums/topic/mute-unmute-sounds-on-website/
    var silence = false;

    function muteAudio() {
    
        var allaudio = document.getElementsByTagName('audio');
        
        if (silence) {
            for (var j = 0; j < allaudio.length; j++) {
            allaudio[j].muted = false;
            }
            silence = false;
        } else {
            for (var j = 0; j < allaudio.length; j++) {
            allaudio[j].muted = true;
            }
            silence = true;
        }
    }
    
    $('#muteButton').click(function() {
        muteAudio();
        //toggles between icons on mute button
        $('#muteButton i').toggleClass('fa-volume-off');
    });
    
    // DIFFICULTY SELECT BUTTONS
    
    $('#easyButton').click(function() {
        $('.my-card-column-medium, .my-card-column-hard').addClass('invisible').removeClass('visible');
    })
    
    $('#mediumButton').click(function() {
        $('.my-card-column-medium').addClass('visible').removeClass('invisible');
        $('.my-card-column-hard').addClass('invisible').removeClass('visible');
    })
    
    $('#hardButton').click(function() {
        $('.my-card-column-medium').addClass('visible').removeClass('invisible');
        $('.my-card-column-hard').addClass('visible').removeClass('invisible');
    })
    
    //------------------ USER DATA
    
     $('#user-info-submit-button').click(function(e) {
		
        // collects data from form and assigns to variables
        var userName = $('#username').val();
        var userAvatar = $('input[name=avatarRadios]:checked').val();
        
        $('.username').text(userName); 
        
        // checks for which avatar choice was made and changes html to display it in avatar box
        switch (userAvatar) {
            case 'strawberry':
                $('.avatar-default').addClass('strawberry-cover').removeClass('avatar-default');
                break;
            case 'car':
                $('.avatar-default').addClass('toycar-cover').removeClass('avatar-default');
                break;
            case 'plant':
                $('.avatar-default').addClass('plant-cover').removeClass('avatar-default');
                break;
            default:
                break;
        }

		if (userName && userAvatar) {
			$('#userInfoModal').modal('hide');	
			 e.preventDefault();
        }
	

    });
    // ------ GAME 
    
    $.ajax({
        type: "Get",
        url: "../assets/data/cards.json",
        dataType: "json",
        success: function(cardsData) {

        },
        error: function() {
            alert("json not found");
        }
    });
    
    // turns counter
    var flipCounter = 0;    
    var turnsCounter = 0;
    
    $('.flip-card').click(function() {
        
		// if game card is face down, on click: flips game card face up and plays audio.
		if ($(this).hasClass('face-down')) {
		    $(this).addClass('face-up').removeClass('face-down').find('audio')[0].play();
        }
        
		// counts flips, when 2 flips have been done the number of turns goes up by one.
        flipCounter++;
        
        if ((flipCounter % 2) == 0 ) {
            turnsCounter++; 
                
            var turnsCounted = ("Turns: " + turnsCounter);
        
            $('.turns-counter').text(turnsCounted);
        }
    });
    
    
})
