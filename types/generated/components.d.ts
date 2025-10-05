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
    images: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['slider', 'grid']> &
      Schema.Attribute.DefaultTo<'slider'>;
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

export interface PageFooter extends Struct.ComponentSchema {
  collectionName: 'components_page_footers';
  info: {
    description: 'Page footer component';
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.String;
  };
}

export interface PageGroup extends Struct.ComponentSchema {
  collectionName: 'components_page_groups';
  info: {
    description: 'A group containing content and sections';
    displayName: 'Group';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images'>;
    content: Schema.Attribute.Relation<'oneToMany', 'api::content.content'>;
    sections: Schema.Attribute.Relation<'oneToMany', 'api::section.section'>;
  };
}

export interface PageRow extends Struct.ComponentSchema {
  collectionName: 'components_page_rows';
  info: {
    description: 'Row containing multiple groups';
    displayName: 'Row';
  };
  attributes: {
    groups: Schema.Attribute.Component<'page.group', true>;
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
      'page.footer': PageFooter;
      'page.group': PageGroup;
      'page.row': PageRow;
      'teaser.teaser': TeaserTeaser;
      'triple-tease.triple-tease': TripleTeaseTripleTease;
    }
  }
}
