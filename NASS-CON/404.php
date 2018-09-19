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

  <?php get_template_part('templates/header');?>

    <main>
      <section class="banner">

        <div class="svg-paths" id="grid-path"></div>
        <div class="svg-paths" id="chisel-path"></div>
        <div class="svg-paths" id="circles-path"></div>
        <div class="svg-paths" id="icon-path"></div>
        <div class="svg-paths" id="text-path"></div>
        <div class="svg-paths hide" id="icon-fill">
          <?php include get_template_directory() . '/src/img/icon-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="chisel-fill">
          <?php include get_template_directory() . '/src/img/chisel-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="text-fill">
          <?php include get_template_directory() . '/src/img/text-fill.svg';?>

        </div>
        <div class="svg-paths hide" id="shapes">
          <?php include get_template_directory() . '/src/img/arrows.svg';?>

        </div>

      </section>

    </main>



    <?php get_template_part('templates/footer'); ?>
