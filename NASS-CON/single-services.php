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
<?php if ( get_field('service_intro') ) :?>
    <section class="content-block">

      <div class="container">

        <div class="row mb-4">

            <div class="col-lg-10 offset-lg-1 pl-lg-0">
                <div class="lead">
                  <p><?php the_field('service_intro');?></p>
                </div>
            </div>
          </div>
        <div class="row">
            <div class="col-lg-10 offset-lg-1 pl-lg-0">

              <div class="editor lead">
                    <?php while (have_posts()) : the_post(); the_content(); endwhile; ?>

              </div>
            </div>

          </div>


      </div>
    </section>
<?php endif;?>

  <section class="projects-loop">

    <div class="container">

      <?php



              $id = get_the_ID();

              $args = array(

                  'posts_per_page' => -1,
                  'orderby' => 'date' ,
                  'order'   => 'RAND',
                  'post_type' => 'portfolio',
                  'meta_query' => array(
                      'relation' => 'AND',
                      array(
                        array(
                            'key'     => 'case_study',
                            'value'   => 'yes',
                            'compare' => 'LIKE',
                        ),
                        array(
                            'key'     => 'project_type',
                              'value'   => $id,
                            'compare' => 'LIKE',
                        )
                      )
                  ),
                );


              $loop = new WP_Query( $args );
//              $allCount = new WP_Query( $all );
//              $count = $allCount->post_count;
              while ( $loop->have_posts() ) : $loop->the_post();


              ?>

            <div class="row featured-post mt-5 filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">
              <div class="col-md-11 mx-auto">
                <div class="row align-items-center">
                <div class="col-md-8 pr-sm-0">
                  <div class="card">

                        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
                         <?php if( has_post_thumbnail()): echo '<img src="' . $url . '">'; endif;?>

                  </div>
                </div>
                <div class="col-md-4 pl-md-5 mx-md-0 col-sm-11 col-11 mx-auto mt-md-0 mt-5">

                          <h5><?php echo get_the_title();?></h5>
                          <h6><?php echo get_the_title(get_field('project_type')->ID);?></h6>
                            <?php if($type == 'portfolio'):?>
                              <p><?php the_field('excerpt');?></p>
                            <?php else:
                                  echo '<p>' . get_the_excerpt() . '</p>';
                            endif;?>
                          <a href="<?php the_permalink();?>" class="btn">See the Case Study</a>


                </div>


                </div>
              </div>
            </div>

        <?php endwhile; wp_reset_postdata();?>



        <div class="row mt-5">

          <div class="col-sm-11 col-12 mx-auto pl-0 pr-0">
            <?php get_template_part('partials/single-project-ajax');?>



          </div>

        </div>
        </div>

  </section>


    </main>

    <?php get_template_part('templates/footer'); ?>
