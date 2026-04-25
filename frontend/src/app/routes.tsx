import { createBrowserRouter, Outlet } from 'react-router';
import { HomePage } from './pages/home-page';
import { TeamsPage } from './pages/teams-page';
import { SponsorsPage } from './pages/sponsors-page';
import { ContactPage } from './pages/contact-page';
import { EventsPage } from './pages/events-page';
import { ChildSafetyPage } from './pages/child-safety-page';
import { MembershipPage } from './pages/membership-page';
import { HistoryPage } from './pages/history-page';
import { CommitteesPage } from './pages/committees-page';
import { FacilitiesPage } from './pages/facilities-page';
import { HealthWellbeingPage } from './pages/health-wellbeing-page';
import { CulturePage } from './pages/culture-page';
import { LottoPage } from './pages/lotto-page';
import { ShopPage } from './pages/shop-page';
import { SeniorMenPage } from './pages/senior-men-page';
import { SeniorLadiesPage } from './pages/senior-ladies-page';
import { FixturesResultsPage } from './pages/fixtures-results-page';
import { FixturesArchivePage } from './pages/fixtures-archive-page';
import { AdultTeamsPage } from './pages/adult-teams-page';
import { JuvenileTeamsPage } from './pages/juvenile-teams-page';
import { SocialPage } from './pages/social-page';
import { G4MOPage } from './pages/g4mo-page';
import { G4DLPage } from './pages/g4dl-page';
import { FuriousButNotFastPage } from './pages/furious-but-not-fast-page';
import { ScorPage } from './pages/scor-page';

// Admin Pages
import { AdminLayout } from './components/admin/admin-layout';
import { DashboardPage } from './pages/admin/dashboard-page';
import { EventsManagementPage } from './pages/admin/events-management-page';
import { SponsorsManagementPage } from './pages/admin/sponsors-management-page';
import { TeamsManagementPage } from './pages/admin/teams-management-page';
import { LottoManagementPage } from './pages/admin/lotto-management-page';
import { MembershipManagementPage } from './pages/admin/membership-management-page';
import { PagesManagementPage } from './pages/admin/pages-management-page';

const RootLayout = () => (
  <Outlet />
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'teams',
        Component: TeamsPage,
      },
      {
        path: 'teams/adult',
        Component: AdultTeamsPage,
      },
      {
        path: 'teams/juvenile',
        Component: JuvenileTeamsPage,
      },
      {
        path: 'teams/adult/social',
        Component: SocialPage,
      },
      {
        path: 'teams/scor',
        Component: ScorPage,
      },
      {
        path: 'teams/adult/social/g4mo',
        Component: G4MOPage,
      },
      {
        path: 'teams/adult/social/g4dl',
        Component: G4DLPage,
      },
      {
        path: 'teams/adult/social/furious-but-not-fast',
        Component: FuriousButNotFastPage,
      },
      {
        path: 'teams/senior-men',
        Component: SeniorMenPage,
      },
      {
        path: 'teams/senior-ladies',
        Component: SeniorLadiesPage,
      },
      {
        path: 'fixtures-results',
        Component: FixturesResultsPage,
      },
      {
        path: 'fixtures-archive',
        Component: FixturesArchivePage,
      },
      {
        path: 'sponsors',
        Component: SponsorsPage,
      },
      {
        path: 'contact',
        Component: ContactPage,
      },
      {
        path: 'events',
        Component: EventsPage,
      },
      {
        path: 'child-safety',
        Component: ChildSafetyPage,
      },
      {
        path: 'membership',
        Component: MembershipPage,
      },
      {
        path: 'lotto',
        Component: LottoPage,
      },
      {
        path: 'shop',
        Component: ShopPage,
      },
      {
        path: 'history',
        Component: HistoryPage,
      },
      {
        path: 'committees',
        Component: CommitteesPage,
      },
      {
        path: 'facilities',
        Component: FacilitiesPage,
      },
      {
        path: 'health-wellbeing',
        Component: HealthWellbeingPage,
      },
      {
        path: 'culture',
        Component: CulturePage,
      },
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
          {
            path: 'events',
            Component: EventsManagementPage,
          },
          {
            path: 'sponsors',
            Component: SponsorsManagementPage,
          },
          {
            path: 'teams',
            Component: TeamsManagementPage,
          },
          {
            path: 'lotto',
            Component: LottoManagementPage,
          },
          {
            path: 'membership',
            Component: MembershipManagementPage,
          },
          {
            path: 'pages',
            Component: PagesManagementPage,
          },
        ],
      },
    ],
  },
]);
