<?php


define('TEMPLATEPATH', get_template_directory());
define('STYLESHEETPATH', get_stylesheet_directory());
foreach (glob(TEMPLATEPATH . "/lib/classes/*.php") as $filename)
{
    include $filename;
}

if(get_current_blog_id() == 4):

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
endif;



if( function_exists('acf_add_local_field_group') && (get_current_blog_id() == 4)):

acf_add_local_field_group(array(
  'key' => 'group_5bb248ea940c2',
  'title' => 'nFusion Services Description',
  'fields' => array(
    array(
      'key' => 'field_5bb248f6f9b9e',
      'label' => 'Homepage Services Description',
      'name' => 'nfusion_special_overview',
      'type' => 'text',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
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
  'location' => array(
    array(
      array(
        'param' => 'options_page',
        'operator' => '==',
        'value' => 'acf-options-site-options',
      ),
    ),
  ),
  'menu_order' => 0,
  'position' => 'normal',
  'style' => 'default',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => '',
  'active' => 1,
  'description' => '',
));


acf_add_local_field_group(array(
  'key' => 'group_5bfc51975ce49',
  'title' => 'Author Information',
  'fields' => array(
    array(
      'key' => 'field_5bfc519e29c59',
      'label' => 'Author',
      'name' => 'author',
      'type' => 'post_object',
      'instructions' => 'Select a team member to display as author. The short biography will in the about author section at the end of the post.',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'post_type' => array(
        0 => 'team',
      ),
      'taxonomy' => '',
      'allow_null' => 0,
      'multiple' => 0,
      'return_format' => 'object',
      'ui' => 1,
    ),
  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'post',
      ),
    ),
  ),
  'menu_order' => 1,
  'position' => 'side',
  'style' => 'default',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => '',
  'active' => 1,
  'description' => '',
));

endif;
