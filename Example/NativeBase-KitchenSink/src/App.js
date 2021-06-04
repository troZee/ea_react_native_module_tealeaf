import React from "react";
import { Root } from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
// import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Header from "./screens/Header/";
import Header1 from "./screens/Header/1";
import Header2 from "./screens/Header/2";
import Header3 from "./screens/Header/3";
import Header4 from "./screens/Header/4";
import Header5 from "./screens/Header/5";
import Header6 from "./screens/Header/6";
import Header7 from "./screens/Header/7";
import Header8 from "./screens/Header/8";
import HeaderSpan from "./screens/Header/header-span";
import HeaderNoShadow from "./screens/Header/header-no-shadow";
import HeaderTransparent from "./screens/Header/header-transparent";
import BasicFooter from "./screens/footer/basicFooter";
import IconFooter from "./screens/footer/iconFooter";
import IconText from "./screens/footer/iconText";
import BadgeFooter from "./screens/footer/badgeFooter";
import Default from "./screens/button/default";
import Outline from "./screens/button/outline";
import Rounded from "./screens/button/rounded";
import Block from "./screens/button/block";
import Full from "./screens/button/full";
import Custom from "./screens/button/custom";
import Transparent from "./screens/button/transparent";
import IconBtn from "./screens/button/iconBtn";
import Disabled from "./screens/button/disabled";
import BasicCard from "./screens/card/basic";
import NHCardItemBordered from "./screens/card/carditem-bordered";
import NHCardItemButton from "./screens/card/carditem-button";
import NHCardImage from "./screens/card/card-image";
import NHCardShowcase from "./screens/card/card-showcase";
import NHCardList from "./screens/card/card-list";
import NHCardHeaderAndFooter from "./screens/card/card-header-and-footer";
import NHCardTransparent from "./screens/card/card-transparent";
import NHCardCustomBorderRadius from "./screens/card/card-custom-border-radius";
import BasicFab from "./screens/fab/basic";
import MultipleFab from "./screens/fab/multiple";
import FixedLabel from "./screens/form/fixedLabel";
import InlineLabel from "./screens/form/inlineLabel";
import FloatingLabel from "./screens/form/floatingLabel";
import PlaceholderLabel from "./screens/form/placeholder";
import StackedLabel from "./screens/form/stacked";
import RegularInput from "./screens/form/regular";
import UnderlineInput from "./screens/form/underline";
import RoundedInput from "./screens/form/rounded";
import IconInput from "./screens/form/iconInput";
import SuccessInput from "./screens/form/success";
import ErrorInput from "./screens/form/error";
import DisabledInput from "./screens/form/disabledInput";
import PickerInput from "./screens/form/pickerInput";
import Icons from "./screens/icon/icon";
import BasicIcon from "./screens/icon/basic";
import StateIcon from "./screens/icon/state";
import PlatformSpecificIcon from "./screens/icon/platform-specific";
import IconFamily from "./screens/icon/icon-family";
import RowNB from "./screens/layout/row";
import ColumnNB from "./screens/layout/column";
import NestedGrid from "./screens/layout/nested";
import CustomRow from "./screens/layout/customRow";
import CustomCol from "./screens/layout/customCol";
import BasicListSwipe from "./screens/listSwipe/basic-list-swipe";
import SwipeRowCustomStyle from "./screens/listSwipe/swipe-row-style";
import MultiListSwipe from "./screens/listSwipe/multi-list-swipe";
import NHBasicList from "./screens/list/basic-list";
import NHListItemSelected from "./screens/list/listitem-selected";
import NHListDivider from "./screens/list/list-divider";
import NHListSeparator from "./screens/list/list-separator";
import NHListHeader from "./screens/list/list-headers";
import NHListIcon from "./screens/list/list-icon";
import NHListAvatar from "./screens/list/list-avatar";
import NHListThumbnail from "./screens/list/list-thumbnail";
import NHListItemNoIndent from "./screens/list/listitem-noIndent";
import RegularPicker from "./screens/picker/regularPicker";
import PickerWithIcon from "./screens/picker/picker-with-icon";
import PlaceholderPicker from "./screens/picker/placeholderPicker";
import PlaceholderPickerNote from "./screens/picker/placeholderPickernote";
import BackButtonPicker from "./screens/picker/backButtonPicker";
import PickerTextItemText from "./screens/picker/picker-text-itemtext";
import HeaderPicker from "./screens/picker/headerPicker";
import HeaderStylePicker from "./screens/picker/headerStylePicker";
import CustomHeaderPicker from "./screens/picker/customHeaderPicker";
import BasicTab from "./screens/tab/basicTab";
import ConfigTab from "./screens/tab/configTab";
import ScrollableTab from "./screens/tab/scrollableTab";
import BasicSegment from "./screens/segment/SegmentHeader";
import SegmentHeaderIcon from "./screens/segment/SegmentHeaderIcon";
import BasicToast from "./screens/toast/basic-toast";
import ToastDuration from "./screens/toast/toast-duration";
import ToastPosition from "./screens/toast/toast-position";
import ToastType from "./screens/toast/toast-type";
import ToastText from "./screens/toast/toast-text";
import ToastButton from "./screens/toast/toast-button";
import RegularActionSheet from "./screens/actionsheet/regular";
import IconActionSheet from "./screens/actionsheet/icon";
import AdvSegment from "./screens/segment/segmentTab";
import SimpleDeck from "./screens/deckswiper/simple";
import AdvancedDeck from "./screens/deckswiper/advanced";
import HeaderNoLeft from "./screens/Header/header-noLeft";
import NHCustomRadio from "./screens/radio/custom";
import NHDefaultRadio from "./screens/radio/default";
import PickerWithIconStyle from "./screens/picker/picker-with-iconstyle";
import AccordionDefault from "./screens/accordion/accordion-default";
import AccordionIcon from "./screens/accordion/accordion-icon";
import AccordionIconStyle from "./screens/accordion/accordion-icon-style";
import AccordionHeaderContentStyle from "./screens/accordion/accordion-header-content-style";
import AccordionCustomHeaderContent from "./screens/accordion/accordion-custom-header-content";

