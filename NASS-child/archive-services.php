<?php
/**
 * Template Name: Capabilities
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

<?php get_template_part('templates/header');?>

  <main>
  <?php get_template_part('partials/banner');?>


  <section class="nfusion-sectors">
    <div class="container fill-height">
      <div class="row align-items-center fill-height">
        <div class="col-md-12">
          <div class="row">

            <?php if( have_rows('sectors') ):?>
              <?php while ( have_rows('sectors') ) : the_row();?>
                <div class="col-lg-4 col-sm-12 mb-4">
                  <div class="card editor">

                    <img src="<?php echo get_sub_field('image')['sizes']['large'];?>">
                    <h4 class="gradient"><?php the_sub_field('title');?></h4>
                    <?php the_sub_field('content');?>

                  </div>
                </div>

                <?php endwhile; ?>
                <?php endif; ?>

          </div>

          <p class="lead mt-md-5 mt-sm-2">We scale to your needs whether large integrated destinations, one-off attractions or urban entertainment experiences.</p>

        </div>
      </div>
    </div>


  </section>

    <!--<div class="process-wrapper">

      <section class="banner process">

        <div class="svg-paths" id="grid-path"></div>
        <div class="svg-paths" id="chisel-path"></div>
        <div class="svg-paths" id="circles-path"></div>
        <div class="svg-paths" id="icon-path"></div>
        <div class="svg-paths" id="nfusion-chemistry-title"></div>
        <div class="svg-paths" id="nfusion-chemistry-g1"></div>
        <div class="svg-paths" id="nfusion-chemistry-g2"></div>
        <div class="svg-paths" id="nfusion-chemistry-g3"></div>
        <div class="svg-paths" id="nfusion-chemistry-g4"></div>
        <div class="svg-paths hide" id="icon-fill">
          <?php //include get_template_directory() . '/src/img/icon-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="chisel-fill">
          <?php //include get_template_directory() . '/src/img/chisel-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="g1-fill">
          <?php //include get_template_directory() . '/dist/img/nfusion-chemistry-g1-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="g2-fill">
          <?php //include get_template_directory() . '/dist/img/nfusion-chemistry-g2-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="g3-fill">
          <?php //include get_template_directory() . '/dist/img/nfusion-chemistry-g3-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="g4-fill">
          <?php //include get_template_directory() . '/dist/img/nfusion-chemistry-g4-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="shapes">
          <?php //include get_template_directory() . '/src/img/arrows.svg';?>

        </div>

      </section>

    </div>-->


    <?php $args = array(

        'posts_per_page' => -1,
        'orderby' => 'title' ,
        'order'   => 'ASC',
        'post_type' => 'services');

    $loop = new WP_Query( $args );
    while ( $loop->have_posts() ) : $loop->the_post(); ?>

    <div class="service-wrapper" id="section-<?php $var = sanitize_title_for_query( get_the_title() ); echo esc_attr( $var);?>">
    <section class="banner service-header">
      <div class="bg-img">
        <?php if(get_field('bg_image')):?>
        <img src="<?php echo get_field('bg_image')['sizes']['banner'];?>" alt="<?php echo get_sub_field('bg_image')['title'];?>">
        <?php endif;?>
      </div>
      <div class="container">
        <div class="row">
              <div class="col-sm-10 offset-sm-0">
                <h3 class=""><?php echo get_the_title();?></h3>
              </div>
        </div>
      </div>
    </section>

    <section class="content-block">

      <div class="container">

        <div class="row mb-4">

            <div class="col-sm-10 offset-sm-0">
                <div class="lead">
                  <p><?php the_field('service_intro');?></p>
                </div>
            </div>
          </div>
        <div class="row">
            <div class="col-sm-10 offset-sm-0">

              <div class="editor lead">
                <?php echo get_the_content();?>

              </div>
            </div>

          </div>
      </div>
    </section>
    </div>

    <?php endwhile; wp_reset_postdata();?>




  </main>



<?php get_template_part('templates/footer'); ?>
