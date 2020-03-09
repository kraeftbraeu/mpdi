import {html, render} from '../../node_modules/lit-html/lit-html.js';

export default class MpHeader extends HTMLElement {

    get template() {
        return html`
        
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
        <span class="mdc-top-app-bar__title">MPD Radio</span>
      </section>
    </div>
  </header>

            <div class="mdc-tab-bar" role="tablist">
                <div class="mdc-tab-scroller">
                <div class="mdc-tab-scroller__scroll-area">
                    <div class="mdc-tab-scroller__scroll-content">
                        ${this.buttons.map((button) => this.buttonTemplate(button))}
                    </div>
                </div>
                </div>
            </div>
        `;
    }

    get buttonTemplate() {
        return (name) => html`
            <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
            <span class="mdc-tab__content">
                <span class="mdc-tab__icon material-icons" aria-hidden="true">${name}</span>
            </span>
            <span class="mdc-tab-indicator mdc-tab-indicator--active">
                <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
            <span class="mdc-tab__ripple"></span>
            </button>
        `;
    }

    connectedCallback() {
        this.buttons = Array.from(this.getElementsByTagName("li")).map(li => li.textContent);
        render(this.template, this);
    }
}
customElements.define("mp-header", MpHeader);