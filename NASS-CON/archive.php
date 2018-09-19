<?php
/**
 * Template Name: Posts
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

    <div class="container news-posts">





      <?php

      $sitesObj = get_sites($args);
      $sites = object_to_array($sitesObj);
      foreach ($sites as $site):

      //      echo '<p>' . $site['blog_id'] . '</p>';
      if($site['blog_id'] != 1){
      switch_to_blog($site['blog_id']);
      $name = sanitize_title_for_query(get_bloginfo( 'name'));
      $site_name = esc_attr( $name );?>
      <div class="<?php echo $site_name;?> mt-sm-3">

      <div class="row">

      <div class="col-lg-8 offset-lg-1 pl-lg-0 mr-auto">

          <h3><?php echo get_bloginfo( 'name');?> News</h3>
        </div>
      </div>
      <div class="posts-row">




        <?php $args = array(

            'posts_per_page' => -3,
            'orderby' => 'date' ,
            'order'   => 'DESC',
            'post_type' => 'post');

        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post(); ?>



            <div class="row featured-post mt-md-3 filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">
              <div class="col-lg-11 mx-auto">
                <div class="row align-items-center">
                <div class="col-lg-8 pr-lg-0">
                  <a href="<?php the_permalink();?>" class=""><div class="card">

                        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' ); $url = $thumb['0']; ?>
                         <?php if( has_post_thumbnail()): echo '<img src="' . $url . '">';
                                else:
                                echo '<img src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                                  endif;?>

                    </div></a>
                </div>
                <div class="col-lg-4 pl-lg-5 col-11 mx-auto mt-lg-0 mt-2 mb-lg-0 mb-3">

                          <h5><a href="<?php the_permalink();?>" class=""><?php echo mb_strimwidth(get_the_title(), 0, 80, '...');?></a></h5>
                          <h6><a href="<?php echo get_site_url();?>/category/<?php
                            $category = get_the_category();
                            echo $category[0]->slug;
                            ?>">Posted in: <?php
                            $category = get_the_category();
                            echo $category[0]->cat_name;
                            ?></a></h6>
                          <?php echo '<p>' . mb_strimwidth(get_the_excerpt(), 0, 70, '...') .'</p>';?>

                          <a href="<?php the_permalink();?>" class="btn">Read More</a>


                </div>


                </div>
              </div>
            </div>

        <?php endwhile; wp_reset_postdata();?>
      </div>


      <div class="row">

        <div class="col-md-auto col-12 offset-md-1 mt-md-5 mt-3 mb-5">
          <a href="<?php echo get_site_url();?>/news" class="btn-standard">See More <?php echo get_bloginfo( 'name');?> News <i class="fa fa-angle-right"></i></a>
        </div>
      </div>
            <?php echo '</div>'; } restore_current_blog(); endforeach; ?>


    </div>

  </main>



<?php get_template_part('templates/footer'); ?>
