import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.css']
})
export class AppContentComponent implements OnInit {
  ngOnInit(): void {
    window.addEventListener('scroll', this.onChangePositionSelectList, true)
    window.addEventListener('resize', this.onChangePositionSelectList, true)

    document.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        const dialogButtons = document.querySelectorAll('.dialog button')
        dialogButtons.forEach((button: HTMLButtonElement) => {
          button.innerText.includes('Cancel') && button.click()
        })
      }
    })
    var $scrollTable = document.getElementsByClassName('table-scroll');
    for (let i = 0; i < $scrollTable.length; i++) {
      const element = $scrollTable[i];
      element.addEventListener('scroll', event => {
        this.onChangePositionSelectList(element);
      })
    }
  }

  onChangePositionSelectList(e) {
    var $selects;

    $selects = document.getElementsByClassName("select")

    for (let i = 0; i < $selects.length; i++) {
      const element = $selects[i];

      var positionDDHolder = element.getBoundingClientRect();
      var $listOptionHolder = element.parentElement.getElementsByClassName("options-list")[0]

      if ($listOptionHolder != undefined) {
        $listOptionHolder.style.top = (positionDDHolder.top + element.clientHeight) + "px"
        $listOptionHolder.style.left = (positionDDHolder.left) + "px"

        if (e.type == 'resize' && element.className.indexOf('open') > -1) {
          element.className = element.className.replace('open-top', 'closed').replace('open', 'closed')
        }
      }
    };
  }
}
