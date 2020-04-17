import * as constants from './constants.js';
import {html, render} from '../libs/lit-html/lit-html.js';

export default class MpSenders extends HTMLElement {

    get template() {
        return html`
        <ul class="mdc-list">
            ${this.senders.map((sender, index) => html`
            <li class="mdc-list-item" tabindex="0" @click=${() => this.doPlay(index)}>
                <span class="mdc-list-item__graphic material-icons" aria-hidden="true">play_arrow</span>
                <span class="mdc-list-item__text">${sender.name}</span>
                <!--<span class="mdc-list-item__meta material-icons" aria-hidden="true">more_vert</span>-->
            </li>
            <li role="separator" class="mdc-list-divider"></li>
            `)}
        </ul>    
        `;
    }

    connectedCallback() {
        fetch(constants.loadSendersUrl)
        .then(response => response.json())
        .then(jsonSenders => {
            console.log(jsonSenders);
            this.senders = jsonSenders;
            this.update(); 
        });
    }

    update() {
        render(this.template, this);
    }

    doPlay(index) {
        document.querySelector('mp-status').playRadio(index);
    }
}
customElements.define("mp-senders", MpSenders);