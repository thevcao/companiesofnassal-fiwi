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
  $headshot = get_field('headshot');



?>

    <main>

      <?php get_template_part('partials/banner');?>

        <section class="bio">

          <div class="container">
            <div class="row">
              <div class="col-lg-11 ml-lg-auto">
                <div class="row align-items-start">
                  <div class="col-lg-5 headshot pr-lg-0 pl-lg-0 mx-lg-0 col-md-6 col-sm-8 mx-auto">

                    <?php if(get_field('headshot')):?>
                    <img src="<?php echo $headshot['sizes']['large'];?>">
                    <?php else:?>
                    <img src="https://via.placeholder.com/350x600">

                    <?php endif;?>

                    <div class="row team-back">
                    <div class="col-sm-auto ml-auto">
                      <a href="#" class="btn-standard mt-2" onclick="window.history.go(-1)"><i class="fa fa-angle-left"></i> Back to Team</a>
                      </div>
                    </div>


                  </div>
                  <div class="col-lg-6 lg-auto ml-lg-auto mr-lg-0 col-md-10 col-sm-12 col-11 mx-auto">
                    <?php if(get_field('bio')):

                    echo get_field('bio');

                    else:

                    echo get_field('simple_bio');

                    endif;



                    if(get_field('education')): echo '<h5>Education</h5><div class="bio-lists"><ul>' . get_field('education') . '</ul></div>'; endif;
                    if(get_field('associations')): echo '<h5>Associations</h5><div class="bio-lists"><ul>' . get_field('associations') . '</ul></div>'; endif;
                    if(get_field('clients')): echo '<h5>Noted Clients/Projects</h5><div class="bio-lists"><ul>' . get_field('clients') . '</ul></div>'; endif;





                ?>

                      <div class="row contacts align-items-center">
                        <?php if(get_field('email')):?>
                        <div class="col-sm">
                          <a href="mailto:<?php the_field('email');?>">
                            <?php include get_template_directory() . '/dist/img/contact.svg';?> Contact</a>
                        </div>
                        <?php endif;?>
                        <?php if(get_field('resume')):?>
                        <div class="col-sm">
                          <a href="<?php the_field('resume');?>" target="_blank">
                            <?php include get_template_directory() . '/dist/img/resume.svg';?> Resume</a>

                        </div>
                        <?php endif;?>
                        <?php if(get_field('linkedin')):?>
                        <div class="col-sm">
                          <a href="<?php the_field('linkedin');?>" target="_blank"><i class="fa fa-linkedin"></i> Connect</a>

                        </div>
                        <?php endif;?>

                      </div>

                  </div>

                </div>

              </div>



            </div>


          </div>
        </section>



    </main>

    <section class="cta">

      <div class="row">
        <div class="col-lg-3 offset-lg-1">
          <a href="/contact-us">
            <div class="cta-btn">
            <h5>Lets's Work. <i class="fa fa-arrow-right"></i></h5>
            <p>Contact us today!</p>
          </div></a>
        </div>
      </div>
      <div class="bg-image">
        <div class="row fill-height">


          <div class="col-lg-8 offset-lg-3 mr-auto pl-0 pr-0 fill-height">
            <?php


                $args = array(

                'posts_per_page' => 1,
//                'order'   => 'meta_key',
//                'offset' => 1,
                'post_type' => 'portfolio',
//                  'meta_key' => 'case_study',
//                  'meta_value' => 'yes'
                'meta_query' => array(
                      array(
                          'key'     => 'case_study',
                          'value'   => 'yes',
                          'compare' => 'LIKE',
                      )
                  ),
                'order'                  => 'DESC',
                'orderby'                => 'rand',


                );

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post(); ?>

              <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'banner' ); $url = $thumb['0']; ?>
                <?php if( has_post_thumbnail()): echo '<img class="next-img" src="' . $url . '">'; endif;?>

            <div class="over">
              <a href="<?php the_permalink();?>"><span>Next Project</span> <?php echo get_the_title();?></a>
            </div>
            <?php endwhile; ?>



          </div>
        </div>
      </div>
    </section>

    <?php get_template_part('templates/footer'); ?>
