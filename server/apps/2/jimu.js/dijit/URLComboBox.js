///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dojo/_base/html',
  'dijit/form/ComboBox',
  'dojox/validate/regexp'],
function(declare, html, ComboBox, regexp) {
  return declare([ComboBox], {
    required:true,
    invalidMessage:"Invalid url.",
    trim: true,
    rest:true,
    allowNamed: true,
    allLocal: false,
    declaredClass: 'jimu.dijit.URLComboBox',

    postMixInProperties:function(){
      this.inherited(arguments);
      // TODO: urlComboBox should be use on next version.
      this.nls = window.jimuNls.urlInput;
      this.invalidMessage = this.nls.invalidUrl;
    },

    postCreate: function(){
      this.inherited(arguments);
      html.addClass(this.domNode, 'jimu-url-combobox');
    },

    validator:function(value){
      var strReg = '^' + regexp.url({
        allowNamed: this.allowNamed,
        allLocal: this.allLocal
      });
      var reg = new RegExp(strReg,'g');
      var b1 = reg.test(value);

      if(this.rest){
        var p2 = /\/rest\/services/gi;
        var b2 = p2.test(value);
        return b1 && b2;
      }
      else{
        return b1;
      }
    }
  });
});