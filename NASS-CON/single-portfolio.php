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
 <?php if(!get_field('case_study')):?>

    <main class="standard">

      <?php get_template_part('partials/banner');?>
      <section class="project-hero">

        <div class="swiper-container project-slider">
          <div class="swiper-wrapper">



          <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'banner' ); $url = $thumb['0']; ?>
            <?php if( has_post_thumbnail()): echo '<div class="swiper-slide"><img class="hero-img" src="' . $url . '"></div>'; endif;?>

                <?php if(get_field('gallery_2')):?>
                <?php $images = get_field('gallery_2');

                    foreach($images as $image):


                    echo '<div class="swiper-slide"><img class="hero-img"  title="' . $image['title'] . '" alt="' . $image['description'] . '" src="' . $image['sizes']['banner'] . '"></div>';

                    endforeach;

                  ?>
                <?php endif;?>



                </div>
                <?php if(get_field('gallery_2')):?>
                 <div class="swiper-pagination"></div>
                <?php endif;?>
            </div>

      </section>
      <section class="project-details <?php if(!get_field('gallery_2')):?>mt-md-5 mt-3<?php endif;?>">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 offset-lg-1 order-lg-1 order-2 project-stats">
              <div class="row">
                <div class="col-lg-3">
                  <p class="lead mb-1"><b>Client</b></p>
                  <p>
                    <?php the_field('client');?>
                  </p>

                </div>
                <div class="col-lg-3">
                  <p class="lead mb-1"><b>Project Type</b></p>
                  <p>
                    <?php $type = get_field('project_type');?>
                    <a href="/capabilities/<?php
                    $var = sanitize_title_for_query( get_the_title($type->ID) ); echo esc_attr( $var);?>
                    "><?php echo get_the_title($type->ID);?>
                    </a>
                  </p>

                </div>
                <div class="col-lg-4">
                  <p class="lead mb-1"><b>Project Completion</b></p>
                  <p>
                    <?php if(get_field('project_completion')): the_field('project_completion'); else: echo 'In Progress'; endif;?>
                  </p>

                </div>

              </div>
              <hr>
            </div>

            <div class="col-lg-4 ml-auto order-lg-2 order-1">
              <ul class="socials shares">
                <li>Share:</li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/home?status=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://plus.google.com/share?url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-google-plus"></i></a></li>
                <li>
                  <button class="toggle share-toggle tooltipped tooltipped-no-delay tooltipped-e" aria-label="Click to Copy URL" data-clipboard-text="<?php the_permalink();?>">
                  <?php include get_template_directory() . '/dist/img/share.svg';?>
                  </button>
                </li>

              </ul>
            </div>
          </div>
          <div class="row">

            <div class="col-lg-6 offset-lg-1 mb-3">
              <div class="lead">
                <?php the_field('excerpt');?>
              </div>
            </div>

          </div>

          <?php if(get_field('gallery_1')):?>
            <div class="row">
              <div class="col-lg-9 offset-lg-1 pl-lg-0 pr-lg-0">
                <div class="row gallery-1">

                  <?php $images = get_field('gallery_1');

                $i = 0; foreach($images as $image):

                echo '<div class="col-md"><a title="' . $image['title'] . '" class="gallery-popup" href="' . $image['url'] . '"><img title="' . $image['title'] . '" alt="' . $image['description'] . '" src="' . $image['sizes']['large'] . '"></a></div>';

                endforeach;

              ?>
                </div>
              </div>
            </div>
            <?php endif;?>
          <div class="row">

            <div class="col-lg-8 offset-lg-1 mb-3">
              <div class="textarea">
                <?php the_field('summary');?>
              </div>
            </div>

          </div>

        </div>



      </section>
    </main>


