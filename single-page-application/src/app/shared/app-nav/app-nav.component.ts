import { Component, OnInit, ViewChild } from '@angular/core'
import { PrivacyPolicy } from 'src/app/_models/privacy-policy'
import { AuthUserService } from 'src/app/_services/auth-user.service'
import { Router } from '@angular/router'
import { showLoadingInTreeNavigation } from 'src/app/utils'
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private authUserService: AuthUserService,
    private router: Router
  ) { }

  accept = false
  privacyPolicyObj: PrivacyPolicy = new PrivacyPolicy()
  userAcceptedAllPrivacyPolicies = false
  viewActivity = false
  viewActivityType = false
  viewActivityMonitor = false
  viewCluster = false
  viewCountry = false
  viewCustomer = false
  viewDesignType = false
  viewFieldScriptPassword = false
  viewLicense = false
  viewMop = false
  viewMopParseParameters = false
  viewMopParseMo = false
  viewMopParseConfig = false
  viewNodePassword = false
  viewNodeSoftware = false
  viewNodeTemplate = false
  viewDesignSummaryTemplate = false
  viewNodeType = false
  viewOss = false
  viewOssGroup = false
  viewOssUser = false
  viewRegion = false
  viewRegionGroup = false
  viewRnc = false
  viewRsg = false
  viewScriptType = false
  viewStaticFile = false
  viewStaticFileType = false
  viewPendingItems = false
  viewTechnology = false
  viewTemplate = false
  viewChangeHistory = false
  viewServiceSetting = false
  viewServiceSettingTunnel = false
  viewTunnelError = false
  viewProfile = false
  viewWorkFlow = false
  viewWorkflowSchedule = false
  viewWorkflowMonitor = false
  viewWorkflowOperational = false
  viewPrivacyPolicy = false
  viewWorkflowExpiration = false
  viewWorkflowSetup = false
  viewWorkflowSummary = false
  viewStrategicNode = false
  viewWorkflowNodeView = false
  viewJmSetup = false

  public checkGroups(listGroup: string, gruponome: string): boolean {

    if (listGroup != null && this.accept) {
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

  ngOnInit(): void {

    showLoadingInTreeNavigation(true)
    // this.authUserService.getPermissions().subscribe(resultado => {
    //   this.authUserService.getUserTerms().subscribe(retorno => {
    //     showLoadingInTreeNavigation(false)
    //     localStorage.setItem('termToAccept', JSON.stringify(retorno))
    //     const jsonObj = localStorage.getItem('termToAccept')
    //     this.privacyPolicyObj = JSON.parse(jsonObj).data
    //     this.accept = this.privacyPolicyObj?.id == 0

    //     const permissions = JSON.stringify(resultado)
    //     localStorage.setItem('listPermissions', permissions)

    //     this.viewActivity = this.checkGroups(permissions, 'VIEW_ACTIVITY')
    //     this.viewActivityType = this.checkGroups(permissions, 'VIEW_ACTIVITY_TYPE')
    //     this.viewActivityMonitor = this.checkGroups(permissions, 'VIEW_ACTIVITY_MONITOR')
    //     this.viewCluster = this.checkGroups(permissions, 'VIEW_CLUSTER')
    //     this.viewCountry = this.checkGroups(permissions, 'VIEW_COUNTRY')
    //     this.viewCustomer = this.checkGroups(permissions, 'VIEW_CUSTOMER')
    //     this.viewDesignType = this.checkGroups(permissions, 'VIEW_DESIGN_TYPE')
    //     this.viewFieldScriptPassword = this.checkGroups(permissions, 'VIEW_FIELD_SCRIPT_PASSWORD')
    //     this.viewLicense = this.checkGroups(permissions, 'VIEW_LICENSE')
    //     this.viewMop = this.checkGroups(permissions, 'VIEW_MOP')
    //     this.viewMopParseParameters = this.checkGroups(permissions, 'VIEW_MOP_PARSE_PARAMETER')
    //     this.viewMopParseMo = this.checkGroups(permissions, 'VIEW_MOP_PARSE_MO')
    //     this.viewMopParseConfig = this.checkGroups(permissions, 'VIEW_MOP_PARSE')
    //     this.viewNodePassword = this.checkGroups(permissions, 'VIEW_NODE_PASSWORD')
    //     this.viewNodeSoftware = this.checkGroups(permissions, 'VIEW_NODE_SOFTWARE')
    //     this.viewNodeTemplate = this.checkGroups(permissions, 'VIEW_NODE_TEMPLATE')
    //     this.viewDesignSummaryTemplate = this.checkGroups(permissions, 'VIEW_DESIGN_SUMMARY')
    //     this.viewNodeType = this.checkGroups(permissions, 'VIEW_NODE_TYPE')
    //     this.viewOss = this.checkGroups(permissions, 'VIEW_OSS')
    //     this.viewOssGroup = this.checkGroups(permissions, 'VIEW_OSS_GROUP')
    //     this.viewOssUser = this.checkGroups(permissions, 'VIEW_OSS_USER')
    //     this.viewRegion = this.checkGroups(permissions, 'VIEW_REGION')
    //     this.viewRegionGroup = this.checkGroups(permissions, 'VIEW_REGION_GROUP')
    //     this.viewRnc = this.checkGroups(permissions, 'VIEW_RNC')
    //     this.viewRsg = this.checkGroups(permissions, 'VIEW_RSG')
    //     this.viewScriptType = this.checkGroups(permissions, 'VIEW_SCRIPT_TYPE')
    //     this.viewStaticFile = this.checkGroups(permissions, 'VIEW_STATIC_FILE')
    //     this.viewStaticFileType = this.checkGroups(permissions, 'VIEW_STATIC_FILE_TYPE')
    //     this.viewPendingItems = this.checkGroups(permissions, 'VIEW_PENDING_ITEMS')
    //     this.viewTechnology = this.checkGroups(permissions, 'VIEW_TECHNOLOGY')
    //     this.viewTemplate = this.checkGroups(permissions, 'VIEW_TEMPLATE')
    //     this.viewTunnelError = this.checkGroups(permissions, 'VIEW_TUNNEL_ERROR')
    //     this.viewProfile = this.checkGroups(permissions, 'VIEW_PROFILE')
    //     this.viewWorkFlow = this.checkGroups(permissions, 'VIEW_WORKFLOW')
    //     this.viewWorkflowSchedule = this.checkGroups(permissions, 'VIEW_WORKFLOW_SCHEDULE')
    //     this.viewWorkflowMonitor = this.checkGroups(permissions, 'VIEW_WORKFLOW_MONITOR')
    //     this.viewWorkflowSummary = this.checkGroups(permissions, 'VIEW_WORKFLOW_SUMMARY')
    //     this.viewWorkflowOperational = this.checkGroups(permissions, 'VIEW_WORKFLOW_OPERATIONAL')
    //     this.viewPrivacyPolicy = this.checkGroups(permissions, 'VIEW_PRIVACY_POLICY')
    //     this.viewServiceSetting = this.checkGroups(permissions, 'VIEW_SERVICE_SETTING')
    //     this.viewServiceSettingTunnel = this.checkGroups(permissions, 'VIEW_SERVICE_SETTING_TUNNEL')
    //     this.viewWorkflowExpiration = this.checkGroups(permissions, 'VIEW_WORKFLOW_EXPIRATION')
    //     this.viewWorkflowSetup = this.checkGroups(permissions, 'VIEW_WORKFLOW_SETUP')
    //     this.viewStrategicNode = this.checkGroups(permissions, 'VIEW_STRATEGIC_NODE')
    //     this.viewJmSetup = this.checkGroups(permissions, 'VIEW_JMSETUP')
    //     this.viewWorkflowNodeView = this.checkGroups(permissions, 'VIEW_WORKFLOW_NODE_VIEW')

    //     if (!this.accept) {
    //       this.router.navigate(['user-management', 'privacy-policy', 'dialog'])
    //     }
    //   })
    // })
  }

  isOpened(navigationGroup: string): string {

    return document.querySelector(
      `[navigation-element="${navigationGroup}"] .active`
    )
      ? 'opened'
      : ''
  }
}
