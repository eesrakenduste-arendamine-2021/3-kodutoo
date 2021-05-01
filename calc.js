var a = 0, b = 0, answer = 0;
var is_a = true, is_b = false;
var  first_a = true, first_b = true;
var  is_sub = false, is_softsub = false;
var  o = '';
var  display = jQuery('#total');

function  changeToX(x){
  if( x === '*' ){
    return '×';
  }else if( x === '/' ){
    return '÷';
  }else{
    return x;
  }
}

function setDisplay(x){
  display.text(changeToX(x));
}

function changeDisplay(i){
  display.text(display.text() + i);
}

function set_a(i){
  if(is_a){
    if(i === '.' && a.toString().indexOf('.') !== -1){
      i = '';
    }else if(i === '.' && first_a){
      i = '0.';
    }
    if(first_a === true){
      if(i === '0'){
        i = '';
      }else{
        setDisplay(i);
        first_a = false;
      }
    }else{
      changeDisplay(i);
    }
    a = display.text();
  }
}

function set_b(i){
  if(!is_a){
    if(i === '.' && b.toString().indexOf('.') !== -1){
      i = '';
    }else if(i === '.' && first_b){
      i = '0.';
    }
    if(first_b === true){
      if(i === '0'){
        i = '';
      }else{
        setDisplay(i);
        first_b = false;
      }
    }else{
      changeDisplay(i);
    }
    b = display.text();
  }
}

function loop(answer){
  a = answer;
  b = 0;
  answer = 0;
  setDisplay(a);
}

function set_o(op){
  if(is_sub){
    loop(display.text());
    is_sub = false;
  }
  if(!first_b){
    softsub();
  }

  setDisplay(op);
  o = op;

  if(is_a){ 
    is_a = false;
  }
  if(!is_b){ 
    is_b = true; 
  }
}

function softsub(){
  var preCalc = eval(a + '' + o + '' + b);
  answer = parseFloat(preCalc.toPrecision(10));
  display.text(answer);
  first_b = true;
  newResult(a,o,b,answer);

  a = answer;
  b = 0;
  o = o;

  setDisplay(o);
  is_a = false;
  is_b = true;
  first_b = true;
  is_softsub = true;
}

function submit(){
  if(first_b === false){
    var preCalc = 0;
    if(o === "^"){
        preCalc = Math.pow(a,b);
    } else{
        preCalc = eval(a + '' + o + '' + b);
    }
    answer = parseFloat(preCalc.toPrecision(10));

    display.text(answer);
    is_sub = true;
    first_b = true;
    newResult(a,o,b,answer);
  }else{
  }
}

function neg(){
  display.text(display.text() * -1);
  if (is_sub){
    a = a * -1;
  }else{
    if(is_a){
      a = a * -1;
      setDisplay(a);
    }else{
      b = b * -1;
      setDisplay(b);
    }
  }
}

function reset(){
  a = 0;
  b = 0;
  o = '';
  answer = 0;
  is_a = true;
  is_b = false;
  first_a = true;
  first_b = true;
  is_sub = false;
  is_softsub = false;
  display.text(0);

  setDisplay(0);
}


function memory(i){
  if(is_sub){
    loop(i);
  }else if(is_a){
    loop(i);
  }else{
    set_b(i);
  }
  answer = a;
}

function newResult(a,o,b,answer){
  var results = jQuery('#memory');
  var result = '' +
  '<li class="result"><span class="equation">' + a + ' ' +  changeToX(o) + ' ' + b + ' </span>' +
  '<span class="answer">' + answer + '</span> <span class="use"><a class="calc_use" href="#">Use</a></span></li>';
  results.prepend(result).children('li').fadeIn(200);
  if( jQuery('#default')){
    jQuery('#default').remove();
  }
  jQuery('.calc_use').off('click').on('click', function(){
    var i = jQuery(this).parent('.use').siblings('.answer').text();
    memory(i);
    return false;
  });
}

function sqrt(i){
  var s = Math.sqrt(i);
  answer = s;
  loop(s);
  newResult('','√',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function square(i){
  var s = i * i;
  answer = s;
  loop(s);
  newResult(i,' &#94; 2','',s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function denom(i){
  var s = 1 / i;
  answer = s;
  loop(s);
  newResult(1,' / ',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function cos(i){
  var s = Math.cos(i);
  answer = s;
  loop(s);
  newResult('','cos',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function tan(i){
  var s = Math.tan(i);
  answer = s;
  loop(s);
  newResult('','tan',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function sin(i){
  var s = Math.sin(i);
  answer = s;
  loop(s);
  newResult('','sin',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

function log(i){
  var s = Math.log(i);
  answer = s;
  loop(s);
  newResult('','ln',i,s);
  display.text(answer);
  is_sub = true;
  first_b = true;
}

jQuery('.number, #dot').each(function(){
  jQuery(this).click(function(){
    var value = jQuery(this).val();
    if(is_sub === false){
      if(is_a === true){
        set_a(value);
      }else{
        set_b(value);
      }
    }else{
      reset();
      set_a(value);
    }
  });
});

jQuery('.actions').each(function(){
  jQuery(this).click(function() {
    var value = jQuery(this).val();
    set_o(value);
  });
});

jQuery('#equalto').click(function(){
  submit();
});

jQuery('#clear').click(function(){
  reset();
});

jQuery('#change_sign').click(function(){
  neg();
});

jQuery('#sqrt').click(function(){
  if(display.text() !== '0'){
    if(is_sub){
      sqrt(answer);
    }else if(is_a){
      sqrt(a);
    }
  }
  return false;
});

jQuery('#square').click(function(){
  if(display.text() !== '0'){
    if(is_sub){
      square(answer);
    }else if(is_a){
      square(a);
    }
  }
  return false;
});

jQuery('#denom').click(function(){
  if(display.text() !== '0'){
    if(is_sub){
      denom(answer);
    }else if(is_a){
      denom(a);
    }
  }
  return false;
});

jQuery('#cos').click(function(){
  if(display.text()){
    if(is_sub){
      cos(answer);
    }else if(is_a){
      cos(a);
    }
  }
  return false;
});

jQuery('#tan').click(function(){
  if(display.text()){
    if(is_sub){
      tan(answer);
    }else if(is_a){
      tan(a);
    }
  }
  return false;
});

jQuery('#sin').click(function(){
  if(display.text()){
    if(is_sub){
      sin(answer);
    }else if(is_a){
      sin(a);
    }
  }
  return false;
});

jQuery('#ln').click(function(){
  if(display.text() > '0'){
    if(is_sub){
      log(answer);
    }else if(is_a){
      log(a);
    }
  }
  return false;
});

jQuery('#memory_clear').click(function(){
  jQuery('#memory').children('li').fadeOut(150, function(){
    jQuery(this).remove();
  });
  jQuery('#memory').prepend('<li id="default">No recent calculations</li>');
  return false;
});

