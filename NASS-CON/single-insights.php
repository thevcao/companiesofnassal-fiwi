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

<main>

  <section class="post-header">
    <div class="container">
      <div class="row">
        <div class="col-md-11 offset-xl-1 pl-md-0">
          <ul class="breadcrumbs">
            <li>
              <a href="<?php echo get_site_url();?>">
                <?php echo get_bloginfo( 'name' );?>
              </a>
            </li>
            <li>
              <a href="/category/<?php $category = get_the_category(); if($category[1]->slug != null): echo $category[1]->slug; else: echo $category[0]->slug; endif;?>">
                <?php $category = get_the_category(); if($category[1]->slug != null): echo $category[1]->cat_name; else: echo $category[0]->cat_name; endif;?></a>
            </li>
          </ul>
          <h1>
            <?php echo get_the_title();?>
          </h1>
          <h6 class="comma">Posted in:
            <?php $categorys = get_the_category(); foreach ($categorys as $category): echo '<a href="' . get_site_url() . '/category/' . $category->slug .'"><span> ' . $category->cat_name . '</span></a>'; endforeach;?></a></h6>


        </div>
      </div>
      <div class="row">
        <div class="col-md-5 offset-xl-1 pl-md-0">
          <p class="lead">
            <?php echo get_the_excerpt();?>
          </p>
        </div>
        <div class="col-md-5 ml-auto">
          <ul class="socials shares">
            <li>Share:</li>
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://twitter.com/home?status=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="https://plus.google.com/share?url=<?php the_permalink();?>" class="pop-link" target="_blank"><i class="fa fa-google-plus"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'banner' ); $url = $thumb['0']; ?>
  <?php if( has_post_thumbnail()): ?>
  <section class="nsights-banner-image">

    <img src="<?php echo $url;?>" alt="<?php echo get_the_title();?>">

  </section>
  <?php endif;?>


  <section class="wp-post gutenberg">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-12 mx-auto editor">


          <?php // check if the flexible content field has rows of data






        if ( have_posts() ) : while (have_posts()) : the_post(); the_content();

        endwhile; endif;

//      if( have_rows('section') ):
//
//           // loop through the rows of data
//          while ( have_rows('section') ) : the_row();
//
//              if( get_row_layout() == 'banner_image' ):
//
//                  include( locate_template( 'partials/nsights-banner-image.php', false, false ) );
//
//              endif;
//
//              if( get_row_layout() == 'content_block' ):
//
//                  include( locate_template( 'partials/nsights-content-block.php', false, false ) );
//
//              endif;
//
//              if( get_row_layout() == 'featured_media' ):
//
//                  include( locate_template( 'partials/nsights-featured-media.php', false, false ) );
//
//              endif;
//
//              if( get_row_layout() == 'quote' ):
//
//                  include( locate_template( 'partials/nsights-quote.php', false, false ) );
//
//              endif;
//
//              if( get_row_layout() == '50_image' ):
//
//                  include( locate_template( 'partials/nsights-half_image.php', false, false ) );
//
//              endif;
//
//          endwhile;
//
//      endif;

      ?>


        </div>
      </div>
    </div>


  </section>

  <?php if(get_field('pr_snippet') || get_field('media_contact')):?>

  <section class="snippet">
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-12 mx-auto editor">

          <?php if(get_field('include_pr')): the_field('pr_snippet'); endif;?>
          <?php if(get_field('include_media')): echo '<div class="media">'; the_field('media_contact'); echo '</div>'; endif;?>

        </div>
      </div>
    </div>
  </section>

  <?php endif;?>

  <?php if(get_field('author')): $author = get_field('author');?>
  <section class="author mt-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-12 mx-auto author-meta">

          <div class="row align-items-center">
            <div class="col-auto pr-sm-0">
              <img class="author-avatar" src="<?php echo get_field('headshot', $author->ID)['sizes']['medium'];?>">
            </div>
            <div class="col">
              <h6 class="mb-2">About the Author</h6>

              <h5 class="mb-1">
                <?php echo get_the_title($author->ID);?>
              </h5>
              <h6 class="mt-0">
                <?php echo get_field('title', $author->ID);?>
              </h6>

            </div>

          </div>
          <div class="row">

            <div class="col-sm-12">


              <p class="small">
                <?php echo get_field('simple_bio', $author->ID);?>
              </p>
            </div>

          </div>


        </div>
      </div>
    </div>
  </section>

  <?php endif;?>
  <?php if(get_current_blog_id() == 4):?>

  <section class="newsletter">

    <div class="container">

      <div class="row align-items-center">
        <div class="col-md-6 offset-xl-1">
          <h6>Be the first to receive our industry insights!</h6>
          <h3>Subscribe Today</h3>


        </div>
        <div class="col-md">

          <?php echo do_shortcode('[gravityform id="2" title="false" description="false" ajax="true"]');?>


        </div>

      </div>

    </div>

  </section>

  <?php endif;?>
</main>

<?php get_template_part('partials/cta'); get_template_part('templates/footer'); ?>
