/* 
 * ActionBar Helper Class for Appcelerator Titanium
 * Author: Ricardo Alcocer
 * 
 * Licensed under the MIT License (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://alco.mit-license.org/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default class ActionBarHelper {  
  constructor(window) {
    if (!Ti.Platform.osname === 'android') {
      return;
    }

    this.win = window;
    this.activity = win.getActivity();
    this.actionBar = this.activity.actionBar;
  }

  setTitle(title) {
    if (!_isValidActivity()) {
      return;
    }

    this.actionBar.title = title;
  }

  setUpAction(action) {
    if (!_isValidActivity()) {
      return;
    }

    if (action) {
      that.actionBar.displayHomeAsUp = true;
      that.actionBar.onHomeIconItemSelected = action;
    } else {
      that.actionBar.displayHomeAsUp = false;
      that.actionBar.onHomeIconItemSelected = null;
    }
  }

  setBackgroundImage(image) {
    if (!_isValidActivity()) {
      return;
    }

    that.actionBar.backgroundImage = image;
  }

  setIcon(icon) {
    if (!_isValidActivity()) {
      return;
    }

    that.actionBar.icon = icon;
    that.actionBar.logo = icon;
  }

  hide() {
    if (!_isValidActivity()) {
      return;
    }

    that.actionBar.hide();
  }

  show() {
    if (!_isValidActivity()) {
      return;
    }

    that.actionBar.show();
  }

  reloadMenu() {
    if (!_isValidActivity()) {
      return;
    }

    that.activity.invalidateOptionsMenu();
  }
  
  _isValidActivity() {
    if (!this.activity) {
      Ti.API.error('Unable to get activity. Did you open your window alread?');
      return false;
    }

    if (that.actionBar) {
      Ti.API.error('No ActionBar available');
      return false
    }
    
    return true;
  }
}
