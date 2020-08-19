class HomeScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="row container">
      <div style="
        display: flex;
        justify-content: center;
        width:100%;">
        <img width="100%" src="./src/img/banner/banner.png" alt="banner Premiere League ada Singa injek Bola">
      </div>
      <div style="font-size:1.2em">
        <p>Fulham menjadi tim terakhir yang sukses promosi ke Liga Primer Inggris musim 2020/2021 setelah mengalahkan Brentford pada partai play-off divisi Championship.</p>


        <p>Sebelumnya, dua tim yaitu Leeds United dan West Bromwich Albion telah lebih dulu promosi. Mereka menggantikan tiga tim yang terdegradasi yaitu Bournemouth, Watford dan Norwich City.</p>

        <p>Itu berarti 20 klub telah resmi menjadi peserta Liga musim 2020/21. Selain itu, dengan promosinya Fulham, praktis London menyumbang enam tim di Liga Primer Inggris musim depan.</p>

        <p>Liga Primer Inggris sendiri bakal digelar mulai <b>12 September 2020</b> dan berakhir <b>23 Mei 2021</b>.</p>
      </div>
    <div>
    `;
  }
}

customElements.define('home-screen', HomeScreen);