<?php

$type = get_sub_field('media_type');


?>



  <section class="nsights-featured-media">

          <div class="row">
            <div class="col-lg-8 mx-auto editor">


              <?php

              if($type == 'mp4'):
              ?>
              <div class="videojs-wrapper">
              <video
                  id="player-<?php
                  $var = sanitize_title_for_query( get_sub_field('video') ); echo esc_attr( $var);?>"
                  class="video-js"
                  controls
                  preload="auto"

                  <?php if(get_sub_field('video_poster')):
                  echo 'poster="' . get_sub_field('video_poster')['sizes']['large'] . '"';
                  endif;?>
                  data-setup='{}'>
                 <source src="<?php echo get_sub_field('video');?>" type="video/mp4"></source>
              </video>
            </div>
              <?php elseif($type == 'youtube' || $type == 'vimeo'):?>

                  <div class="videojs-wrapper">
                    <video
                        id="player-<?php
                        $var = sanitize_title_for_query( get_sub_field('video_id') ); echo esc_attr( $var);?>"
                        class="video-js"
                        controls
                        preload="auto"

                        <?php if(get_sub_field('video_poster')):
                        echo 'poster="' . get_sub_field('video_poster')['sizes']['large'] . '"';
                        endif;?>
                        data-setup='{"techOrder": ["<?php echo $type?>"], "sources": [{ "type": "video/<?php echo $type?>", "src": "<?php echo get_sub_field('video_id');?>"}]<?php if($type == 'youtube'): echo ', "youtube": { "modestbranding": 1}'; endif;?><?php if($type == 'vimeo'): echo ', "vimeo": {"color": "ffffff"}'; endif;?>}'
                        >
                    </video>
                  </div>



                <?php elseif($type == 'image'):?>

                <img src="<?php echo get_sub_field('image')['sizes']['large'];?>">

                <?php endif;?>




            </div>

          </div>


  </section>
