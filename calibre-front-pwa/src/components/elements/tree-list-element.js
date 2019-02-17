/*
 * @file tree-list-element.js
 *
 * @brief Tree list element
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

import { LitElement, html } from 'lit-element';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';

export class TreeListNodeElement extends LitElement {

    static get properties() {
        return {
            text: { type: String },
            selected: { type: Boolean },
            children: { type: Array },
            expanded: { type: Boolean}
        }
    }

    static get styles() {
        return [
            // XXX: SharedStyles
        ];
    }

    render() {
        return html`
            <style>
            ul {
                    list-style-type: none;
                    padding: 0 0 0 0.6em;
                }
                
                li {
                    margin: 0.6em 0 0 0;
                }
                
                li iron-icon {
                    width: 32px;
                }
                
                li:has(> ul) iron-icon {
                    width: 16px;
                }
            </style>
            
            <li>
                <paper-item role="listitem" @click="${this.handleClick}">
                    ${this.children && this.children.length > 0
                        ? html`<iron-icon class="node-icon" icon="expand-more" ></iron-icon>`
                        : html`<iron-icon class="leaf-icon" icon="archive" ></iron-icon>`
                    }
                    <span class="node-name">${this.text}</span>
                </paper-item>
                  
                ${this.expanded && this.children
                    ? html`
                        <ul>
                            ${this.children.map(child => html`
                                <tree-list-node-element role="listitem" .text=${child.text} .children=${child.children} >
                                </tree-list-node-element>
                             `)}   
                        </ul>
                        `
                    : html``
                }
            </li>
        `;
    }

    constructor() {
        super();

        this.text = '';
        this.selected = false;
        this.children = null;
        this.expanded = false;

        this.selectEvent = new CustomEvent('select', {
            detail: {
                node: this
            },
            bubbles: true,
            composed: true
        });
    }

    handleClick() {
        this.dispatchEvent(this.selectEvent);

        this.selected = true;

        if (this.children) {
            this.expanded = !this.expanded;
        }
    }
}

window.customElements.define('tree-list-node-element', TreeListNodeElement);

export class TreeListElement extends LitElement {

    static get properties() {
        return {
            data: {
                type: Array,
                value: []
            }
        }
    }

    static get styles() {
        return [
            // XXX: SharedStyles
        ];
    }

    renderItem(item) {
        return html`
            <li>
                <tree-list-node-element role="listitem" .text=${item.text} .children=${item.children} @select="${(e) => { this.handleSelect(e) }}">
                </tree-list-node-element>
            </li>
        `;
    }

    render() {
        const itemTemplates = [];

        for (const roots of this.data) {
            itemTemplates.push(this.renderItem(roots));
        }

        return html`
            <style>
                ul {
                    list-style-type: none;
                    padding: 0 0 0 0.6em;
                }
                
                li {
                    margin: 0.6em 0 0 0;
                }
                
                li iron-icon {
                    width: 32px;
                }
                
                li:has(> ul) iron-icon {
                    width: 16px;
                }
            </style>
            
            <ul>
                ${itemTemplates}
            </ul>
        `;
    }

    constructor() {
        super();


        this.itemSelected = null;

        this.data = [
            {
                text: "Movies",
                children: [
                    {
                        "text": "Movies - 1"
                    },
                    {
                        "text": "Movies - 2"
                    }
                ]
            },
            {
                text: "Movies 2 ",
                children: [
                    {
                        "text": "Movies 2 - 1"
                    },
                    {
                        "text": "Movies 2 - 2"
                    }
                ]
            }
        ];
    }

    firstUpdated() {

    }

    handleSelect(event) {
        if (this.itemSelected) {
            this.itemSelected.selected = false;
        }

        this.itemSelected = event.detail.node;
    }
}

window.customElements.define('tree-list-element', TreeListElement);
