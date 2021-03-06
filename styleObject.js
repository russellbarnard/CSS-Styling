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
     if(this.attribute == 'margin')
     {
         var margin = this.current.split(' ');
         var t=0,r=0,b=0,l=0; 
         if(margin.length == 1){
            t=margin[0],r=margin[0],b=margin[0],l=margin[0];  
         }else if(margin.length == 2){
            t=margin[0],r=margin[1],b=margin[0],l=margin[1];  
         }else if(margin.length == 4){
            t=margin[0],r=margin[1],b=margin[2],l=margin[3];  
         }
         this.html = '<label class="'+this.labelClass+'-t">Top Margin</label><div class="'+this.settingClass+'-t">';
         this.html += '<input type="text" class="'+this.id+'_input-t" value="'+t+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-r">Right Margin</label><div class="'+this.settingClass+'-r">';
         this.html += '<input type="text" class="'+this.id+'_input-r" value="'+r+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-b">Bottom Margin</label><div class="'+this.settingClass+'-b">';
         this.html += '<input type="text" class="'+this.id+'_input-b" value="'+b+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-l">Left Margin</label><div class="'+this.settingClass+'-l">';
         this.html += '<input type="text" class="'+this.id+'_input-l" value="'+l+'"/></div>';
     }
     if(this.attribute == 'padding')
     {
         var margin = this.current.split(' ');
         var t=0,r=0,b=0,l=0; 
         if(margin.length == 1){
            t=margin[0],r=margin[0],b=margin[0],l=margin[0];  
         }else if(margin.length == 2){
            t=margin[0],r=margin[1],b=margin[0],l=margin[1];  
         }else if(margin.length == 4){
            t=margin[0],r=margin[1],b=margin[2],l=margin[3];  
         }
         this.html = '<label class="'+this.labelClass+'-t">Top Padding</label><div class="'+this.settingClass+'-t">';
         this.html += '<input type="text" class="'+this.id+'_input-t" value="'+t+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-r">Right Padding</label><div class="'+this.settingClass+'-r">';
         this.html += '<input type="text" class="'+this.id+'_input-r" value="'+r+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-b">Bottom Padding</label><div class="'+this.settingClass+'-b">';
         this.html += '<input type="text" class="'+this.id+'_input-b" value="'+b+'"/></div>';
       
         this.html += '<label class="'+this.labelClass+'-l">Left Padding</label><div class="'+this.settingClass+'-l">';
         this.html += '<input type="text" class="'+this.id+'_input-l" value="'+l+'"/></div>';
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
         +'<option value="normal"'+(this.current == "normal" ? " selected" : "")+'>normal</option>'
         +'<option value="bold"'+(this.current == "bold" ? " selected" : "")+'>bold</option>'
         +'<option value="bolder"'+(this.current == "bolder" ? " selected" : "")+'>bolder</option>'
         +'<option value="lighter"'+(this.current == "lighter" ? " selected" : "")+'>lighter</option>'
         +'</select></div>';
     }
     else if(this.attribute == 'font-family')
     {
         this.html = '<label class="'+this.labelClass+'">Font Face</label><div class="'+this.settingClass+'">';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="arial"'+(this.current == "arial" ? " selected" : "")+'>Arial</option>'
         +'<option value="\'times new roman\'"'+(this.current == "\'times new roman\'" ? " selected" : "")+'>Times New Roman</option>'
         +'</select></div>';
     }
     else if(this.attribute == 'text-align')
     {
         this.html = '<label class="'+this.labelClass+'">Align Text</label><div class="'+this.settingClass+'">';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="left"'+(this.current == "left" ? " selected" : "")+'>Left</option>'
         +'<option value="right"'+(this.current == "right" ? " selected" : "")+'>Right</option>'
         +'<option value="center"'+(this.current == "center" ? " selected" : "")+'>Center</option>'
         +'</select></div>';
     }
     this.display();
};
styleObject.prototype.getString = function() { 
    return this.input_string.val();
};
styleObject.prototype.display = function() { 
    this.selector.html(this.html);

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
    if(this.attribute == 'margin' || this.attribute == 'padding'){
      jQuery("."+this.id+"_input-t, ."+this.id+"_input-r, ."+this.id+"_input-b, ."+this.id+"_input-l").unbind('keyup').keyup(function(){
        var string = that.validatePixelsPercent(jQuery("."+that.id+"_input-t").val());
        string += ' '+that.validatePixelsPercent(jQuery("."+that.id+"_input-r").val());
        string += ' '+that.validatePixelsPercent(jQuery("."+that.id+"_input-b").val());
        string += ' '+that.validatePixelsPercent(jQuery("."+that.id+"_input-l").val());
        that.updateString(string);
      });
      jQuery("."+this.id+"_input-t, ."+this.id+"_input-r, ."+this.id+"_input-b, ."+this.id+"_input-l").unbind('blur').blur(function(){
            jQuery("."+that.id+"_input-t").val(that.validatePixelsPercent(jQuery("."+that.id+"_input-t").val()));
            jQuery("."+that.id+"_input-r").val(that.validatePixelsPercent(jQuery("."+that.id+"_input-r").val()));
            jQuery("."+that.id+"_input-b").val(that.validatePixelsPercent(jQuery("."+that.id+"_input-b").val()));
            jQuery("."+that.id+"_input-l").val(that.validatePixelsPercent(jQuery("."+that.id+"_input-l").val()));
       });
    }else if(this.attribute == 'font-weight' || this.attribute == 'font-family' || this.attribute == 'text-align')
    {
         //on change
        jQuery("."+this.id+"_input").unbind('change').change(function(){
            that.updateString(jQuery("."+that.id+"_input").val());
         });
    }else if(this.attribute == 'height' || this.attribute == 'width')
    {
         //on keyup
        jQuery("."+this.id+"_input").unbind('keyup').keyup(function(){
            that.updateString(that.validatePixelsPercent(jQuery("."+that.id+"_input").val()));
         });
        jQuery("."+this.id+"_input").unbind('blur').blur(function(){
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
