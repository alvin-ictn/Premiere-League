class ScoreTable extends HTMLElement{
  constructor() {
    super();
  }

  set table(datas) {

    this._datas = datas;
    this.ScoreTable();
  }
  //preload function
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
        </div>`;
  }
  //Show Score Table
    ScoreTable(){
      let renderHTML;
      if(this._datas == "FAIL"){
        this.innerHTML = `
        <div class="container center" style="display:flex;">
        <img style="width:calc(240px + 10vw);margin: 0 auto;" src="./src/img/banner/no-internet.svg" alt="YOU HAVE NO INTERNET CONNETION IMAGE">
        </div>`
      }else {
        renderHTML = `<div class="container">
          <ul id="tabs-swipe-demo" class="tabs">
            <li class="tab col s3"><a href="#total">TOTAL</a></li>
            <li class="tab col s3"><a href="#home">HOME</a></li>
            <li class="tab col s3"><a href="#away">AWAY</a></li>
          </ul>`;
            this._datas.map(data=> {
                renderHTML += `
          <div id="${data.type.toLowerCase()}" class="col s12">
            <table class="highlight" id="tabel-standings-${data.type.toLowerCase()}">
                <thead>
                    <tr>
                        <th></th>
                        <th>Team</th>
                        <th class="centered">PG</th>
                        <th class="centered">W</th>
                        <th class="centered">D</th>
                        <th class="centered">L</th>
                        <th class="centered">GF</th>
                        <th class="centered">GA</th>
                        <th class="centered">GD</th>
                        <th class="centered">Pts</th>
                    </tr>
                </thead>
                <tbody>`
                    data.table.forEach(dataLiga=>{
                        renderHTML +=`
                    <tr>
                        <td>${dataLiga.position}</td>
                        <td class="team">`;
                      dataLiga.team.crestUrl != null || dataLiga.team.crestUrl ?  renderHTML += `<svg class="svgEmblem"><image xlink:href="${dataLiga.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="imgEmblem" alt="${dataLiga.team.name} Emblem"/></svg>` :  renderHTML += ''
                        renderHTML += `<a class="loaded" team-id="${dataLiga.team.id}" href="#teamid=${dataLiga.team.id}">${dataLiga.team.name}</a></td>
                        <td class="centered">${dataLiga.playedGames}</td>
                        <td class="centered">${dataLiga.won}</td>
                        <td class="centered">${dataLiga.draw}</td>
                        <td class="centered">${dataLiga.lost}</td> 
                        <td class="numGF centered">${dataLiga.goalsFor}</td>
                        <td class="numGA centered">${dataLiga.goalsAgainst}</td>
                        <td class="centered">${dataLiga.goalDifference>0?"+"+dataLiga.goalDifference:dataLiga.goalDifference}</td>
                        <td class="numPts centered">${dataLiga.points}</td>
                    </tr>`
                    })
                    renderHTML += `
                </tbody>
            </table>
          </div>
          </div>`;
      })
    //show data
    this.innerHTML = renderHTML;
    document.querySelectorAll('.loaded')
      .forEach(element => {
          element.addEventListener('click', event => {
            let url = event.target.getAttribute('href').substr(1);
            const appArea = document.querySelector('app-area');
            appArea.content = `football-club_${url.split('=')[1]}`;
          });
      });
    }
  }
}

customElements.define('score-table', ScoreTable);
