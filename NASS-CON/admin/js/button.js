(function() {



    tinymce.create("tinymce.plugins.video_button", {

        //url argument holds the absolute url of our plugin directory
        init : function(ed) {




            //CHS Video Button
            ed.addButton("vimeo", {
                title : "Add Video",
                tooltip: 'Add Video',
               icon: 'vimeo',
                onclick: function() {
//					text = prompt( "Enter Video Post ID", "" );
                    tb_show('', '#TB_inline?width=600&height=550&inlineId=chs-video');
                    return false;
//					window.location = '#TB_inline?width=600&height=550&inlineId=chs-video';
//					ed.execCommand( 'mceInsertContent', false, '[single-video id="' + text + '"]' );
                }
            });

            //External Vimeo
            ed.addButton("external", {
                title : "Add External Vimeo",
                tooltip: 'Add External Vimeo',
               icon: 'ext-vimeo',
                onclick: function() {

//					text = prompt( "Enter Video Post ID", "" );
                    tb_show('', '#TB_inline?width=300&height=200&inlineId=ext-vimeo');
                    return false;
//					window.location = '#TB_inline?width=600&height=550&inlineId=chs-video';
//					ed.execCommand( 'mceInsertContent', false, '[single-video id="' + text + '"]' );
                }
            });








            var videoType;
            var	idOnly;

            jQuery('.video-type').click(function(){


                videoType = jQuery(this).val();

            })




            jQuery('#video-url').bind('blur', function() {

            var video = jQuery(this).val();

            if(videoType == 'youtube') {
            var	idOnly = video.split('https://www.youtube.com/watch?v=').pop();
            var noExtra = idOnly.replace('&feature=youtu.be','');

            jQuery('#ext-video-preview').attr('src', 'https://www.youtube.com/embed/' + noExtra);

            } else if(videoType == 'vimeo') {
            var	idOnly = video.split('https://vimeo.com/').pop();

            jQuery('#ext-video-preview').attr('src', 'https://player.vimeo.com/video/' + idOnly);


            }
        });

        jQuery('.ext-insert-video').click(function(){

            var ID = jQuery('#video-url').val();
            var noExtra = ID.replace('&feature=youtu.be','');

            ed.execCommand( 'mceInsertContent', false, '[ext-video type="' + videoType + '" url="' + noExtra + '"]' );
            tb_remove();
            return false;
        });



//			jQuery('#video-url').keyup(function(e){
//
//
//				jQuery(this).val();
//
//
//				jQuery('#ext-video-preview').attr('src');
//
//
//			});

            jQuery('.chs-insert-video').click(function(){

                var ID = jQuery(this).parents('form').find('.selected .item-info').text();

                ed.execCommand( 'mceInsertContent', false, '[single-video id="' + ID + '"]' );
                tb_remove();
                return false;
            });





//			jQuery('#chs-video #wp-link-submit').click(function(){
//
//				var ID = jQuery('#chs-video .selected .item-info').text();
//
//				ed.execCommand( 'mceInsertContent', false, '[single-video id="' + ID + '"]' );
//				tb_remove();
//			});

//			  window.send_to_editor = function (html) {
//			  	imgurl = $('img', html).attr('src');
//			  	image_field.val(imgurl);
//			  	tb_remove();
//			  }

            },

        createControl : function(n, cm) {
            return null;
        },

        getInfo : function() {
            return {

            };
        }
    });

    tinymce.PluginManager.add("video_button", tinymce.plugins.video_button);
})();
