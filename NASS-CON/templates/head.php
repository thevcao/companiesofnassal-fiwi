<?php
/**
 * The template for displaying the header
 *
 * @package Smores
 * @since Smores 2.0
 */
?>
<!doctype html>

<html class="no-js" <?php language_attributes(); ?> id="returnTop">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="description" content="<?php bloginfo('description') ?>" />
  <meta name="author" content="Findsome &amp; Winmore" />
  <meta name="Copyright" content="<?php echo date('Y'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-touch-fullscreen" content="yes" />
  <?php get_template_part('partials/meta', 'favicons'); ?>

    <?php

        /*
         * Wordpress Head
         */

        wp_head();
        $name = sanitize_title_for_query(get_bloginfo( 'name'));
        $site_name = esc_attr( $name );
        if(get_field('case_study')):

        $case = 'case-study';


        endif;

    ?>
</head>

<body <?php body_class($site_name . ' ' . $case) ?>>
<?php get_template_part('partials/notice', 'outdated'); ?>

<div class="modal contact-modal">

  <div class="container fill-height">
    <div class="row fill-height align-items-center">
      <div class="col-md-10 col-sm-12 col-12 mx-auto">
        <div class="inner">
          <a href="#" class="close"><i class="fa fa-close"></i></a>
          <h6>Get in Touch</h6>

          <div class="row">
    <?php if(get_current_blog_id() == 1){

          $sitesObj = get_sites($args);
          $sites = object_to_array($sitesObj);
          $maintemplate = get_template_directory_uri();

          foreach ($sites as $site):

    //      echo '<p>' . $site['blog_id'] . '</p>';
          if($site['blog_id'] != 1):
          switch_to_blog($site['blog_id']);
          $name = sanitize_title_for_query(get_bloginfo( 'name'));
          $site_name = esc_attr( $name );

      ?>

            <div class="col-md-4 col-sm-12 <?php echo $site_name;?> single-contact-co">
              <a class="" href="<?php echo get_site_url(); ?>"><img src="<?php echo $maintemplate; ?>/dist/img/about-cta-<?php echo $site_name;?>-logo.svg"></a>
            <?php if( have_rows('offices', 'options') ):?>
                <div class="row">

            <?php while ( have_rows('offices', 'options') ) : the_row();?>
                <div class="col-sm-12 col-6 mb-2">


              <p class="office-name"><?php the_sub_field('office_name');?></p>

              <p class="address"><?php
                echo explode(', ' , get_sub_field('address')['address'], 2)[0];
                echo '<br>' . explode(',' , get_sub_field('address')['address'], 2)[1];
                ?>
              </p>

              <a class="contact-link directions" href="https://maps.google.com?saddr=Current+Location&daddr=<?php echo get_sub_field('address')['address'];?>"><i class="fa fa-location-arrow"></i> Get Directions</a>

              <a class="contact-link" href="tel:<?php the_sub_field('phone');?>"><i class="fa fa-phone"></i> <?php the_sub_field('phone');?></a>

                </div>

            <?php endwhile; ?>
              </div>

            <?php endif; ?>


            <a class="contact-link email" href="<?php echo get_site_url(); ?>/contact-us"><?php include get_template_directory() . '/dist/img/contact.svg';?> Contact</a>
            </div>
      <?php
      endif;
      restore_current_blog();
      endforeach;

          } else {?>

            <div class="col-sm-12 <?php echo $site_name;?> single-contact-co">
              <div class="row">


            <?php if( have_rows('offices', 'options') ):?>
            <?php while ( have_rows('offices', 'options') ) : the_row();?>
              <div class="col-sm">

                        <svg version="1.1" id="logo" class="mt-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="297.274px" height="62.026px" viewBox="0 0 297.274 62.026" enable-background="new 0 0 297.274 62.026" xml:space="preserve">
                          <?php if(get_current_blog_id() == 3):?>
                          <defs>
                          <linearGradient id="logo_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.826" x2="47.781" y2="38.826" gradientTransform="matrix(1 0 0 -1 0 64)">
                            <stop offset="0.1789" style="stop-color:#C12990" />
                            <stop offset="0.688" style="stop-color:#6F2B90" />
                            <stop offset="1" style="stop-color:#4E0B42" />
                          </linearGradient>
                          </defs>

                          <?php endif;?>
                          <?php if(get_current_blog_id() == 2):?>
                          <defs>
                          <linearGradient id="logo_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.826" x2="47.781" y2="38.826" gradientTransform="matrix(1 0 0 -1 0 64)">
                            <stop offset="0" style="stop-color:#52CAF5" />
                            <stop offset="0.0163" style="stop-color:#52C3F0" />
                            <stop offset="0.2574" style="stop-color:#3E83C0" />
                            <stop offset="0.4519" style="stop-color:#315CA4" />
                            <stop offset="0.5904" style="stop-color:#2B4395" />
                            <stop offset="0.6599" style="stop-color:#2B3990" />
                            <stop offset="1" style="stop-color:#1C155E" />
                          </linearGradient>
                          </defs>
                          <?php endif;?>
                          <?php if(get_current_blog_id() == 4):?>
                          <defs>
                          <linearGradient id="logo_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.825" x2="47.782" y2="38.825" gradientTransform="matrix(1 0 0 -1 0 64)">
                            <stop offset="0" style="stop-color:#F58220" />
                            <stop offset="0.4876" style="stop-color:#ED1B2E" />
                            <stop offset="1" style="stop-color:#A31421" />
                          </linearGradient>
                            </defs>
                          <?php endif;?>

                          <style>
                            #logo .chisel { fill: url(#logo_gradient)}
                          </style>

                          <use xlink:href="<?php echo get_site_url() . '/wp-content/themes/NASS-CON/src/img/logo-full.svg#wordmark_' . sanitize_title_for_query(get_bloginfo( 'name'));?>" fill="#000000"></use>
                          <g id="mark_<?php echo sanitize_title_for_query(get_bloginfo( 'name'));?>">
                            <polygon fill="var(--brand)" points="26.887,13.007 42.659,13.007 42.659,38.348 47.781,46.516 47.781,7.885 23.653,7.885 		" />
                            <polygon fill="var(--brand)" points="39.798,45.226 10.436,45.226 10.436,14.461 5.313,9.041 5.313,50.348 44.521,50.348 		" />
                            <g>
                              <path class="chisel" d="M0,0h15.715l32.066,50.348L0,0z" />
                            </g>
                          </g>
                        </svg>

                        <p class="office-name"><?php the_sub_field('office_name');?></p>

              <p class="address">
                <?php
                echo explode(', ' , get_sub_field('address')['address'], 2)[0];
                echo '<br>' . explode(',' , get_sub_field('address')['address'], 2)[1];
                ?>
              </p>
              <a class="contact-link directions" href="https://maps.google.com?saddr=Current+Location&daddr=<?php echo get_sub_field('address')['address'];?>"><i class="fa fa-location-arrow"></i> Get Directions</a>
              <a class="contact-link" href="tel:<?php the_sub_field('phone');?>"><i class="fa fa-phone"></i> <?php the_sub_field('phone');?></a>
              <a class="contact-link" href="<?php echo get_site_url(); ?>/contact-us"><?php include get_template_directory() . '/dist/img/contact.svg';?> Contact</a>
              </div>
            <?php endwhile; ?>
            <?php endif; ?>

            </div>
            </div>

            <?php }?>

          </div>


        </div>


      </div>
    </div>

  </div>


</div>
