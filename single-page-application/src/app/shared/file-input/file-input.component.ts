import { InputFile } from 'src/app/_models/input-file-model'
import { generateId } from 'src/app/utils'
import {
  AfterViewInit,
  EventEmitter,
  Component,
  Output,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core'

@Component({
  selector: '[app-file-input]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements AfterViewInit {
  @ViewChild('inputFileComp') inputFileComp: ElementRef<HTMLElement>;
  fileButton = `id-${generateId()}`
  fileInputComponent = `id-${generateId()}`
  fileInputName: HTMLSpanElement
  files: File[]

  @Input() accept = ''
  @Input() showFileName = false
  @Input() selectMode: ('multiple' | 'single') = 'multiple'

  @Output()
  onUpload: EventEmitter<InputFile> = new EventEmitter<InputFile>()

  ngAfterViewInit(): void {
    const fileInput = document.getElementById(
      this.fileButton
    ) as HTMLInputElement
    const fileInputComponent = document.getElementById(this.fileInputComponent)
    this.fileInputName = fileInputComponent.querySelector('#fileName')
    fileInput.addEventListener('change', () => {
      const reader = new FileReader()
      const file = fileInput.files[0]
      const files = fileInput.files
      reader.readAsText(file)
      reader.onload = () => {
        const content = reader.result as string
        const fileNameParsed = file.name.split('.')
        const extension = fileNameParsed[fileNameParsed.length - 1]
        if (this.showFileName) {
          this.fileInputName.classList.add('fileSelected')
          this.fileInputName.firstChild.nextSibling?.remove()

          for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files.item(i)

            const br = document.createElement('br')
            this.fileInputName.appendChild(br)
            this.fileInputName.appendChild(document.createTextNode(file.name || ''))
          }

          const removeFileIcon =
            fileInputComponent.querySelector('.removeFileIcon')
          removeFileIcon.addEventListener('click', this.clear)
        } 
        
        this.onUpload.emit({
          content,
          extension,
          files
        })
      }
    })
  }

  clear = (): void => {
    this.fileInputName.classList.remove('fileSelected')
    this.fileInputName.firstChild.nextSibling?.remove()
    this.onUpload.emit({
      content: '',
      extension: '',
      files: null
    })
  }

  click = (): void => {
    this.inputFileComp.nativeElement.click();
  }
}
