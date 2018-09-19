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

      <div class="row">
        <div class="col-md-4 mx-md-0 col-10 mx-auto">

          <div class="dropdown">
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

      <div class="row team-row mt-5">


        <?php

//        echo get_current_blog_id();
        if(get_current_blog_id() != 4):

        $order = 'rand';

        else:

        $order = 'title';

        endif;


        $args = array(

            'posts_per_page' => -1,

          //            'order'   => $order,
            'post_type' => 'team',
            'order'                  => 'DESC',
            'orderby'                => $order,

        );

        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post(); ?>


            <?php

            $departments = get_the_terms( $post->ID, 'departments' );
            $department = $departments[0];

            // print object from first director
//            print_r($department);


            $department_slug = $department->slug;

            ?>


            <div class="col-lg max-20 col-md-4 col-sm-6 mx-md-0 mx-auto single-team-box <?php echo $department_slug;?>">
            <!--<div class="col-lg-3 col-md-4 col-sm-6 col-12 mx-md-0 mx-auto single-team-box <?php //echo $department_slug;?>">-->
              <div class="card">

                 <?php if( get_field('headshot')): echo '<img src="' . get_field('headshot')['sizes']['large'] . '">'; else: echo '<img src="https://via.placeholder.com/350x600">'; endif;?>

                  <a href="<?php the_permalink();?>" class="">
                  <div class="over">
                  <h4><?php echo get_the_title();?></h4>
                  <h6><?php echo get_field('title');?></h6>
                  </div>
                </a>
              </div>


            </div>

        <?php endwhile; wp_reset_postdata();?>
      </div>


    </div>

</main>



<?php get_template_part('templates/footer'); ?>
