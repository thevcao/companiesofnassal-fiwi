<?php $maintemplate = get_template_directory_uri(); ?>


<section class="about-cta">
  <div class="container">

    <div class="row">
        <div class="col-md-8 offset-md-1 pl-md-0 mb-2">
          <div class="card-sm">

            <h3 class=""><?php the_sub_field('title');?></h3>
            <?php the_sub_field('content');?>
          </div>

        </div>
    </div>
    <div class="row">

      <?php

      $sitesObj = get_sites($args);
      $sites = object_to_array($sitesObj);
      foreach ($sites as $site):

//      echo '<p>' . $site['blog_id'] . '</p>';
      if($site['blog_id'] != 1){
      switch_to_blog($site['blog_id']);
      $name = sanitize_title_for_query(get_bloginfo( 'name'));
      $site_name = esc_attr( $name );

      ?>
        <div class="col-md-4 mb-2">
          <div class="card <?php echo $site_name;?>">
            <a href="<?php echo get_site_url(); ?>"><img src="<?php echo $maintemplate; ?>/dist/img/about-cta-<?php echo $site_name;?>-logo.svg"></a>
            <h6><?php echo get_bloginfo( 'description');?></h6>
            <p class="mb-2"><?php the_field('overview', 'options');?></p>

            <ul class="services">


            <?php

                $args = array(

                'posts_per_page' => -1,
                'orderby' => 'title' ,
                'order'   => 'ASC',
                'post_type' => 'services');

            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post(); ?>

            <li><a href="<?php the_permalink();?>"><?php echo get_the_title();?></a></li>


            <?php endwhile; wp_reset_postdata();?>
            </ul>

            <div class="button-wrapper">
            <a href="<?php echo get_site_url(); ?>" class="btn">Discover <?php echo get_bloginfo( 'name');?></a>

            </div>

          </div>
        </div>

      <?php  } endforeach;?>
    </div>
  </div>
</section>