<?php else:?>


    <main>
      <section class="project-hero">
        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'banner' ); $url = $thumb['0']; ?>
          <?php if( has_post_thumbnail()): echo '<img class="hero-img" src="' . $url . '">'; endif;?>
      </section>

      <section class="project-details">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 offset-xl-1">
              <h1><?php echo get_the_title();?></h1>

            </div>

          </div>
          <div class="row">
            <div class="col-xl-6 offset-xl-1 col-lg-7 order-lg-1 order-2 mb-3">
              <div class="lead">
                <?php the_field('excerpt');?>
              </div>
            </div>
            <div class="col-lg-4 ml-auto order-lg-2 order-1">
              <ul class="socials shares">
                <li>Share:</li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/home?status=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="https://plus.google.com/share?url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-google-plus"></i></a></li>
                <li>
                  <button class="toggle share-toggle tooltipped tooltipped-no-delay tooltipped-e" aria-label="Click to Copy URL" data-clipboard-text="<?php the_permalink();?>">
                  <?php include get_template_directory() . '/dist/img/share.svg';?>
                  </button>
                </li>

              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 offset-xl-1 col-lg-9 project-stats">
              <div class="row">
                <div class="col-lg-3">
                  <h6 class="mb-1"><b>Client</b></h6>
                  <p>
                    <?php the_field('client');?>
                  </p>

                </div>
                <div class="col-lg-3">
                  <h6 class="mb-1"><b>Project Type</b></h6>
                  <p>
                    <?php $type = get_field('project_type');?>
                    <a href="/capabilities/<?php
                    $var = sanitize_title_for_query( get_the_title($type->ID) ); echo esc_attr( $var);?>
                    "><?php echo get_the_title($type->ID);?>
                    </a>
                  </p>

                </div>
                <div class="col-lg-4">
                  <h6 class="mb-1"><b>Project Completion</b></h6>
                  <p>
                    <?php if(get_field('project_completion')): the_field('project_completion'); else: echo 'In Progress'; endif;?>
                  </p>

                </div>

              </div>
              <hr>
            </div>
          </div>
        </div>



      </section>
      <section class="project-info">
        <div class="container">
          <div class="row case-content">
          <div class="col-xl-8 offset-xl-1 col-lg-9">

            <?php if(get_field('introduction')):?>
              <h3>Introduction</h3>
              <?php the_field('introduction'); endif;?>

            <?php if(get_field('what_we_did')):?>

              <h3><?php if(get_field('project_completion')): echo 'What we did.'; else: echo 'What were doing.'; endif;?></h3>
              <?php the_field('what_we_did'); endif;?>

            </div>
          </div>
          <?php if(get_field('gallery_1')):?>
            <div class="row">
              <div class="col-xl-10 offset-xl-1 col-lg-12 pl-lg-0 pr-lg-0">
                <div class="row gallery-1 <?php if(!get_field('how_we_did_it')): echo 'mt-0'; endif;?>">

                  <?php $images = get_field('gallery_1');

                foreach($images as $image):
                if($image['caption'] == ''):
                $desc = get_the_title();
                else:
                $desc = $image['caption'];
                endif;


                echo '<div class="col-md"><a title="' . $desc . '" class="gallery-popup" href="' . $image['url'] . '"><img title="' . $image['caption'] . '" alt="' . $image['description'] . '" src="' . $image['sizes']['large'] . '"></a></div>';

                endforeach;

              ?>
                </div>
              </div>
            </div>
            <?php endif;?>

          <div class="row case-content <?php if(!get_field('gallery_2')): echo 'mb-3'; endif;?>">
              <div class="col-xl-8 offset-xl-1 col-lg-9">
              <?php if(get_field('how_we_did_it')):?>

              <h3><?php if(get_field('project_completion')): echo 'How we did it.'; else: echo "How we're doing it."; endif;?></h3>

                <div class="editor">
                <?php the_field('how_we_did_it'); endif;?>
                </div>
            </div>
          </div>


        </div>


        <?php if(get_field('gallery_2')):?>
          <div class="row">
            <div class="col-12 dragscroll">
              <div class="row gallery-2 <?php if(!get_field('conclusion')): echo 'mb-3'; endif;?>">



                <?php $images = get_field('gallery_2');

                foreach($images as $image):
                if($image['caption'] == ''):
                $desc = get_the_title();
                else:
                $desc = $image['caption'];
                endif;

                echo '<div class="single-image nochilddrag"><a title="' . $desc . '" class="gallery-popup nochilddrag" href="' . $image['url'] . '"><img title="' . $image['title'] . '" alt="' . $image['description'] . '" src="' . $image['sizes']['large'] . '"></a></div>';

                endforeach;

              ?>


              </div>
            </div>
          </div>
          <?php endif;?>


      </section>



    </main>


  <?php if(get_field('conclusion')):?>

    <section class="conclusion">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 offset-xl-1 col-lg-9">
            <h3>Conclusion.</h3>


              <?php the_field('conclusion');?>

          </div>
        </div>

      </div>


    </section>
          <?php endif;?>

    <section class="cta <?php if(!get_field('conclusion')): echo 'mt-lg-5 mt-3'; endif;?>">

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

                $id = get_the_ID();

                $args = array(

                'posts_per_page' => 1,
//                'order'   => 'RAND',
//                'offset' => 1,
                'post_type' => 'portfolio',
                'post__not_in' => array($id),
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

    <?php endif;?>
    <?php get_template_part('templates/footer'); ?>
