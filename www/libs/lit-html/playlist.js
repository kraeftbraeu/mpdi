import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import './button.js';

class PiPlaylist extends PolymerElement {
  static get template() {
    return html`
    <style>
      input:read-only {
        border: none;
      }
      input:-moz-read-only {
        border: none;
      }
    </style>
    <table>
      <template is="dom-repeat" items="{{senders}}">
        <tr id="{{item.id}}">
          <td class="senderButton">
            <pi-button do="play(this)" icon="av:play-arrow">Play</pi-button>
          </td>
          <td class="senderField">
            <input type="text" readonly value="{{item.name}}" />
          </td>
          <td class="senderField">
            <input type="url" readonly value="{{item.url}}" title="{{item.url}}" />
          </td>
          <td class="senderButton" style="display:none;">
            <pi-button do="remove({{item.id}})" icon="icons:delete">Delete</pi-button>
            <pi-button do="move({{item.id}})" icon="icons:swap-vert">Move</pi-button>
          </td>
        </tr>
      </template>
    </table>
    `;
  }
  static get properties() {
    return {
    };
  }
  constructor() {
    super();
    console.log("init playlist");
  }
  connectedCallback() {
    super.connectedCallback();
    this.resetSenders();
  }
  _trim(long) {
    return long.length <= 30 ? long : long.substring(0, 30) + "...";
  }
  add() {
    this.senders.push({"id":"","name":"","url":""});
  }
  remove(id) {
    let index = this.senders.findIndex(id);
    if(index != -1) {
      this.senders.splice(index, 1);
    } else {
      console.error("didnt find array element to remove"); // TODO: react!
    }
  }
  move(id) {
    // TODO
  }
  saveSenders() {
    this.restSaveSenders()
    .then(senders => {
      console.log(senders);
      this.senders = senders;
    })
    .catch(error => {
      console.log("couldn't save senders, reset...");
      // TODO: error popup
      this.resetSenders();
    });
  }
  resetSenders() {
    this.restLoadSenders()
    .then(senders => {
      console.log(senders);
      this.senders = senders;
    });
  }
  
  restSaveSenders(senders) {
    // TODO: replace placeholder
    return this.restLoadSenders().then(
      senders => this.senders = senders
    );
  }
  restLoadSenders() {
    return fetch("load.json", {
      method: "GET",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(
      res => res.json()
    )
    .then(senders => {
      for(let i = 0; i < senders.length; i++) {
        senders[i]["id"] = senders[i]["name"] + "#" + senders[i]["url"] + "#" + Math.random();
      }
      return senders;
    })
    ;
  }
  toggleEdit(doSelectEdit) {
    console.log("toggle edit");
    let buttonColumns = this.shadowRoot.querySelectorAll("td.senderButton");
    for(let i = 0; i < buttonColumns.length; i++) {
      if(buttonColumns[i].style.display === "none") {
        buttonColumns[i].style.display = "";  
      } else {
        buttonColumns[i].style.display = "none";
      }
    }
    let senderFields = this.shadowRoot.querySelectorAll("td.senderField input");
    for(let i = 0; i < senderFields.length; i++) {
      let field = senderFields[i];
      if(doSelectEdit === true) {
        field.removeAttribute("readonly");
      } else {
        field.setAttribute("readonly", "readonly");
      }
    }
  }
}

customElements.define('pi-playlist', PiPlaylist);
