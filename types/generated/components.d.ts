import type { Schema, Struct } from '@strapi/strapi';

export interface ImageGalleryImageGallery extends Struct.ComponentSchema {
  collectionName: 'image_galleries';
  info: {
    displayName: 'ImageGallery';
    icon: 'images';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaLink: Schema.Attribute.String;
    images: Schema.Attribute.Component<'image.image', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ImageImage extends Struct.ComponentSchema {
  collectionName: 'images';
  info: {
    displayName: 'Image';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    file: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface TeaserTeaser extends Struct.ComponentSchema {
  collectionName: 'teasers';
  info: {
    displayName: 'Teaser';
    icon: 'star';
  };
  attributes: {
    copy: Schema.Attribute.Text;
    ctaLabel: Schema.Attribute.String;
    ctaLink: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['classic', 'modern', 'articleClassic', 'articleModern', 'text']
    > &
      Schema.Attribute.DefaultTo<'classic'>;
  };
}

export interface TripleTeaseTripleTease extends Struct.ComponentSchema {
  collectionName: 'triple_teases';
  info: {
    displayName: 'TripleTease';
    icon: 'columns';
  };
  attributes: {
    teasers: Schema.Attribute.Component<'teaser.teaser', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'image-gallery.image-gallery': ImageGalleryImageGallery;
      'image.image': ImageImage;
      'teaser.teaser': TeaserTeaser;
      'triple-tease.triple-tease': TripleTeaseTripleTease;
    }
  }
}
