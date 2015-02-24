var styleObject = function (attribute, selector, input_string, current) {
     console.log('instance created');
     this.id = 'css'+guidGenerator();
     this.attribute = attribute;
     this.current = current;
     this.selector = selector;
     this.input_string = input_string;
     this.html = '';
     this.labelClass = 'styleObject-label';
     this.settingClass = 'styleObject-setting'

     this.setup();
};
styleObject.prototype.setup = function() { 
     if(this.attribute == 'color')
     {
         this.html = '<label class="'+this.labelClass+'">Text Colour</label><div class="'+this.settingClass+'">';
         this.html += '<input type="text" class="'+this.id+'_input"/></div>';
     }
     if(this.attribute == 'background-color')
     {
         this.html = '<label class="'+this.labelClass+'">Background Colour</label><div class="'+this.settingClass+'">';
         this.html += '<input type="text" class="'+this.id+'_input"/></div>';
     }
     if(this.attribute == 'height')
     {
         this.html = '<label class="'+this.labelClass+'">Height</label><div class="'+this.settingClass+'">';
         this.html += '<input type="text" class="'+this.id+'_input" value="'+this.current+'"/></div>';
     }
     if(this.attribute == 'width')
     {
         this.html = '<label class="'+this.labelClass+'">Width</label><div class="'+this.settingClass+'">';
         this.html += '<input type="text" class="'+this.id+'_input" value="'+this.current+'"/></div>';
     }
     else if(this.attribute == 'font-weight')
     {
         this.html = '<label class="'+this.labelClass+'">Font Weight</label><div class="'+this.settingClass+'">';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="normal">normal</option>'
         +'<option value="bold">bold</option>'
         +'<option value="bolder">bolder</option>'
         +'<option value="lighter">lighter</option>'
         +'</select></div>';
     }
     else if(this.attribute == 'font-family')
     {
         this.html = '<label class="'+this.labelClass+'">Font Face</label><div class="'+this.settingClass+'">';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="arial">Arial</option>'
         +'<option value="\'times new roman\'">Times New Roman</option>'
         +'</select></div>';
     }
     else if(this.attribute == 'text-align')
     {
         this.html = '<label class="'+this.labelClass+'">Align Text</label><div class="'+this.settingClass+'">';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="left">Left</option>'
         +'<option value="right">Right</option>'
         +'<option value="center">Center</option>'
         +'</select></div>';
     }
     this.display();
};
styleObject.prototype.getString = function() { 
    return this.input_string.val();
};
styleObject.prototype.display = function() { 
    this.selector.append(this.html);

    this.events(); //Run events
};
styleObject.prototype.updateString = function(value) { 
    var getCurrent = this.input_string.val();
    var newStr = '';
    //Check for mention in string
     if (getCurrent.indexOf(this.attribute) !=-1){
         //already in string remove and add anew
         var re = new RegExp("(^|;)("+this.attribute+"(.*?)(;))","gim");
         newStr = getCurrent.replace(re, "$1");
         newStr = newStr.trim();
         newStr = newStr+this.attribute+':'+value+';';
     }else{
         //does not contain add to end
         newStr = getCurrent+this.attribute+':'+value+';';
     }
     this.input_string.val(newStr);
     this.input_string.attr('style', newStr)
};
styleObject.prototype.validatePixelsPercent = function(input) { 
    var output = '';
    var tmp;

    tmp = parseInt( input.replace(/^[^1-9]*/, '') );
    if ( tmp != 'NaN' ) {
      if ( tmp + '%' == input ) {
        output = tmp + '%';
      } else if ( tmp + 'em' == input ) {
        output = tmp + 'em';
      } else {
        output = tmp + 'px';
      }
    }
    return output;
};
styleObject.prototype.events = function() { 
    //Add events to track input changes which will need to update the css string
     var that = this;
    //Group all attributes that use an on change event
    if(this.attribute == 'font-weight' || this.attribute == 'font-family' || this.attribute == 'text-align')
    {
         //on change
        jQuery("."+this.id+"_input").change(function(){
            that.updateString(jQuery("."+that.id+"_input").val());
         });
    }else if(this.attribute == 'height' || this.attribute == 'width')
    {
         //on keyup
        jQuery("."+this.id+"_input").keyup(function(){
            that.updateString(that.validatePixelsPercent(jQuery("."+that.id+"_input").val()));
         });
        jQuery("."+this.id+"_input").blur(function(){
            jQuery("."+that.id+"_input").val(that.validatePixelsPercent(jQuery("."+that.id+"_input").val()));
         });
    }else if(this.attribute == 'color' || this.attribute == 'background-color')
    {
        //on click of colour box
        jQuery("."+this.id+"_input").spectrum({
            color: that.current,
            preferredFormat: "hex",
            showInput: true,
            showInitial: true,
            showButtons: false,
            change: function(color) {
                jQuery("#"+that.id+"_log").text("hex: " + color.toHexString());
                 that.updateString(color.toHexString());
            },
            hide: function(color) {
                jQuery("#"+that.id+"_log").text("hex: " + color.toHexString());
                 that.updateString(color.toHexString());
            }
        });
     }
};
/////////////
//Usage
var test1 = new styleObject('color', jQuery('.test-this1'), jQuery('.test-input'), '#ff0000');
