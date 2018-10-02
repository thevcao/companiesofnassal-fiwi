<?php
/**
 * Template Name: Team
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Twenty Fourteen
 * already has tag.php for Tag archives, category.php for Category archives,
 * and author.php for Author archives.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php get_template_part('templates/header'); ?>

  <main>
  <?php get_template_part('partials/banner');?>

    <div class="container team-grid">



          <?php if ( have_posts() ) : ?>
          <div class="row mb-sm-3 mb-2">
            <div class="col-md-8 mx-md-2 col-10 mx-auto">

          <?php while (have_posts()) : the_post(); the_content(); ?>

          <?php endwhile; ?>

            </div>


          </div>
          <?php endif;?>



      <div class="row">
        <div class="col-md-4 mx-md-0 col-10 mx-auto">

          <div class="dropdown mb-5">
            <a href="#" data-toggle="all">View by Department</a>

              <?php $taxonomy     = 'departments';
                    $orderby      = 'order';
                    $show_count   = false;
                    $pad_counts   = false;
                    $hierarchical = true;
                    $title        = '';

                    $args = array(
                      'taxonomy'     => $taxonomy,
                      'meta_key' => 'order',
                      'orderby'      => $orderby,
                      'show_count'   => $show_count,
                      'pad_counts'   => $pad_counts,
                      'hierarchical' => $hierarchical,
                      'title_li'     => $title
                    );
                    ?>

                    <ul class="menu">
                      <li><a href="#" data-toggle="all">All</a></li>
                        <?php wp_list_categories( $args ); ?>
                    </ul>


          </div>

        </div>
      </div>




        <?php

        $order = 'menu_order';

        $args = array(

            'posts_per_page' => -1,

          //            'order'   => $order,
            'post_type' => 'team',
            'order'                  => 'ASC',
            'orderby'                => $order,
            'meta_query' => array(
                    array(
                        'key'     => 'title',
                        'value'   => 'Partner',
                        'compare' => '=',
                    )
              ),
        );

        $loop = new WP_Query( $args );
        if($loop->have_posts()):?>

        <div class="row team-row">
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>


            <?php

            $departments = get_the_terms( $post->ID, 'departments' );
//            $department = $departments[0];

            // print object from first director
//            print_r($department);
            $department_slugs = '';
            foreach( $departments as $department):
            $department_slugs .= ' ' . $department->slug;
            endforeach;
            ?>


            <div class="col-lg max-20 col-md-4 col-sm-6 mx-md-0 mx-auto single-team-box<?php echo $department_slugs;?>">
            <!--<div class="col-lg-3 col-md-4 col-sm-6 col-12 mx-md-0 mx-auto single-team-box <?php //echo $department_slug;?>">-->
              <div class="card">

                 <?php if( get_field('headshot')): echo '<img src="' . get_field('headshot')['sizes']['large'] . '" alt="' . get_the_title() . '">'; else: echo '<img src="' . get_template_directory_uri() . '/dist/img/team-default.png">'; endif;?>

                  <a href="<?php the_permalink();?>" class="">
                  <div class="over">
                  <h4><?php echo get_the_title();?></h4>
                  <h6><?php echo get_field('title');?></h6>
                  </div>
                </a>
              </div>


            </div>

        <?php endwhile; ?>


      </div>


        <?php endif; wp_reset_postdata();

        $order = 'menu_order';

        $args = array(

            'posts_per_page' => -1,

          //            'order'   => $order,
            'post_type' => 'team',
            'order'                  => 'ASC',
            'orderby'                => 'title',
            'meta_query' => array(
                'relation' => 'AND',
                  array(
                        'key'     => 'title',
                        'value'   => 'Partner',
                        'compare' => '!=',
                    ),
                    array(
                        'relation' => 'OR',
                            array(
                                'key'     => 'title',
                                'value'   => 'CFO',
                                'compare' => '=',
                            ),
                            array(
                                'key'     => 'title',
                                'value'   => 'Managing Director',
                                'compare' => '=',
                            ),
                            array(
                                'key'     => 'title',
                                'value'   => 'Vice President',
                                'compare' => 'LIKE',
                            ),

                    ),
                )
            );

//        add_filter( 'posts_orderby' , 'posts_orderby_lastname' );

        $loop = new WP_Query( $args );
        if($loop->have_posts()):?>

        <div class="row team-row">
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

            <?php

            if(get_the_terms( $post->ID, 'departments' )):
            $departments = get_the_terms( $post->ID, 'departments' );
//            $department = $departments[0];

            // print object from first director
//            print_r($department);
            $department_slugs = '';
            foreach( $departments as $department):
            $department_slugs .= ' ' . $department->slug;
            endforeach;
            endif;
            ?>


            <div class="col-lg max-20 col-md-4 col-sm-6 mx-md-0 mx-auto single-team-box<?php echo $department_slugs;?>">
            <!--<div class="col-lg-3 col-md-4 col-sm-6 col-12 mx-md-0 mx-auto single-team-box <?php //echo $department_slug;?>">-->
              <div class="card">

                 <?php if( get_field('headshot')): echo '<img src="' . get_field('headshot')['sizes']['large'] . '" alt="' . get_the_title() . '">'; else: echo '<img src="' . get_template_directory_uri() . '/dist/img/team-default.png">'; endif;?>

                  <a href="<?php the_permalink();?>" class="">
                  <div class="over">
                  <h4><?php echo get_the_title();?></h4>
                  <h6><?php echo get_field('title');?></h6>
                  </div>
                </a>
              </div>


            </div>

        <?php endwhile; echo '</div>'; endif; wp_reset_postdata();


        if(get_current_blog_id() == 4):
        $order = 'menu_order';
        else:
        $order = 'title';
        endif;

        $args = array(

            'posts_per_page' => -1,

            'post_type' => 'team',
            'order'     => 'ASC',
            'orderby'   =>      $order,
            'meta_query' => array(
                'relation' => 'OR',
                  array(
                    array(
                        'key'     => 'title',
                        'value'   => 'Partner',
                        'compare' => '!=',
                    ),
                    array(
                        'key'     => 'title',
                        'value'   => 'Vice President',
                        'compare' => 'NOT LIKE',
                    ),
                    array(
                        'key'     => 'title',
                        'value'   => 'Managing Director',
                        'compare' => 'NOT LIKE',
                    ),
                    array(
                        'key'     => 'title',
                        'value'   => 'CFO',
                        'compare' => '!=',
                    ),

                )
            ),

        );
        if(get_current_blog_id() != 4):
        add_filter( 'posts_orderby' , 'posts_orderby_lastname' );
        endif;
        $loop = new WP_Query( $args );
        if($loop->have_posts()):?>

        <div class="row team-row">
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

            <?php

            if(get_the_terms( $post->ID, 'departments' )):
            $departments = get_the_terms( $post->ID, 'departments' );
//            $department = $departments[0];

            // print object from first director
//            print_r($department);
            $department_slugs = '';
            foreach( $departments as $department):
            $department_slugs .= ' ' . $department->slug;
            endforeach;
            endif;
            ?>


            <div class="col-lg max-20 col-md-4 col-sm-6 mx-md-0 mx-auto single-team-box<?php echo $department_slugs;?>">
            <!--<div class="col-lg-3 col-md-4 col-sm-6 col-12 mx-md-0 mx-auto single-team-box <?php //echo $department_slug;?>">-->
              <div class="card">

                 <?php if( get_field('headshot')): echo '<img src="' . get_field('headshot')['sizes']['large'] . '" alt="' . get_the_title() . '">'; else: echo '<img src="' . get_template_directory_uri() . '/dist/img/team-default.png">'; endif;?>

                  <a href="<?php the_permalink();?>" class="">
                  <div class="over">
                  <h4><?php echo get_the_title();?></h4>
                  <h6><?php echo get_field('title');?></h6>
                  </div>
                </a>
              </div>


            </div>

        <?php endwhile; echo '</div>'; endif; wp_reset_postdata();?>


    </div>

</main>



<?php get_template_part('templates/footer'); ?>
