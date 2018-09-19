<?php
/**
 * Template Name: Projects
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

global $post;
$activeFilter = $post_slug=$post->post_name;
?>

<?php get_template_part('templates/header'); ?>

  <main>
  <?php get_template_part('partials/banner');?>

    <div class="container projects-loop">

      <div class="row">
        <div class="col-md-4 offset-md-1 pl-md-0 col-10 mx-sm-down-auto">

          <div class="dropdown">
            <?php if($_COOKIE[$activeFilter] != null):?>
            <a class="current" href="#" data-toggle="<?php echo $_COOKIE[$activeFilter];?>"><?php $id = get_page_by_path($_COOKIE[$activeFilter], '', 'services'); echo get_the_title($id->ID);?></a>

            <?php else:?>
            <a class="current" href="#" data-toggle="all">All</a>

            <?php endif;?>
            <ul class="menu">
            <li><a href="#" data-toggle="all">All</a></li>

        <?php

        $args = array(

          'posts_per_page' => -1,
          'orderby' => 'title',
          'order'   => 'DESC',
          'post_type' => 'services',
        );


        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post(); ?>

              <li><a href="#" data-toggle="<?php $var = sanitize_title_for_query( get_the_title() ); echo esc_attr( $var);?>"><?php echo get_the_title();?></a></li>

        <?php endwhile; wp_reset_postdata();?>



            </ul>

          </div>

        </div>
      </div>

        <?php get_template_part('partials/case-ajax');?>





      <div class="col-sm-11 col-12 mx-auto pl-0 pr-0">
        <?php get_template_part('partials/project-ajax');?>



      </div>

      </div>


    </div>

</main>



<?php get_template_part('templates/footer'); ?>
