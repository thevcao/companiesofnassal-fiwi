<?php
// Silence is golden

// Remove Version Numbers

function _remove_script_version( $src ){
$parts = explode( '?ver', $src );
return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );


//General Site Options ACF Panel

if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array('page_title' => 'Site Options', 'icon_url' =>'dashicons-admin-generic','position' => '2'));
}


function remove_dashboard_meta() {
        remove_meta_box( 'dashboard_welcome', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');//since 3.8
}
add_action( 'admin_init', 'remove_dashboard_meta' );


//Rest API

function disable_rest_endpoints( $access ) {
    if( ! is_user_logged_in() ) {
        return new WP_Error( 'rest_cannot_access', __( 'Only authenticated users can access the REST API.', 'disable-json-api' ), array( 'status' => rest_authorization_required_code() ) );
    }
  return $access;
}
add_filter( 'rest_authentication_errors', 'disable_rest_endpoints' );


// set the options to change
$option = array(
    // we don't want no description
//    'blogdescription'               => '',
    // change category base
//    'category_base'                 => '/cat',
    // change tag base
//    'tag_base'                      => '/label',
    // disable comments
    'default_comment_status'        => 'closed',
    // disable trackbacks
    'use_trackback'                 => '',
    // disable pingbacks
    'default_ping_status'           => 'closed',
    // disable pinging
    'default_pingback_flag'         => '',
    // change the permalink structure
//    'permalink_structure'           => '/%category%/%postname%/',
    // dont use year/month folders for uploads
    'uploads_use_yearmonth_folders' => '',
    // don't use those ugly smilies
    'use_smilies'                   => ''
);

// change the options!
foreach ( $option as $key => $value ) {
    update_option( $key, $value );
}

// flush rewrite rules because we changed the permalink structure
global $wp_rewrite;
$wp_rewrite->flush_rules();


// we need to include the file below because the activate_plugin() function isn't normally defined in the front-end
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
// activate pre-bundled plugins
activate_plugin( 'advanced-custom-fields-pro/acf.php' );
activate_plugin( 'admin-columns-pro/admin-columns-pro.php' );
activate_plugin( 'regenerate-thumbnails/regenerate-thumbnails.php' );
//activate_plugin( 'save-with-keyboard/save_with_keyboard.php' );
//activate_plugin( 'invisible-recaptcha/invisible-recaptcha.php' );
//activate_plugin( 'worker/init.php' );
//activate_plugin( 'google-analytics-dashboard-for-wp/gadwp.php' );
activate_plugin( 'ewww-image-optimizer/ewww-image-optimizer.php' );


