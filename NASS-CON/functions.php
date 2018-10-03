<?php
/**
 * Functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link http://codex.wordpress.org/Theme_Development
 * @link http://codex.wordpress.org/Child_Themes
 *
 * For more information on hooks, actions, and filters,
 * @link http://codex.wordpress.org/Plugin_API
 *
 * @package OldFashioned
 * @since OldFashioned 2.0
 */
define("THEME_ROOT", get_stylesheet_directory());
// Composer dependencies
if(file_exists(__DIR__ . '/lib/vendor/autoload.php')){
} else {
    echo "<style>@import url(https://fonts.googleapis.com/css?family=Lato:300,400|Neuton:400,700,800);
    *{font-family:'Lato','sans-serif';box-sizing:border-box; text-align: center;}body{display:flex;min-height:100vh;flex-direction:column;text-align:center;align-items:center;justify-content:center;border-top:4px solid #eb3a24;margin:0;background:url(https://findsomewinmore.com/wp-content/themes/fiwi/images/bg.png) repeat}@media screen and (max-width: 1030px){.Site{padding:0 2rem}}.Site-content{flex:1;display:flex;justify-content:center;align-items:center}h1,h2,h3,h4,h5,h6{font-family:'Neuton',serif;color:#eb3a24}p{max-width:60ch;margin:2rem auto 0;line-height:1.5;color:#333}p a{color:#eb3a24}.logo-link{display:block}.main-logo{display:block;max-width:100%;padding-bottom:2rem}@media screen and (min-width: 1039px){a:hover{text-decoration:none}}</style>";
    die("<img src='https://findsomewinmore.com/wp-content/themes/fiwi/images/logo.png?230ae' alt='' class='main-logo'><h1>Woah there, partner.</h1><p>Looks like you forgot somethin'. Mosy on back to the terminal and run <pre style='font-family: monospace; font-size: 2rem;'>'composer install'</pre>. You're missing the file /lib/vendor/autoload.php</p>");
}
require_once __DIR__ . '/lib/vendor/autoload.php';
use OldFashioned\OldFashioned;
use OldFashioned\TopBarPageWalker;
use OldFashioned\TopBarWalker;


$dev_flag_dir = get_stylesheet_directory().'/dist/development.txt';


function get_hash_css( $css ) {
    $map = get_template_directory() . '/dist/assets.json';
    static $hash = null;
    if ( null === $hash ) {
        $hash = file_exists( $map ) ? json_decode( file_get_contents( $map ), true ) : [];
    }
    if ( array_key_exists( $css, $hash ) ) {
        return '/dist/css/' . $hash[ $css ];
    }

    return $css;

}

function get_hash_js( $js ) {
    $map = get_template_directory() . '/dist/assets.json';

    static $hash = null;
    if ( null === $hash ) {
        $hash = file_exists( $map ) ? json_decode( file_get_contents( $map ), true ) : [];
    }
    if ( array_key_exists( $js, $hash ) ) {
        return '/dist/js/' . $hash[ $js ];
    }
    return $js;

    return $js;


}

$OldFashioned = new OldFashioned(
    array( // Includes
        'lib/admin',         // Add admin scripts
        'lib/ajax',          // Add ajax scripts
        'lib/classes',       // Add classes
        'lib/custom-fields', // Add custom field scripts
        'lib/forms',         // Add form scripts
        'lib/images',        // Add images scripts
        'lib/post-types',    // Add post type scripts
        'lib/shortcodes',    // Add shortcode scripts
        'lib/widgets',       // Add widget scripts
    ),
    array( // Assets
        'css'             =>  file_exists($dev_flag_dir) ? '/dist/css/styles.min.css' : get_hash_css( 'styles.min.css' ),
        'js'             =>  file_exists($dev_flag_dir) ? '/dist/js/scripts.min.js' : get_hash_js( 'scripts.min.js' ),
        'modernizr'       => '/dist/js/vendor/modernizr.min.js',
        'jquery'          => '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
        'jquery_fallback' => '/dist/js/vendor/jquery.min.js',
)
);

//Google Maps ACF API Key
function my_acf_init() {

    acf_update_setting('google_api_key', 'AIzaSyCr-DX8kO7MSs6uoMXLNv6o7KB1kvhmBlM');
}

add_action('acf/init', 'my_acf_init');
//Google Maps API Key
//function googlemaps_load_scripts()
//{
//    wp_register_script('googlemaps', 'https://maps.googleapis.com/maps/api/js&key=', null, null, false);
//    wp_enqueue_script('googlemaps');
//}
//add_action('wp_enqueue_scripts', 'googlemaps_load_scripts');
//Remove post types

if(!function_exists('remove_menus')) {
function remove_menus(){
//  remove_menu_page( 'index.php' );                  //Dashboard
//  remove_menu_page( 'jetpack' );                    //Jetpack*
//  remove_menu_page( 'edit.php' );                   //Posts
//  remove_menu_page( 'upload.php' );                 //Media
//  remove_menu_page( 'edit.php?post_type=page' );    //Pages
  remove_menu_page( 'edit-comments.php' );          //Comments
//  remove_menu_page( 'themes.php' );                 //Appearance
//  remove_menu_page( 'plugins.php' );                //Plugins
//  remove_menu_page( 'users.php' );                  //Users
//  remove_menu_page( 'tools.php' );                  //Tools
//  remove_menu_page( 'options-general.php' );        //Settings
}
add_action( 'admin_menu', 'remove_menus' );
}

function object_to_array($object) {
  if (!is_object($object) && !is_array($object)) {
    return $object;
  }
  return array_map('object_to_array', (array) $object) ;
}
@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );


