import menu from '../component/menu'
class AppBar extends HTMLElement {
 
    constructor() {
        super();
      }
    
      connectedCallback() {
        this.loadNav();
        this.activeNav();
      }
    
      loadNav() {
        this.innerHTML = `
          <!-- Navigasi -->
          <nav class="blue" role="navigation">
            <div class="nav-wrapper container">
              <a href="#" class="brand-logo"> Premiere League </a>
              <a href="#" class="sidenav-trigger" data-target="nav-mobile"> &#9776; </a>
    
              <!-- Navbar -->
              <ul class="topnav right hide-on-med-and-down"> </ul>
              <!-- Sidenav -->
              <ul class="sidenav" id="nav-mobile"> </ul>
            </div>
          </nav>
        `;
        document.querySelectorAll('ul.topnav, ul.sidenav')
          .forEach(element => {
            element.innerHTML = menu
          });
      }
    
      activeNav() {
        const sideNav = document.querySelector('.sidenav');
        M.Sidenav.init(sideNav);
      }
}

customElements.define("app-bar", AppBar);