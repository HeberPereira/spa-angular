import { EventEmitter, Injectable } from '@angular/core'
import * as signalR from '@microsoft/signalr'
import { debounceEvent, showNotifications } from '../utils'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { AuthUserService } from './auth-user.service'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private url = `${environment.baseUrlAppNotifications}/notifications`
  private hubConnection: signalR.HubConnection

  onReceivedTerminalText = new EventEmitter<string>()

  constructor(private http: HttpClient, private authUserService: AuthUserService) {
  }

  public startConnection = () => {

    setTimeout(() => {
      if (this.authUserService.getAccessToken()) {
        //Criar a conexão
        this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl(environment.baseUrlAppNotificationsHub, { accessTokenFactory: () => this.authUserService.getAccessToken() })
          .withAutomaticReconnect([30000])
          .build()

        //Start a conexão
        this.hubConnection.start()
          .then(() => console.log('SignalR connection started.'))
          .catch(err => {
            console.log('Error while starting SignalR connection: ' + err)
            if (environment.production)
              this.startConnection();
          })
        this.addTransferDataListeners()
        this.hubConnection.onreconnected(() => {
          console.log('reconnected');
        })
      }
      else {
        this.startConnection();
      }
    }, 2000);
  }


  protected addTransferDataListeners = () => {
    //Side bar notifications
    this.hubConnection.on('messageReceived', (data) => {
      //console.log('[messageReceived] ' + data)
      showNotifications({
        title: data.title ?? 'Notificação',
        description: data.message ?? data
      })
    })

    //activity monitor terminal debug
    this.hubConnection.on('terminalMessageReceived', (data) => {
      //console.log('[terminalMessageReceived] ' + data)
      this.onReceivedTerminalText.emit(data)
    })
  }

  public listenToActivityTerminal(activityId: string) {
    console.log("Sending 'Listen to ActivityID' " + activityId)
    if (this.hubConnection) {
      this.hubConnection
        .invoke("AddToGroup", activityId)
        .then(resp => {
          console.log("Listen to ActivityID " + activityId)
        })
        .catch(resp => {
          console.log(resp)
        })
    }
  }

  public removeListenToActivityTerminal(activityId: string) {
    console.log("Sending 'Remove Listen to ActivityID' " + activityId)
    if (this.hubConnection) {
      this.hubConnection
        .invoke("RemoveFromGroup", activityId)
        .then(resp => {
          console.log("Removed from ActivityID " + activityId)
        })
        .catch(resp => {
          console.log(resp)
        })
    }
  }
}