import * as constants from './constants.js';
import {html, render} from '../libs/lit-html/lit-html.js';

export default class MpStatus extends HTMLElement {

    get template() {
        return html`
        <ul class="mdc-list">
            <li class="mdc-list-item" tabindex="0">
                <span class="mdc-list-item__text">${this.status ? this.status.playing : ''}</span>
            </li>
        </ul>

        <table>
            <tr>
                <td @click=${() => this.setVolume('-')}>
                    <span class="material-icons" aria-hidden="true">volume_down</span>
                </td>
                <td style="width:100%">
                    <div class="mdc-slider mdc-slider--discrete" tabindex="0" role="slider"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow="${this.status ? this.status.volume : ''}"
                            aria-label="Slide Volume"
                            @mouseup=${() => this.setVolume()}>
                        <div class="mdc-slider__track-container">
                            <div class="mdc-slider__track"></div>
                        </div>
                        <div class="mdc-slider__thumb-container">
                            <div class="mdc-slider__pin">
                                <span class="mdc-slider__pin-value-marker"></span>
                            </div>
                            <svg class="mdc-slider__thumb" width="21" height="21">
                                <circle cx="10.5" cy="10.5" r="7.875"></circle>
                            </svg>
                            <div class="mdc-slider__focus-ring"></div>
                        </div>
                    </div>
                </td>
                <td @click=${() => this.setVolume('+')}>
                    <span class="material-icons" aria-hidden="true">volume_up</span>
                </td>
            </tr>
        </table>
        `;
    }

    connectedCallback() {
        this.updateStatus();
    }

    updateStatus() {
        fetch(constants.loadStatusUrl)
        .then(response => response.json())
        .then(jsonStatus => this.handleResponse(jsonStatus));
    }

    setVolume(value = -1) {
        const step = 20;
        let volume = parseInt(this.querySelector(".mdc-slider").getAttribute('aria-valuenow'), 0);
        if(value === '+') {
            volume = Math.min(volume + step, 100);
        } else if(value === '-') {
            volume = Math.max(volume - step, 0);
        }
        fetch(constants.setVolumeUrl + volume)
        .then(response => response.json())
        .then(jsonStatus => this.handleResponse(jsonStatus));
    }

    reloadRadio() {
        console.log('reload');
        fetch(constants.reloadUrl);
    }

    playRadio(index = this.indexPlaying) {
        console.log('play', index);
        fetch(constants.playUrl + (index + 1))
        .then(response => response.json())
        .then(jsonStatus => {
            this.indexPlaying = index; // TODO: keep that index on server side and return on each status
            this.handleResponse(jsonStatus);
        });
    }

    stopRadio() {
        console.log('stop');
        fetch(constants.stopUrl)
        .then(response => response.json())
        .then(jsonStatus => {
            this.handleResponse(jsonStatus);
        });
    }

    handleResponse(jsonResponse) {
        console.log(jsonResponse);
        this.status = jsonResponse;
        render(this.template, this);
        
        const slider = this.querySelector(".mdc-slider");
        new mdc.slider.MDCSlider(slider);
        if(this.status && this.status.volume) {
            slider.setAttribute('aria-valuenow', this.status.volume); // hack to set volume bar
        }
    }
}
customElements.define("mp-status", MpStatus);