<?php


define('TEMPLATEPATH', get_template_directory());
define('STYLESHEETPATH', get_stylesheet_directory());
foreach (glob(TEMPLATEPATH . "/lib/classes/*.php") as $filename)
{
    include $filename;
}


add_filter( 'single_template', 'get_custom_cat_template' ) ;
function get_custom_cat_template( $single_template ) {


    // You want to filter only template for single posts of default post type
    if( is_singular( 'post' ) ) {

        $post = get_queried_object();
        // Replace '3' with the ID of the 'blog' category
        $child_blog_categories = get_term_children( '2', 'category' );

        if ( in_category( 'insights', $post ) || in_category( $child_blog_categories, $post ) ) {

            $single_template = locate_template( 'single-insights.php' );

        }

    }

    return $single_template;
}
