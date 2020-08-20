import {saveFavorite, getByIdSaved, deleteFavorite} from '../db/idb.js';

class ClubInfo extends HTMLElement{
	constructor() {
		super();
	}

	set detailInfo(datas) {

		this._datas = datas;
		this.ClubInfo();
		this.floatingBt();
		this.btAction();
		//this.teamAction();
	}

  //preload function
  connectedCallback() {
      this.innerHTML = `
				<div class="preloader-wrapper big active">
						<div class="spinner-layer spinner-black-only">
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
	ClubInfo(){
		if(this._datas == "FAIL"){
			this.innerHTML = `
        <div class="container center" style="display:flex;">
					<img style="width:calc(240px + 10vw)"  src="./src/img/banner/no-internet.svg" alt="YOU HAVE NO INTERNET CONNETION IMAGE">
        </div>`
		}else{
		let renderHTML = `
<div class="container liga">
	<h4>${this._datas.name}</h4> <div class="row">
  		<div class="col s12 m4"><img class="materialboxed" 
    		data-caption="A picture of a way with a group of trees in a park" 
			viewBox="0 0 10 10"
			width="100%"
			src="${this._datas.crestUrl ? this._datas.crestUrl.replace(/^http:\/\//i, 'https://') :`./src/img/banner/place.svg`}" 
			alt="infowhen offline">
		</div>
      	<div class="col s12 m8">
        	<ul class="collapsible">
				<li>
					<div class="collapsible-header">Club Info</div>
					<div class="collapsible-body">
						<table class="striped">
							<tbody>
							<tr>
								<td class="topicInfo" colspan="2">Basic Info</td>
							</tr>
							<tr>
								<td>Club Name</td>
								<td>: ${this._datas.name}</td>
							</tr>
							<tr>
								<td>Club Short Name</td>
								<td>: ${this._datas.shortName}</td>
							</tr>
							<tr>
								<td>Founded</td>
								<td>: ${this._datas.founded}</td>
							</tr>
							<tr>
								<td>Club Color</td>
								<td>: ${this._datas.clubColors}</td>
							</tr>
							<tr>
								<td>Club Nationality</td>
								<td>: ${this._datas.area.name}</td>
							</tr>
							<tr>
								<td>Club Venue</td>
								<td>: ${this._datas.venue}</td>
							</tr>
							<tr>
								<td class="topicInfo" colspan="2">Contact Info</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>: ${this._datas.email}</td>
							</tr>
							<tr>
								<td>Phone</td>
								<td>: ${this._datas.phone}</td>
							</tr>
							<tr>
								<td>Website</td>
								<td>: ${this._datas.website}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
			</ul>        
		</div>
				<div class="col s12 m12">`;
				if(this._datas.squad.length){	
					renderHTML +=`
        	<table>
         		<thead>
             		<tr>
						<th>SN</th>
						<th>Nationality</th>
						<th>Name</th>
						<th>Position</th>
						<th>Role</th>
					</tr>
            	</thead>
							<tbody>`;
						
					this._datas.squad.forEach(dataMember=>{
						renderHTML += `<tr>
						<td>${dataMember.shirtNumber ? dataMember.shirtNumber : " "}</td>
						<td>${dataMember.nationality}</td>
						<td>${dataMember.name}</td>
						<td class="text-color-${dataMember.position == "Attacker"? "red" : dataMember.position == "Defender" ? "green" : dataMember.position == "Goalkeeper" ? "blue" : dataMember.position == "Midfielder" ? "brown": "default"}">${dataMember.position ? dataMember.position : " "}</td>
						<td>${dataMember.role}</td>
					</tr>`
					})

					renderHTML += `</tbody>
					</table>
				</div>`
				}else {
					renderHTML += `        <div class="preloader-wrapper empty big active">
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
        <h3 class="center">Squad Data is Missing</h3>`
				}
	renderHTML += `
				
		<div class="fixed-action-btn" id="floating-bt" class="row"></div>
	</div>
</div>`
  //show data
  this.innerHTML = renderHTML;
	}
}
	
	floatingBt() {
    getByIdSaved(this._datas.id)
      .then( data => {
        const floatingBt = document.getElementById('floating-bt');

        if (data) {
          floatingBt.innerHTML = `
            <a class="btn-floating btn-large waves-effect waves-light blue" id="btDelete"><img src="./src/img/icon/trash.svg" alt="del"></a>
          `;
        } else {
          floatingBt.innerHTML = `
            <a class="btn-floating btn-large waves-effect waves-light blue" id="btAdd"><img src="./src/img/icon/save.svg" alt="add"></a>
          `;
        }
      })
      .catch( err => {
        console.log(`Error ${err}`);
      })
  }

  btAction() {
    getByIdSaved(this._datas.id)
      .then( data => {
        if (data) {
          	document.getElementById('btDelete').addEventListener('click', () => {
            deleteFavorite(this._datas.id);
          })
        } else {
          document.getElementById('btAdd').addEventListener('click', () => {
            saveFavorite(this._datas);
          })
        }
      });
	}

}

customElements.define('football-club', ClubInfo);
