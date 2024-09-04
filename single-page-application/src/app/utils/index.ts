//import { AES, enc } from 'crypto-js'
import { environment } from '../../environments/environment'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'

export function objectToUpperCase(object: unknown): unknown {
  Object.keys(object).forEach(key => {
    object[key] =
      typeof object[key] === 'string'
        ? (object[key] as string).toUpperCase()
        : object[key]
  })
  return object
}

export function checkGroups(listGroup: string, gruponome: string): boolean {

  if (listGroup != null) {
    const arrGrupos = JSON.parse(listGroup)

    for (let index = 0; index < arrGrupos.data.length; ++index) {
      const grupo = arrGrupos.data[index]

      if (grupo === gruponome) {

        return true
      }
    }
  }
  return false
}

export function checkPermissionByName(gruponome: string): boolean {

  const listGroup = localStorage.getItem('listPermissions')
  if (listGroup != null) {
    const arrGrupos = JSON.parse(listGroup)

    for (let index = 0; index < arrGrupos.data.length; ++index) {
      const grupo = arrGrupos.data[index]

      if (grupo === gruponome) {

        return true
      }
    }
  }
  return false
}

export function objectTrim(object: unknown): unknown {
  Object.keys(object).forEach(key => {
    object[key] =
      typeof object[key] === 'string'
        ? (object[key] as string).trim()
        : object[key]
  })
  return object
}

export const includeParamAsStringInObjects = <T>(
  objects: T[],
  paramName: string,
  param: string,
  separator = ', '
): T[] => {
  return objects.map(object => {
    object[`${paramName}String`] = object[paramName]
      .map((element: unknown) => element[param] || element)
      .join(separator)
    return object
  })
}

export const includeBooleanAsStringInObjects = <T>(
  objects: T[],
  attributeName: string
): T[] => {
  return objects.map(object => {
    object[attributeName + 'String'] = object[attributeName] ? 'Yes' : 'No'
    return object
  })
}

export function removeUnusedProperties(
  object: unknown,
  properties: string[] = []
): unknown {
  const newObject = Object.assign({}, object)
  const allProperties = [
    'indexOriginal',
    'createdAt',
    'updatedAt',
    'selected'
  ].concat(properties)
  allProperties.forEach(property => delete newObject[property])
  return newObject
}

export function showErrorNotification(response: HttpErrorResponse): void {
  showLoadingInFinishtButton(false)
  showLoadingInSubmitButton(false)
  
  showNotifications({
    title: 'Error',
    description: processDescriptionByCodeResponse(response)
  })
}

export function showErrorMessageNotification(response: string): void {
  showNotifications({
    title: 'Error',
    description: response
  })
}

export function showNotifications({
  title,
  description,
  timeout = 5000
}: NotificationBody): void {
  showLoadingInSubmitButton(false) //added here as it simple to refactor in forms
  showLoadingInSubmitButton(false)

  // NotificationLog.setNotificationTimeout(timeout)
  // NotificationLog.setNotification({
  //   title,
  //   description,
  //   timestamp: new Date()
  // })
  document
    .querySelector('.syspanel .notification-log .icon-trashcan')
    .removeAttribute('hidden')
  // localStorage.setItem(
  //   'notificationLog',
  //   JSON.stringify(
  //     NotificationLog.state.notifications.map(notification => {
  //       notification.isNew = false
  //       return notification
  //     })
  //   )
  // )
}

export function showLoadingInTreeNavigation(show: boolean): void {
  if (show) {
    document.querySelectorAll('.tree .title')?.forEach(i => i.classList.add('loading-title'))
  }
  else {
    document.querySelectorAll('.tree .title')?.forEach(i => i.classList.remove('loading-title'))
  }
}

export function showLoadingInformations(show: boolean): void {
  if (show) {
    document.querySelector('.loadForm')?.classList.add('loading')
  }
  else {
    document.querySelector('.loadForm')?.classList.remove('loading')
  }
}

export function showLoadingInSubmitButton(show: boolean): void {
  if (show) {
    document.querySelector('button[type=submit]')?.classList.add('loading');
  }
  else {
    document.querySelector('button[type=submit]')?.classList.remove('loading');
  }
}

///Used in Wizard control
export function showLoadingInFinishtButton(show: boolean): void {
  if (show) {
    document.querySelector('button.wizard-finish')?.classList.add('loading');
    document.querySelector('button.wizard-finished')?.classList.add('loading');
    document.querySelector('.wizard-content-submit-feedback')?.classList.remove('hidden');
  }
  else {
    document.querySelector('button.wizard-finish')?.classList.remove('loading');
    document.querySelector('button.wizard-finished')?.classList.remove('loading');
    document.querySelector('.wizard-content-submit-feedback')?.classList.add('hidden');
  }
}

export const debounceEvent =
  (
    fn: (...args: unknown[]) => void,
    wait = 100,
    time?: ReturnType<typeof setTimeout>
  ) =>
    (...args: unknown[]): void => {
      clearTimeout(time)
      time = setTimeout(() => fn(...args), wait)
    }

export const generateId = (): string => {
  let d = Date.now()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  const id = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return id
}


export const downloadBlobFile = (response: HttpResponse<Blob>): void => {
  const contentDisposition = response.headers.get('Content-Disposition')
  const fileName = getFileNameFromContentDisposition(contentDisposition)
  const blob = new Blob([response.body], {
    type: response.headers.get('Content-Type')
  })
  const anchor = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  anchor.download = fileName
  anchor.href = url
  anchor.click()
}

