/**
A headless element for updating the title of a webpage declaratively, possibly
automatically, using Polymer bindings. Example:

    <page-title base-title="zacharytamas" page-title="Home"></page-title>

@group utility
@element page-title
@demo demo/page-title.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer';

export class PageTitle extends PolymerElement {
  static get is() {return 'page-title'}
  static get properties() {
    return {
      /**
       * The base title of your webpage which never changes. Possibly the
       * name of your application. Optional.
       *
       * @type String
       * @default ''
       */
      baseTitle: {
        type: String,
        value: ''
      },

      /**
       * The divider to be used between your base title and title, if a
       * base title is supplied. Optional.
       *
       * @type String
       * @default ' - '
       */
      divider: {
        type: String,
        value: ' - '
      },

      /**
       * The current title of your webpage.
       *
       * @type String
       */
      pageTitle: {
        type: String
      },

      /**
       * The direction your base title and title should be shown.
       * Defaults to `standard`. Can be one of these values:
       *
       *  | Value | Meaning |
       *  | standard | `baseTitle` comes first. |
       *  | reversed | `pageTitle` comes first. |
       *
       * @type String
       * @default 'standard'
       */
      direction: {
        type: String,
        value: 'standard'
      },

      /**
       * The current title as computed by the element.
       */
      computedTitle: {
        type: String,
        readOnly: true,
        notify: true
      }
    }
  }

  static get observers() {
    return [
      '_updatePageTitle(baseTitle, divider, pageTitle, direction)'
    ]
  }

  _updatePageTitle(baseTitle, divider, pageTitle, direction) {
    var pieces = [];

    if (pageTitle) {
      pieces.push(pageTitle);
    }

    if (direction == 'standard') {
      if (baseTitle) {
        pieces.unshift(baseTitle)
      }
    } else if (direction == 'reversed') {
      if (baseTitle) {
        pieces.push(baseTitle)
      }
    } else {
      console.warn("page-title - Did not recognize `direction` property.");
      return;
    }

    document.title = pieces.join(divider);
    this._setComputedTitle(document.title);
  }
}

window.customElements.define(PageTitle.is, PageTitle);
