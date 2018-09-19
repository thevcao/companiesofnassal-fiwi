<?php
// Example custom post type

 $properties = new CPT(
     array(
         'post_type_name' => 'team',
         'singular'       => 'Team Member',
         'plural'         => 'Team Members',
         'slug'           => 'our-team',
     ),
     array(
         'supports' => array(
             'title'
         ),
         'public' => true,
         'show_ui' => true
     )


 );

 $properties->menu_icon("dashicons-admin-users");




//create a custom taxonomy name it topics for your posts

function create_topics_hierarchical_taxonomy() {

// Add new taxonomy, make it hierarchical like categories
//first do the translations part for GUI

  $labels = array(
    'name' => _x( 'Departments', 'taxonomy general name' ),
    'singular_name' => _x( 'Department', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Departments' ),
    'all_items' => __( 'All Departments' ),
    'parent_item' => __( 'Parent Departments' ),
    'parent_item_colon' => __( 'Parent Department:' ),
    'edit_item' => __( 'Edit Department' ),
    'update_item' => __( 'Update Department' ),
    'add_new_item' => __( 'Add New Department' ),
    'new_item_name' => __( 'New Topic Department' ),
    'menu_name' => __( 'Departments' ),
  );

// Now register the taxonomy

  register_taxonomy('departments',
  array('team'),
  array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array( 'slug' => 'department' ),
  ));

}


add_action( 'init', 'create_topics_hierarchical_taxonomy', 0 );
