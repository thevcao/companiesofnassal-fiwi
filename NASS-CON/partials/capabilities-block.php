<?php $maintemplate = get_template_directory_uri(); ?>


  <section class="sub-sites <?php get_sub_field('brand');?>">
    <div class="full-image">
      <div class="row fill-height">
        <div class="col-md-7 ml-auto fill-height">



                <div class="bg-image">
                  <?php
                  $type = get_sub_field('slide_type');


                  if($type == 'video'):?>

                  <video src="<?php echo get_sub_field('video');?>" autoplay playsinline muted loop></video>

                  <?php else:?>

                  <img src="<?php echo get_sub_field('image')['sizes']['large'];?>">
                  <div class="img-attr"><p><?php echo get_sub_field('image')['caption'];?></p></div>

                  <?php endif;?>

                </div>





            </div>

        </div>
      </div>
    </div>
      <div class="container">
        <div class="row">
        <div class="col-md-7 p-sm-down-0">
          <div class="card pl-md-0 network-site">
            <h3><?php the_sub_field('title');?></h3>
            <p class="lead"><?php the_field('overview', 'options');?></p>

            <ul class="services">


            <?php $args = array(

                'posts_per_page' => -1,
                'orderby' => 'title' ,
                'order'   => 'ASC',
                'post_type' => 'services');

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post(); ?>

            <li><a href="<?php the_permalink();?>"><?php echo get_the_title();?></a></li>


            <?php endwhile; wp_reset_postdata();?>
            </ul>
            <?php if(get_current_blog_id() == 4):
            echo'<a href="/services" class="btn right">Explore Our Services</a>';
            else:
            echo'<a href="/capabilities" class="btn right">Explore Our Capabilities</a>';
            endif;
            ?>

          </div>
        </div>

        </div>


      </div>

  </section>
