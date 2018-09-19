<?php /**
 * @package FIWI Login V2
 * @version 1.0
 */
/*
Plugin Name:   FIWI Login V2
Description:   Redirects a user to the login page if the user is not logged in. After login the user gets redirected to the original entry page.
Author:        Findsome Winmore
Version:       1.0
License:       GPL-2.0 or later
License URI:   http://www.gnu.org/licenses/gpl-2.0.txt
*/

/**
 * Redirects a user to the login page if not logged in.
 *
 */



add_action( 'parse_request', 'dmk_redirect_to_login_if_not_logged_in', 1000 );

if (!function_exists('fiwi_styles')) {

function fiwi_settings_page()
{
    add_settings_section("fiwi_login_options", "Login Options", null, "login_options");
    add_settings_field("disable_fiwi_styles", "Disable Styles?", "fiwi_styles", "login_options", "fiwi_login_options");
    register_setting("fiwi_login_options", "disable_fiwi_styles");
}

function fiwi_styles()
{
   ?>
        <!-- Here we are comparing stored value with 1. Stored value is 1 if user checks the checkbox otherwise empty string. -->
        <input type="checkbox" name="disable_fiwi_styles" value="1" <?php checked(1, get_option('disable_fiwi_styles'), true); ?> />
   <?php
}

add_action("admin_init", "fiwi_settings_page");

function fiwi_options_page()
{
  ?>
      <div class="wrap">
         <h1>FIWI Login Options</h1>

         <form method="post" action="options.php">
            <?php
               settings_fields("fiwi_login_options");

               do_settings_sections("login_options");

               submit_button();
            ?>
         </form>
      </div>
   <?php
}

function fiwi_login_menu_item()
{

    if (function_exists('acf_fields_admin')) {

        add_submenu_page("admin-settings", "Login Options", "Login Options", "manage_options", "login_options", "fiwi_options_page");

    } else {
      if ( empty ( $GLOBALS['admin_page_hooks']['fiwi-admin-util'] ) ):

        add_menu_page( 'FIWI Admin Utilities', 'FIWI Admin Utilities', null, 'fiwi-admin-util', null);

      endif;

        add_submenu_page("fiwi-admin-util", "Login Options", "Login Options", "manage_options", "login_options", "fiwi_options_page");


    }



}

add_action("admin_menu", "fiwi_login_menu_item", 107);

}

add_action('init', 'server_fields');
function server_fields() {
if( function_exists('acf_add_local_field_group') ):

  acf_add_local_field_group(array(
  'key' => 'group_5b293eea307e9',
  'title' => 'Login Disable',
  'fields' => array(
    array(
      'key' => 'field_5b293ef006c2e',
      'label' => 'Disable login protection?',
      'name' => 'disable_login',
      'type' => 'checkbox',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'choices' => array(
        'Yes' => 'Yes',
      ),
      'allow_custom' => 0,
      'save_custom' => 0,
      'default_value' => array(
      ),
      'layout' => 'horizontal',
      'toggle' => 0,
      'return_format' => 'value',
    ),
  ),
  'location' => array(
    array(
      array(
        'param' => 'options_page',
        'operator' => '==',
        'value' => 'server-settings',
      ),
    ),
  ),
  'menu_order' => 0,
  'position' => 'normal',
  'style' => 'seamless',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => '',
  'active' => 1,
  'description' => '',
));

acf_add_local_field_group(array (
    'key' => 'group_5911e02cd244e',
    'title' => 'Server Protection',
    'fields' => array (
        array (
            'key' => 'field_5911e03def0e3',
            'label' => 'Protected Server',
            'name' => 'server_ip',
            'type' => 'repeater',
            'instructions' => 'Add Server IP or Domain Name to redirect unauthorized users.',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array (
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'collapsed' => '',
            'min' => 0,
            'max' => 0,
            'layout' => 'table',
            'button_label' => '',
            'sub_fields' => array (
                array (
                    'key' => 'field_5911e0a3ef0e5',
                    'label' => 'Server/Domain',
                    'name' => 'server_domain',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array (
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                ),
            ),
        ),
    ),
    'location' => array (
        array (
            array (
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'server-settings',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'seamless',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
));

endif;

}


if (!function_exists('dmk_redirect_to_login_if_not_logged_in')) {

function dmk_redirect_to_login_if_not_logged_in() {

$url = site_url();


if(!get_field('disable_login', 'options')) {


if (strpos($url,'staging') !== false) {
    is_user_logged_in() || auth_redirect();
}
if (strpos($url,'production') !== false) {
    is_user_logged_in() || auth_redirect();
}



if( have_rows('server_ip', 'options') ):
while ( have_rows('server_ip', 'options') ) : the_row();

$value = get_sub_field('server_domain','options');


if (strpos($url, $value) !== false) {
    is_user_logged_in() || auth_redirect();
}

endwhile; endif;

}

}

//add_action('init', 'serverprotect_settings');
//function serverprotect_settings() {
//    if (function_exists('acf_add_options_page')) {
//        $page = acf_add_options_page(array(
//            'menu_title' => 'Server Protection',
//            'menu_slug' => 'server-settings',
//            'capability' => 'edit_posts',
//            'redirect' => false
//        ));
//    }
//
//}




  add_filter( 'login_url', 'dmk_strip_loggedout', 1, 1 );
/**
 * Strips '?loggedout=true' from redirect url after login.
 *
 * @author Daan Kortenbach
 *
 * @param  string $login_url
 * @return string $login_url
 */
function dmk_strip_loggedout( $login_url ) {
    return str_replace( '%3Floggedout%3Dtrue', '', $login_url );
}


function fiwi_login_redirect_notice() {

$url = site_url();
if (!get_option('disable_fiwi_styles') && strpos($url,'staging') !== false && strpos($url,'wp-admin') == false):
    echo "<script>jQuery('document').ready(function(){jQuery('body').addClass('fiwi-redirected-user');});</script>";
endif;

}
add_action( 'login_head', 'fiwi_login_redirect_notice' );

}

if(!function_exists('fiwi_login_styles')):

function fiwi_login_styles() {

if(!get_option('disable_fiwi_styles')):


?>
    <style>

    html {

      font-size: 14px;
    }
    .login label {
    font-size: 0;
    }


    </style>
    <script>
        jQuery('document').ready(function(){
            jQuery('body').addClass('fiwi-login');
            if(jQuery('.fiwi-redirected-user').length == false){

            jQuery('body').prepend('<video class="fiwi-bg" loop muted autoplay playsinline src="<?php echo get_template_directory_uri();?>/admin/img/clouds-login.mp4"></video>');

            }
            jQuery('#user_login').attr( 'placeholder', 'Username' );
            jQuery('#user_pass').attr( 'placeholder', 'Password' );
        });
</script>

<?php

endif;

}

add_action( 'login_head', 'fiwi_login_styles' );

endif;
