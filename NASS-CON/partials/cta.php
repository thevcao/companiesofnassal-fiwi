<?php ?>

    <section class="cta <?php if(!get_field('conclusion')): echo 'mt-lg-5 mt-3'; endif;?>">

      <div class="row">
        <div class="col-lg-3 offset-xl-1">
          <a href="/contact-us">
            <div class="cta-btn">
            <h5>Let's Work. <i class="fa fa-arrow-right"></i></h5>
            <p>Contact us today!</p>
          </div></a>
        </div>
      </div>
      <div class="bg-image">
        <div class="row fill-height">


          <div class="col-xl-8 col-lg-9 offset-xl-3 offset-lg-2 mr-auto pl-0 pr-0 fill-height">
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
                <?php if( has_post_thumbnail()): echo '<img class="next-img" src="' . $url . '" alt="' . get_the_title() . '">'; endif;?>

            <div class="over">
              <a href="<?php the_permalink();?>"><span>Next Project</span> <?php echo get_the_title();?></a>
            </div>
            <?php endwhile; ?>



          </div>
        </div>
      </div>
    </section>
