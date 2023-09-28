import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

// import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';


// Pages

//import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ZoneComponent } from './zone/zone.component';
import { StockComponent } from './stock/stock.component';
import { RemarquesComponent } from './remarques/remarques.component';
 
import { SignupComponent } from './signup/signup.component';
import { AjoutCommandComponent } from './ajout-command/ajout-command.component';
import { UpdateCommandComponent } from './update-command/update-command.component';
import { DeleteCommandComponent } from './delete-command/delete-command.component';
import { Orders1Component } from './orders1/orders1.component';
import { ReportsComponent } from './reports/reports.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{ path: 'home', component: HomeComponent  },
{ path: 'login', component: LoginComponent  },        
{ path: 'signup', component: SignupComponent  },
{path: 'forgot', component:  ForgotPasswordComponent, data: {extraParameter: 'elementsMenu', expectedRole:['admin', 'user']}},

{path: 'ChangePassword', component:  ChangePasswordComponent,
canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin', 'user']}},

  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads

     //{path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}},

      // Elements
   
      {path: 'report', component:  ReportsComponent ,
      canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin','user']}},

      {path: 'orders1', component:  Orders1Component , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu',  expectedRole : ['admin', 'user']}},

       {path: 'supprimer_commande', component:  DeleteCommandComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin']}},
      {path: 'update_commande', component:  UpdateCommandComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin']}},
      {path: 'ajouter_commande', component:  AjoutCommandComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin']}},
     
      {path: 'remarques', component: RemarquesComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin', 'user']}},
      {path: 'user_Mangement', component: ManageUserComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu', expectedRole:['admin']}},
      {path: 'zone', component: ZoneComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu',  expectedRole : ['admin', 'user']}},
      {path: 'stock', component: StockComponent , canActivate:[RouteGuardService], data: {extraParameter: 'elementsMenu',  expectedRole : ['admin', 'user']}},
      {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      // Components

      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},

      // Tables

      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},

      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},

      // Forms Elements

      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},

      // Charts

      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages

      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
   //   {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
