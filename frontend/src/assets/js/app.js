$(document).foundation();

$(function(){
	
	// For Demo: Enable dropzone plugin for drop uploading files on notebook submit
    Dropzone.autoDiscover = false;
    $("#dZUploadNB").dropzone({
        url: "/upload",
        addRemoveLinks: true
    });

	// For Demo: Upvote/Downvote buttons
    $('.vote a').click(function(e){
	    var upvoted = $('.vote .fi-like').hasClass('active');
	    var downvoted = $('.vote .fi-dislike').hasClass('active');
		var upvote = $(this).hasClass('fi-like');
	    var counter = $(this).siblings('.score');
	    var counter2 = $('.votes .count');
		var count = parseInt(counter.text());
	    if ( $(this).hasClass('active') ) {
		    $('.vote a').removeClass('active');
		    if ( upvoted ) {
			    counter.text(count -1); counter2.text(count -1);
		    } else {
			    counter.text(count +1); counter2.text(count +1);
		    }
		} else {
		    $('.vote a').removeClass('active');
		    $(this).addClass('active');
			if ( upvoted ) {
				counter.text(count - 2); counter2.text(count - 2);
			} else if ( downvoted ) {
				counter.text(count + 2); counter2.text(count + 2);
			} else if ( upvote ) {
				counter.text(count + 1); counter2.text(count + 1);
			} else if ( !upvote ) {
				counter.text(count -1); counter2.text(count -1);
			}
		    e.preventDefault();
		}
    });
    	
	
	// For Demo: Show spinning animation when changing notebook filter options
	function showSpinner() {
		$('.filters').append('<div id="floatingBarsG"> <div class="blockG" id="rotateG_01"> </div> <div class="blockG" id="rotateG_02"> </div> <div class="blockG" id="rotateG_03"> </div> <div class="blockG" id="rotateG_04"> </div> <div class="blockG" id="rotateG_05"> </div> <div class="blockG" id="rotateG_06"> </div> <div class="blockG" id="rotateG_07"> </div> <div class="blockG" id="rotateG_08"> </div> </div>');
		$('.summaries').css( 'opacity', '0.2' ).delay(1000).queue( function() {
        	$('.summaries .notebook-summary').shuffle();
        	$('#floatingBarsG').remove();
        	$(this).css('opacity','1');
			$( this ).dequeue();
		} );
	}
	$('.filters select').change(function() {
		showSpinner();
	});
	
	// Function for shuffling DOM elements
	$.fn.shuffle = function() {
	    var allElems = this.get(),
	        getRandom = function(max) {
	            return Math.floor(Math.random() * max);
	        },
	        shuffled = $.map(allElems, function(){
	            var random = getRandom(allElems.length),
	                randEl = $(allElems[random]).clone(true)[0];
	            allElems.splice(random, 1);
	            return randEl;
	       });
	    this.each(function(i){
	        $(this).replaceWith($(shuffled[i]));
	    });
	    return $(shuffled);
	};	
	
	// Toggle search input
	$('.search-toggle a').click(function(e){
		$('.filter-inputs').hide();
		$('.search-toggle').hide();
		$('.search-field').show();
		$('#search-keywords').focus();
		e.preventDefault();
	});

	$('.search-hide').click(function(e){
		$('.filter-inputs').show();
		$('.search-field').hide();
		$('.search-toggle').show();
		e.preventDefault();
	});



});

