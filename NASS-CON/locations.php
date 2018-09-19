<?php
/**
 * Template Name: Locations
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
  $headshot = get_field('headshot');



?>

    <main>

      <?php get_template_part('partials/banner');?>

        <section class="post-content">

          <div class="container">
            <div class="row">
                  <div class="col-lg-5 offset-lg-1 col-md-6 editor pl-md-0">


                    <?php if ( have_posts() ) : while (have_posts()) : the_post(); the_content(); endwhile; endif;?>
                    <div class="row">



                      <div class="col-12 mt-2">
                         <svg version="1.1" id="logo" class="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="297.274px" height="62.026px" viewBox="0 0 297.274 62.026" enable-background="new 0 0 297.274 62.026" xml:space="preserve">
                            <defs>
                              <linearGradient id="lexington_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.826" x2="47.781" y2="38.826" gradientTransform="matrix(1 0 0 -1 0 64)">
                                <stop offset="0.1789" style="stop-color:#C12990" />
                                <stop offset="0.688" style="stop-color:#6F2B90" />
                                <stop offset="1" style="stop-color:#4E0B42" />
                              </linearGradient>
                              <linearGradient id="nassal_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.826" x2="47.781" y2="38.826" gradientTransform="matrix(1 0 0 -1 0 64)">
                                <stop offset="0" style="stop-color:#52CAF5" />
                                <stop offset="0.0163" style="stop-color:#52C3F0" />
                                <stop offset="0.2574" style="stop-color:#3E83C0" />
                                <stop offset="0.4519" style="stop-color:#315CA4" />
                                <stop offset="0.5904" style="stop-color:#2B4395" />
                                <stop offset="0.6599" style="stop-color:#2B3990" />
                                <stop offset="1" style="stop-color:#1C155E" />
                              </linearGradient>
                              <linearGradient id="nfusion_gradient" gradientUnits="userSpaceOnUse" x1="0" y1="38.825" x2="47.782" y2="38.825" gradientTransform="matrix(1 0 0 -1 0 64)">
                                <stop offset="0" style="stop-color:#F58220" />
                                <stop offset="0.4876" style="stop-color:#ED1B2E" />
                                <stop offset="1" style="stop-color:#A31421" />
                              </linearGradient>
                            </defs>


                            <use xlink:href="<?php echo get_site_url() . '/wp-content/themes/NASS-CON/src/img/logo-full.svg#wordmark_' . sanitize_title_for_query(get_bloginfo( 'name'));?>" fill="#000000"></use>
                            <g id="mark_<?php echo sanitize_title_for_query(get_bloginfo( 'name'));?>">
                              <polygon fill="var(--brand)" points="26.887,13.007 42.659,13.007 42.659,38.348 47.781,46.516 47.781,7.885 23.653,7.885 		" />
                              <polygon fill="var(--brand)" points="39.798,45.226 10.436,45.226 10.436,14.461 5.313,9.041 5.313,50.348 44.521,50.348 		" />
                              <g fill="var(--logoGradient)">


                                <path class="chisel" fill="var(--logoGradient)" d="M0,0h15.715l32.066,50.348L0,0z" />
                              </g>
                            </g>
                          </svg>

                      <?php if( have_rows('offices', 'options') ):?>
                          <div class="row">
                          <?php while ( have_rows('offices', 'options') ) : the_row();?>

                          <div class="col-auto pr-0"><p class="office-name"><?php the_sub_field('office_name');?></p>
                          </div>
                          <?php endwhile; ?>
                          </div>
                      <?php endif; ?>

                      </div>
                    </div>
                      <?php if( have_rows('offices', 'options') ):?>
                      <div class="row">
                      <?php while ( have_rows('offices', 'options') ) : the_row();?>


                      <div class="col-auto mt-2 office-address pr-0">
                        <p><?php
                          echo explode(', ' , get_sub_field('address')['address'], 2)[0];
                          echo '<br>' . explode(',' , get_sub_field('address')['address'], 2)[1];
                          ?></p>
                          <a class="contact-link directions" href="https://maps.google.com?saddr=Current+Location&daddr=<?php echo get_sub_field('address')['address'];?>"><i class="fa fa-location-arrow"></i> Get Directions</a>
                          <a class="contact-link" href="tel:<?php the_sub_field('phone');?>"><i class="fa fa-phone"></i> <?php the_sub_field('phone');?></a>
                      </div>

                      <?php endwhile; ?>
                     </div>
                      <?php endif; ?>


                  </div>

                  <div class="col-md-6 form-wrapper">
                    <?php echo do_shortcode('[gravityform id="1" title="false" description="false" ajax="false"]');?>

                  </div>





            </div>


          </div>
        </section>



    </main>

<?php get_template_part('templates/footer'); ?>