const getFileNameFromContentDisposition = (
  contentDisposition: string
): string => {
  const regex = /attachment; filename=(?<filename>[^,;]+)/g
  const match = regex.exec(contentDisposition)
  const filename = match.groups.filename
  return filename.replace(/"/g, '')
}

interface NotificationBody {
  description: string
  timeout?: number
  title: string
}

export function formatDate({
  format = 'yyyy/MM/dd - HH:mm',
  date = new Date()
}: {
  format?: string
  date?: Date
}): string {
  const twoDigits = (str: number) => {
    if (Number(str) < 10) return '0' + Number(str).toString()
    return Number(str).toString()
  }
  const objParts = {
    dd: twoDigits(date.getDate()),
    MM: twoDigits(date.getMonth() + 1),
    yy: date.getFullYear().toString().substring(2),
    yyyy: date.getFullYear(),
    HH: twoDigits(date.getHours()),
    mm: twoDigits(date.getMinutes()),
    ss: twoDigits(date.getSeconds())
  }
  return format.replace(
    /(HH|mm|ss|d{2}|M{2}|y{4}|y{2})/gm,
    $1 => objParts[$1 as keyof unknown]
  )
}

export const httpBlobError = (httpError: HttpErrorResponse): void => {
  const reader = new FileReader()

  reader.addEventListener('loadend', e => {
    
    const text = e.target.result
    httpError.error.message = text
    showNotifications({
      title: 'Error',
      description: processDescriptionByCodeResponse(httpError)
    })
  })
  reader.readAsText(httpError.error)
}

export const sortByProperty = <T>(
  objects: unknown[],
  property: string
): T[] => {
  function compare(a: unknown, b: unknown) {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  }
  return objects.sort(compare) as T[]
}

//export const descrypBase64 = (encrypted: string): string => {
//const encodedWord = enc.Base64.parse(encrypted)
//const decoded = enc.Utf8.stringify(encodedWord)
//return decoded
//}

export const scrollTo = (selector: string): void => {
  const element = document.querySelector(selector)
  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth' })
  }, 150)
}

export function getContrast(hexColor: string): string {
  if (!hexColor || hexColor === '#FFFFFF') {
    const theme = document.querySelector('body').classList.contains('dark')
      ? 'dark'
      : 'light'
    return theme === 'dark' ? '#fafafa' : '#242424'
  }
  hexColor = hexColor.replace('#', '')
  const r = parseInt(hexColor.substr(0, 2), 16)
  const g = parseInt(hexColor.substr(2, 2), 16)
  const b = parseInt(hexColor.substr(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#242424' : '#fafafa'
}

export const changeVisibility = ($event: Event): void => {
  const target = $event.currentTarget as HTMLDivElement
  const parent = target.parentElement
  const icon = target.querySelector('.icon')
  const input = parent.querySelector('input')
  icon.classList.toggle('icon-eye')
  icon.classList.toggle('icon-eye-solid')
  input.type = input.type === 'password' ? 'text' : 'password'
}
//Incluido parametro para nao enviar parametros nulos na querystring
export function objectToQueryString(object: any, sendNullable: boolean = true): string {
  if (!object)
    return ''

  let params = new URLSearchParams()

  for (let key in object)
    if (object[key] instanceof Array) {
      arrayToQueryString(key, object[key], params)
    }
    else {
      if (sendNullable) {
        params.set(key, object[key])
      }
      else {
        if (object[key]) {
          params.set(key, object[key])
        }
      }
    }

  return params.toString()
}

function arrayToQueryString(key: string, values: [], params: URLSearchParams) {
  for (let v in values)
    params.append(key, values[v])
}

function processDescriptionByCodeResponse(response: any): string {
  let descritionError = '';

  switch (response.status) {
    case 401:
    case 403:
      descritionError = 'You do not have permissions required to access this resource. \n\n' + response.message
      break;
    case 400:
      descritionError = 'There was an error processing. \n\n' + response.message ?? response.error?.title
      break;
    case 422:
      descritionError = response.error?.errors?.map(e => { return e.message.toString() }).join('\n ')
      if(descritionError == undefined && response.error != undefined) {
        if(response.error.message){
          descritionError = JSON.parse(response.error?.message).errors?.map(e => { return e.message.toString() }).join('\n ')
        }
        else{
          descritionError = response.error;
        }
      }
      
      if (!descritionError)
        descritionError = response.error
      break;
    case 500:
      descritionError = response.error?.title ?? response.error?.message ?? response.error
      break;
    case 0:
      descritionError = response.statusText;
      break;
    default:
      descritionError = response.error?.message ?? response.error?.title ?? response.error ?? response.message ?? 'Error processing request. ' + response.message ?? response.error ?? response
      break;
  }

  return descritionError;
}

export function onlyNumberPositive(e){
  var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
  var value = Number(e.target.value + e.key) || 0;
  //37 - 40 Arrows || 8 backspace || 9 tab || 13 enter || 48 - 57 range (0-9)
  if ((keyCode >= 37 && keyCode <= 40) || (keyCode == 8 || keyCode == 9 || keyCode == 13) || (keyCode >= 48 && keyCode <= 57)) 
    return true;
  else
    return false;
}