/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
}
  from '@angular/common/http'
import { Observable, EMPTY } from 'rxjs'
import { checkGroups, showErrorMessageNotification } from 'src/app/utils'

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const pms = localStorage.getItem('listPermissions')    
    
    let unauthorize = false

    if (request.method == 'GET') {
      if (request.url.includes('template') &&
        request.url.includes('download') &&
        !checkGroups(pms, 'DOWNLOAD_FILE_TEMPLATE')) {
        unauthorize = true
      }

      if (request.url.includes('mop') &&
        request.url.includes('download-steps') &&
        !checkGroups(pms, 'DOWNLOAD_STEPS_MOP')) {
        unauthorize = true
      }

      if (request.url.includes('mop') &&
        request.url.includes('download-import-template') &&
        !checkGroups(pms, 'DOWNLOAD_TEMPLATE_MOP')) {
        unauthorize = true
      }

      if (request.url.includes('oss') &&
        request.url.includes('download') &&
        !checkGroups(pms, 'DOWNLOAD_FILE_OSS')) {
        unauthorize = true
      }

      if (request.url.includes('license') &&
        request.url.includes('download') &&
        !checkGroups(pms, 'DOWNLOAD_LICENSE')) {
        unauthorize = true
      }
    }

    if (request.method == 'POST') {
      if (request.url.includes('activity') &&
        request.url.includes('download') &&
        !checkGroups(pms, 'DOWNLOAD_FILE_ACTIVITY')) {
        unauthorize = true
      }

      if (request.url.includes('oss') &&
        request.url.includes('import') &&
        !checkGroups(pms, 'IMPORT_FILE_OSS')) {
        unauthorize = true
      }

      if (request.url.includes('mop') &&
        request.url.includes('import') &&
        !checkGroups(pms, 'IMPORT_STEPS_MOP')) {
        unauthorize = true
      }

      if (request.url.includes('activity') &&
        request.url.includes('start') &&
        !checkGroups(pms, 'START_ACTIVITY')) {
        unauthorize = true
      }

      if (request.url.includes('template') &&
        request.url.includes('upload') &&
        !checkGroups(pms, 'UPLOAD_FILE_TEMPLATE')) {
        unauthorize = true
      }
    }

    if (request.method == 'DELETE') {

      if (request.url.includes('activity') && !checkGroups(pms, 'REMOVE_ACTIVITY_TYPE')) {
        unauthorize = true
      }

      if (request.url.includes('cluster') && !checkGroups(pms, 'REMOVE_CLUSTER')) {
        unauthorize = true
      }

      if (request.url.includes('country') && !checkGroups(pms, 'REMOVE_COUNTRY')) {
        unauthorize = true
      }

      if (request.url.includes('customer') && !checkGroups(pms, 'REMOVE_CUSTOMER')) {
        unauthorize = true
      }

      if (request.url.includes('design-type') && !checkGroups(pms, 'REMOVE_DESIGN_TYPE')) {
        unauthorize = true
      }

      if (request.url.includes('field-script-password') && !checkGroups(pms, 'REMOVE_FIELD_SCRIPT_PASSWORD')) {
        unauthorize = true
      }

      if (request.url.includes('license') && !checkGroups(pms, 'REMOVE_LICENSE')) {
        unauthorize = true
      }

      if (request.url.includes('mop') && !checkGroups(pms, 'REMOVE_MOP')) {
        unauthorize = true
      }

      if (request.url.includes('node-password') && !checkGroups(pms, 'REMOVE_NODE_PASSWORD')) {
        unauthorize = true
      }

      if (request.url.includes('node-software') && !checkGroups(pms, 'REMOVE_NODE_SOFTWARE')) {
        unauthorize = true
      }

      if (request.url.includes('node-template') && !checkGroups(pms, 'REMOVE_NODE_TEMPLATE')) {
        unauthorize = true
      }

      if (request.url.includes('node-type') && !checkGroups(pms, 'REMOVE_NODE_TYPE')) {
        unauthorize = true
      }

      if (request.url.includes('oss') && !checkGroups(pms, 'REMOVE_OSS')) {
        unauthorize = true
      }

      if (request.url.includes('design-type') && !checkGroups(pms, 'REMOVE_OSS_GROUP')) {
        unauthorize = true
      }

      if (request.url.includes('oss-user') && !checkGroups(pms, 'REMOVE_OSS_USER')) {
        unauthorize = true
      }

      if (request.url.includes('region') && !checkGroups(pms, 'REMOVE_REGION')) {
        unauthorize = true
      }

      if (request.url.includes('region-group') && !checkGroups(pms, 'REMOVE_REGION_GROUP')) {
        unauthorize = true
      }

      if (request.url.includes('rnc') && !checkGroups(pms, 'REMOVE_RNC')) {
        unauthorize = true
      }

      if (request.url.includes('rsg') && !checkGroups(pms, 'REMOVE_RSG')) {
        unauthorize = true
      }

      if (request.url.includes('script-type') && !checkGroups(pms, 'REMOVE_SCRIPT_TYPE')) {
        unauthorize = true
      }

      if (request.url.includes('static-file') && !checkGroups(pms, 'REMOVE_STATIC_FILE')) {
        unauthorize = true
      }

      if (request.url.includes('design-type') && !checkGroups(pms, 'REMOVE_STATIC_FILE_TYPE')) {
        unauthorize = true
      }

      if (request.url.includes('design-type') && !checkGroups(pms, 'REMOVE_TECHNOLOGY')) {
        unauthorize = true
      }

      if (request.url.includes('template') && !checkGroups(pms, 'REMOVE_TEMPLATE')) {
        unauthorize = true
      }

      if (request.url.includes('profile') && !checkGroups(pms, 'REMOVE_PROFILE')) {
        unauthorize = true
      }

      if (request.url.includes('policy') && !checkGroups(pms, 'REMOVE_PRIVACY_POLICY')) {
        unauthorize = true
      }
    }

    if (unauthorize) {
      showErrorMessageNotification('Acesso não autorizado.')
      return EMPTY
    }

    return next.handle(request)
  }
}