<?php
global $post;
$activeFilter = $post_slug=$post->post_name;
//echo $activeFilter;
//echo $_COOKIE[$activeFilter];
?>

<div id="case-ajax" class="mb-5">


              <?php


              if($_COOKIE[$activeFilter] != null) {

              $id = get_page_by_path($_COOKIE[$activeFilter], '', 'services');

//              echo $id->ID;
                if(get_current_blog_id() == 2):

                $order = 'meta_key';

                else:

                $order = 'title';

                endif;
                $args = array(

                    'posts_per_page' => -1,
                    'orderby' => $order,
                    'order'   => 'DESC',
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
                                'value'   => $id->ID,
                              'compare' => 'LIKE',
                          )
                        )
                    ),
                  'meta_key'       => 'project_completion',
                  'orderby'        => 'meta_value_num',
                  'order'   => 'DESC',
                  );


              } else {

              $args = array(

                  'posts_per_page' => -1,
                  'orderby' => $order,
                  'order'   => 'DESC',
                  'post_type' => 'portfolio',
                  'meta_query' => array(
                      array(
                          'key'     => 'case_study',
                          'value'   => 'yes',
                          'compare' => 'LIKE',
                      )
                  ),
                  'meta_key'       => 'project_completion',
                  'orderby'        => 'meta_value_num',
                  'order'   => 'DESC',
                );

              }




              $loop = new WP_Query( $args );
//              $allCount = new WP_Query( $all );
//              $count = $allCount->post_count;
              while ( $loop->have_posts() ) : $loop->the_post();


              ?>

            <div class="row featured-post mt-5 filterable" data-src="<?php $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID) ); echo esc_attr( $var);?>">
              <div class="col-md-11 mx-auto">
                <div class="row align-items-center">
                <div class="col-md-8 pr-sm-0">
                  <a href="<?php the_permalink();?>"><div class="card">

                        <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); $url = $thumb['0']; ?>
                         <?php if( has_post_thumbnail()): echo '<img src="' . $url . '" alt="' . get_the_title() . '">'; endif;?>

                  </div></a>
                </div>
                <div class="col-md-4 pl-md-5 mx-md-0 col-sm-11 col-11 mx-auto mt-md-0 mt-5">

                  <h5><a href="<?php the_permalink();?>"><?php echo get_the_title();?></a></h5>
                  <h6><a href="<?php
                      if(get_current_blog_id() == 4):
                      echo '/services/';
                      else:
                      echo '/capabilities/';
                      endif;
                      $var = sanitize_title_for_query( get_the_title(get_field('project_type')->ID)); echo esc_attr( $var);?>
                      "><?php echo get_the_title(get_field('project_type')->ID);?>
                      </a></h6>

                          <?php echo '<p>' . mb_strimwidth(get_field('excerpt'), 0, 70, '...') .'</p>';?>
                          <a href="<?php the_permalink();?>" class="btn">See the Case Study</a>


                </div>


                </div>
              </div>
            </div>

        <?php endwhile; wp_reset_postdata();?>


</div>
