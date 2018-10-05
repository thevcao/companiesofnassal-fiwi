<?php

$blogID = get_current_blog_id();
if($blogID  != 1):
$size = 'col-sm-11 col-12';
else:
$size = 'col-11';
endif;

?>


<?php if(get_field('clients')):?>

<section class="logos">


  <div class="container">
    <div class="row">
      <div class="col-md-8 <?php echo $size;?> mr-md-0 mx-md-0 mx-auto">

        <h3><?php the_field('title');?></h3>
            <?php the_field('content');?>
      </div>
      </div>
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <div class="row">
          <?php if(get_field('clients')): $logos = get_field('clients');

                foreach($logos as $logo):
                echo '<div class="col-lg-3 col-md-2 col-4 logo-wrapper"><img class="logo" src="' . $logo['sizes']['logo'] . '"></div>';
                endforeach; endif;
        ?>

        </div>

      </div>
    </div>
  </div>

</section>
<?php endif;?>
