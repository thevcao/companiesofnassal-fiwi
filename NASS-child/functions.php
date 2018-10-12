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
  'key' => 'group_5b89a238464a9',
  'title' => 'Insights Post Builder',
  'fields' => array(
    array(
      'key' => 'field_5b89a23e96fd7',
      'label' => 'Section',
      'name' => 'section',
      'type' => 'flexible_content',
      'instructions' => '',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'layouts' => array(
        '5b89a247890d9' => array(
          'key' => '5b89a247890d9',
          'name' => 'banner_image',
          'label' => 'Banner Image',
          'display' => 'block',
          'sub_fields' => array(
            array(
              'key' => 'field_5b89a24e96fd8',
              'label' => 'Image',
              'name' => 'image',
              'type' => 'image',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => 0,
              'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'array',
              'preview_size' => 'thumbnail',
              'library' => 'all',
              'min_width' => '',
              'min_height' => '',
              'min_size' => '',
              'max_width' => '',
              'max_height' => '',
              'max_size' => '',
              'mime_types' => '',
            ),
          ),
          'min' => '',
          'max' => '',
        ),
        '5b89a27396fd9' => array(
          'key' => '5b89a27396fd9',
          'name' => 'content_block',
          'label' => 'Content Block',
          'display' => 'block',
          'sub_fields' => array(
            array(
              'key' => 'field_5b89a27d96fda',
              'label' => 'Content',
              'name' => 'content',
              'type' => 'wysiwyg',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => 0,
              'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
              ),
              'default_value' => '',
              'tabs' => 'all',
              'toolbar' => 'full',
              'media_upload' => 1,
              'delay' => 0,
            ),
          ),
          'min' => '',
          'max' => '',
        ),
        '5b89a29296fdb' => array(
          'key' => '5b89a29296fdb',
          'name' => 'featured_media',
          'label' => 'Featured Media',
          'display' => 'block',
          'sub_fields' => array(
            array(
              'key' => 'field_5b89a29696fdc',
              'label' => 'Media Type',
              'name' => 'media_type',
              'type' => 'radio',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => 0,
              'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
              ),
              'choices' => array(
                'image' => 'Image',
                'mp4' => 'Video mp4',
                'youtube' => 'YouTube',
                'vimeo' => 'Vimeo',
              ),
              'allow_null' => 0,
              'other_choice' => 0,
              'save_other_choice' => 0,
              'default_value' => '',
              'layout' => 'horizontal',
              'return_format' => 'value',
            ),
            array(
              'key' => 'field_5b89a2ec96fdd',
              'label' => 'Image',
              'name' => 'image',
              'type' => 'image',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => array(
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'image',
                  ),
                ),
              ),
              'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'array',
              'preview_size' => 'thumbnail',
              'library' => 'all',
              'min_width' => '',
              'min_height' => '',
              'min_size' => '',
              'max_width' => '',
              'max_height' => '',
              'max_size' => '',
              'mime_types' => '',
            ),
            array(
              'key' => 'field_5b89a31396fde',
              'label' => 'Video',
              'name' => 'video',
              'type' => 'file',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => array(
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'mp4',
                  ),
                ),
              ),
              'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'url',
              'library' => 'all',
              'min_size' => '',
              'max_size' => '',
              'mime_types' => '.mp4',
            ),
            array(
              'key' => 'field_5b89a33196fdf',
              'label' => 'YouTube URL/Vimeo URL',
              'name' => 'video_id',
              'type' => 'text',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => array(
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'youtube',
                  ),
                ),
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'vimeo',
                  ),
                ),
              ),
              'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
              ),
              'default_value' => '',
              'placeholder' => '',
              'prepend' => '',
              'append' => '',
              'maxlength' => '',
            ),
            array(
              'key' => 'field_5b89a36296fe1',
              'label' => 'Video Poster',
              'name' => 'video_poster',
              'type' => 'image',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => array(
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'mp4',
                  ),
                ),
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'youtube',
                  ),
                ),
                array(
                  array(
                    'field' => 'field_5b89a29696fdc',
                    'operator' => '==',
                    'value' => 'vimeo',
                  ),
                ),
              ),
              'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'array',
              'preview_size' => 'thumbnail',
              'library' => 'all',
              'min_width' => '',
              'min_height' => '',
              'min_size' => '',
              'max_width' => '',
              'max_height' => '',
              'max_size' => '',
              'mime_types' => '',
            ),
          ),
          'min' => '',
          'max' => '',
        ),
        '5b89a3bf96fe4' => array(
          'key' => '5b89a3bf96fe4',
          'name' => 'quote',
          'label' => 'Quote',
          'display' => 'block',
          'sub_fields' => array(
            array(
              'key' => 'field_5b89a3c596fe5',
              'label' => 'Quote',
              'name' => 'quote',
              'type' => 'textarea',
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
              'maxlength' => '',
              'rows' => '',
              'new_lines' => '',
            ),
            array(
              'key' => 'field_5b89a3d296fe6',
              'label' => 'Author',
              'name' => 'author',
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
          'min' => '',
          'max' => '',
        ),
        '5b89a3f596fe7' => array(
          'key' => '5b89a3f596fe7',
          'name' => '50_image',
          'label' => 'Half and Half Image',
          'display' => 'block',
          'sub_fields' => array(
            array(
              'key' => 'field_5b89a40996fe8',
              'label' => 'Image 1',
              'name' => 'image_1',
              'type' => 'image',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => 0,
              'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'array',
              'preview_size' => 'thumbnail',
              'library' => 'all',
              'min_width' => '',
              'min_height' => '',
              'min_size' => '',
              'max_width' => '',
              'max_height' => '',
              'max_size' => '',
              'mime_types' => '',
            ),
            array(
              'key' => 'field_5b89a41996fe9',
              'label' => 'Image 2',
              'name' => 'image_2',
              'type' => 'image',
              'instructions' => '',
              'required' => 0,
              'conditional_logic' => 0,
              'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
              ),
              'return_format' => 'array',
              'preview_size' => 'thumbnail',
              'library' => 'all',
              'min_width' => '',
              'min_height' => '',
              'min_size' => '',
              'max_width' => '',
              'max_height' => '',
              'max_size' => '',
              'mime_types' => '',
            ),
          ),
          'min' => '',
          'max' => '',
        ),
      ),
      'button_label' => 'Add Section',
      'min' => '',
      'max' => '',
    ),
  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'post',
      ),
      array(
        'param' => 'post_category',
        'operator' => '==',
        'value' => 'category:insights',
      ),
    ),
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'post',
      ),
      array(
        'param' => 'post_category',
        'operator' => '==',
        'value' => 'category:project-management',
      ),
    ),
  ),
  'menu_order' => -99,
  'position' => 'normal',
  'style' => 'default',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => array(
    0 => 'the_content',
    1 => 'custom_fields',
    2 => 'discussion',
    3 => 'comments',
    4 => 'revisions',
    5 => 'slug',
    6 => 'author',
    7 => 'format',
    8 => 'send-trackbacks',
  ),
  'active' => 1,
  'description' => '',
));

endif;

