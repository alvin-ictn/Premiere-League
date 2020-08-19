class FavoritePage extends HTMLElement {
  constructor() {
    super();
  }

  set data(data) {
    this._data = data;
    this.render();
    this.favoriteAction();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                  <div class="circle"></div>
              </div>
              <div class="gap-patch">
                  <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                  <div class="circle"></div>
              </div>
          </div>
      </div>
    `;
  }

  render() {
    let page;

    if (this._data.length !== 0) {
      page = `<div class="container">`;
      this._data.forEach( data => {
        page += `
          <div class="card horizontal">
            <div class="card-image" >
              <img src="${data.crestUrl}"/>
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <a class="club-info" team-id="${data.id}" href="#teamid=${data.id}"> ${data.name} </a>
              </div>
            </div>
          </div>
        `;
      });

      page +=`
        </div>
      `;
    } else {
      page = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-red-only">
              <div class="circle-clipper left black">
              </div>
              <div class="gap-patch">
                  <div class="circle"></div>
              </div>
              <div class="circle-clipper right white">
      
              </div>
          </div>
        </div>
        <h3 class="center">You don't have any favorite Club</h3>
        <h4 class="center">Pick one <a href="#score">Here</a></h4>
      `;
    }

    this.innerHTML = page;
  }

  favoriteAction() {
    document.querySelectorAll('.club-info').forEach( elm => {
      elm.addEventListener('click', event => {
        let url = event.target.getAttribute('href').substr(1);
        let appArea = document.querySelector('app-area');
        appArea.content = `football-club_${url.split('=')[1]}`;
      })
    });
  }
}

customElements.define('saved-team', FavoritePage);