<?php


//echo $activeFilter;
//echo $_COOKIE[$activeFilter];
?>

    <div id="projects-load">


    <?php


    if($_COOKIE['no_posts'] == null){

      $no_posts = 9;

    } else {

      $no_posts = $_COOKIE['no_posts'];

    }

    $id = get_the_ID();

    //              echo $id->ID;

    if(get_current_blog_id() == 2):

    $order = 'meta_key';

    else:

    $order = 'title';

    endif;

    $args = array(

        'posts_per_page' => $no_posts,
        'orderby' => $order,
        'order'   => 'ASC',
        'post_type' => 'portfolio',
        'meta_query' => array(
              'relation' => 'AND',
              array(
                array(
                    'key'     => 'case_study',
                    'value'   => 'yes',
                    'compare' => 'NOT LIKE',
                ),
                array(
                    'key'     => 'project_type',
                    'value'   => $id,
                    'compare' => 'LIKE',
                )
              )
          ),
        'meta_key'       => 'project_completion',
        'orderby'        => 'meta_value_num',
        'order'   => 'DESC',

      );
      $all = array(

          'posts_per_page' => -1,
          'orderby' => $order,
          'order'   => 'ASC',
          'post_type' => 'portfolio',
          'meta_query' => array(
                'relation' => 'AND',
                array(
                  array(
                      'key'     => 'case_study',
                      'value'   => 'yes',
                      'compare' => 'NOT LIKE',
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
    $allCount = new WP_Query( $all );

//    setcookie($cookie_name, $cookie_value);
    if ( $loop->have_posts() ) :?>

    <div class="row projects">

      <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>


      <div class="col-md-4 single-card filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">

            <div class="card">

              <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
               <?php if( has_post_thumbnail()): echo '<a href="' . get_the_permalink() . '"><img src="' . $url . '" alt="' . get_the_title() . '"></a>';
                else:
                echo '<img src="' . get_template_directory_uri() . '/dist/img/default-blog-' . sanitize_title_for_query(get_bloginfo( 'name')) . '.jpg">';
                endif;?>

              <h4 title="<?php echo get_the_title();?>"><a href="<?php the_permalink();?>"><?php echo get_the_title();?></a></h4>
              <h6><a href="<?php
                  if(get_current_blog_id() == 4):
                  echo '/services/';
                  else:
                  echo '/capabilities/';
                  endif;
                  $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID)); echo esc_attr( $var);?>
                  "><?php echo get_the_title(get_field('project_type')->ID);?>
                  </a></h6>
              <?php if($type == 'portfolio'):
              $excerpt = mb_strimwidth(get_field('excerpt'), 0, 70, '...');
              echo '<p class="mb-0">' . $excerpt. '</p>';
              else:
              echo '<p class="mb-0">' . get_the_excerpt() . '</p>';
              endif;?>
                <a href="<?php the_permalink();?>" class="btn">Project Details</a>
            </div>

      </div>
    <?php endwhile;?>

    </div>
    <div class="row mt-4">
    <div class="col-md-auto mx-auto">
    <?php
    $count = $allCount->post_count;
    if(($count > $_COOKIE['no_posts'])):?>
    <a href="#" class="btn-standard load-more">Load More</a>
    <?php else:?>

    <h6 class="text-center all-projects">Displaying all <span><?php echo $count;?> Projects</span><?php if($_COOKIE[$activeFilter] != null):?> for: <span><?php echo str_replace('-', ' ', $_COOKIE[$activeFilter]);?></span><?php endif;?></h6>

    <?php endif;?>
    </div>

    </div>

    </div>

    <?php endif;?>
