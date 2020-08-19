import '../component/scoreTable';
import '../component/teamInfo';
import '../component/favorites'


class AppArea extends HTMLElement {
  constructor() {
    super();
  }

  set content(content) {
    this._content = content;
    this.render();
  }

  
  render() {
    this.innerHTML = '';
    try{
      var site = this._content.includes("football-club") || this._content.includes("saved-team") ? this._content.split('_')[0] : this._content 
    }catch{
      var site = this._content
    }
    const contentElement = document.createElement(`${site}`);
    this.appendChild(contentElement);
  }
}

customElements.define('app-area', AppArea);