import Home from "./screens/home/";
import Anatomy from "./screens/anatomy/";
import Footer from "./screens/footer/";
import NHBadge from "./screens/badge/";
import NHButton from "./screens/button/";
import NHCard from "./screens/card/";
import NHCheckbox from "./screens/checkbox/";
import NHDeckSwiper from "./screens/deckswiper/";
import NHFab from "./screens/fab/";
import NHForm from "./screens/form/";
import TextArea from "./screens/form/textArea";
import NHIcon from "./screens/icon/";
import ListSwipe from "./screens/listSwipe/";
import NHLayout from "./screens/layout/";
import NHList from "./screens/list/";
import NHRadio from "./screens/radio/";
import NHSearchbar from "./screens/searchbar/";
import NHSpinner from "./screens/spinner/";
import NHPicker from "./screens/picker/";
import NHTab from "./screens/tab/";
import NHThumbnail from "./screens/thumbnail/";
import NHTypography from "./screens/typography/";
import SideBar from "./screens/sidebar";
import Segment from "./screens/segment";
import NHToast from "./screens/toast/";
import Actionsheet from "./screens/actionsheet";
import NHAccordion from "./screens/accordion/";
import NHDatePicker from "./screens/datepicker/";

import ErrorPage from "./screens/error/";
import Network from "./screens/network/";
import Map from "./screens/map/";

const Drawer = createDrawerNavigator();
function DrawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName = "Home"
      drawerContentOptions={{
        activeTintColor: "#e91e63"
      }}
      >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Anatomy" component={Anatomy} />
      <Drawer.Screen name="ErrorPage" component={ErrorPage} />
      <Drawer.Screen name="Network" component={Network} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Header" component={Header} />
      <Drawer.Screen name="Footer" component={Footer} />
      <Drawer.Screen name="NHBadge" component={NHBadge} />
      <Drawer.Screen name="NHButton" component={NHButton} />
      <Drawer.Screen name="NHCard" component={NHCard} />
      <Drawer.Screen name="NHCheckbox" component={NHCheckbox} />
      <Drawer.Screen name="NHDeckSwiper" component={NHDeckSwiper} />
      <Drawer.Screen name="NHFab" component={NHFab} />
      <Drawer.Screen name="NHForm" component={NHForm} />
      <Drawer.Screen name="NHIcon" component={NHIcon} />
      <Drawer.Screen name="NHLayout" component={NHLayout} />
      <Drawer.Screen name="NHList" component={NHList} />
      <Drawer.Screen name="ListSwipe" component={ListSwipe} />
      <Drawer.Screen name="NHRadio" component={NHRadio} />
      <Drawer.Screen name="NHSearchbar" component={NHSearchbar} />
      <Drawer.Screen name="NHSpinner" component={NHSpinner} />
      <Drawer.Screen name="NHPicker" component={NHPicker} />
      <Drawer.Screen name="NHTab" component={NHTab} />
      <Drawer.Screen name="NHThumbnail" component={NHThumbnail} />
      <Drawer.Screen name="NHTypography" component={NHTypography} />
      <Drawer.Screen name="Segment" component={Segment} />
      <Drawer.Screen name="NHToast" component={NHToast} />
      <Drawer.Screen name="Actionsheet" component={Actionsheet} />
      <Drawer.Screen name="NHAccordion" component={NHAccordion} />
      <Drawer.Screen name="NHDatePicker" component={NHDatePicker} />
    </Drawer.Navigator>
  );
}

