/*
 * @file book-list-element.js
 *
 * @brief Book list element
 * @author David Suárez
 * @date Sun, 17 Feb 2019 15:26:01 +0100
 *
 * @license
 *
 * calibre-front: web front for calibre ebook manager.
 *
 * Copyright (C) 2019 <David Suárez <david.sephirot@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import moment from 'moment/src/moment.js';

import { LitElement, html } from 'lit-element';

import { html as htmltag } from '@polymer/polymer/lib/utils/html-tag.js';

import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js'; /* NOTE: needs web-animations-js polyfill */
import '@cwmr/iron-star-rating/iron-star-rating.js';

import '@vaadin/vaadin-grid/theme/material/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-filter.js';
import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';

import 'plastic-image/plastic-image.js';

import './tree-list-element.js'

import { connect } from "pwa-helpers/connect-mixin";
import { installMediaQueryWatcher } from "pwa-helpers/media-query";

import { SharedStyles } from "../shared-styles";
import { humanFileSize } from '../../util/util.js'

import { reduxStore } from '../../redux-store.js';
import { getAllBooks } from "../../actions/rest-data.js";

/*
 * Remove bottom scrollbar
 */
const $_themeDocumentContainer = htmltag`<dom-module id="vaadin-grid-custom-theme" theme-for="vaadin-grid">
  <template>
    <style>
        :host #table {
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_themeDocumentContainer.content);

export class BookListElement extends connect(reduxStore)(LitElement) {

    static get properties() {
        return {
            books: {
                type: Array,
                value: []
            }
        }
    }

    static get styles() {
        return [
            SharedStyles
        ];
    }

    render() {
        return html`
            <style>
                paper-card {
                    margin-bottom: 0.8em;
                    min-width: 300px;
                    max-width: 300px;
                }
                
                vaadin-grid {
                    height: 800px;
                }
                
                .book-detail {
                    display: flex;
                    font-size: 20px;
                }
                
                .book-detail img, plastic-image {
                    width: 200px;
                    height: 300px;
                    margin: 0 20px 20px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
                
                .book-detail p {
                    width: 100%;
                }
                
                .book-detail p span {
                    border-bottom: 1px solid gainsboro;
                    display: block;
                    margin-bottom: 0.6em;
                }
                
                @media (min-width: 460px) {
                    paper-listbox {
                        width: 15%;
                    }
                    
                    vaadin-grid {
                        width: 85%;         
                    }          
                }      
            </style>
            
            <vaadin-split-layout orientation="horizontal" id="content-splitter">
            
                <tree-list-element></tree-list-element>

                <vaadin-grid theme="row-stripes wrap-cell-content"
                             id="book-list-grid"
                             column-reordering-allowed
                             multi-sort
                             @active-item-changed="${this.booksGridActiveItemChanged}">
                    
                    <template class="row-details">
                        <div class="book-detail">
                          <paper-menu-button> 

                            <plastic-image preload
                                           fade sizing="contain"
                                           slot="dropdown-trigger"
                                           srcset="http://localhost:8080/book/image/[[item.id]] 150w, http://localhost:8080/book/image/[[item.id]] 150w 2.0x"
                                           placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAmElEQVQImWNmYGBgSExMzBATE7dSVFT8eO/evTcMDAwMjIFe5iYSIjybL136cunNW56FulIaEoJcfBdY5GWjvJ4/+SJhIcUhwavI5SbIxR+YvzRqH8unx7/Osf8VYpAVEWLgZuO8ljrfbwMDAwMD07u/j/ZYun5f9JfjSfGnHx9dGaCAJcBimwXjZ4Z+HllGn0XbXr+ASQAAi5UxQq88/fsAAAAASUVORK5CYII="></plastic-image>
                            <paper-listbox slot="dropdown-content">
                              <paper-item>Share</paper-item>
                              <paper-item>Settings</paper-item>
                              <paper-item>Help</paper-item>
                            </paper-listbox>
                          </paper-menu-button>
                          <p>
                            <span>[[item.title]]</span>
                            <small>[[item.comments]]</small>
                          </p>
                        </div>
                    </template>
                    
                    <vaadin-grid-column flex-grow="0" text-align="end" width="5%">
                        <template class="header">#</template>
                        <template>[[index]]</template>
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable width="45%">
                        <template class="header">
                            <vaadin-grid-sorter path="title"><iron-icon icon="sort"></vaadin-grid-sorter>
                            <vaadin-grid-filter path="title" value="{{title-filter-value}}">
                              <vaadin-text-field value="{{title-filter-value}}"
                                                 slot="filter"
                                                 focus-target label="Title"
                                                 style="max-width: 100%"
                                                 theme="small"></vaadin-text-field>
                            </vaadin-grid-filter>
                        </template>
                        <template>[[item.title]]</template>
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable width="15%">
                        <template class="header">
                            <vaadin-grid-sorter path="authors"><iron-icon icon="sort"></iron-icon></vaadin-grid-sorter>
                            <vaadin-grid-filter path="authors" value="{{authors-filter-value}}">
                              <vaadin-text-field value="{{authors-filter-value}}"
                                                 slot="filter"
                                                 focus-target label="Author(s)"
                                                 style="max-width: 100%"
                                                 theme="small"></vaadin-text-field>
                            </vaadin-grid-filter>
                        </template>
                        <template>[[item.authors]]</template>
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable width="10%">
                        <template class="header">
                            <vaadin-grid-sorter path="rating">Rating</vaadin-grid-sorter>
                        </template>
                        <template><iron-star-rating value="[[item.rating]]" readonly></iron-star-rating></template>
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable text-align="end" width="5%">
                        <template class="header">
                            <vaadin-grid-sorter path="format">Format</vaadin-grid-sorter>
                        </template>
                        <template>[[item.format]]</template>
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable text-align="end" width="5%">
                        <template class="header">
                            <vaadin-grid-sorter path="size">Size</vaadin-grid-sorter>
                        </template>
                        <!--<template>[[item.size]]</template>-->
                    </vaadin-grid-column>
                    
                    <vaadin-grid-column resizable width="10%">
                        <template class="header"><vaadin-grid-sorter path="last_modified">Last Modified</vaadin-grid-sorter></template>
                        <!--<template>[[item.last_modified]]</template>-->
                    </vaadin-grid-column>
            </vaadin-split-layout>
        `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        reduxStore.dispatch(getAllBooks());

        const splitter = this.shadowRoot.getElementById("content-splitter");

        installMediaQueryWatcher(`(max-width: 460px)`, (matches) => {
            splitter.orientation = matches ? 'vertical' : 'horizontal';
        });

        const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');

        // XXX: depends on colums markup order
        columns[5].renderer = function(root, column, rowData) {
            root.textContent = humanFileSize(rowData.item.size, false);
        };

        columns[6].renderer = function(root, column, rowData) {
            root.textContent = moment(rowData.item.last_modified).fromNow();
        };
    }

    booksGridActiveItemChanged(event) {
        const item = event.detail.value;
        const grid = event.currentTarget;

        grid.closeItemDetails(grid.selectedItems[0]);
        grid.selectedItems = item ? [item] : [];
        grid.openItemDetails(item);
    }

    stateChanged(state) {
        if (state.restData.books.length > 0) {
            this.books = state.restData.books;

            const grid = this.shadowRoot.getElementById('book-list-grid');
            grid.items = this.books;
        }
    }
}

window.customElements.define('book-list-element', BookListElement);
