import {html, render} from '../../node_modules/lit-html/lit-html.js';

export default class MpButton extends HTMLElement {
    
    get template() {
        return html`
            <button class="mdc-button">
                <div class="mdc-button__ripple"></div>
                <span class="mdc-button__label">${this.content}</span>
            </button>
        `;
    }

    connectedCallback() {
        this.content = this.textContent;
        render(this.template, this);
    }
}
customElements.define("mp-button", MpButton);