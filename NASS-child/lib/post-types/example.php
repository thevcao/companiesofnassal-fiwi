<?php
// Example custom post type
if(get_current_blog_id() == 4):

$services = new CPT(
   array(
       'post_type_name' => 'services',
       'singular'       => 'Service',
       'plural'         => 'Services',
       'slug'           => 'services',
   ),
   array(
       'supports' => array(
           'title', 'editor'
       ),
       'public' => true,
       'show_ui' => true,
//         'has_archive' => true
   )
);

else:

 $services = new CPT(
     array(
         'post_type_name' => 'services',
         'singular'       => 'Capability',
         'plural'         => 'Capabilities',
         'slug'           => 'capabilities',
     ),
     array(
         'supports' => array(
             'title', 'editor'
         ),
         'public' => true,
         'show_ui' => true,
//         'has_archive' => true
     )
 );

  endif;
 $services->menu_icon("dashicons-admin-tools");