function register_menu() {
  register_nav_menu('main',__( 'Full Menu' ));
}
add_action( 'init', 'register_menu' );


add_image_size( 'banner', 1800, 999999 );
add_image_size( 'logo', 180, 999999 );


function nass_tinymce_body_class( $mce ) {
//    // you could do things here to detect whatever you need
//    // and use those for the additional classes.
//    // be safe and use sanitize_html_class or similar if generated.
//
//    // example: use the post ID when editing a post
//    if ( $post = get_post() ) {
//        $mce['body_class'] .= ' ' . sanitize_html_class( $post->ID );
//    }
    $name = sanitize_title_for_query(get_bloginfo( 'name'));
    $site_name = esc_attr( $name );

    $mce['body_class'] .= ' ' . $site_name;

    return $mce;
}
add_filter( 'tiny_mce_before_init', 'nass_tinymce_body_class' );


function posts_orderby_lastname ($orderby_statement)
{
  $orderby_statement = "RIGHT(post_title, LOCATE(' ', REVERSE(post_title)) - 1) ASC";
    return $orderby_statement;
}

function disable_embeds_code_init() {

 // Remove the REST API endpoint.
 remove_action( 'rest_api_init', 'wp_oembed_register_route' );

 // Turn off oEmbed auto discovery.
 add_filter( 'embed_oembed_discover', '__return_false' );

 // Don't filter oEmbed results.
 remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );

 // Remove oEmbed discovery links.
 remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );

 // Remove oEmbed-specific JavaScript from the front-end and back-end.
 remove_action( 'wp_head', 'wp_oembed_add_host_js' );
 add_filter( 'tiny_mce_plugins', 'disable_embeds_tiny_mce_plugin' );

 // Remove all embeds rewrite rules.
 add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' );

 // Remove filter of the oEmbed result before any HTTP requests are made.
 remove_filter( 'pre_oembed_result', 'wp_filter_pre_oembed_result', 10 );
}

add_action( 'init', 'disable_embeds_code_init', 9999 );

function disable_embeds_tiny_mce_plugin($plugins) {
    return array_diff($plugins, array('wpembed'));
}

function disable_embeds_rewrites($rules) {
    foreach($rules as $rule => $rewrite) {
        if(false !== strpos($rewrite, 'embed=true')) {
            unset($rules[$rule]);
        }
    }
    return $rules;
}
