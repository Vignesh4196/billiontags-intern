import { CommonActions } from '@react-navigation/native';

// Clears the whole stack and lands on the login screen (after delete / deactivate / logout).
export function resetToLogin(navigation, reason) {
  navigation.reset({ index: 0, routes: [{ name: 'Login', params: { reason } }] });
}

function lastIndexOf(routes, name) {
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i].name === name) return i;
  }
  return -1;
}

// Swaps every screen from `flowStart` onward for `name`. Used once a flow's action has
// gone through (disconnected, restored...) so back can't reopen its form steps.
// Does nothing if the user already left the flow (flowStart is no longer in the stack),
// so a late response can't remove the screen they are on now.
export function finishFlow(navigation, flowStart, name, params) {
  const state = navigation.getState();
  const start = lastIndexOf(state.routes, flowStart);
  if (start === -1) return;
  const routes = [...state.routes.slice(0, start), { name, params }];
  navigation.dispatch(CommonActions.reset({ ...state, routes, index: routes.length - 1 }));
}

// The invite flow can start from Our space, Partner settings, My profile or Space
// disconnected; return to whichever screen opened Invite partner. React Navigation 7's
// navigate() would push a second copy of that screen instead of going back to it.
export function exitInviteFlow(navigation) {
  const { routes = [], index = 0 } = navigation.getState() || {};
  const start = lastIndexOf(routes, 'InvitePartner');
  if (start > 0) {
    navigation.pop(index - start + 1);
  } else {
    navigation.popToTop();
  }
}
