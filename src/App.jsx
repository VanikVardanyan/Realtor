import React from 'react';
import './style.scss';
import {
  Route, Switch, BrowserRouter, useHistory,
} from 'react-router-dom';

import './components/fontawesomicons';
import { useSelector } from 'react-redux';
import SignIn from './components/SignIn_Login/SignIn';
import RestorePassword from './components/SignIn_Login/RestorePassword';
import PasswordRequest from './components/SignIn_Login/PasswordRequest';
import HeaderTop from './components/Header/HeaderTop/HeaderTop';
import HeaderBottom from './components/Header/HeaderBottom/HeaderBottom';
import HeaderBottomAllicon from './components/Header/HeaderBottomAllIcon';
import HeaderAddButton from './components/Header/HeaderAddButton';
import AddFloatForm from './components/AddFlatForm';
import AddingRequest from './components/AddingRequest';
import SearchFilter from './components/searchFilter';
import SortList from './components/SortList';
import ApartamentsList from './components/ApartamentsList';
import CombineApartaments from './components/ApartamentsList/CombineApartaments';
import Notification from './components/Notification';
import HideAnnouncements from './components/HideAnnouncements';
import HideApartament from './components/HideApartment';
import AgentBaseBlacklist from './components/AgentBaseBlacklist';
import AboutAgent from './components/AboutAgent';
import AddAgent from './components/AddAgent';
import NotificationRequest from './components/NotificationsRequest';
import HeraderTopRequest from './components/Header/HeaderTop/HeaderTopRequest';
import HeraderTopAddFlatForm from './components/Header/HeaderTop/HeaderTopAddFlatForm';
import HeaderAddButtonHoc from './HOC/HeaderAddButtonHoc';
import MyPosts from './components/Posts/MyPosts';
import Favorit from './components/Posts/Favorit/favorit';
import personalPost from './components/Posts/personalPost';
import sortListSection from './components/SortList/sortListSection';
import HeaderTopAddAgent from './components/Header/HeaderTop/HeaderTopAddAgent';
import { getUserRoleData } from './store/selector/getUserRole';
import ArchiveFilterAdmin from './components/archiveFilterAdmin';
import ApartamentAction from './components/NotificationsRequest/ApartamentAction';
import ApartamentsComparison from './components/NotificationsRequest/ApartamentsComparison';
import QueryActions from './components/NotificationsRequest/QueryActions';
import ErrorPage from './components/ErrorPage';
import ApartamentListWrapper from './components/ApartamentsList/ApartamentListWrapper';
import AgentDatabase from './components/AgentBaseBlacklist/AgentDatabase';
import Blacklist from './components/AgentBaseBlacklist/Blacklist';

const App = () => {
  const history = useHistory();
  const userRole = useSelector(getUserRoleData);
  if (userRole === 0) {
    history.push('/adminpage');
  } else if (userRole === 1) {
    history.push('/personalposts');
  }
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/myPosts" component={MyPosts} />
        <Route exact path="/favorites" component={Favorit} />
        <Route exact path="/personalposts" component={personalPost} />
        <Route path="/restorePassword" component={RestorePassword} />
        <Route path="/passwordRequest" component={PasswordRequest} />
        <Route path="/headerTop" render={HeaderTop} />
        <Route path="/heraderTopRequest" render={HeraderTopRequest} />
        <Route path="/HeraderTopAddFlatForm" render={HeraderTopAddFlatForm} />
        <Route path="/headerBottom" component={HeaderBottom} />
        <Route path="/headerBottomAllicon" component={HeaderBottomAllicon} />
        <Route path="/headerAddButton" component={HeaderAddButton} />
        <Route path="/addFloatForm" component={AddFloatForm} />
        <Route path="/addingRequest" component={AddingRequest} />
        <Route path="/searchFilter" component={SearchFilter} />
        <Route path="/sortList" component={SortList} />
        <Route path="/apartamentsList" component={ApartamentListWrapper} />
        <Route path="/combineApartaments" component={CombineApartaments} />
        <Route path="/notification" component={Notification} />
        <Route path="/hideAnnouncements" component={HideAnnouncements} />
        <Route path="/hideApartament" component={HideApartament} />
        <Route path="/aboutAgent" component={AboutAgent} />
        <Route path="/addAgent" component={AddAgent} />
        <Route path="/notificationRequest" component={NotificationRequest} />
        <Route path="/headerAddButtonHoc" component={HeaderAddButtonHoc} />
        <Route path="/adminpage" component={sortListSection} />
        <Route path="/agentBaseList" component={AgentDatabase} />
        <Route path="/agentBaseBlackList" component={Blacklist} />
        <Route path="/headertopaddagent" component={HeaderTopAddAgent} />
        <Route path="/ArchiveFilterAdmin" component={ArchiveFilterAdmin} />
        <Route path="/apartamentAction" component={ApartamentAction} />
        <Route path="/apartamentsComparison" component={ApartamentsComparison} />
        <Route path="/queryActions" component={QueryActions} />
        <Route path="*" render={() => <ErrorPage />} />
      </Switch>
    </div>
  );
};

export default App;
