import {html, render} from '../libs/lit-html/lit-html.js';

export default class MpHeader extends HTMLElement {

    get template() {
        return html`
        <header class="mdc-top-app-bar">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" @click=${() => this.toggleMenu()}>menu</button>
                    <span class="mdc-top-app-bar__title">MPD Radio</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Play" @click=${() => this.play()}>play_arrow</button>
                    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Stop" @click=${() => this.stop()}>stop</button>
                    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Edit" @click=${() => this.edit()}>edit</button>
                </section>
            </div>
        </header>
        `;
    }


    connectedCallback() {
        render(this.template, this);
    }

    toggleMenu() {
        console.log("TODO");
    }

    play() {
        document.querySelector('mp-status').playRadio();
    }

    stop() {
        document.querySelector('mp-status').stopRadio();
    }

    edit() {
        console.log("TODO");
    }
}
customElements.define("mp-header", MpHeader);