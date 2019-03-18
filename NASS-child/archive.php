<?php
/**
 * Template Name: Posts
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Twenty Fourteen
 * already has tag.php for Tag archives, category.php for Category archives,
 * and author.php for Author archives.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Smores
 * @since Smores 2.0
 */
?>

<?php get_template_part('templates/header'); ?>

<main>
  <?php get_template_part('partials/banner');?>

  <div class="container news-posts">

    <div class="">
      <div class="row">
        <div class="col offset-lg-1 pl-lg-0">
          <?php if(get_current_blog_id() == 4):?>

          <div class="row">
            <div class="col-md-4 mx-md-0 col-10 mx-auto">

              <div class="dropdown mb-5">
                <a href="#" data-toggle="all">View by Category</a>

                <?php $taxonomy     = 'category';
                        $show_count   = false;
                        $pad_counts   = false;
                        $hierarchical = true;
                        $title        = '';

                        $args = array(
                          'taxonomy'     => $taxonomy,
                          'orderby'      => $orderby,
                          'show_empty'   => $show_count,
                          'pad_counts'   => $pad_counts,
                          'hierarchical' => $hierarchical,
                          'title_li'     => $title
                        );
                        ?>

                <ul class="menu">
                  <li><a href="#" data-toggle="all">All</a></li>
                  <?php wp_list_categories( $args ); ?>
                </ul>


              </div>

            </div>

          </div>
          <?php else:?>

          <?php get_search_form();?>
          <?php endif;?>


        </div>

      </div>


    </div>


    <?php if(get_current_blog_id() == 4):?>
    <div class="nfusion-posts-row">
      <div class="row">

        <?php else:?>

        <div class="posts-row">

          <?php endif;?>

          <?php if ( have_posts() ) : while (have_posts()) : the_post(); ?>


          <?php if(get_current_blog_id() == 4):?>
          <div class="col-xl-4 col-sm-6 single-card filterable<?php $categorys = get_the_category(); foreach ($categorys as $category): echo ' ' . $category->slug; endforeach;?>">

            <div class="card">

              <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
              <?php if( has_post_thumbnail()): echo '<a href="' . get_the_permalink() . '"><img src="' . $url . '" alt="' . get_the_title() . '"></a>';

                    else:
                    echo '<img src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                    endif;?>


              <?php

                  $excerptTitle = mb_strimwidth(get_the_title(), 0, 45, '...');?>

              <h4 title="<?php echo get_the_title();?>" class="gradient"><a href="<?php the_permalink();?>">
                  <?php echo $excerptTitle;?></a></h4>

              <h6>Posted in: <?php $categorys = get_the_category(); foreach ($categorys as $category): echo '<a href="' . get_site_url() . '/category/' . $category->slug .'"><span> ' . $category->cat_name . '</span></a>'; endforeach;?></a></h6>

              <?php

                  $excerpt = mb_strimwidth(get_the_excerpt(), 0, 70, '...');
                  echo '<p class="mb-0">' . $excerpt. '</p>';?>
              <a href="<?php the_permalink();?>" class="btn">Read More</a>
            </div>

          </div>


          <?php else:?>

          <div class="row featured-post mt-5 filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">
            <div class="col-lg-11 mx-auto">
              <div class="row align-items-center">
                <div class="col-md-8 pr-md-0">
                  <a href="<?php the_permalink();?>" class="">
                    <div class="card">

                      <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' ); $url = $thumb['0']; ?>
                      <?php if( has_post_thumbnail()): echo '<img src="' . $url . '" alt="' . get_the_title() . '">';
                                else:
                                echo '<img src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                                  endif;?>

                    </div>
                  </a>
                </div>
                <div class="col-md-4 pl-md-5 col-11 mx-auto mt-md-0 mt-2 mb-md-0 mb-3">

                  <h5><a href="<?php the_permalink();?>" class="">
                      <?php echo mb_strimwidth(get_the_title(), 0, 80, '...');?></a></h5>
                  <h6><a href="<?php echo get_site_url();?>/category/<?php
                            $category = get_the_category();
                            echo $category[1]->slug;
                            ?>">Posted in:
                      <?php
                            $category = get_the_category();
                            echo $category[1]->cat_name;
                            ?></a></h6>
                  <?php echo '<p>' . mb_strimwidth(get_the_excerpt(), 0, 70, '...') .'</p>';?>

                  <a href="<?php the_permalink();?>" class="btn">Read More</a>


                </div>


              </div>
            </div>
          </div>


          <?php endif;?>


          <?php endwhile; endif;?>


          <?php if(get_current_blog_id() == 4):?>

        </div>
      </div>

      <?php else:?>

    </div>

    <?php endif;?>


  </div>
  <section class="pagination mb-5">
    <div class="container">

      <div class="row">
        <div class="col-auto mr-auto">
          <div class="nav-next alignright">
            <?php previous_posts_link( '<i class="fa fa-angle-left"></i> Newer posts' ); ?>
          </div>

        </div>
        <div class="col-auto ml-auto">

          <div class="nav-previous alignleft">
            <?php next_posts_link( 'Older posts <i class="fa fa-angle-right"></i>' ); ?>
          </div>

        </div>

      </div>

    </div>


  </section>


  <?php if(get_current_blog_id() == 4):?>

  <section class="newsletter" id="subscribe">

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


<?php get_template_part('templates/footer'); ?>
