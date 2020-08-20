import {getAllSaved,getByIdSaved} from '../db/idb.js';

class DataSource {
    constructor(baseUrl,years,teamId){
        this.baseUrl = baseUrl;
        this.years = years;
        this.teamId = teamId;
        this.token = '4358e7de8802477f876b7710250a68c2';
    }
    
    async fetchApi(url) {    
        return fetch(url, {
          headers: {
            'X-Auth-Token': this.token,
          }
        });
      }
    // Fungsi Score Table untuk melihat perolehan score saat ini
    async scoreTable(){
        if ("caches" in window) {
            caches.match(`${this.baseUrl}competitions/${this.years}/standings`)
            .then( response => {
                if (response) {
                    response.json()
                    .then(responseJson => {
                        return responseJson.standings;
                    })
                    .then(tableData => {
                        let scoreTable = document.querySelector('score-table');
                        scoreTable.table = tableData;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch( err => {
                let scoreTable = document.querySelector('score-table');
                console.log(error);
                scoreTable.table = "FAIL";
            })
        }
      
        // Fetch Data dari API 
        await this.fetchApi(`${this.baseUrl}competitions/${this.years}/standings`)
        .then( response => {
            return response.json();
        })
        .then(responseJson => {
            return responseJson.standings
        })
        .then(tableData=>{
            let scoreTable = document.querySelector('score-table');
            scoreTable.table = tableData;
        }).then(()=>{
            let el = document.getElementById('tabs-swipe-demo');
            let instance = M.Tabs.init(el, {
              swipeable : true,
              fullWidth:true,
            });
          }).then(()=>{
            let getTable = document.querySelectorAll('table[id*="tabel-standings"]');
            let targetTab = document.querySelector('.tabs-content.carousel');
            targetTab.style.height = `${getTable[0].clientHeight}px`;
          })
          .catch(error=>{
            let scoreTable = document.querySelector('score-table');
            console.log(error);
            scoreTable.table = "FAIL";
        })
    }

    //Fungsi untuk melihat informasi salah satu Klub Bola
    async clubInfo(){
        if("caches" in window) {
            caches.match(`${this.baseUrl}teams/${this.teamId}`)
            .then( response => {
                if (response) {
                    response.json()
                    .then(responseJson => {
                        let clubInfo = document.querySelector('football-club');
                        clubInfo.detailInfo = responseJson
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch( err => {
                let clubInfo = document.querySelector('football-club');
                console.log(`Error : ${err}`);
                clubInfo.detailInfo = "FAIL";
            })
        }
        await this.fetchApi(`${this.baseUrl}teams/${this.teamId}`)
        .then(response => {
            return response.json()
        })
        .then(function(data) {
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db

            // Objek JavaScript dari data.json() masuk lewat variabel data.
            let clubInfo = document.querySelector('football-club');
            clubInfo.detailInfo = data
        })
        .then(()=>{
            let x = document.querySelectorAll('.materialboxed');
            var y = document.querySelectorAll('.collapsible');
            var instances = M.Materialbox.init(x);
            var instances2 = M.Collapsible.init(y);
        })
        .catch(err => {
            let clubInfo = document.querySelector('football-club');
            console.log(`Error : ${err}`);
            clubInfo.detailInfo = "FAIL";
        });
    }

    detailFavorite(){
        getByIdSaved(this.teamId)
          .then( team => {
            const contentArea = document.querySelector('teamdetail-page');
            contentArea.data = team;
          })
          .catch( err => {
            console.log(`Error : ${err}`);
          })
      }

    favorite(){
        getAllSaved()
          .then( team => {
            const contentArea = document.querySelector('saved-team');
            contentArea.data = team;
          }).then(()=>{
            return document.querySelectorAll('.card-image');      
          }).then(heightData => {
              let dataList = [];
              heightData.forEach(element => dataList.push(element.offsetHeight));
              return Math.max(...dataList);
          }).then(maximumHeight=>{
              //console.log(maximumHeight)
              document.querySelectorAll('.card.horizontal').forEach(element => maximumHeight != 0 ? element.style.height = `${maximumHeight+10}px` : null );
          })
          .catch( err => {
            console.log(`Error : ${err}`);
          })
      }
}

export default DataSource;