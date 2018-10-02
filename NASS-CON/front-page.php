<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one
 * of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query,
 * e.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php

$maintemplate = get_template_directory_uri();
get_template_part('templates/header'); ?>

<section class="home-slider">

  <!-- Slider main container -->
  <div class="swiper-container hero-slider tcon">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <?php if(get_current_blog_id() == 1):?>
      <div class="swiper-slide">
        <?php if(get_field('video_loop')):?>
        <div class="modal video">
        <video autoplay class="video-js" id="player"></video>
        </div>
        <?php endif;?>
        <div class="row align-items-end fill-height">

          <div class="col-md-6 left order-md-1 order-2">
            <div class="col-lg-12 col-sm-11 col-12 mx-auto content has-btn">
            <h1 class="gradient"><?php the_field('hero_title');?></h1>
            <p class="lead"><?php the_field('hero_content');?></p>
              <?php if(get_field('video_loop')):?>
              <div class="video-toggle">
                  <a href="<?php the_field('video');?>" class="btn">Play Video</a>
              </div>
              <?php endif;?>

            </div>

            <?php get_template_part('partials/bottom-nav'); ?>

          </div>
          <div class="col-md-6 pl-0 order-md-2 order-1 fill-height">
            <div class="bg-image fill-height">

              <?php if(get_field('video_loop')):?>

              <video muted src="<?php the_field('video_loop');?>" preload="none" playsinline autoplay loop></video>

              <?php else: $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'banner' ); $url = $thumb['0']; ?>
              <?php if( has_post_thumbnail()): echo '<img src="' . $url . '"/>'; endif; endif;?>

            </div>


          </div>
        </div>
      </div>
      <?php endif;


      $sitesObj = get_sites($args);
      $sites = object_to_array($sitesObj);
      foreach ($sites as $site):

//      echo '<p>' . $site['blog_id'] . '</p>';
      if($site['blog_id'] != 1){
      switch_to_blog($site['blog_id']);
      $name = sanitize_title_for_query(get_bloginfo( 'name'));
      $site_name = esc_attr( $name );

  ?>

      <?php

      $id = get_option( 'page_on_front' );

      if( have_rows('home_slider', $id ) ):?>
      <?php $i = 0; while ( have_rows('home_slider', $id) ) : the_row(); $i++; if($i == 1):?>
      <div class="swiper-slide <?php echo $site_name;?>">
        <div class="row align-items-end fill-height">

          <div class="col-md-6 left order-md-1 order-2">
            <div class="col-lg-12 col-sm-11 col-12 mx-auto mx-auto content <?php if(get_sub_field('slide_link')): echo 'has-btn'; endif;?>">
              <h1 class="gradient"><?php the_sub_field('title');?></h1>
              <div class="lead"><?php the_sub_field('slide_content');?></div>
              <a href="<?php echo get_site_url(); ?>" class="btn">Discover <?php echo get_bloginfo( 'name');?></a>
            </div>

            <?php get_template_part('partials/bottom-nav'); ?>

          </div>
          <div class="col-md-6 pl-0 fill-height order-md-2 order-1">



                <div class="bg-image fill-height">


                    <?php
                    $type = get_sub_field('slide_type');


                    if($type == 'video'):?>

                    <video src="<?php echo get_sub_field('video');?>" autoplay muted loop playsinline></video>

                    <?php else:?>

                    <img src="<?php echo get_sub_field('image')['sizes']['banner'];?>" alt="<?php echo get_sub_field('image')['title'];?>">
                    <div class="img-attr"><p><?php echo mb_strimwidth(get_sub_field('image')['caption'], 0, 250, '...');?></p></div>

                    <?php endif;?>


                  </div>

          </div>
        </div>
      </div>
      <?php endif; endwhile; ?>
      <?php endif; ?>
      <?php }
      restore_current_blog();
      endforeach;?>


    </div>
  </div>
</section>




  <?php



//      $sitesObj = get_sites($args);
//      $sites = object_to_array($sitesObj);
      foreach ($sites as $site):
      if($site['blog_id'] != 1):
      switch_to_blog($site['blog_id']);
      $name = sanitize_title_for_query(get_bloginfo( 'name'));
      $site_name = esc_attr( $name );

  ?>

  <section class="sub-sites <?php echo $site_name;?>">
    <div class="full-image">
      <div class="row fill-height">
        <div class="col-md-7 ml-auto fill-height">
                <div class="swiper-container company-slider">
                          <!-- Additional required wrapper -->
                          <div class="swiper-wrapper">
                            <!-- Slides -->

                  <?php

                  $id = get_option( 'page_on_front' );

                  if( have_rows('home_slider', $id ) ):?>
                  <?php while ( have_rows('home_slider', $id) ) : the_row();?>

                                <div class="swiper-slide">
                                  <div class="bg-image">
                                    <?php
                                    $type = get_sub_field('slide_type');


                                    if($type == 'video'):?>

                                    <video src="<?php echo get_sub_field('video');?>" autoplay playsinline muted loop></video>

                                    <?php else:?>

                                    <img src="<?php echo get_sub_field('image')['sizes']['large'];?>" alt="<?php echo get_sub_field('image')['title'];?>">
                                    <div class="img-attr"><p><?php echo mb_strimwidth(get_sub_field('image')['caption'], 0, 250, '...');?></p></div>

                                    <?php endif;?>

                                  </div>


                                </div>

                  <?php endwhile; ?>
                  <?php endif; ?>
                          </div>


            </div>

        </div>
      </div>
    </div>
      <div class="container p-sm-down-0">
        <div class="col-md-7">
          <div class="card">
            <a href="<?php echo get_site_url(); ?>"><img src="<?php echo $maintemplate; ?>/dist/img/logo-full-<?php echo $site_name;?>.svg"></a>
            <h6><?php echo get_bloginfo( 'description');?></h6>

            <p class="lead"><?php the_field('overview', 'options');?></p>

            <ul class="services">


            <?php $args = array(

                'posts_per_page' => -1,
                'orderby' => 'menu_order' ,
                'order'   => 'ASC',
                'post_type' => 'services');




            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post();

            $id = get_the_ID();
//            echo $id;
            $projects = array(
            'posts_per_page' => -1,
            'post_type' => 'portfolio',
            'meta_query' => array(
                    array(
                        'key'     => 'project_type',
                        'value'   => $id,
                        'compare' => 'LIKE',
                    )
                  )
            );

            $projectsCount = new WP_Query( $projects );
              ?>


            <li>
              <?php if($projectsCount->have_posts()) :?>
              <a href="<?php
              echo get_site_url();
              if(get_current_blog_id() == 4):
              echo '/services/';
              else:
              echo '/capabilities/';
              endif;
              $var = sanitize_title_for_query( get_the_title() );
              echo esc_attr( $var);
              ?>"><?php echo get_the_title();?></a>
              <?php else: ?>
              <?php echo get_the_title();?>
              <?php endif;?>
              </li>


            <?php endwhile; wp_reset_postdata();?>
            </ul>

            <a href="<?php echo get_site_url(); ?>" class="btn right">Discover <?php echo get_bloginfo( 'name');?></a>

          </div>
        </div>


      </div>

  </section>
  <?php endif; restore_current_blog(); endforeach;?>



<?php get_template_part('partials/logos'); ?>



<?php get_template_part('templates/footer'); ?>
