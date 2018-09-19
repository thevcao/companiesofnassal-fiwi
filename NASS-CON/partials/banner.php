<?php $maintemplate = get_template_directory_uri(); ?>


<section class="banner">
  <div class="bg-img">
    <?php if (is_singular('post')): ?>
    <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'banner' ); $url = $thumb['0']; ?>
    <?php if( has_post_thumbnail()): echo '<img src="' . $url . '"/>'; endif;?>
    <?php elseif(get_field('bg_image')):?>
    <img src="<?php echo get_field('bg_image')['sizes']['banner'];?>">
    <?php endif;?>
  </div>
  <div class="container">


    <div class="row">
      <div class="<?php if(get_field('offset')): echo get_field('offset'); else: echo 'col-lg-11 offset-lg-1 pl-lg-0' ; endif;?>">
          <?php if(!is_search() && !get_field('disable_breadcrumb')){?>


          <ul class="breadcrumbs">
            <li><a href="<?php echo get_site_url();?>"><?php echo get_bloginfo( 'name' );?></a></li>
            <?php if (is_singular('post')):
            $postcat = get_the_category( $post->ID );
            ?>
            <li><a href="/category/<?php $var = sanitize_title_for_query( esc_html( $postcat[0]->name ) ); echo esc_attr( $var);;?>"><?php echo esc_html( $postcat[0]->name );?></a></li>
            <?php endif;?>
            <?php if (is_singular('portfolio')):
            ?>
            <li><a href="/projects">Projects</a></li>
            <?php endif;?>
            <?php if (is_singular('services')):
            ?>
            <li><a href="/projects">Projects</a></li>
            <?php endif;?>


          <?php if (is_category()):?>

            <li><a href="#"><?php echo single_cat_title();?></a></li>

            <?php else:?>
            <li><a href="#"><?php echo get_the_title();?></a></li>

            <?php endif;?>
          </ul>


          <?php } ?>


            <?php if(is_search()){?>
            <?php
            $s=get_search_query();
            echo '<h1 class="search-title"><span>Search Results for: </span>' . get_query_var('s') . '</h1>';?>


            <?php } elseif (is_singular('post')){ ?>

            <h1><?php echo get_the_title();?></h1>
            <h6><?php echo get_the_date();?></h6>

            <?php } elseif (is_category()) {?>
            <h1><?php echo single_cat_title();?></h1>

            <?php } else {?>


                <?php

                            if(get_field('override_page_title')):

                $type = get_field('header_type');

                endif;

                if($type == 'standard'){ ?>





            <h1><?php echo get_the_title();?></h1>
            <?php
                if(get_field('title')):
                echo '<h5>' . get_field('title') .'</h5>';
                endif;?>

            <?php } elseif ($type == 'intro') { ?>


                <p class="uppercase"><?php the_field('intro_lead');?></p>
                <p class="lead"><?php the_field('header_content');?></p>


            <?php } else { ?>
            <h1><?php echo get_the_title();?></h1>
            <?php
                if(get_field('title')):
                echo '<h5>' . get_field('title') .'</h5>';
                endif;?>

        <?php } }?>

        </div>

      </div>
  </div>


</section>
