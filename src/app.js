import 'materialize-css/dist/css/materialize.min.css';
import "./styles/style.css";
import 'materialize-css/dist/js/materialize.min.js';
import "./script/view/main.js";
import "regenerator-runtime";
import "./script/component/app-bar.js";
import "./script/component/home.js";
import {URL,years} from './script/data/config';
import DataSource from './script/data/data-source.js';
import registerService from './script/data/registerService.js'

let appArea = document.querySelector('app-area');

window.onhashchange = () => { 
	appArea.firstChild ? appArea.removeChild(appArea.firstChild) : null
	let namaHalaman = location.hash.substr(1);

	if(namaHalaman == "score"){
		let element = document.createElement('score-table');
		appArea.appendChild(element)
		let Data = new DataSource(URL,years);
		Data.scoreTable()
	}else if(namaHalaman.includes('teamid')){
		let element = document.createElement('football-club');
		appArea.appendChild(element)
		let Data = new DataSource(URL,years,namaHalaman.split('=')[1]);
		Data.clubInfo()
	}else if(namaHalaman == "favorite"){
		let element = document.createElement('saved-team');
		let Data = new DataSource(URL,years)
		appArea.appendChild(element)
		Data.favorite()
	}else {
		appArea.appendChild(document.createElement('home-screen'));
	}

	const mainArea = document.querySelector('app-area');
	mainArea.page = namaHalaman;
};

document.addEventListener('DOMContentLoaded',() => {
	let namaHalaman = location.hash.substr(1);
	registerService();
	if(namaHalaman == "score"){
		let element = document.createElement('score-table');
		appArea.appendChild(element)
		let Data = new DataSource(URL,years);
		Data.scoreTable()
	}else if(namaHalaman.includes('teamid')){
		let element = document.createElement('football-club');
		appArea.appendChild(element)
		let Data = new DataSource(URL,years,namaHalaman.split('=')[1]);
		Data.clubInfo()
	}else if(namaHalaman == "favorite"){
		let element = document.createElement('saved-team');
		let Data = new DataSource(URL,years)
		appArea.appendChild(element)
		Data.favorite()
	}else {
		appArea.appendChild(document.createElement('home-screen'));
	}

	const mainArea = document.querySelector('app-area');
	mainArea.page = namaHalaman;
})


document.querySelectorAll('ul.topnav a, ul.sidenav a').forEach(element => {
	element.addEventListener('click', event => {
		const sideNav = document.querySelector('.sidenav');
		M.Sidenav.getInstance(sideNav).close();
		let namaHalaman = event.target.getAttribute('href').substr(1);

		if(namaHalaman == "score"){
			let Data = new DataSource(URL,years);
			Data.scoreTable()
		}else if(namaHalaman.includes('teamid')){
			let Data = new DataSource(URL,years,namaHalaman.split('=')[1]);
			Data.clubInfo()
		}else if(namaHalaman == "favorite"){
			let element = document.createElement('saved-team');
			let Data = new DataSource(URL,years)
			appArea.appendChild(element)
			Data.favorite()
		}else {
			appArea.appendChild(document.createElement('home-screen'));
		}

		appArea.content = namaHalaman === "score" ? "score-table" : namaHalaman === "favorite" ? "saved-team" : "home-screen"

	});
});