<?php $maintemplate = get_template_directory_uri(); ?>


<section class="card-content <?php echo get_sub_field('brand');?>">
    <div class="full-image">
      <div class="row fill-height">
          <div class="col-md-7 ml-auto fill-height">
            <div class="bg-image">
              <?php
              $type = get_sub_field('media_type');


              if($type == 'video'):?>

              <video src="<?php echo get_sub_field('video');?>" autoplay playsinline muted loop></video>

              <?php else:?>

              <img src="<?php echo get_sub_field('image')['sizes']['large'];?>" alt="<?php echo get_sub_field('image')['title'];?>">
              <div class="img-attr"><p><?php echo mb_strimwidth(get_sub_field('image')['caption'], 0, 250, '...');?></p></div>

              <?php endif;?>

            </div>



          </div>

        </div>
      </div>

    <div class="container">
      <div class="row">

        <?php if(is_front_page()):?>
        <div class="col-md-7 p-sm-down-0">
          <div class="card pl-md-0">

            <h3><?php echo get_sub_field('title');?></h3>

            <?php the_sub_field('content');?>
            <?php if(get_sub_field('link')):
            $link = get_sub_field('link');
            $label = get_sub_field('label');
            echo '<a href="' . $link . '" class="btn right">' . $label . '</a>';
            endif;

            ?>



          </div>
        </div>
        <?php else:?>
        <div class="col-md-6 offset-xl-1 pl-lg-0 pl-0 pr-0">
          <div class="card">

            <h3><?php echo get_sub_field('title');?></h3>

            <?php the_sub_field('content');?>


            <?php if(get_sub_field('link')):
            $link = get_sub_field('link');
            $label = get_sub_field('label');
            echo '<a href="' . $link . '" class="btn right">' . $label . '</a>';
            endif;

            ?>

          </div>
        </div>
        <?php endif;?>


      </div>

      </div>

</section>

<?php
if(get_sub_field('gallery')):
$images = get_sub_field('gallery');
echo '<section class="card-gallery"><div class="container mt-1 mb-1 mobile-edge"><div class="row offset-xl-1 col-md-11 col-12 mobile-edge"><div class="row card-gallery">';
foreach( $images as $image):
echo '<div class="col-lg-2 col-sm-3 col-12 mobile-edge"><a class="section-gallery" href="' . $image['sizes']['banner'] . '" title="' . $image['caption'] . '"><img src="' . $image['sizes']['medium'] . '" alt="' . $image['title'] . '"></a></div>';
endforeach;
echo "</div></div></div></div></section>";
?>

<?php endif;?>
