<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

  <?php get_template_part('templates/header');



?>

    <main>

      <section class="post-header">
        <div class="container">
          <div class="row">
            <div class="col-md-11 offset-md-1 pl-md-0">
              <ul class="breadcrumbs">
                <li>
                  <a href="<?php echo get_site_url();?>">
                    <?php echo get_bloginfo( 'name' );?>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <?php echo get_the_title();?>
                  </a>
                </li>
              </ul>
              <h1><?php echo get_the_title();?></h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 offset-md-1 pl-md-0">
              <p class="lead">
                <?php echo get_the_excerpt();?>
              </p>
            </div>
            <div class="col-md-5 ml-auto">
              <ul class="socials shares">
                <li>Share:</li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/home?status=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://plus.google.com/share?url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-google-plus"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      <?php // check if the flexible content field has rows of data
      if( have_rows('section') ):

           // loop through the rows of data
          while ( have_rows('section') ) : the_row();

              if( get_row_layout() == 'banner_image' ):

                  include( locate_template( 'partials/nsights-banner-image.php', false, false ) );

              endif;

              if( get_row_layout() == 'content_block' ):

                  include( locate_template( 'partials/nsights-content-block.php', false, false ) );

              endif;

              if( get_row_layout() == 'featured_media' ):

                  include( locate_template( 'partials/nsights-featured-media.php', false, false ) );

              endif;

              if( get_row_layout() == 'quote' ):

                  include( locate_template( 'partials/nsights-quote.php', false, false ) );

              endif;

              if( get_row_layout() == '50_image' ):

                  include( locate_template( 'partials/nsights-half_image.php', false, false ) );

              endif;

          endwhile;

      endif;

      ?>

    </main>

    <section class="cta">

      <div class="row">
        <div class="col-md-3 offset-md-1">
          <a href="/contact-us">
            <div class="cta-btn">
            <h5>Lets's Work. <i class="fa fa-arrow-right"></i></h5>
            <p>Contact us today!</p>
          </div></a>
        </div>
      </div>
      <div class="bg-image">
        <div class="row">


          <div class="col-md-8 offset-md-3 mr-auto pl-0 pr-0">
            <?php


                $args = array(

                'posts_per_page' => 1,
                'orderby' => 'date' ,
                'order'   => 'RAND',
                'offset' => 1,
                'post_type' => 'portfolio',
                 'meta_query' => array(
                          array(
                              'key'     => 'case_study',
                              'value'   => 'yes',
                              'compare' => 'LIKE',
                          )
                      ),


                );

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post(); ?>

              <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'banner' ); $url = $thumb['0']; ?>
                <?php if( has_post_thumbnail()): echo '<img class="next-img" src="' . $url . '">';

                else:
                echo '<img class="next-img" src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                endif;?>

                  <div class="over">
                    <a href="<?php the_permalink();?>"><span>Next Project</span> <?php echo get_the_title();?></a>
                  </div>
                  <?php endwhile; ?>


          </div>
        </div>
      </div>
    </section>
    <?php get_template_part('templates/footer'); ?>