// const Drawer = createDrawerNavigator(
//     contentComponent: props => <SideBar {...props} />
//   }
// );

const Stack = createStackNavigator();
function StackNav() {
  return (
      <Stack.Navigator initialRouteName="Drawer" headerMode="none">
        <Stack.Screen name="Drawer" component={DrawerNav} />
        <Stack.Screen name="ErrorPage" component={ErrorPage} />
        <Stack.Screen name="Network" component={Network} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Header1" component={Header1} />
        <Stack.Screen name="Header2" component={Header2} />
        <Stack.Screen name="Header3" component={Header3} />
        <Stack.Screen name="Header4" component={Header4} />
        <Stack.Screen name="Header5" component={Header5} />
        <Stack.Screen name="Header6" component={Header6} />
        <Stack.Screen name="Header7" component={Header7} />
        <Stack.Screen name="Header8" component={Header8} />
        <Stack.Screen name="HeaderSpan" component={HeaderSpan} />
        <Stack.Screen name="HeaderNoShadow" component={HeaderNoShadow} />
        <Stack.Screen name="HeaderNoLeft" component={HeaderNoLeft} />
        <Stack.Screen name="HeaderTransparent" component={HeaderTransparent} />
        <Stack.Screen name="BasicFooter" component={BasicFooter} />
        <Stack.Screen name="IconFooter" component={IconFooter} />
        <Stack.Screen name="IconText" component={IconText} />
        <Stack.Screen name="BadgeFooter" component={BadgeFooter} />
        <Stack.Screen name="Default" component={Default} />
        <Stack.Screen name="Outline" component={Outline} />
        <Stack.Screen name="Rounded" component={Rounded} />
        <Stack.Screen name="Block" component={Block} />
        <Stack.Screen name="Full" component={Full} />
        <Stack.Screen name="Custom" component={Custom} />
        <Stack.Screen name="Transparent" component={Transparent} />
        <Stack.Screen name="IconBtn" component={IconBtn} />
        <Stack.Screen name="Disabled" component={Disabled} />
        <Stack.Screen name="BasicCard" component={BasicCard} />
        <Stack.Screen name="NHCardItemBordered" component={NHCardItemBordered} />
        <Stack.Screen name="NHCardItemButton" component={NHCardItemButton} />
        <Stack.Screen name="NHCardImage" component={NHCardImage} />
        <Stack.Screen name="NHCardShowcase" component={NHCardShowcase} />
        <Stack.Screen name="NHCardList" component={NHCardList} />
        <Stack.Screen name="NHCardHeaderAndFooter" component={NHCardHeaderAndFooter} />
        <Stack.Screen name="NHCardTransparent" component={NHCardTransparent} />
        <Stack.Screen name="NHCardCustomBorderRadius" component={NHCardCustomBorderRadius} />
        <Stack.Screen name="SimpleDeck" component={SimpleDeck} />
        <Stack.Screen name="AdvancedDeck" component={AdvancedDeck} />
        <Stack.Screen name="BasicFab" component={BasicFab} />
        <Stack.Screen name="MultipleFab" component={MultipleFab} />
        <Stack.Screen name="FixedLabel" component={FixedLabel} />
        <Stack.Screen name="InlineLabel" component={InlineLabel} />
        <Stack.Screen name="FloatingLabel" component={FloatingLabel} />
        <Stack.Screen name="PlaceholderLabel" component={PlaceholderLabel} />
        <Stack.Screen name="StackedLabel" component={StackedLabel} />
        <Stack.Screen name="RegularInput" component={RegularInput} />
        <Stack.Screen name="UnderlineInput" component={UnderlineInput} />
        <Stack.Screen name="RoundedInput" component={RoundedInput} />
        <Stack.Screen name="IconInput" component={IconInput} />
        <Stack.Screen name="SuccessInput" component={SuccessInput} />
        <Stack.Screen name="ErrorInput" component={ErrorInput} />
        <Stack.Screen name="DisabledInput" component={DisabledInput} />
        <Stack.Screen name="PickerInput" component={PickerInput} />
        <Stack.Screen name="TextArea" component={TextArea} />
        <Stack.Screen name="Icons" component={Icons} />
        <Stack.Screen name="BasicIcon" component={BasicIcon} />
        <Stack.Screen name="StateIcon" component={StateIcon} />
        <Stack.Screen name="PlatformSpecificIcon" component={PlatformSpecificIcon} />
        <Stack.Screen name="IconFamily" component={IconFamily} />
        <Stack.Screen name="RowNB" component={RowNB} />
        <Stack.Screen name="ColumnNB" component={ColumnNB} />
        <Stack.Screen name="NestedGrid" component={NestedGrid} />
        <Stack.Screen name="CustomRow" component={CustomRow} />
        <Stack.Screen name="CustomCol" component={CustomCol} />
        <Stack.Screen name="NHBasicList" component={NHBasicList} />
        <Stack.Screen name="NHListItemSelected" component={NHListItemSelected} />
        <Stack.Screen name="NHListDivider" component={NHListDivider} />
        <Stack.Screen name="NHListSeparator" component={NHListSeparator} />
        <Stack.Screen name="NHListHeader" component={NHListHeader} />
        <Stack.Screen name="NHListIcon" component={NHListIcon} />
        <Stack.Screen name="NHListAvatar" component={NHListAvatar} />
        <Stack.Screen name="NHListThumbnail" component={NHListThumbnail} />
        <Stack.Screen name="NHListItemNoIndent" component={NHListItemNoIndent} />
        <Stack.Screen name="BasicListSwipe" component={BasicListSwipe} />
        <Stack.Screen name="SwipeRowCustomStyle" component={SwipeRowCustomStyle} />
        <Stack.Screen name="MultiListSwipe" component={MultiListSwipe} />
        <Stack.Screen name="RegularPicker" component={RegularPicker} />
        <Stack.Screen name="PickerWithIcon" component={PickerWithIcon} />
        <Stack.Screen name="PlaceholderPicker" component={PlaceholderPicker} />
        <Stack.Screen name="PlaceholderPickerNote" component={PlaceholderPickerNote} />
        <Stack.Screen name="BackButtonPicker" component={BackButtonPicker} />
        <Stack.Screen name="PickerTextItemText" component={PickerTextItemText} />
        <Stack.Screen name="HeaderStylePicker" component={HeaderStylePicker} />
        <Stack.Screen name="CustomHeaderPicker" component={CustomHeaderPicker} />
        <Stack.Screen name="PickerWithIconStyle" component={PickerWithIconStyle} />
        <Stack.Screen name="NHCustomRadio" component={NHCustomRadio} />
        <Stack.Screen name="NHDefaultRadio" component={NHDefaultRadio} />
        <Stack.Screen name="BasicTab" component={BasicTab} />
        <Stack.Screen name="ConfigTab" component={ConfigTab} />
        <Stack.Screen name="ScrollableTab" component={ScrollableTab} />
        <Stack.Screen name="BasicSegment" component={BasicSegment} />
        <Stack.Screen name="AdvSegment" component={AdvSegment} />
        <Stack.Screen name="SegmentHeaderIcon" component={SegmentHeaderIcon} />
        <Stack.Screen name="BasicToast" component={BasicToast} />
        <Stack.Screen name="ToastDuration" component={ToastDuration} />
        <Stack.Screen name="ToastPosition" component={ToastPosition} />
        <Stack.Screen name="ToastType" component={ToastType} />
        <Stack.Screen name="ToastText" component={ToastText} />
        <Stack.Screen name="ToastButton" component={ToastButton} />
        <Stack.Screen name="RegularActionSheet" component={RegularActionSheet} />
        <Stack.Screen name="IconActionSheet" component={IconActionSheet} />
        <Stack.Screen name="AccordionDefault" component={AccordionDefault} />
        <Stack.Screen name="AccordionIcon" component={AccordionIcon} />
        <Stack.Screen name="AccordionIconStyle" component={AccordionIconStyle} />
        <Stack.Screen name="AccordionHeaderContentStyle" component={AccordionHeaderContentStyle} />
        <Stack.Screen name="AccordionCustomHeaderContent" component={AccordionCustomHeaderContent} />
      </Stack.Navigator>
  );
}

import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;
import {TLTRN} from "../node_modules/react-native-acoustic-ea-tealeaf/lib/TLTRN";

let currentScreen = "Home";
let prevScreen = null;
// Review code and performance
// TLTRN.init(currentScreen, 1);

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default () =>
  <Root>
    <NavigationContainer onNavigationStateChange={(prevState, currentState) => {
            currentScreen = getCurrentRouteName(currentState);
            prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
                // the line below uses the Google Analytics tracker
                // change the tracker here to use other Mobile analytics SDK.
                console.log("currentScreen:",currentScreen);
                TLTRN.currentScreen = currentScreen;
            }
        }}>
      <StackNav/>
    </NavigationContainer>
  </Root>;


