<?php
/**
 * Template Name: Home
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
<main>
<section class="home-slider mask">

  <div class="social-bar">

      <ul class="social-links">


        <?php if( have_rows('socials', 'options') ):?>
        <?php while ( have_rows('socials', 'options') ) : the_row();
        $link = get_sub_field('link');
        if(substr( $link, 0, 4 ) != "mail"):
        ?>
        <li><a href="<?php the_sub_field('link');?>"><?php echo get_sub_field('type');?></a></li>

        <?php endif; endwhile; ?>
        <?php endif; ?>

      </ul>

  </div>
  <!-- Slider main container -->
  <div class="swiper-container hero-slider">




    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->


    <?php


    if( have_rows('home_slider' ) ):?>
    <?php while ( have_rows('home_slider') ) : the_row();?>
      <div class="swiper-slide">

      <div class="bg-image fill-height">
        <div class="mask-fallback"></div>


          <?php
          $type = get_sub_field('slide_type');



          $attr = mb_strimwidth(get_sub_field('image')['caption'], 0, 203, '...');


          if($type == 'video'):?>
          <video class="clone" src="<?php echo get_sub_field('video');?>" autoplay muted loop playsinline></video>
          <video class="masked" src="<?php echo get_sub_field('video');?>" autoplay muted loop playsinline></video>

          <?php else:?>
          <img class="clone" src="<?php echo get_sub_field('image')['sizes']['banner'];?>">
          <img class="masked" src="<?php echo get_sub_field('image')['sizes']['banner'];?>">
          <div class="img-attr"><p title="<?php
            echo mb_strimwidth(get_sub_field('image')['caption'], 0, 250, '...');
            ?>"><?php echo $attr;?></p></div>

          <?php endif;?>


        </div>
        <div class="row align-items-end fill-height no-touch">

          <div class="col-md-6 left order-md-1 order-2 fill-height touch">
            <div class="col-lg-12 col-sm-9 col-12 mx-auto content <?php if(get_sub_field('slide_link')): echo 'has-btn'; endif;?>">
              <h1 class="gradient"><?php the_sub_field('title');?></h1>
              <div class="lead"><?php the_sub_field('slide_content');?></div>

              <?php if(get_sub_field('slide_link')):?>
              <a href="<?php echo get_sub_field('slide_link'); ?>" class="btn"><?php echo get_sub_field('link_label'); ?></a>
              <?php endif;?>
            </div>
            <div class="bottom-nav">
            <div id="progress" class="progress"><div class="bg"></div></div>

            </div>
          </div>
        </div>
      </div>
    <?php endwhile; ?>
    <?php endif; ?>
    </div>
  </div>
</section>



  <?php // check if the flexible content field has rows of data
  if( have_rows('section') ):

       // loop through the rows of data
      while ( have_rows('section') ) : the_row();

          if( get_row_layout() == 'card_content' ):

              include( locate_template( 'partials/card-content.php', false, false ) );

          endif;

          if( get_row_layout() == 'capabilities_block' ):

              include( locate_template( 'partials/capabilities-block.php', false, false ) );

          endif;

          if( get_row_layout() == 'content_block' ):

              include( locate_template( 'partials/content-block.php', false, false ) );

          endif;

          if( get_row_layout() == 'archive_loop' ):

              include( locate_template( 'partials/archive-loop.php', false, false ) );

          endif;

      endwhile;

  endif;

  ?>

<?php if(get_field('clients')):?>

<section class="logos">


  <div class="container">
    <div class="row">
      <div class="col-md-8 col-12 mr-md-0 mx-md-0 mx-auto">

        <h3><?php the_field('title');?></h3>
            <?php the_field('content');?>
      </div>
      </div>
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="row">
          <?php

                $logos = get_field('clients');

                foreach($logos as $logo):
                echo '<div class="col-sm-3 col-4 logo-wrapper"><img class="logo" src="' . $logo['sizes']['medium'] . '"></div>';
                endforeach;

                ?>

        </div>

      </div>
    </div>
  </div>

</section>

<?php endif;?>
</main>


<?php get_template_part('templates/footer'); ?>
