<?php
// Example custom post type


$properties = new CPT(
   array(
       'post_type_name' => 'portfolio',
       'singular'       => 'Project',
       'plural'         => 'Projects',
       'slug'           => 'projects',
   ),
   array(
       'supports' => array(
           'title', 'thumbnail'
       ),
       'public' => true,
       'show_ui' => true
   )
);


$properties->menu_icon("dashicons-admin-appearance");
