/*
 * @file book-list-view.js
 *
 * @brief Book list page
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

import { html, LitElement } from 'lit-element';
import { BookListElement } from './../elements/book-list-element.js';

import { SharedStyles } from '../shared-styles.js';

import { reduxStore } from '../../redux-store.js';
import restData from '../../reducers/rest-data.js';
import {connect} from "pwa-helpers/connect-mixin";

reduxStore.addReducers({
    restData: restData
});

class BookListView extends connect(reduxStore)(LitElement) {

    static get properties() {
        return {
            /* XXX: render on changes */
            loading: {
                type: Boolean,
                value: false
            }
        }
    }

    static get styles() {
        return [
            SharedStyles
        ];
    }

    /*
     * TODO: XXX: move progress bar to root app element
     */
    render() {
        return html`
            <section id="page-title">
                <h2>Book list</h2>
            </section>
            <section>
                ${this.loading
                    ? html`<paper-progress value="10" indeterminate="true" style="width:100%;"></paper-progress>`
                    : html``
                }
                <book-list-element></book-list-element>
            </section>
        `;
    }

    stateChanged(state) {
        if (this.loading != state.app.runningJobs) {
            this.loading = state.app.runningJobs;
        }
    }
}

window.customElements.define('book-list-view', BookListView);
