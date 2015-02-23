var styleObject = function (attribute, selector, input_string, current) {
  console.log('instance created');
     this.id = 'css'+guidGenerator();
     this.attribute = attribute;
     this.current = current;
     this.selector = selector;
     this.input_string = input_string;
     this.html = '';

     this.setup();
};
styleObject.prototype.setup = function() { 
    if(this.attribute == 'color')
     {
        this.html = '<label>Text Colour</label>';
         this.html += '<input type="text" class="'+this.id+'_input"/><em id="'+this.id+'_log"></em>';
     }else if(this.attribute == 'font-weight')
     {
        this.html = '<label>Font Weight</label>';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="normal">normal</option>'
         +'<option value="bold">bold</option>'
         +'<option value="bolder">bolder</option>'
         +'<option value="lighter">lighter</option>'
         +'</select>';
     }else if(this.attribute == 'font-family')
     {
        this.html = '<label>Font Face</label>';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="arial">Arial</option>'
         +'<option value="\'times new roman\'">Times New Roman</option>'
         +'</select>';
     }else if(this.attribute == 'text-align')
     {
        this.html = '<label>Align Text</label>';
         this.html += '<select class="'+this.id+'_input">'
         +'<option value="left">Left</option>'
         +'<option value="right">Right</option>'
         +'<option value="center">Center</option>'
         +'</select>';
     }
};
styleObject.prototype.getString = function() { 
    return this.input_string.val();
};
styleObject.prototype.display = function() { 
    this.selector.append(this.html);

    this.events(); //Run events
};
styleObject.prototype.updateString = function(value) { 
    console.log(value);
    var getCurrent = this.input_string.val();
    var newStr = '';
    //Check for mention in string
     if (getCurrent.indexOf(this.attribute) !=-1){
         //already in string remove and add anew
         var re = new RegExp(this.attribute+"(.*?);","g");
         newStr = getCurrent.replace(re, "");
         newStr = newStr.trim();
        newStr = newStr+this.attribute+':'+value+';';
     }else{
         //does not contain add to end
         newStr = getCurrent+this.attribute+':'+value+';';
     }
     this.input_string.val(newStr);
};
styleObject.prototype.events = function() { 
    //Add events to track input changes which will need to update the css string
     var that = this;
     console.log(this.attribute);
    //Group all attributes that use an on change event
    if(this.attribute == 'font-weight' || this.attribute == 'font-family' || this.attribute == 'text-align')
    {
         //on change
        jQuery("."+this.id+"_input").change(function(){
            console.log(jQuery("."+that.id+"_input").val());
            that.updateString(jQuery("."+that.id+"_input").val());
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
            }
        });
     }
};
/////////////
//Usage
var test1 = new styleObject('color', jQuery('.test-this1'), jQuery('.test-input'), '#ff0000');
test1.display();