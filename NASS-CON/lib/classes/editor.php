<?php

/** Editor Functions */


function filter_post_data( $data , $postarr ) {

    $content = $data['post_content'];

    $content = preg_replace('#<p.*?>(.*?)</p>#i', '<p>\1</p>', $content);
    $content = preg_replace('#<span.*?>(.*?)</span>#i', '<span>\1</span>', $content);
    $content = preg_replace('#<ol.*?>(.*?)</ol>#i', '<ol>\1</ol>', $content);
    $content = preg_replace('#<ul.*?>(.*?)</ul>#i', '<ul>\1</ul>', $content);
    $content = preg_replace('#<li.*?>(.*?)</li>#i', '<li>\1</li>', $content);

    $data['post_content'] = $content;

    return $data;
}

//Add TinyMCE Formats

// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter('mce_buttons_2', 'my_mce_buttons_2');


// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {
    // Define the style_formats array
    $style_formats = array(
        // Each array child is a format with it's own settings
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'btn'
        ),
        array(
            'title' => 'Button Right',
            'selector' => 'a',
            'classes' => 'btn right'
        ),
        array(
            'title' => 'Gradient Title',
            'selector' => 'h1, h2, h3, h4, h5, h6',
            'classes' => 'gradient'
        ),
        array(
            'title' => 'Lightbox Image',
            'selector' => 'a',
            'classes' => 'editor-lightbox'
        ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

